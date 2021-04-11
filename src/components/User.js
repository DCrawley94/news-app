import React, { Component } from 'react';
import { getUser } from '../api';
import ArticleList from './ArticleList';
import ErrorPage from './ErrorPage';
import Loader from './Loader';

class User extends Component {
  state = {
    user: {},
    isLoading: true,
    err: null
  };

  componentDidMount() {
    const { username } = this.props;
    getUser(username)
      .then((user) => {
        this.setState({ user, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  }

  componentDidUpdate(prevProps) {
    const { username } = this.props;
    if (username !== prevProps.username) {
      getUser(username).then((user) => {
        this.setState({ user });
      });
    }
  }

  render() {
    const { user, isLoading, err } = this.state;
    const { avatar_url, username, name } = user;
    return isLoading ? (
      <Loader />
    ) : err ? (
      <ErrorPage status={err.response.status} msg={err.response.data.msg} />
    ) : (
      <main>
        <h1> {username}'s Profile Page</h1>
        <img src={avatar_url} alt={`${username}'s avatar`} />
        <p>{name}</p>
        <ArticleList username={username} />
      </main>
    );
  }
}

export default User;
