import requests
import pdb
import json
import requests
import pandas as pd

from config import *
from transformers import pipeline

# from transformers import AutoTokenizer, AutoModelForSequenceClassificaion

def fetch_missing_sentiments():
    body = {
        "query": {
            "bool": {
                "must_not": [{
                    "exists": {
                        "field": "sentiment"
                    }
                }]
            }
        }
    }

    body = json.dumps(body)

    headers = { 'Content-type': 'application/json'}

    resp = requests.get(f'{ELASTICSEARCH_URL}/news/_search', 
        data=body, 
        headers=headers, 
        auth=ELASTICSEARCH_AUTH)

    assert resp.status_code == 200

    results = resp.json()

    hits = results['hits']['hits']

    docs = [x['_source'] for x in hits]

    df = pd.DataFrame(docs)
    if df.empty:
        return df
    else:
        df = df[['id','title']]
        return df


def upload_for_server(df):
    for _, row in df.iterrows():
        body = {
            "doc":{
                "sentiment": row.label
            }
        }

        body = json.dumps(body)

        headers = { 'Content-type': 'application/json'}

        resp = requests.post(f"{ELASTICSEARCH_URL}/news/_update/{row['id']}", 
            data=body, 
            headers=headers, 
            auth=ELASTICSEARCH_AUTH
            )
        assert resp.status_code == 200

    #pdb.set_trace()


if __name__ == '__main__':
    classifier = pipeline('sentiment-analysis', model='snunlp/KR-FinBert-SC')
    # print('hello world')
    while True:
        df = fetch_missing_sentiments()
        if df.empty:
            break

        titles = df['title'].tolist()
        sentiments = classifier(titles)

        df_sents = pd.DataFrame(sentiments)
        df_sents = df_sents[['label']]

        df = df.join(df_sents)
        print(df)

        upload_for_server(df)


        # pdb.set_trace()

