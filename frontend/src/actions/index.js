import * as Api from '../utils/blogApi';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const SET_COMMENTS = 'SET_COMMENTS';
export const CHANGE_LOADING = 'CHANGE_LOADING';
export const POST_CHANGED = 'POST_CHANGED';

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  };
}

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  };
}

export function setComments(postId, comments) {
  return {
    type: SET_COMMENTS,
    payload: {postId, comments}
  }
}

export function changeLoading(component) {
  return {
    type: CHANGE_LOADING,
    component
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(changeLoading({category: true}));
    Api.loadCategories().then(({ categories }) => {
      dispatch(setCategories(categories));
      dispatch(changeLoading({category: false}));
    });
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(changeLoading({post: true}));
    Api.loadPosts().then(( posts ) => {
      dispatch(setPosts(posts));
      dispatch(changeLoading({post: false}));
    });
  }
}

export function fetchComments(postId) {
  return dispatch => {
    dispatch(changeLoading({comment: true}));
    Api.loadComments(postId).then(( comments ) => {
      dispatch(setComments(postId, comments));
      dispatch(changeLoading({comment: false}));
    });
  }
}

export function votePost(postId, option) {
  return dispatch => {
    Api.votePost(postId, option).then (
      post => {dispatch( {
        type: POST_CHANGED,
        post
      })}
    );
  }
}
