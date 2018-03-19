import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { fetchCategories, fetchPosts, setSelectedUser } from '../actions';

export function initStore() {
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

    let selectedUser = localStorage.selectedUser;
    selectedUser && store.dispatch(setSelectedUser(selectedUser));
    
    return store;
}