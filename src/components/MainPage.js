import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleList from './ArticleList';
import Loader from './Loader';
import Sorter from './Sorter';
import Title from './Title';

class MainPage extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: ''
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
    const { articles, isLoading } = this.state;
    const { loggedIn, username, topic } = this.props;
    const sortByOptions = ['created_at', 'comment_count', 'votes'];

    return isLoading ? (
      <Loader />
    ) : (
      <section className="main-page">
        <Title title={topic} />
        <Sorter
          sortByOptions={sortByOptions}
          handleChange={(e, option) => this.handleChange(e, option)}
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
        console.dir(err);
      });
  }
}

export default MainPage;
