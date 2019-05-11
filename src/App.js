import React, { Component, useState } from "react";
import axios from "axios";
import styles from "./App.scss";

class _App extends Component {
  state = { count: 0, todos: [] };

  async componentDidMount() {
    const fetched = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    this.setState({ todos: fetched.data });

    console.log(fetched.data);
  }

  setCount = () => {
    const { count } = this.state;
    this.setState(() => ({ count: count + 1 }));
  };

  render() {
    console.log("----------------");
    const {
      state: { count, todos },
      setCount
    } = this;
    return (
      <>
        <Header {...{ count }} />
        <Main {...{ setCount }} />
        <Hook />
        <Footer {...{ todos }} />
      </>
    );
  }
}

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  if (!todos.length) {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(({ data }) => setTodos(data));
  }

  return (
    <>
      <Header {...{ count }} />
      <Main setCount={() => setCount(count + 1)} />
      <Hook />
      <Footer {...{ todos }} />
    </>
  );
}

export default App;

var Header = React.memo(({ count }) => {
  console.log("Header rendered");
  return (
    <header>
      <h1>Header</h1>
      <p>
        Нажато
        {/(^|[^1])[2-4]$/.test(count + "") ? `${count} раза` : `${count} раз`}
      </p>
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

var Footer = React.memo(({ todos }) => {
  console.log("Footer rendered");
  return (
    <footer>
      <h3>Footer</h3>
      <table>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </footer>
  );
});

function Hook(props) {
  const [obj, fn] = useState({ count: 0, another: 0 });
  console.log("Hook rendered");

  return (
    <aside>
      <span>{obj.count}</span>
      <span>{obj.another}</span>
      <button
        onClick={() => fn({ count: obj.count + 1, another: obj.another - 1 })}
      >
        +1
      </button>
    </aside>
  );
}
