import React, { Component } from 'react';

import styles from './App.scss';

const App = () => {
    return React.createElement(
        'div',
        {
            id: 'id',
            onClick: () => console.log(this)
        },
        React.createElement('h1',{},'New app')
    );
}

export default App;