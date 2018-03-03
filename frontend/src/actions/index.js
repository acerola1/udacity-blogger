import { loadCategories, loadPosts } from '../utils/blogApi';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const CHANGE_LOADING = 'CHANGE_LOADING';

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

export function changeLoading(component) {
  return {
    type: CHANGE_LOADING,
    component
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(changeLoading({category: true}));
    loadCategories().then(({ categories }) => {
      dispatch(setCategories(categories));
      dispatch(changeLoading({category: false}));
    });
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(changeLoading({post: true}));
    loadPosts().then(( posts ) => {
      dispatch(setPosts(posts));
      dispatch(changeLoading({post: false}));
    });
  }
}
