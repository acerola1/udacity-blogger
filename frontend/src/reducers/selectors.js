export function getCategories(state) {
  return state.category;
}

export function getPosts(state) {
  return state.post.filter(post => post.deleted === false);
}

export function getPostsByCategory(state, categoryName) {
  if (categoryName === 'All') {
    return getPosts(state);
  }
  return getPosts(state).filter( post => post.category === categoryName);
}

export function getCategoryByPath(state, path) {
  const cat = getCategories(state).find( category => category.path === path);
  return cat;
}

export function isLoading(state, key) {
  return state.loading[key];
}
