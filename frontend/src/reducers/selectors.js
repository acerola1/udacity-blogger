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
  if (categoryPath === '/') {
    return getPosts(state);
  }
  return getPosts(state).filter( post => post.category === categoryPath);
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
  return state.loading[key];
}
