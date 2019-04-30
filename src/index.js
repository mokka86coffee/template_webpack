import './index.scss'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observable, decorate } from 'mobx';
import { observer } from 'mobx-react';

const counterState = observable({
  count: 0,
});

counterState.increment = function() {
  this.count++
}

counterState.decrement = function() {
  this.count--
}

@observer class Counter extends Component {

    @observable count = 0;

    handleIncrement = () => { this.count++ };
    handleDecrement = () => { this.count-- };

    render() {
        return (
        <div className="App">
            <DevTools />
            <h1>{this.count}</h1>
            <button onClick={this.handleDecrement}>-1</button>
            <button onClick={this.handleIncrement}>+1</button>
        </div>
        );
    }
}

ReactDOM.render(<Counter store={ counterState } />, document.getElementById('root'));
