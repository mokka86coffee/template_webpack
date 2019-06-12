// @flow
import React, { Component } from 'react';
import type {Node} from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import uuid from 'uuid/v4';
const data = createSelector(({z}) => z, setRandomArr);

class App extends Component<{[key:string]: any}>{

    render(){
        console.log(this.props);
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

const incX = () => ({ type: 'INC_X', payload: +Math.random().toFixed(2) });
const incY = () => ({ type: 'INC_Y', payload: +Math.random().toFixed(2) });
const incZ = () => ({ type: 'INC_Z', payload: +Math.random().toFixed(2) });

const actions = { incX, incY, incZ };

const mapDispachToProps = (dispatch: function) => ({
    incX: () => dispatch(incX()),
    incY: () => dispatch(incY()),
    incZ: () => dispatch(incZ()),
});

export default connect(mapStateToProps, mapDispachToProps)(App);

function setRandomArr(): Array<Node>{
    console.log('started setRandomArr');
    const resultedArr = Array(1000).fill(0).map(el=>Math.random().toFixed(2));
    return resultedArr.map(el=><span style ={{margin: '10px'}} key={uuid()}>{el}</span>);
}

