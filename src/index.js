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
    console.log('in reducer', action);
    switch(action.type) {
        case 'INC_X': return { ...store, x: store.x + action.payload };
        case 'INC_Y': return { ...store, y: store.y + action.payload };
        case 'INC_Z': return { ...store, z: store.z + action.payload };
        // case 'logEnhancer': return { ...store, zz: Math.random() };
        case 'FETCH_START': return { ...store, loadingData: true };
        case 'FETCH_DONE': return { ...store, data: action.payload.data, loadingData: false };
        default: (action: empty); return store;
    }
};

const logEnhancer = store => dispatch => action => {
    console.table({
        // action: action.type || action,
        // store: store.getState()
    });
    // dispatch({type: 'logEnhancer'});
    dispatch(action);
}

const stringEnhancer = store => dispatch => action => {
    if ( typeof action === 'string') { return dispatch({ type: action })}
    return dispatch(action);
}

const initialState = { x: 0, y: 0, z: 0, data: [] };
const store = createStore(reducer, initialState, applyMiddleware(thunk, stringEnhancer, logEnhancer));

const { Provider: SomeProvider, Consumer: SomeConsumer } = React.createContext<any>();

export function withSomeConsumer() {
    return (Component: ComponentType<empty>) => (props: any) => (
        <SomeConsumer>
            { (context) =>  <Component {...props} SomeConsumerContext={context} /> }
        </SomeConsumer>
    );
}

class ErrorBoundary extends React.Component<{|children: Object|}, {hasError: boolean}> {

    state = { hasError: false, fakeLoading: '' };

    static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
        console.log('in cDC error - ', error);
        console.log('in cDC info - ', info);
        console.log('in typeof error - ', typeof error);
        console.log('in typeof info - ', typeof info);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children; 
    }
}

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <Router>
                <SomeProvider value={[()=>{},()=>{},()=>{}]}>
                    <Route path='/' component={App}/>
                </SomeProvider>
            </Router>
        </Provider>
    </ErrorBoundary>, 
// $FlowIgnore
    document.querySelector('#root')
);
