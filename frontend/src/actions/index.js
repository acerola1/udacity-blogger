import { loadCategories } from '../utils/blogApi';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

export function fetchCategories() {
    return dispatch => {
        loadCategories().then( ({categories}) => dispatch(setCategories(categories)))
    }
}