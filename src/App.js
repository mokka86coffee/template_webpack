import uuidv4 from "uuid/v4";
import React, { Component, useState } from "react";
import "./App.css";

function Comp() {
  const [smth, smthFn] = useState(0);
  const [smth2, smthFn2] = useState(0);
  const onClick = () => {
    smthFn(smth + 1);
    smthFn2(smth2 + 1);
  };
  return <App {...{ smth, smth2, onClick }} />;
}

class App extends Component {
  state = {
    smth: 0,
    smth2: 0,
    smthState: 0
  };

  static getDerivedStateFromProps(props, state) {
    console.table("state - ", state);
    console.table("props - ", props);
    const { smth } = state;
    const { a } = state;

    return props.smth !== 2 ? { smth: props.smth } : null;
  }

  onClk = () => {
    const { onClick } = this.props;
    onClick();
    this.setState({ smthState: this.state.smthState + 1 });
  };

  render() {
    const { smth, smth2, smthState } = this.state;

    const arr = Array(11).fill(0);
    return arr.map(_ => (
      <div key={uuidv4()}>
        <button onClick={this.onClk}>{smth}</button>
        <button>{smth2}</button>
        <button>{smthState}</button>
      </div>
    ));
  }
}

export default Comp;
