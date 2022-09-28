from asyncio.proactor_events import _ProactorBaseWritePipeTransport
from email.iterators import body_line_iterator
import boto3
import pdb
import json
import datetime as dt
import warnings
import time
import requests
from bs4 import BeautifulSoup as bs
import re

from config import *

warnings.simplefilter(action='ignore', category=FutureWarning)

#pdb.set_trace()

def fetch_news_contents(msg):
    # print(msg)
    # print(msg.message_id)
    # print(msg.body)

    item = json.loads(msg.body)

    # print(item)
    headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:24.0) Gecko/20100101 Firefox/24.0' }

    resp = requests.get(item['url'], headers=headers)

    if resp.status_code != 200:
        return None

    soup = bs(resp.text, 'html.parser')

    node = soup.find("meta", {"property": "og:article:author"})
    if node:
        tokens = node['content'].split('|')
        if 'TV연예' in tokens[1] or '네이버 스포츠' in tokens[1]:
            return None

        publisher = tokens[0].strip()
    else :
        pdb.set_trace()
    
    # print(publisher)
    datestr_list, source_url = parse_media_info(soup)
    if len(datestr_list) == 0 :
        return None
    elif len(datestr_list) == 1:
        created_at = parse_datestr(datestr_list[0])
        updated_at = created_at
    elif len(datestr_list) == 2:
        created_at = parse_datestr(datestr_list[0])
        updated_at = parse_datestr(datestr_list[1])
    else:
        print(item)
        pdb.set_trace()
    
    # print(created_at)
    # print(updated_at)

    body = soup.find("div",{"id":"newsct_article"})

    assert body is not None

    # body_text = body.get_text("\n")
    body_text = body.text.strip()
    # print(body_text)

    images = body.find_all("img")

    try:
        image_urls = [x['data-src'] for x in images]
        image_urls = [re.sub(r'\?[\w=]+', '', x)  for x in image_urls]
        image_urls = list(set(image_urls))
    except:
        image_urls = ''

    # print(images)
    # print(image_urls)

    # print(datestr_list)
    # print(source_url)

    byline = soup.find("span",{"class":"byline_s"})
    reporter_name, reporter_email = extract_reporter(byline)
    if len(reporter_name) == 0:
        return None

    entry = {
        'id' : item['msg_id'],
        'title' : item['title'],
        'section' : 'economy',
        'naver_url': item['url'],
        'source_url': source_url,
        'image_url': image_urls,
        'publisher': publisher,
        'created_at': created_at.isoformat(), 
        'updated_at': updated_at.isoformat(),
        'reporter_name': reporter_name,
        'reporter_email' : reporter_email,
        'body' : body_text
    }

    # pdb.set_trace()
    return entry

def parse_media_info(soup):
    media_info = soup.find("div", {"class": "media_end_head_info_datestamp"})

    if media_info:
        datestr_list = media_info.find_all("span", {"class": "media_end_head_info_datestamp_time"})

        link = media_info.find("a",{"class":"media_end_head_origin_link"})
        source_url = link['href'] if link else ''

        return datestr_list, source_url
    else :
        return '',''

def parse_datestr(span):
    if span.has_attr('data-date-time'):
        datestr = span['data-date-time']
    elif span.has_attr('data-modify-date-time'):
        datestr = span['data-modify-date-time']
    else:
        return None

    date = dt.datetime.fromisoformat(datestr)

    return date

def extract_reporter(byline):
    if byline is None:
        return '',''

    byline = byline.text.strip()
    if "=" in byline:
        byline = byline.split('=', 1)[1].strip()
    if "[" in byline:
        byline = byline.replace('[', ' ').strip()
        if "기자" in byline:
            byline = byline.replace(']', ' ').strip()
        else :
            byline = byline.replace(']', ' 기자 ').strip()
        
    # print(byline)
    m = re.match(r'([\wㄱ-ㅎ가-힣]+)\s*(기자)?\s*(\(?[\w\.]+@[\w\.]+\)?)', byline) # 기존버전
    # m = re.match(r'\w*=([\wㄱ-ㅎ가-힣]+)\s*(기자)?\s*(\(?[\w\.]+@[\w\.]+\)?)', byline) # 교수님버전
    # m = re.match(r'([\wㄱ-ㅎ가-힣]+)\s=\s([\wㄱ-ㅎ가-힣]+)\s*(기자)?\s*(\(?[\w\.]+@[\w\.]+\)?)?', byline)    #regexp101 버전
    if m:
        # print(m)
        return m[1], m[3]

    m = re.match(r'([\wㄱ-ㅎ가-힣]+)\s*(기자)?', byline)
    if m:
        # print(m)
        return m[1], ''
    pdb.set_trace()

    print("byline : "+ byline)
    return '', ''
    # pdb.set_trace()
    

def upload_to_elastic_search(buffer):
    if len(buffer) == 0:
        return

    data = ''

    for x in buffer:
        index = {
            'index' : {
                '_id': x['id']
            }
        }

        data += json.dumps(index) + '\n'
        data += json.dumps(x) + '\n'

    headers = {
        'Content-Type':'application/json'
    }

    resp = requests.post(
        f'{ELASTICSEARCH_URL}/news/_bulk?pretty&refresh',
        headers = headers,
        data = data,
        auth=ELASTICSEARCH_AUTH
    )
    
    # print(resp.status_code)

    # pdb.set_trace()

if __name__ == '__main__' :
    # print("hello world")
    sqs = boto3.resource('sqs')
    queue = sqs.get_queue_by_name(QueueName = 'naver-news-20220917')

    while True:
        try:
            print('[{}] Fetching news'.format(dt.datetime.now()), end='', flush=True)

            messages = queue.receive_messages(
                MessageAttributeNames = ['All'],
                MaxNumberOfMessages=10,
                WaitTimeSeconds=1,
            )

            if len(messages) == 0:
                print('- Queue is empty. Wait for a while')
                time.sleep(60)
                continue
            
            # for msg in messages:
            #     msg.delete()
            buffer = []
            for msg in messages:            
                print('.', end='', flush=True)
                entry = fetch_news_contents(msg)
                if entry:
                    buffer.append(entry)
                msg.delete()
            # pdb.set_trace()
            upload_to_elastic_search(buffer)
            print('!!')

            # for msg in messages:
            #     msg.delete()

            time.sleep(1)
        except:
            print('!Error!')
            time.sleep(1)
            continue

