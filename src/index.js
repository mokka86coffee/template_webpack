// @flow
import React, { Component } from 'react';
import type {Node, ComponentType} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App.jsx';
import './index.scss';

const reducer = (store: Object, action: Object) => {
    console.log('in reducer', action)
    switch(action.type) {
        case 'INC_X': return { ...store, x: store.x + action.payload };
        case 'INC_Y': return { ...store, y: store.y + action.payload };
        case 'INC_Z': return { ...store, z: store.z + action.payload };
        case 'logEnhancer': return { ...store, zz: Math.random() };
        case 'FETCH_DONE': return { ...store, data: action.payload };
        default: (action: empty); return store;
    }
};

const logEnhancer = store => dispatch => action => {
    console.table({
        // action: action.type || action,
        // store: store.getState()
    });
    return dispatch({type: 'logEnhancer'});
}

const stringEnhancer = store => dispatch => action => {
    if ( typeof action === 'string') { return dispatch({ type: action })}
    return dispatch(action);
}

const initialState = { x: 0, y: 0, z: 0, data: [{name: 'fetching ...'}] };
const store = createStore(reducer, initialState, applyMiddleware(thunk, stringEnhancer, logEnhancer));

const { Provider: SomeProvider, Consumer: SomeConsumer } = React.createContext<any>();

export function withSomeConsumer() {
    return (Component: ComponentType<empty>) => (props: any) => (
        <SomeConsumer>
        {
            (prop) => (
                <Component {...props} SomeConsumerContext={prop} />
            )
        }
        </SomeConsumer>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <SomeProvider value={[()=>{},()=>{},()=>{}]}>
                <Route path='/' component={App}/>
            </SomeProvider>
        </Router>
    </Provider>, 
// $FlowIgnore
    document.querySelector('#root')
);
