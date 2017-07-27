
import { combineReducers } from 'redux'

import {GET_CLASS,EXAMPLE} from "../actions/index.action"

const initialClass = [];

const initialInfo = {
   info:"This is a template for react-redux-webpack"
}

const getInfo = (state = initialInfo, action = "") => {
    switch (action.type) {
        case EXAMPLE:
            return action.content;
        default:
            return state;
    }
};

const getClass = (state = initialClass, action = "") => {
    switch (action.type) {
        case GET_CLASS:
            return action.content;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    getClass,getInfo
});

export default rootReducer;
