
export type SearchReqParams = {
    search: string;
}

export type NewsSearchReqParams = {
    search: string;
    page: number;
}


export type NewsTrendItem ={
    date: string;
    doc_count: number;
}

export type NewsTrends ={
    trends:NewsTrendItem[];
}


export type SentimentTrendItem ={
    date: string;
    positive: number;
    netural: number;
    negative: number;
    sentiment: number;
}

export type SentimentTrends ={
    trends:SentimentTrendItem[];
}

export type NewsSearchItem ={
    id:string;
    title: string;
    section: string;
    naver_url: string;
    source_url: string;
    image_url: string[];
    publisher: string;
    reporter_name: string;
    body : string;
    sentiment: string;
}

export type NewsSearch ={
    results:NewsSearchItem[];
}
