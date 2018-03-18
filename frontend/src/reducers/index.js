import { combineReducers } from 'redux';
import {
  SET_CATEGORIES, SET_POSTS, CHANGE_LOADING, SET_COMMENTS,
  POST_CHANGED, COMMENT_CHANGED, SELECT_USER, ADD_COMMENT
} from '../actions';
import initialState from './initialState';

function category(state = initialState.category, action) {
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

function post(state = initialState.post, action) {
  switch (action.type) {
    case SET_POSTS:
      return [ ...action.posts ];
    case POST_CHANGED:
      return [ ...state.map( p => p.id === action.post.id ? action.post : p) ];
    default:
      return state;
  }
}

function comment(state = initialState.comment, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return {...action.payload};
    case ADD_COMMENT:
      return {...state, comments: [...state.comments, action.comment]};
    case COMMENT_CHANGED:
      return { ...state, comments: [...state.comments.map( c => c.id === action.comment.id ? action.comment : c)] };
    default:
      return state;
  }
}

function loading(state = initialState.loading, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return {...state, ...action.component};
    default:
      return state;
  }
}

function user(state = initialState.user, action) {
  switch (action.type) {
    case SELECT_USER:
      return {...state, selectedUser: action.selectedUser};
    default:
      return state;
  }
}

export default combineReducers({
  category,
  post,
  comment,
  loading,
  user
});
