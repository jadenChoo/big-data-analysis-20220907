import os
from dotenv import load_dotenv

load_dotenv()

ELASTICSEARCH_URL = 'https://search-dfmba-1node-20220903-3kru37sdsscdmnossyphqwgkom.ap-northeast-2.es.amazonaws.com'
ELASTICSEARCH_ID=os.getenv('ELASTICSEARCH_ID')
ELASTICSEARCH_PW=os.getenv('ELASTICSEARCH_PW')
ELASTICSEARCH_AUTH = (ELASTICSEARCH_ID, ELASTICSEARCH_PW)