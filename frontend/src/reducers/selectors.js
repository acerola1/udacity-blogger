export function getCategories(state) {
  return state.category;
}

export function getPosts(state) {
  return state.post;
}

export function getPostsByCategory(state, categoryName) {
  if (categoryName === 'all') {
    return getPosts(state);
  }
  return getPosts(state).filter( post => post.category === categoryName);
}
