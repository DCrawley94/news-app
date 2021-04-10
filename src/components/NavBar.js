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
    return (
      <nav className="nav">
        <Link to="/articles" className="nav-btn">
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
      </nav>
    );
  }
}

export default NavBar;
