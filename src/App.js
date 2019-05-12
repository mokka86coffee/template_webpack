import React from "react";

import styles from "./App.scss";

export default class App extends React.Component {
  state = {
    attempts: 0,
    title: "Main",
    hiddenWord: (Math.random() * 100000).toFixed(),
    word: null
  };

  componentDidMount() {
    const { hiddenWord } = this.state;
    const word = Array(hiddenWord.length)
      .fill("-")
      .join("");
    this.setState({ word });
  }

  handleBtnPress = ({ target: { innerText: val } }) => {
    let { word, hiddenWord, title } = this.state;
    if (hiddenWord.includes(val)) {
      word = word
        .split("")
        .reduce(
          (r, _, i) =>
            hiddenWord[i] === val ? r.concat(val) : r.concat(word[i]),
          ""
        );
    }
    title = word.includes("-") ? title : "You're the winner!";
    this.setState({ word, title });
  };
  render() {
    const {
      state: { word, hiddenWord, title },
      handleBtnPress
    } = this;
    console.log(hiddenWord);
    return (
      <div className={styles.grid}>
        <header>
          <span>header</span>
        </header>
        <aside>
          <span>aside</span>
        </aside>
        <main>
          <span>{title}</span>
          <div className="puzzle">
            <div className="puzzle__word">{word}</div>
            <div className="puzzle__buttons">
              <Btns {...{ handleBtnPress }} />
            </div>
          </div>
        </main>
        <footer>
          <span>footer</span>
        </footer>
      </div>
    );
  }
}

var Btns = React.memo(({ handleBtnPress }) => {
  console.log("Btns rendered");
  const Btns = Array(10)
    .fill(0)
    .map((_, i) => (
      <button onClick={handleBtnPress} className={styles.btn} key={i}>
        {i}
      </button>
    ));

  return Btns;
});
