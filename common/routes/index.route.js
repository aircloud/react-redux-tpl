/**
 * Created by Xiaotao.Nie on 2017/3/13.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import HomePage from '../components/HomePage/HomePage';
import SubPage from '../components/SubPage/SubPage';
import IndexContainer from "../containers/IndexContainer"

const routes = hashHistory => (
    <Router history={hashHistory}>
        <Route path="/" component={IndexContainer}>
            <IndexRoute component={HomePage} />
            <Route path="subpage" component={SubPage} />
        </Route>
    </Router>
);

export default routes;
