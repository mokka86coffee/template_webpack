import './index.scss'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

import DevTools from 'mobx-react-devtools';
import { observable, decorate, configure, action, computed, autorun, runInAction, when  } from 'mobx';
import { observer } from 'mobx-react';

configure({ enforceActions: 'observed' })

class counterState {
  count = 0
  fromFetch = []

  async increment () {
    this.count++
    let result = await axios('https://jsonplaceholder.typicode.com/todos')
    console.log(result.data)
    this.fromFetch = result.data
  }

  decrement() {
    this.count--
  }

  get getCounter(){
    return this.count
  }
  
}

const store = decorate(counterState,{
  count: observable,
  increment: action,
  decrement: action,
  getCounter: computed
})

const appStore = new store()

autorun(reaction => {
  console.log(appStore.count)
  console.log('in autorun')
  
},{
  name: 'autorun first one',
  delay: 3000
})

when(
  () => appStore.count > 5,
  () => console.log('when worked')
)

@observer 
class Counter extends Component {

  state = {
    insideCounter: 0
  }

  handleIncrement = () => this.props.store.increment()
  handleDecrement = () => this.props.store.decrement()

  componentDidMount(){
  }

  handleIncrementWOStore = () => this.setState({ insideCounter: this.state.insideCounter + 1 })

  render() {
      return (
      <div className="App">
        <DevTools />
        <h1>{this.props.store.getCounter}</h1>
        <h2>{ this.props.store.fromFetch.length ? this.props.store.fromFetch[0].title : 'waiting...' }</h2>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
        <h2>{ this.state.insideCounter }</h2>
        <button onClick={this.handleIncrementWOStore}>+1</button>
      </div>
      );
  }
}

ReactDOM.render(<Counter store={ appStore } />, document.getElementById('root'));
