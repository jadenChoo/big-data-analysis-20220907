import * as React from 'react';

import { NEWS_TRENDS_PATH, SENTIMENT_TRENDS_PATH } from '../App';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useLocation} from 'react-router-dom';

export default function Header() {
  const {pathname} = useLocation();
  function getTitle(){
    switch(pathname){
      case NEWS_TRENDS_PATH:
        return "News Trends";
      case SENTIMENT_TRENDS_PATH:
        return "Sentiment Trends";
      default:
        "Unknown"
    }
  }

  return (
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 , py:2 }}
      >
        <Toolbar >
              <Typography color="inherit"  variant="h5" component="h1">
                {getTitle()}
              </Typography>
        </Toolbar>
      </AppBar>
  );
}