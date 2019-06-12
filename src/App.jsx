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

class App extends Component<{[key:string]: any}>{

    componentDidMount() {
        // this.props.fetchData('users');
    }

    render(){
        console.log('props - ', this.props);
        const { x, y, z, incX, incY, incZ, elements } = this.props;
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
                <div style={{display: 'flex', flexWrap: 'wrap'}}>{elements}</div>
            </>
        );
    }
}

const mapStateToProps = (store, hz) => {
    return {
        elements: data(store),        
        ...store
    };
};

const incX = ({x}) => {
    return { type: 'INC_X', payload: +Math.random().toFixed(2) };
};

const incY = () => ({ type: 'INC_Y', payload: +Math.random().toFixed(2) });
const incZ = () => ({ type: 'INC_Z', payload: +Math.random().toFixed(2) });

const fetchData = (str: string) => ({ type: 'FETCH_SMTH', payload: str });

const actions = { incX, incY, incZ };

const mapDispachToProps = (dispatch: function, store) => {
    return ({
        incX: () => dispatch(incX(store)),
        incY: () => dispatch(incY()),
        incZ: () => dispatch(incZ()),
        fetchData: (str) => dispatch(fetchData(str))
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

