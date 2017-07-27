
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import ThunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index.reducer';

const finalCreateStore = compose(
    applyMiddleware(ThunkMiddleware, routerMiddleware(hashHistory))
)(createStore);

const reducer = combineReducers(Object.assign({}, rootReducer, {
    routing: routerReducer,
}));

export default function configureStore(initialState) {
    const store = finalCreateStore(reducer, initialState);

    return store;
}
