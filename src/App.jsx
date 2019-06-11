import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class App extends Component{

    render(){
        console.log(this.props);
        const { x, y, z, incX, incY, incZ } = this.props;
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
                {
                    (() => {
                        console.log('Rerender');
                        return <p>Rerender</p>;
                    })()
                }
            </>
        );
    }
}

const mapStateToProps = (store, hz) => {
    return store;
};

const incX = () => ({ type: 'INC_X', payload: +Math.random().toFixed(2) });
const incY = () => ({ type: 'INC_Y', payload: +Math.random().toFixed(2) });
const incZ = () => ({ type: 'INC_Z', payload: +Math.random().toFixed(2) });

const actions = { incX, incY, incZ };

const mapDispachToProps = (dispatch) => ({
    incX: () => dispatch(incX()),
    incY: () => dispatch(incY()),
    incZ: () => dispatch(incZ()),
});

export default connect(mapStateToProps, mapDispachToProps)(App);