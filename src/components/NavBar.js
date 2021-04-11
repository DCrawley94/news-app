import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getTopics } from '../api';
import styles from './NavBar.module.css';

class NavBar extends Component {
  state = {
    topics: []
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  render() {
    const { topics } = this.state;
    const { loggedIn, username } = this.props;
    return (
      <nav className={styles.nav}>
        <Link to="/" className={styles.navBtn}>
          Home
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              to={`/articles/${topic.slug}`}
              className={styles.navBtn}
              key={topic.slug}
            >
              {topic.slug}
            </Link>
          );
        })}
        {loggedIn ? (
          <h5>
            Online:{' '}
            <Link to={`/user/${username}`} className={styles.navBtnUser}>
              {username}
            </Link>
            <div className={styles.loggedIn}>●</div>
          </h5>
        ) : null}
      </nav>
    );
  }
}

export default NavBar;
