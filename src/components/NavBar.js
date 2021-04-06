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
        <Link to="/" className="nav-btn">
          Home
        </Link>
        {topics.map((topic) => {
          return (
            <Link to={`/${topic.slug}`} className="nav-btn">
              {topic.slug}
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default NavBar;
