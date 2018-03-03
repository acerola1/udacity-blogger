import { combineReducers } from 'redux';

function category (state = {}, action) {
    return state;
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