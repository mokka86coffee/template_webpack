import uuidv4 from "uuid/v4";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    const arr = Array(100).fill("letter");
    return arr.map(_ => <p key={uuidv4()}>{_}</p>);
  }
}
