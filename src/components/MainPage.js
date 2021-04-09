import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getArticles } from '../api';
import ArticleList from './ArticleList';
import Loader from './Loader';
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

  handleChange(sort_by) {
    this.setState({ sort_by });
  }

  render() {
    const { articles, isLoading } = this.state;
    const { loggedIn, username, topic } = this.props;

    console.log(loggedIn, username);

    return isLoading ? (
      <Loader />
    ) : (
      <section className="main-page">
        <Title title={topic} />

        <div className="sort-options">
          <h5>Sort By:</h5>
          <button onClick={() => this.handleChange('created_at')}>
            Most Recent
          </button>
          <button onClick={() => this.handleChange('comment_count')}>
            Popular
          </button>
          <button onClick={() => this.handleChange('votes')}>Top Rated</button>
        </div>
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
