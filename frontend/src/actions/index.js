import * as Api from '../utils/blogApi';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const SET_COMMENTS = 'SET_COMMENTS';
export const CHANGE_LOADING = 'CHANGE_LOADING';
export const POST_CHANGED = 'POST_CHANGED';
export const COMMENT_CHANGED = 'COMMENT_CHANGED';
export const SELECT_USER = 'SELECT_USER';

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

export function setSelectedUser(selectedUser) {
  return {
    type: SELECT_USER,
    selectedUser
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

export function deletePost(postId) {
  return dispatch => {
    Api.deletePost(postId).then (
      post => {dispatch( {
        type: POST_CHANGED,
        post
      })}
    );
  }
}

export function deleteComment(commentId) {
  return dispatch => {
    Api.deleteComment(commentId).then (
      comment => {dispatch( {
        type: COMMENT_CHANGED,
        comment
      })}
    );
  }
}

export function voteComment(commentId, option) {
  return dispatch => {
    Api.voteComment(commentId, option).then (
      comment => {dispatch( {
        type: COMMENT_CHANGED,
        comment
      })}
    );
  }
}

export function changeComment(commentId, comment) {
  return dispatch => {
    Api.changeComment(commentId, comment).then (
      comment => {dispatch( {
        type: COMMENT_CHANGED,
        comment
      })}
    );
  }
}

export function changePost(postId, post) {
  return dispatch => {
    Api.changePost(postId, post).then (
      post => {dispatch( {
        type: POST_CHANGED,
        post
      })}
    );
  }
}
