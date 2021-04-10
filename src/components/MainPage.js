import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleList from './ArticleList';
import ErrorPage from './ErrorPage';
import Loader from './Loader';
import Sorter from './Sorter';
import Title from './Title';

class MainPage extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: '',
    err: null
  };

  componentDidMount() {
    const { topic } = this.props;
    this.getArticles(topic);
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sort_by } = this.state;
    if (topic !== prevProps.topic || prevState.sort_by !== sort_by) {
      this.getArticles(topic, sort_by);
    }
  }

  handleChange = (option) => {
    this.setState({ sort_by: option });
  };

  render() {
    const { articles, isLoading, err } = this.state;
    const { loggedIn, username, topic } = this.props;
    const sortByOptions = [
      { name: 'Newest First', option: 'created_at' },
      { name: 'Popular', option: 'comment_count' },
      { name: 'Top Rated', option: 'votes' }
    ];
    return isLoading ? (
      <Loader />
    ) : err ? (
      <ErrorPage status={404} msg={err.response.data.msg} />
    ) : (
      <section className="main-page">
        <Title title={topic} />
        <Sorter
          sortByOptions={sortByOptions}
          handleChange={(option) => this.handleChange(option)}
        />
        <ArticleList articles={articles} />
      </section>
    );
  }

  getArticles(topic, sort_by) {
    getArticles(topic, sort_by)
      .then((articles) => {
        this.setState({
          articles: articles,
          isLoading: false
        });
      })
      .catch((err) => {
        this.setState({ err: err, isLoading: false });
      });
  }
}

export default MainPage;
