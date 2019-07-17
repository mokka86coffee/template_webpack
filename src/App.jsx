// @flow
import React, { Component } from 'react';
import type {Node} from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import uuid from 'uuid/v4';
import _ from 'lodash';
import {withSomeConsumer} from './';
import compose from './utils/compose';
import {compose as reduxCompose} from 'redux';
import {withRouter, Link, Switch, Route} from 'react-router-dom';
import {List} from 'react-virtualized';


class NotRender extends Component<{}, {}> {

    state = {
        some: 'soe'
    }

    shouldComponentUpdate(...args) {
        // console.log('args - ', args);
        return false;
    }

    render() {
        console.log('in NotRender');
        return (
            <p>in NotRender</p>
        )
    }
}

const NoRender = compose(
    withRouter,
    connect(
        ({ x }) => ({ x }),
        dispatch => ({})
    )
)(NotRender);

class App extends Component<{[key:string]: any}>{

    componentDidMount() {
        this.props.fetchData('posts');
    }

    rowRenderer = ({ index, isScrolling, key, style, ...rest }) => {
        console.log('rest - ', rest);
        return (this.props.data.length > 1) && (
            <div key={key}>{this.props.data[index] || 'fetching'}</div>
        );
    };

    render(){
        const { x, y, z, incX, incY, incZ, elements, data } = this.props;
        return (
            <>
                <h1>Redux</h1>
                <WithRoutes />
                <p>CountX: {x}</p>
                <p>CountY: {y}</p>
                <p>CountZ: {z}</p>
                <Link to="/as">as</Link>
                <Link to="/as2">as2</Link>
                <Link to="/as3">as3</Link>
                <div>
                    <button onClick={incX}>incX</button>
                    <button onClick={incY}>incY</button>
                    <button onClick={incZ}>incZ</button>
                </div>
                <NoRender />
                {/* <div style={{display: 'flex', flexWrap: 'wrap'}}>{data}</div> */}
                {/* <div style={{backgroundColor: 'skyblue'}}>{elements}</div> */}
                <List
                    rowCount={data.length}
                    width={800}
                    height={800}
                    rowHeight={20}
                    rowRenderer={this.rowRenderer}
                    overscanRowCount={3}
                />
            </>
        );
    }
}


const data = createSelector(({z}) => z, setRandomArr);
const fetched = createSelector(({data}) => data, (data) => {
    const result = data.map(el => (<span key={uuid()}>{el.name}</span>));
    console.log('in createSelector fetched', result);
    return result;
});

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

const mapStateToProps = (store) => {
    return {
        ...store,
        elements: data(store),
        data: fetched(store)
    };
};

const mapDispachToProps = (dispatch) => {
    return ({
        incX: () => dispatch(incX()),
        incY: () => dispatch(incY()),
        incZ: () => dispatch(incZ()),
        fetchData: (query: 'posts' | 'comments' | 'todos') => dispatch(fetchData(query))
    });
}
// export default compose(
export default reduxCompose(
    withSomeConsumer(), 
    connect(mapStateToProps, mapDispachToProps)
)(App);


// export default withSomeConsumer((connect(mapStateToProps, mapDispachToProps)(App));

function setRandomArr(): Array<Node>{
    console.log('started setRandomArr');
    const resultedArr = Array(1000).fill(0).map(el=>Math.random().toFixed(2));
    return resultedArr.map(el=><p style={{color: 'white', textAlign: 'center'}} onClick={() => console.log(el)} style ={{margin: '10px'}} key={uuid()}>{el}</p>);
}

function WithRoutes() {
    return (
        <Switch>
            <Route path="/as" render={()=><p>Route 1</p>} />
            <Route path="/as2" render={()=><p>Route 2</p>} />
            <Route path="/as3" render={()=><p>Route 3</p>} />
        </Switch>
    )
}