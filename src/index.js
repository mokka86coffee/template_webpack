import './index.scss'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observable, decorate, configure, action, computed } from 'mobx';
import { observer } from 'mobx-react';

configure({ enforceActions: 'observed' })

const counterState = observable({
  count: 0,

  increment() {
    this.count++
  },

  decrement() {
    this.count--
  },

  get getCounter(){
    return this.count
  }
  
},{
  increment: action,
  decrement: action,
  getCounter: computed
});

@observer class Counter extends Component {

  handleIncrement = () => this.props.store.increment()
  handleDecrement = () => this.props.store.decrement()

  render() {
      return (
      <div className="App">
          <DevTools />
          <h1>{this.props.store.getCounter}</h1>
          <button onClick={this.handleDecrement}>-1</button>
          <button onClick={this.handleIncrement}>+1</button>
      </div>
      );
  }
}

ReactDOM.render(<Counter store={ counterState } />, document.getElementById('root'));
