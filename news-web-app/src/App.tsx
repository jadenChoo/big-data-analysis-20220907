import "./App.css";

import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation} from 'react-router-dom';
import { getAnalytics, logEvent } from "firebase/analytics";

import NotFound from "./component/NotFound";
import Paperbase from "./component/Paperbase";
import React from 'react';

export const NEWS_SEARCH_PATH = "/news-search";
export const NEWS_TRENDS_PATH="/news-trends";
export const SENTIMENT_TRENDS_PATH="/sentiment-trends";

function App() {
  const analytics = getAnalytics();
  const {pathname,search} = useLocation();

  useEffect(() => {
    const parmas = new URLSearchParams(search);
    logEvent(analytics, pathname, parmas)
  }, [analytics, pathname, search])
  

  return (
    <Routes>
      <Route element={<Navigate to={NEWS_TRENDS_PATH}/>} path = "/" />
      <Route element={<Paperbase />} path={NEWS_SEARCH_PATH} />
      <Route element={<Paperbase />} path={NEWS_TRENDS_PATH} />
      <Route element={<Paperbase />} path={SENTIMENT_TRENDS_PATH} />
      <Route element={<NotFound />} path="*" />
    </Routes>
  )
}

export default App;
