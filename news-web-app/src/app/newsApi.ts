import * as t from "./types";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
    reducerPath: "news-api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://xnb6qq0as6.execute-api.ap-northeast-2.amazonaws.com/dev",
    }),
    endpoints: (builder) => ({
        getNewsTrends:builder.query<t.NewsTrends,t.SearchReqParams>({
            query:({search}) => `news-trends?search=${search}`,
        }),
        getSentimentTrends:builder.query<t.SentimentTrends,t.SearchReqParams>({
            query:({search}) => `sentiment-trends?search=${search}`,
        })
    }),
});

export const {
    useGetNewsTrendsQuery, useGetSentimentTrendsQuery
} = newsApi;
