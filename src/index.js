import './index.scss'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observable, decorate, configure, action, computed, autorun, runInAction, when  } from 'mobx';
import { observer } from 'mobx-react';

configure({ enforceActions: 'observed' })

class counterState {
  count = 0
  fromFetch = []

  increment() {
    this.count++
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
  
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then( data => data.json() )
  .then( data => console.log(data) )
},{
  name: 'autorun first one',
  delay: 3000
})

when(
  () => appStore.count > 5,
  () => console.log('when worked')
)

@observer class Counter extends Component {

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
          <button onClick={this.handleDecrement}>-1</button>
          <button onClick={this.handleIncrement}>+1</button>
          <h2>{ this.state.insideCounter }</h2>
          <button onClick={this.handleIncrementWOStore}>+1</button>
      </div>
      );
  }
}

ReactDOM.render(<Counter store={ appStore } />, document.getElementById('root'));
