import { loadCategories, loadPosts } from '../utils/blogApi';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  }
}

export function fetchCategories() {
  return dispatch => {
    loadCategories().then(({ categories }) => {
      dispatch(setCategories(categories))
    });
  }
}

export function fetchPosts() {
  return dispatch => {
    loadPosts().then(({ posts }) => {
      dispatch(setPosts(posts))
    });
  }
}
