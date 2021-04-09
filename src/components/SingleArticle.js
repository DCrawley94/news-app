import React, { Component } from 'react';
import { getSingleArticle, getSingleArticleComments } from '../api';
import Loader from './Loader';
import Title from './Title';
import ErrorPage from './ErrorPage';
import CommentCard from './CommentCard';
import Voter from './Voter';
import AddComment from './AddComment';

class SingleArticle extends Component {
  state = {
    article: {},
    comments: {},
    isLoading: true,
    err: null,
    loggedIn: true,
    username: 'tickle122'
  };

  componentDidMount() {
    const { article_id } = this.props;
    Promise.all([
      getSingleArticle(article_id),
      getSingleArticleComments(article_id)
    ])
      .then(([article, comments]) => {
        this.setState({ article, comments, isLoading: false });
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

  addPostedComment = (newComment) => {
    this.setState((currState) => {
      return {
        comments: [newComment, ...currState.comments]
      };
    });
  };

  render() {
    const {
      isLoading,
      err,
      comments,
      article,
      loggedIn,
      username
    } = this.state;
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
    } else {
      return (
        <main>
          <Title title={title} />
          <div className="article-info">
            <p>{author}</p>
            <p>{created_at.slice(0, 10)}</p>
            <p>{topic}</p>
            <Voter article_id={article_id} votes={votes} />
          </div>
          <p>{body}</p>
          <p>{comment_count} comments</p>
          <AddComment
            loggedIn={loggedIn}
            username={username}
            article_id={article_id}
            addPostedComment={(newComment) => this.addPostedComment(newComment)}
          />
          <ul className="comment-list">
            {comments.map(({ author, created_at, votes, body, comment_id }) => {
              return (
                <li key={comment_id} className="comment-card">
                  <CommentCard
                    author={author}
                    created_at={created_at}
                    votes={votes}
                    body={body}
                    username={username}
                  />
                </li>
              );
            })}
          </ul>
        </main>
      );
    }
  }
}

export default SingleArticle;
