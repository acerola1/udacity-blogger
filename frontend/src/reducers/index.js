import { combineReducers } from 'redux';
import { SET_CATEGORIES } from '../actions';

function category (state = {}, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return {...action.categories};
        default:
            return state;
    }
}

function post (state = {}, action) {
    return state;
}

function comment (state = {}, action) {
    return state;
}

export default combineReducers({
    category,
    post,
    comment
});