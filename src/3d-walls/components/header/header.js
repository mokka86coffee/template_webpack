import React, { useState, useEffect } from 'react';
import styles from './header.scss';
import cx from 'classnames';
import {withRouter, Route} from 'react-router-dom';

class Header extends React.Component {
    state = {
        currentChild: null,
        newChild: this.props.children[0].component,
        animate: false,
        path: this.props.location.pathname
    }

    componentDidUpdate() {
        const { pathname: newPath } = this.props.location;
        const { params: { id } } = this.props.match;
        const {currentChild, newChild: NewChild, path: currentPath} = this.state;
        
        if (currentPath !== newPath) {
            if (!currentChild) {
                console.log('Компонент отлетел')
                const child = <Route path='/:id' render={() => React.cloneElement(<NewChild />, {match: {params: {id}}, animate: true })} />
                this.setState(
                    {currentChild: child, newChild: this.props.children[0].component, path: newPath},
                    () => setTimeout(() => (console.log('Компонент прилетел') || this.setState({currentChild: null, animate: false})), 1000)
                );
            }
        }
    }

    render() {
        const { currentChild, newChild: NewChild, animate } = this.state;
        
        return (
            <header className={styles.header}>
                {currentChild || <Route path='/:id' render={(props) => React.cloneElement(<NewChild />, { ...props, animate })} />}
            </header>
        );
    }
};

export default withRouter(Header);