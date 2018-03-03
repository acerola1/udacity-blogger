import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers';
import thunk from 'redux-thunk';
import { fetchCategories, fetchPosts, fetchComments } from './actions';
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {},
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

store.dispatch(fetchCategories());
store.dispatch(fetchPosts());
store.dispatch(fetchComments('8xf0y6ziyjabvozdd253nd'));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
