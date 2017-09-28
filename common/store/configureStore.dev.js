/**
 * Created by Xiaotao.Nie on 2017/3/13.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import ThunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index.reducer';

const finalCreateStore = compose(
    applyMiddleware(ThunkMiddleware,routerMiddleware(hashHistory)),
)(createStore);

const reducer = combineReducers({
    rootReducer,
    routing: routerReducer,
});

export default function configureStore(initialState) {
    const store = finalCreateStore(reducer, initialState);
    return store;
}
