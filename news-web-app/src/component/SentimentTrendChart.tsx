import { Box } from '@mui/material';
import {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Plot from 'react-plotly.js';
import React from 'react';
import {useGetSentimentTrendsQuery} from '../app/newsApi';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface IProps {
    search: string;
}

export default function SentimentTrendChart({search}:IProps) {
    const {data, isLoading} = useGetSentimentTrendsQuery({search});
    const [display, setDisplay] = useState("doc-count");
    
    // console.log("isLoading", isLoading);
    if (isLoading || !data) {
        return <Box sx={{p:3, textAlign:"center"}}>
            <CircularProgress />
        </Box>
    }

    function generateChartTraces(): Plotly.Data[] {
        if (!data) return [];
        if (display === "doc-count") {
            const traces: Plotly.Data[] = ["positive", "neutral", "negative"].map(x=> ({
                x: data.trends.map(el => el.date),
                y: data.trends.map(el => (el as any)[x]),
                type: 'scatter',
                mode: 'lines+markers',
                name: x,
            }))
            return traces
        }  else {
            const trace: Plotly.Data = {
                x: data.trends.map(x => x.date),
                y: data.trends.map(x => x.sentiment),
                type: 'scatter',
                mode: 'lines+markers',
            }

            return [trace];
        
        }
    }
    return (
        
        <Box sx={{display: "grid", pt: 3}}>
            <ToggleButtonGroup
                color="primary"
                value={display}
                exclusive
                onChange={(event, value) => { setDisplay(value);}}
                aria-label="Platform"
                sx={{
                    mx: "auto",

                }}
                >
                <ToggleButton value="doc-count">Doc Count</ToggleButton>
                <ToggleButton value="score">Sentiment Score</ToggleButton>
            </ToggleButtonGroup>
            <Plot
                data={ generateChartTraces() }
                layout={ {autosize:true} }
                style={{width:"100%"}}
            />
        </Box>
       );  
}