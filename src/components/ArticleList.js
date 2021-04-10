import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getArticles } from '../api';
import ErrorPage from './ErrorPage';
import Loader from './Loader';
import Sorter from './Sorter';

class ArticleList extends Component {
  state = {
    articles: {},
    isLoading: true,
    sort_by: null,
    err: null
  };

  componentDidMount() {
    const { topic, username } = this.props;
    const { sort_by } = this.state;

    this.getArticles(topic, sort_by, username);
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic, username } = this.props;
    const { sort_by } = this.state;
    if (topic !== prevProps.topic || prevState.sort_by !== sort_by) {
      this.getArticles(topic, sort_by, username);
    }
  }

  getArticles(topic, sort_by, username) {
    getArticles(topic, sort_by, username)
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

  handleChange = (option) => {
    this.setState({ sort_by: option });
  };

  render() {
    const { articles, isLoading, err } = this.state;
    const sortByOptions = [
      { name: 'Newest First', option: 'created_at' },
      { name: 'Popular', option: 'comment_count' },
      { name: 'Top Rated', option: 'votes' }
    ];
    return isLoading ? (
      <Loader />
    ) : err ? (
      <ErrorPage status={err.response.status} msg={err.response.data.msg} />
    ) : (
      <section className="article-list">
        <Sorter
          sortByOptions={sortByOptions}
          handleChange={(option) => this.handleChange(option)}
        />
        <ul>
          {articles.map((article) => {
            const {
              article_id,
              title,
              created_at,
              votes,
              comment_count,
              author
            } = article;
            return (
              <li className="article-card" key={article_id}>
                <Link to={`/articles/article/${article_id}`}>{title}</Link>

                <p>{created_at.slice(0, 10)}</p>
                <Link to={`/user/${author}`}>{author}</Link>
                <p>{comment_count} comments</p>
                <p>{votes} votes</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ArticleList;
