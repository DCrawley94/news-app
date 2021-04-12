import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getArticles } from '../api';
import ErrorPage from './ErrorPage';
import Loader from './Loader';
import Sorter from './Sorter';
import styles from './ArticleList.module.css';

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
        <ul className={styles.articleList}>
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
              <li className={styles.articleCard} key={article_id}>
                <div className={styles.articleCardTitle}>
                  <Link
                    to={`/articles/article/${article_id}`}
                    className={styles.articleLink}
                  >
                    <p>{title}</p>
                  </Link>
                </div>
                <div className={styles.articleCardInfo}>
                  <div className={styles.articleCardDetails}>
                    <Link to={`/user/${author}`} className={styles.authorLink}>
                      {author}
                    </Link>
                    <p>{created_at.slice(0, 10)}</p>
                  </div>
                  <div className={styles.articleCardStats}>
                    <p>{comment_count} comments</p>
                    <p>{votes} votes</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default ArticleList;
