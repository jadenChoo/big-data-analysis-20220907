import * as React from 'react';

import {useLocation, useNavigate} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import NewsTrendChart from './NewsTrendsChart';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import SentimentTrendChart from './SentimentTrendChart';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import {useState} from 'react';
import { getAnalytics, logEvent } from "firebase/analytics";
import NewsSearchResults from './NewsSearchResults';

export default function Content() {
  const navigate = useNavigate();
  const analytics = getAnalytics();
  const {pathname, search} = useLocation();

  const params = new URLSearchParams(search);
  const searchText = params.get("search") || "";
  const [inputText, setInputText] = useState(searchText);
  // const [searchText, setSearchText] = useState("");

  function onSearch() {
    let url = pathname;
    if (inputText) {
      url += `?search=${inputText}`;
    }
    logEvent(analytics, "search", {inputText});
    navigate(url);
    // setSearchText(inputText);

  }
  
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by keywords"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
                value={inputText}
                onChange={(e) => {setInputText(e.target.value)}}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                  {
                    onSearch();
                  }
                }
              }
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }} onClick={onSearch}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {
        pathname === '/news-trends'
        ?(
          <NewsTrendChart search={searchText} />
        )
        : (
          pathname === '/news-search'?
          <NewsSearchResults search={searchText} />
          :<SentimentTrendChart search={searchText} />
        )
      }
      
    </Paper>
  );
}