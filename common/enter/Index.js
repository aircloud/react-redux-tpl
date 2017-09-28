/**
 * Created by Xiaotao.Nie on 2017/3/13.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
// import { syncHistoryWithStore } from 'react-router-redux'; 升级到 react-router 4 之后，无法将history作为props传入
import createHashHistory from 'history/createBrowserHistory'
const hashHistory = createHashHistory();
import routes from '../routes/index.route';
// import "../components/common.less"

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <div>
            {routes()}
        </div>
    </Provider>
), document.getElementById('root'));
