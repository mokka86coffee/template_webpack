// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import App from './App.jsx';
import './index.scss';

const reducer = (store, action) => {
    console.log('in reducer---------------');
    console.log('store - ', store);
    console.log('in reducer---------------');
    switch(action.type) {
        case 'INC_X': return { ...store, x: store.x + action.payload };
        case 'INC_Y': return { ...store, y: store.y + action.payload };
        case 'INC_Z': return { ...store, z: store.z + action.payload };
        default: return store;
    }
};

const initialState = { x: 0, y: 0, z: 0, };
const store = createStore(reducer, initialState);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

