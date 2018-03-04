import { combineReducers } from 'redux';
import { SET_CATEGORIES, SET_POSTS, CHANGE_LOADING, SET_COMMENTS } from '../actions';

const defaultLoading = {
  category: false,
  post: false,
  comment: false
}

const defaultCategory = [{
  name: "all",
  path: "/"
}];

function category(state = defaultCategory, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      const catArray = Object.keys(action.categories).map( key => {
        const {name, path} = action.categories[key];
        return {name, path};
      });
      return [...state, ...catArray];
    default:
      return state;
  }
}

function post(state = [], action) {
  switch (action.type) {
    case SET_POSTS:
      return [ ...action.posts ];
    default:
      return state;
  }
}

function comment(state = {}, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return {...action.payload};
    default:
      return state;
  }
}

function loading(state = defaultLoading, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return {...state, ...action.component};
    default:
      return state;
  }
}

export default combineReducers({
  category,
  post,
  comment,
  loading
});
