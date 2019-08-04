import React, { useState } from 'react';
import Header from './components/header';
import {Link, Route, Switch} from 'react-router-dom';
import styles from './components/header/header.scss';
import cx from 'classnames';

const titles = [
    'Gypsum 3D Wall Panels',
    'Gypsum 3D Panno',
    'Swarovski Crystals',
    'Condominium Size'
];

const RouteRender = (props) => {
    // console.log("TCL: RouteRender -> props", props);
    const { id } = props.match.params;
    const title = titles[id] || 'Nothing';
    return (
        <React.Fragment>
            <span 
                className={cx(styles.fontDigit, { 
                    [styles['fontDigit--animate-start']]: props.animate 
                })}
            >
                {`0${id || '-'}`}
            </span>
            <span 
                className={cx(styles.fontTitle, { 
                    [styles['fontTitle--animate-start']]: props.animate 
                })}
            >
                {title}
            </span>
        </React.Fragment>
    );
}

const App = () => {
    return (
        <React.Fragment>
            <Link
                style={{position: 'absolute', top: 30, left: 30, zIndex: 1}}
                to={`${(Math.random() * 10).toFixed()}`}
            >
                Перейти
            </Link>
            <Header>
                {[{ path: '/:id', component: RouteRender }]}
            </Header>
        </React.Fragment>
    )
}

export default App;