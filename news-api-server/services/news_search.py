import json
import requests

from config import *

PAGE_SIZE = 25


def query_news_articles(search, page):
    query = {
        "from": (page - 1) * PAGE_SIZE,
        "size": PAGE_SIZE,
    }

    if search:
        query['query'] = {
            'multi_match': {
                'query': search,
                'fields': ['title', 'body']
            }
        }

    headers = {
        "Content-Type": "application/json"
    }

    resp = requests.get(
        f'{ELASTICSEARCH_URL}/news/_search',
        headers=headers,
        data=json.dumps(query),
        auth=ELASTICSEARCH_AUTH,
    )

    assert resp.status_code == 200

    results = resp.json()
    results = results['hits']['hits']
    results = [x['_source'] for x in results]

    return results


def main(event, context):
    params = event.get('queryStringParameters')

    if params:
        search = params.get('search', None)
        page = int(params.get('page', 1))
    else:
        search = None
        page = 1

    results = query_news_articles(search, page)

    body = {
        "results": results
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
        }
    }

    return response
