import json
import requests
import pandas as pd
import pdb

from config import *

def query_sentiments_trends(search):
    query = {
        "size": 0,
        "aggs":{
            "group_by_date": {
                "date_histogram":{
                    "field":"created_at",
                    "interval":"day"
                },
                "aggs":{
                    "group_by_sentiment":{
                        "terms":{
                            "field":"sentiment.keyword"
                        }
                    }
                }
            }
        }
    }

    if search:
        query['query'] = {
            "match":{
                "title": search
            }
        }

    headers = {
        'Content-type': 'application/json'
    }

    resp = requests.get(
        f'{ELASTICSEARCH_URL}/news/_search',
        headers = headers,
        data = json.dumps(query),
        auth = ELASTICSEARCH_AUTH
    )

    # pdb.set_trace()

    results = resp.json()

    buckets = results['aggregations']['group_by_date']['buckets']

    buffer = []
    for x in buckets:
        sents = x['group_by_sentiment']['buckets']
        if len(sents) == 0:
            continue
        
        entry = { t['key']: t['doc_count'] for t in sents}
        entry['date'] = x['key_as_string']

        buffer.append(entry)
    
    df_sentiments = pd.DataFrame(buffer)
    df_sentiments['date'] = df_sentiments['date'].str[:10]
    df_sentiments = df_sentiments.fillna(0)

    df_sentiments['sentiment'] = (df_sentiments['positive'] - df_sentiments['negative']) / df_sentiments.sum(axis=1)
 
    return df_sentiments.to_dict(orient = "records")

def main(event, context):
    params = event.get('queryStringParameters')
    

    if params:
        search = params.get('search', None)
    else:
        search = None

    trends = query_sentiments_trends(search)

    body = {
        "trends" : trends
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body, ensure_ascii=False),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
        }
    }

    return response
