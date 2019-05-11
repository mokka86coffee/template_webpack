import React, { Component } from "react";

import styles from "./App.scss";

const App = () => {
  return React.createElement(
    "div",
    {
      id: "id",
      onClick: () => console.log(this)
    },
    [
      React.createElement("h1", { key: 1 }, "New app"),
      React.createElement("h2", { key: 2 }, "New app"),
      React.createElement("h2", { key: 3 }, "New app")
    ]
  );
};

export default App;
