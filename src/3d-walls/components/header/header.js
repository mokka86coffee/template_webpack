import React, { useState, useEffect } from 'react';
import styles from './header.scss';
import cx from 'classnames';
import {withRouter, Route} from 'react-router-dom';

class Header extends React.Component {
    state = {
        currentChild: null,
        newChild: this.props.children[0].component,
        path: this.props.location.pathname
    }

    componentDidUpdate({location: { pathname }}) {
        const { pathname: newPath } = this.props.location;
        const id = pathname.slice(1);
        const {currentChild, newChild: NewChild, path: currentPath} = this.state;
        
        if (currentPath !== newPath) {
            
            if (!currentChild) {
                const child = <Route path='/:id' render={() => React.cloneElement(<NewChild />, {match: {params: {id}}, animate: true })} />
                this.setState(
                    {currentChild: child, newChild: this.props.children[0].component, path: newPath},
                    () => setTimeout(() => this.setState({currentChild: null}), 1000)
                );
            }
        }
    }

    render() {
        const { currentChild, newChild: NewChild } = this.state;
        
        return (
            <header className={styles.header}>
                {currentChild || <Route path='/:id' render={(props) => React.cloneElement(<NewChild />, { ...props, animate: false })} />}
            </header>
        );
    }
};

export default withRouter(Header);