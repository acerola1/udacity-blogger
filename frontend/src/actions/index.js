import * as Api from '../utils/blogApi';
import * as selectors from '../reducers/selectors';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const SET_COMMENTS = 'SET_COMMENTS';
export const CHANGE_LOADING = 'CHANGE_LOADING';
export const POST_CHANGED = 'POST_CHANGED';
export const COMMENT_CHANGED = 'COMMENT_CHANGED';
export const SELECT_USER = 'SELECT_USER';
export const ADD_COMMENT = 'ADD_COMMENT';
export const SET_SORTING = 'SET_SORTING';
export const ADD_POST = 'ADD_POST';
export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const CLOSE_ERROR = 'CLOSE_ERROR';

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
  localStorage.selectedUser = selectedUser;
  return {
    type: SELECT_USER,
    selectedUser
  };
}

export function setSorting(sorting) {
  return {
    type: SET_SORTING,
    sorting
  };
}

export function displayError(message) {
  return (dispatch, getStore) => {
    let delay = 0;
    if (selectors.getError(getStore()).open) {
      delay=250;
      dispatch(closeError());
    }
    setTimeout(() => {
      dispatch({
        type: DISPLAY_ERROR,
        message
      })
    }, delay);
  };
}

export function closeError() {
  return {
    type: CLOSE_ERROR
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(changeLoading({category: true}));
    Api.loadCategories().then(({ categories }) => {
      dispatch(setCategories(categories));
      dispatch(changeLoading({category: false}));
    }).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(changeLoading({post: true}));
    Api.loadPosts().then(( posts ) => {
      dispatch(setPosts(posts));
      dispatch(changeLoading({post: false}));
    }).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function fetchComments(postId) {
  return dispatch => {
    dispatch(changeLoading({comment: true}));
    Api.loadComments(postId).then(( comments ) => {
      dispatch(setComments(postId, comments));
      dispatch(changeLoading({comment: false}));
    }).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
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
    ).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function deletePost(postId) {
  return dispatch => {
    Api.deletePost(postId).then (
      post => {dispatch( {
        type: POST_CHANGED,
        post
      })}
    ).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function deleteComment(commentId) {
  return (dispatch, getStore) => {
    Api.deleteComment(commentId).then (
      comment => {dispatch( {
        type: COMMENT_CHANGED,
        comment
      })}
    ).then( () => {
      let comment = selectors.getCommentById(getStore(), commentId);
      let post = selectors.getPostById(getStore(), comment.parentId);
      dispatch(changePost(post.id, {commentCount: post.commentCount - 1})
    )}).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function voteComment(commentId, option) {
  return dispatch => {
    Api.voteComment(commentId, option).then (
      comment => {dispatch( {
        type: COMMENT_CHANGED,
        comment
      })}
    ).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function changeComment(commentId, comment) {
  return dispatch => {
    Api.changeComment(commentId, comment).then (
      comment => {dispatch( {
        type: COMMENT_CHANGED,
        comment
      })}
    ).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function changePost(postId, post) {
  return dispatch => {
    Api.changePost(postId, post).then (
      post => {dispatch( {
        type: POST_CHANGED,
        post
      })}
    ).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function createComment(comment) {
  return (dispatch, getStore) => {
    Api.createComment(comment).then (
      comment => {dispatch( {
        type: ADD_COMMENT,
        comment
      })}
    ).then( () => {
      let post = selectors.getPostById(getStore(), comment.parentId);
      dispatch(changePost(post.id, {commentCount: post.commentCount + 1})
    )}).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}

export function createPost(post, callback) {
  return dispatch => {
    Api.createPost(post).then (
      post => {dispatch( {
        type: ADD_POST,
        post
      })}
    ).then(
      () => callback && callback()
    ).catch( error => {
      console.log(error);
      dispatch(displayError('Connection Lost'));
    });
  }
}
