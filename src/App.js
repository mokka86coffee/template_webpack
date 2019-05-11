import React, { Component } from "react";

import styles from "./App.scss";

class App extends Component {
  state = { count: 0 };

  setCount = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };

  render() {
    const {
      state: { count },
      setCount
    } = this;
    return (
      <>
        <Header {...{ count }} />
        <Main {...{ setCount }} />
        <Footer />
      </>
    );
  }
}

export default App;

class Header extends React.PureComponent {
  render() {
    console.log("Header rendered");
    return (
      <header>
        <h1>Header</h1>
        <p> Нажато {this.props.count} раз</p>
      </header>
    );
  }
}

class Main extends React.PureComponent {
  render() {
    console.log("Main rendered");
    return (
      <main>
        <h2>Main</h2>
        <button onClick={this.props.setCount}>+1</button>
      </main>
    );
  }
}

class Footer extends React.PureComponent {
  render() {
    console.log("Footer rendered");
    return (
      <footer>
        <h3>Footer</h3>
      </footer>
    );
  }
}
