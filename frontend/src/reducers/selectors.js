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
  let posts = [...getPosts(state)];
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
      default:
        return (a, b) => b.voteScore - a.voteScore;
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

export function getCommentsByPostId(state, postId) {
  return state.comment.comments.filter(c => c.deleted !== true);
}

export function getCommentById(state, id) {
  return state.comment.comments.find(c => c.id === id);
}

export function getUsers(state) {
  return state.user.users;
}

export function getUserByName(state, name) {
  return getUsers(state).find(user => user.name === name);
}

export function getSelectedUser(state) {
  let user = getUserByName(state, state.user.selectedUser)
  return user ? user : getUserByName(state, cons.DEFAULT_USER);
}

export function getSorting(state) {
  return state.setting.sorting;
}

const kebabCase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();

export function createUniquePostId(store, title) {
  let ids = getPosts(store).map(post => post.id);
  let newId = kebabCase(title);
  if (!ids.includes(newId)) {
    return newId;
  }
  let postfix = 1, postfixedId;
  while (ids.includes(postfixedId = `${newId}-${postfix}`)) {
    ++postfix;
  }
  return postfixedId;
}
