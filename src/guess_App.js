import React from "react";
import cx from "classnames";

import styles from "./App.scss";

export default class App extends React.Component {
  state = {
    attempts: 0,
    title: "Main",
    pressed: "",
    hiddenWord: (Math.random() * 100000).toFixed(),
    word: ""
  };

  componentDidMount() {
    const { hiddenWord } = this.state;
    const word = Array(hiddenWord.length)
      .fill("-")
      .join("");
    this.setState({ word });
  }

  handleBtnPress = ({ target: { innerText: val } }) => {
    let { word, hiddenWord, title, attempts, pressed } = this.state;
    if (title !== "Main") {
      return;
    }

    if (attempts > 6) {
      this.setState({ title: "Game over" });
      return;
    }

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
    this.setState({
      word,
      title,
      attempts: attempts + 1,
      pressed: pressed.concat(val)
    });
  };
  render() {
    const {
      state: { word, hiddenWord, title, pressed },
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
              {title === "Main" ? (
                <Btns {...{ handleBtnPress, pressed }} />
              ) : null}
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

var Btns = React.memo(({ handleBtnPress, pressed }) => {
  const Btns = Array(10)
    .fill(0)
    .map((_, i) => (
      <button
        onClick={!pressed.includes(i) ? handleBtnPress : null}
        className={
          pressed.includes(i) ? cx(styles.btn, styles.btnD) : styles.btn
        }
        key={i}
      >
        {i}
      </button>
    ));

  return Btns;
});
