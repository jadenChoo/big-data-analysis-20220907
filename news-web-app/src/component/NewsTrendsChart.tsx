import React from 'react';
import {useGetNewsTrendsQuery} from '../app/newsApi';

export default function NewsTrendChart() {
    const {data, isLoading} = useGetNewsTrendsQuery();

    console.log("isLoading", isLoading);
    console.log("data", data);
    return <div></div>    
}