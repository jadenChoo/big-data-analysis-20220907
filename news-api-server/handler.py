import json


def hello(event, context):
    body = {
        "message": "20224224",
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
