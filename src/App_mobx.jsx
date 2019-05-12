import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import styles from "./App.scss";

class App extends Component {
  componentDidMount() {
    this.props.UsersStore.fetchUsers();
  }

  render() {
    const { getUserInfo } = this.props.UsersStore;
    const { getBirds } = this.props.BirdsStore;

    if (!getUserInfo.length) return <div>nothing to display</div>;

    return (
      <div>
        {getUserInfo.map(user => (
          <div key={user.id}>
            <p className={styles.active}>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <hr />
          </div>
        ))}
        {getBirds.map(bird => (
          <div key={bird}>
            <p>Bird: {bird}</p>
          </div>
        ))}
      </div>
    );
  }
}

// @inject('appUsersStore')
// @observer
export default inject("UsersStore", "BirdsStore")(observer(App));
