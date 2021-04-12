import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getSingleArticle } from '../api';
import Loader from './Loader';
import Title from './Title';
import ErrorPage from './ErrorPage';
import Voter from './Voter';
import CommentList from './CommentList';
import styles from './SingleArticle.module.css';

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null
  };

  componentDidMount() {
    const { article_id } = this.props;
    getSingleArticle(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      this.getSingleArticlePage(article_id);
    }
  }

  render() {
    const { loggedIn, loggedInUser } = this.props;
    const { isLoading, err, article } = this.state;
    const {
      article_id,
      author,
      body,
      comment_count,
      created_at,
      title,
      topic,
      votes
    } = article;

    if (isLoading) {
      return <Loader />;
    }

    if (err) {
      const { status, statusText } = err.response;
      return <ErrorPage status={status} msg={statusText} />;
    }

    return (
      <main className={styles.articleMain}>
        <Title title={title} />

        <div className={styles.articleInfo}>
          <Link to={`/user/${author}`} className={styles.authorLink}>
            {author}
          </Link>
          <p>{created_at.slice(0, 10)}</p>
          <p>{topic}</p>
        </div>

        <div className={styles.articleBody}>
          <p>{body}</p>
        </div>

        <div className={styles.articleInteraction}>
          <Voter id={article_id} votes={votes} type="article" />
        </div>

        <CommentList
          loggedIn={loggedIn}
          comment_count={comment_count}
          loggedInUser={loggedInUser}
          article_id={article_id}
          type="article"
        />
      </main>
    );
  }
}

export default SingleArticle;
