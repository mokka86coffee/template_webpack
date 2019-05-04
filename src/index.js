import './index.scss'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import DevTools from 'mobx-react-devtools';
import { observable, decorate, configure, action, computed, autorun, runInAction, when, flow  } from 'mobx';
import { observer, Provider } from 'mobx-react';

import UsersStore from './stores/UsersStore'
import BirdsStore from './stores/BirdStore'

configure({ enforceActions: 'observed' })

ReactDOM.render(<Provider { ...{ UsersStore, BirdsStore } }><App/></Provider>, document.getElementById('root'));
