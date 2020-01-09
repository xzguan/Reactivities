import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-widgets/dist/css/react-widgets.css';
import App from './app/layout/app';
import { AppTest } from "./app/playground/AppTest";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,Router } from "react-router-dom";
import {ScrollToTop} from "../src/app/layout/ScrollToTop"
import { createBrowserHistory } from "history";
import dateFnsLocalizer from "react-widgets-date-fns";
export const history=createBrowserHistory();

dateFnsLocalizer();

ReactDOM.render(
    <Router history={history}>
        <ScrollToTop />
        <AppTest />
    </Router> , 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
