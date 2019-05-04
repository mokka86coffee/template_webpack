import './index.scss'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import DevTools from 'mobx-react-devtools';
import { observable, decorate, configure, action, computed, autorun, runInAction, when, flow  } from 'mobx';
import { observer, Provider } from 'mobx-react';

configure({ enforceActions: 'observed' })



ReactDOM.render(<Provider><App store={ appStore } /></Provider>, document.getElementById('root'));
