
export type SearchReqParams = {
    search: string;
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
