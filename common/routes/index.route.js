
import React from 'react';
import {
    HashRouter,
    Route,
} from 'react-router-dom';

// import { Router, Route, IndexRoute } from 'react-router';

import HomePage from '../components/HomePage/HomePage';
import SubPage from '../components/SubPage/SubPage';
import IndexContainer from "../containers/IndexContainer"

const routes = () => (
    <HashRouter>
        <IndexContainer>
            <Route exact  path="/" component={HomePage} />
            <Route path="/subpage" component={SubPage} />
        </IndexContainer>
    </HashRouter>
);

export default routes;
