/**
 * Created by Xiaotao.Nie on 2017/3/13.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import routes from '../routes/index.route';
import "../components/common.less"
import DevTools from '../store/DevTools';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render((
    <Provider store={store}>
        <div>
            <DevTools />
            {routes(history)}
        </div>
    </Provider>
), document.getElementById('root'));
