// @flow
import React, { Component, useEffect, useState } from 'react';
import type {Node} from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import uuid from 'uuid/v4';
import _, {isEqual} from 'lodash';
import {withSomeConsumer} from './';
import compose from './utils/compose';
import {compose as reduxCompose} from 'redux';
import {withRouter, Link, Switch, Route} from 'react-router-dom';
import {List, InfiniteLoader} from 'react-virtualized';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cx from 'classnames';
import styles from './index.scss';
import RouteComponent from './components/routes.jsx';

const Jook = React.memo(() => {
    console.log("TCL: Jook", Jook)
    useEffect(()=>{
        return () => {};
    },[])
    return <p>Jook</p>   
}, (prevProps, props) => !isEqual(props, prevProps));

const Nav = React.memo(({location: {pathname}}) => {
    const [opened, handleOpened] = useState(false);
    useEffect((...args) => {
        handleOpened(false);
    }, [pathname]);
    return (
        <div>
            <button 
                style={{backgroundColor: '#ffeb3b', border: 'none', borderRadius: '10px', outline: 'none'}}
                onClick={() => handleOpened(!opened)}
            >
                Menu
            </button>
            <CSSTransition
                in={opened}
                timeout={200}
                classNames={{
                    enter: styles.nav,
                    enterActive: styles['nav-enter-active'],
                    enterDone: cx(styles['nav-enter-done'], styles.nav),
                }}
                unmountOnExit
                onEnter={() => console.log('onEnter')}
                onEntering={() => console.log('onEntering')}
                onEntered={() => console.log('onEntered')}
                onExit={() => console.log('onExit')}
                onExiting={() => console.log('onExiting')}
                onExited={() => console.log('onExited')}
            >
                <ul>
                    <li><Link to="/route1">Пункт 1</Link></li>
                    <li><Link to="/route2">Пункт 2</Link></li>
                    <li><Link to="/route3">Пункт 3</Link></li>
                </ul>
            </CSSTransition>
        </div>
    )
});

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
};

const NoRender = compose(
    withRouter,
    connect(
        ({ x }) => ({ x }),
        dispatch => ({})
    )
)(NotRender);

class App extends Component<{[key:string]: any}, {[key:string]: any}>{

    state = {
        scrollTop: 0,
        counter: 0,
        counterNotFn: 0
    }

    counterInterval = null;
    counterNotFnInterval = null;

    componentDidMount() {
        this.props.fetchData('posts');
        window.addEventListener('scroll', this.resizeWindow);
    }

    resizeWindow = ({ target: { scrollingElement: { scrollTop } } }) => {
        this.setState({scrollTop})
    }

    rowRenderer = ({ index, isScrolling, key, style, ...rest }) => {

        return this.props.data[index]
        ? (
            <div style={style} key={key}>
                <h2>{this.props.data[index].title || 'fetching'}</h2>
                <span>{this.props.data[index].body || ''}</span>
            </div>
        )
        : (
            <div style={style} key={key}>
                <h2>{'fetching'}</h2>
            </div>
        )
        ;
    };

    loadMoreRows = ({startIndex, stopIndex}) => {
        if (!this.props.isLoading) {
           this.props.fetchData('posts', {startIndex, stopIndex});
        }
    }


    render(){
        // const Lazy = React.lazy(() => new Promise(r => setTimeout(() => r(import('./components/lazyComponent')), 1000)));
        const Lazy = React.lazy(() => import('./components/lazyComponent'));
        const { x, y, z, incX, incY, incZ, elements, data, location } = this.props;
        const { scrollTop, counter, counterNotFn } = this.state;
        return (
            <>
                <h1>Redux</h1>
                <h2>{scrollTop}</h2>
                <h2>Fn: {counter}</h2>
                <h2>Not Fn: {counterNotFn}</h2>
                <div className={styles.swipe__container}>
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            timeout={15000}
                            classNames={{
                                enter: cx(styles.swipe, styles['swipe-enter']),
                                enterActive: cx(styles.swipe, styles['swipe-enter-active']),
                                enterDone: cx(styles.swipe, styles['swipe-enter-active']),
                                exit: cx(styles.swipe, styles['swipe-exit-active']),
                                exitActive: cx(styles.swipe, styles['swipe-exit-active']),
                                exitDone: cx(styles.swipe, styles['swipe-exit-active'])
                            }}
                        >
                            <Route path="/:id" component={RouteComponent} />
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <Nav location={this.props.location} />
                <WithRoutes />
                <React.Suspense fallback={<p>Loading.....</p>}>
                    <Lazy />
                </React.Suspense>
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
                <Jook aa={Math.random()} />
                <NoRender />
                <InfiniteLoader
                    isRowLoaded={({ index }) => {
                        return Boolean(this.props.data[index]);
                    }}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={this.props.data.length ? this.props.data.length : 10}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <List
                            rowCount={data.length}
                            width={800}
                            height={600}
                            rowHeight={100}
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            rowCount={this.props.data.length ? this.props.data.length+1 : 10}
                            style={{backgroundColor: 'skyblue'}}
                            rowRenderer={this.rowRenderer}
                            // overscanRowCount={3}
                            // rowGetter={({ index }) => this.props.loadedData[index]}
                        />
                    )}
                </InfiniteLoader>
            </>
        );
    }
}


const data = createSelector(({z}) => z, setRandomArr);
const fetched = createSelector(({data}) => data, (data) => {
    console.log('in createSelector fetched', data);
    const result = data.map(el => (<span key={uuid()}>{el.name}</span>));
    // return result;
    return data;
});

const incX = () => ({ type: 'INC_X', payload: +Math.random().toFixed(2) });
const incY = () => ({ type: 'INC_Y', payload: +Math.random().toFixed(2) });
const incZ = () => ({ type: 'INC_Z', payload: +Math.random().toFixed(2) });
const fetchData = (query, params) => async (dispatch, getState) => {
    let bufferedFetched = getState().data.length ? [...getState().data] : [],
    finalRowIndex = 1e6;
    dispatch('FETCH_START');
    let {startIndex, stopIndex} = params;
    while(startIndex <= stopIndex) {
        try{
            const fetched = await fetch(`https://jsonplaceholder.typicode.com/${query}/${startIndex+1}`);
            const data = await fetched.json();
            if (Object.keys(data).length) {
                bufferedFetched.push(data);
                startIndex++;
            }
            else {
                break; // module
            }
        } catch (err) {
            finalRowIndex = bufferedFetched.length;
        }
    }
    dispatch({ type: 'FETCH_DONE', payload: {data: bufferedFetched, finalRowIndex} });
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
        fetchData: (query: 'posts' | 'comments' | 'todos', params: {[key: string]: number}) => dispatch(fetchData(query, params))
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
};

function WithRoutes(props) {
    console.log("TCL: WithRoutes -> props", props)
    return (
        <Switch>
            <Route path="/as" render={()=><p>Route 1</p>} />
            <Route path="/as2" render={()=><p>Route 2</p>} />
            <Route path="/as3" render={()=><p>Route 3</p>} />
        </Switch>
    )
};