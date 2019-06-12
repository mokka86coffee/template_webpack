// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App.jsx';
import './index.scss';

const reducer = (store: Object, action: Object) => {
    console.log('in reducer---------------');
    console.log('store - ', store);
    console.log('in reducer---------------');
    switch(action.type) {
        case 'INC_X': return { ...store, x: store.x + action.payload };
        case 'INC_Y': return { ...store, y: store.y + action.payload };
        case 'INC_Z': return { ...store, z: store.z + action.payload };
        default: (action: empty); return store;
    }
};

const initialState = { x: 0, y: 0, z: 0, };
const store = createStore(reducer, initialState, applyMiddleware(thunk));
// $FlowIgnore
ReactDOM.render(<Provider store={store}><App/></Provider>, document.querySelector('#root'));

