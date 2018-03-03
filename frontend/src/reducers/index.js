import { combineReducers } from 'redux';
import { SET_CATEGORIES, SET_POSTS } from '../actions';

function category(state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...action.categories };
    default:
      return state;
  }
}

function post(state = {}, action) {
  switch (action.type) {
    case SET_POSTS:
      return { ...action.posts };
    default:
      return state;
  }
}

function comment(state = {}, action) {
  return state;
}

export default combineReducers({
  category,
  post,
  comment
});
