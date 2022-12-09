import './index.css';

import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {store} from "./app/store";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3_KV3-4EIg8yxUY_J7jQCd5pl-stY_Bs",
  authDomain: "news-trends-c1700.firebaseapp.com",
  projectId: "news-trends-c1700",
  storageBucket: "news-trends-c1700.appspot.com",
  messagingSenderId: "1089105632704",
  appId: "1:1089105632704:web:81b9a1bda6f8d267e9bc25",
  measurementId: "G-LYSB18QL8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

logEvent(analytics, "web-app-starts");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
