import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getTopics } from '../api';

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
      <nav className="nav">
        <Link to="/" className="nav-btn">
          Home
        </Link>
        {topics.map((topic) => {
          return (
            <Link
              to={`/articles/${topic.slug}`}
              className="nav-btn"
              key={topic.slug}
            >
              {topic.slug}
            </Link>
          );
        })}
        {loggedIn ? (
          <h5>
            Online:{' '}
            <Link to={`/user/${username}`} className="nav-btn">
              {username}
            </Link>
          </h5>
        ) : null}
      </nav>
    );
  }
}

export default NavBar;
