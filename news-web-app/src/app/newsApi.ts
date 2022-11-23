import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
    reducerPath: "news-api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://xnb6qq0as6.execute-api.ap-northeast-2.amazonaws.com/dev",
    }),
    endpoints: (builder) => ({
        getNewsTrends:builder.query<any,void>({
            query:() => 'news-trends',
        })
    }),
});

export const {
    useGetNewsTrendsQuery
} = newsApi;
