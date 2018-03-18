import * as cons from '../utils/constants';

export function getCategories(state) {
  return state.category;
}

export function getPosts(state) {
  return state.post.filter(post => post.deleted === false);
}

export function getPostById(state, postId) {
  return getPosts(state).find(post => post.id === postId);
}

export function getPostsByCategory(state, categoryPath) {
  let sorting = getSorting(state);
  let posts = getPosts(state).concat();
  let getComparator = (sorting) => {
    switch (sorting) {
      case cons.SCORE_DESC:
        return (a, b) => b.voteScore - a.voteScore;
      case cons.SCORE_ASC:
        return (a, b) => a.voteScore - b.voteScore;
      case cons.TIME_DESC:
        return (a, b) => b.timestamp - a.timestamp;
      case cons.TIME_ASC:
        return (a, b) => a.timestamp - b.timestamp;
    }
  }
  posts.sort(getComparator(sorting));

  if (categoryPath === '/') {
    return posts;
  }
  return posts.filter( post => post.category === categoryPath);
}

export function getCategoryByPath(state, path) {
  const cat = getCategories(state).find( category => category.path === path);
  return cat;
}

export function getCategoryById(state, id) {
  const cat = getCategories(state).find( category => category.id === id);
  return cat;
}

export function isLoading(state, key) {
  return state.setting.loading[key];
}

export function getCommentsById(state, id) {
  return state.comment.comments.filter(c => c.deleted !== true);
}

export function getUsers(state) {
  return state.user.users;
}

export function getUserByName(state, name) {
  return getUsers(state).find(user => user.name === name);
}

export function getSelectedUser(state) {
  return getUserByName(state, state.user.selectedUser);
}

export function getSorting(state) {
  return state.setting.sorting;
}
