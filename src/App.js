import React, { Component, useState } from "react";
import axios from "axios";
import styles from "./App.scss";

class App extends Component {
  state = { count: 0, todos: [] };

  async componentDidMount() {
    const fetched = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    this.setState({ todos: fetched.data });

    // console.table(fetched.data);
  }

  setCount = () => {
    const { count } = this.state;
    this.setState(() => ({ count: count + 1 }));
  };

  render() {
    console.log("----------------");
    const {
      state: { count },
      setCount
    } = this;
    return (
      <>
        <Header {...{ count }} />
        <Main {...{ setCount }} />
        <Hook />
        <Footer />
      </>
    );
  }
}

export default App;

var Header = React.memo(({ count }) => {
  console.log("Header rendered");
  return (
    <header>
      <h1>Header</h1>
      <p> Нажато {count} раз</p>
    </header>
  );
});

var Main = React.memo(({ setCount }) => {
  console.log("Main rendered");
  return (
    <main>
      <h2>Main</h2>
      <button onClick={setCount}>+1</button>
    </main>
  );
});

var Footer = React.memo(() => {
  console.log("Footer rendered");
  return (
    <footer>
      <h3>Footer</h3>
    </footer>
  );
});

function Hook(props) {
  const [count, setCount] = useState(0);
  console.log("Hook rendered");

  return (
    <aside>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </aside>
  );
}
