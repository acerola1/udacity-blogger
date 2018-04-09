//const baseUrl = process.env.NODE_ENV === 'production' ? '/api' : process.env.REACT_APP_BACKEND;
// TODO: temporary solution for udacity review
const baseUrl = process.env.REACT_APP_BACKEND;

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

let headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

if (!baseUrl.includes('localhost')) {
  headers.credentials = 'include';
}

export function loadCategories() {
  const url = `${baseUrl}/categories`;
  return fetch(url, { headers })
    .then(res => res.json())
}

export function loadPosts() {
  const url = `${baseUrl}/posts`;
  return fetch(url, { headers })
    .then(res => res.json())
}

export function loadComments(postId) {
  const url = `${baseUrl}/posts/${postId}/comments`;
  return fetch(url, { headers })
    .then(res => res.json())
}

export function votePost(postId, option) {
  const body = JSON.stringify({ option });

  return fetch(`${baseUrl}/posts/${postId}`, { method: 'POST', headers, body })
    .then(res => res.json());
}

export function deletePost(postId) {
  return fetch(`${baseUrl}/posts/${postId}`, { method: 'DELETE', headers, body: {} })
    .then(res => res.json());
}

export function deleteComment(commentId) {
  return fetch(`${baseUrl}/comments/${commentId}`, { method: 'DELETE', headers, body: {} })
    .then(res => res.json());
}

export function voteComment(commentId, option) {
  const body = JSON.stringify({ option });

  return fetch(`${baseUrl}/comments/${commentId}`, { method: 'POST', headers, body })
    .then(res => res.json());
}

export function changeComment(commentId, comment) {
  const body = JSON.stringify(comment);

  return fetch(`${baseUrl}/comments/${commentId}`, { method: 'PUT', headers, body })
    .then(res => res.json());
}

export function changePost(postId, post) {
  const body = JSON.stringify(post);

  return fetch(`${baseUrl}/posts/${postId}`, { method: 'PUT', headers, body })
    .then(res => res.json());
}

export function createComment(comment) {
  const body = JSON.stringify(comment);

  return fetch(`${baseUrl}/comments/`, { method: 'POST', headers, body })
    .then(res => res.json());
}

export function createPost(post) {
  const body = JSON.stringify(post);

  return fetch(`${baseUrl}/posts/`, { method: 'POST', headers, body })
    .then(res => res.json());
}
