// @flow
import { createStore } from 'redux';

export default (store: {}) => (dispatch: () => {}) => (action: {}) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => dispatch({type: ''}))
}