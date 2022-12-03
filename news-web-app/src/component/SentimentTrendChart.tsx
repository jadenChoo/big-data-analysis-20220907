import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Plot from 'react-plotly.js';
import React from 'react';
import {useGetSentimentTrendsQuery} from '../app/newsApi';

interface IProps {
    search: string;
}

export default function SentimentTrendChart({search}:IProps) {
    const {data, isLoading} = useGetSentimentTrendsQuery({search});
    
    // console.log("isLoading", isLoading);
    if (isLoading || !data) {
        return <Box sx={{p:3, textAlign:"center"}}>
            <CircularProgress />
        </Box>
    }

    // const trace: Plotly.Data={
    //     x: data.trends.map(el => el.date),
    //     y: data.trends.map(el => el.positive),
    //     type: 'scatter',
    //     mode: 'lines+markers',
    // }


    const traces: Plotly.Data[] = ["positive", "neutral", "negative"].map(x=> ({
        x: data.trends.map(el => el.date),
        y: data.trends.map(el => (el as any)[x]),
        type: 'scatter',
        mode: 'lines+markers',
        name: x,
    }))

    return ( <Plot
        data={ traces }
        layout={ {autosize:true} }
        style={{width:"100%"}}
      />);  
}