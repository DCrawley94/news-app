import React, { Component } from 'react';
import { getSingleArticlePage } from '../api';
import Loader from './Loader';
import Title from './Title';
import ErrorPage from './ErrorPage';
import CommentCard from './CommentCard';

class SingleArticle extends Component {
  state = {
    article: {},
    comments: {},
    isLoading: true,
    err: null
  };

  componentDidMount() {
    const { article_id } = this.props;
    this.getSingleArticlePage(article_id);
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      this.getSingleArticlePage(article_id);
    }
  }

  render() {
    const { isLoading, err, comments, article } = this.state;
    const {
      //   article_id,
      author,
      body,
      comment_count,
      created_at,
      title,
      topic,
      votes
    } = article;

    if (isLoading) return <Loader />;
    else if (err) {
      const {
        response: { status },
        response: { statusText }
      } = err;
      return <ErrorPage status={status} msg={statusText} />;
    } else {
      return (
        <main>
          <Title title={title} />
          <div className="article-info">
            <p>{author}</p>
            <p>{created_at.slice(0, 10)}</p>
            <p>{topic}</p>
            <p>{votes}</p>
          </div>
          <p>{body}</p>
          <p>{comment_count} comments</p>
          <ul className="comment-list">
            {comments.map(({ author, created_at, votes, body }) => {
              return (
                <li className="comment-card">
                  <CommentCard
                    author={author}
                    created_at={created_at}
                    votes={votes}
                    body={body}
                  />
                </li>
              );
            })}
          </ul>
        </main>
      );
    }
  }

  getSingleArticlePage(article_id) {
    getSingleArticlePage(article_id)
      .then(({ article, comments }) => {
        this.setState({ article, comments, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  }
}

export default SingleArticle;
