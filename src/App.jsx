// @flow
import React, { Component } from 'react';
import type {Node} from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import uuid from 'uuid/v4';
import _ from 'lodash';
import {withSomeConsumer} from './';
import compose from './utils/compose';

const data = createSelector(({z}) => z, setRandomArr);
const fetched = createSelector(({data}) => data, (data) => {
    const result = data.map(el => (<span key={uuid()}>{el.name}</span>));
    console.log('in createSelector fetched', result);
    return result;
});

class App extends Component<{[key:string]: any}>{

    componentDidMount() {
        this.props.fetchData('users');
    }

    render(){
        console.log('props - ', this.props);
        const { x, y, z, incX, incY, incZ, elements, data: ss } = this.props;
        return (
            <>
                <p>Redux</p>
                <p>CountX: {x}</p>
                <p>CountY: {y}</p>
                <p>CountZ: {z}</p>
                <div>
                    <button onClick={incX}>incX</button>
                    <button onClick={incY}>incY</button>
                    <button onClick={incZ}>incZ</button>
                    <button onClick={incZ}>incZ</button>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>{ss}</div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>{elements}</div>
            </>
        );
    }
}

const mapStateToProps = (store, hz) => {
    return {
        ...store,
        elements: data(store),
        data: fetched(store)
    };
};

const incX = () => ({ type: 'INC_X', payload: +Math.random().toFixed(2) });
const incY = () => ({ type: 'INC_Y', payload: +Math.random().toFixed(2) });
const incZ = () => ({ type: 'INC_Z', payload: +Math.random().toFixed(2) });
const fetchData = (query) => async (dispatch) => {
    dispatch('FETCH_START');
    const fetched = await fetch(`https://jsonplaceholder.typicode.com/${query}`);
    const data = await fetched.json();
    dispatch({ type: 'FETCH_DONE', payload: data });
}

const actions = { incX, incY, incZ };

const mapDispachToProps = (dispatch) => {
    return ({
        incX: () => dispatch(incX()),
        incY: () => dispatch(incY()),
        incZ: () => dispatch(incZ()),
        fetchData: (query: 'posts' | 'comments' | 'todos') => dispatch(fetchData(query))
    });
}

export default compose(
    withSomeConsumer(), 
    connect(mapStateToProps, mapDispachToProps)
)(App);

// export default withSomeConsumer()(connect(mapStateToProps, mapDispachToProps)(App));

function setRandomArr(): Array<Node>{
    console.log('started setRandomArr');
    const resultedArr = Array(1000).fill(0).map(el=>Math.random().toFixed(2));
    return resultedArr.map(el=><span onClick={() => console.log(el)} style ={{margin: '10px'}} key={uuid()}>{el}</span>);
}

