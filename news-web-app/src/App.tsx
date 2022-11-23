import "./App.css";

import { Navigate, Route, Routes } from 'react-router-dom';

import NotFound from "./component/NotFound";
import Paperbase from "./component/Paperbase";
import React from 'react';

export const NEWS_TRENDS_PATH="/news-trends";
export const SENTIMENT_TRENDS_PATH="/sentiment-trends";

function App() {
  return (
    <Routes>
      <Route element={<Navigate to={NEWS_TRENDS_PATH}/>} path = "/" />
      <Route element={<Paperbase />} path={NEWS_TRENDS_PATH} />
      <Route element={<Paperbase />} path={SENTIMENT_TRENDS_PATH} />
      <Route element={<NotFound />} path="*" />
    </Routes>
  )
}

export default App;
