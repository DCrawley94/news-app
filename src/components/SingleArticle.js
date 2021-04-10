import React, { Component } from 'react';
import { getSingleArticle } from '../api';
import Loader from './Loader';
import Title from './Title';
import ErrorPage from './ErrorPage';
import Voter from './Voter';
import AddComment from './AddComment';
import { Link } from '@reach/router';
import CommentList from './CommentList';

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

  addPostedComment = (newComment) => {
    this.setState((currState) => {
      return {
        comments: [newComment, ...currState.comments]
      };
    });
  };

  render() {
    const { loggedIn, username } = this.props;
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
      <main>
        <Title title={title} />
        <div className="article-info">
          <Link to={`/user/${author}`}>{author}</Link>
          <p>{created_at.slice(0, 10)}</p>
          <p>{topic}</p>
          <Voter id={article_id} votes={votes} type="article" />
        </div>
        <p>{body}</p>
        <p>{comment_count} comments</p>
        <AddComment
          loggedIn={loggedIn}
          username={username}
          article_id={article_id}
          addPostedComment={(newComment) => this.addPostedComment(newComment)}
        />
        <h3>Comments</h3>
        <CommentList
          username={username}
          article_id={article_id}
        />
      </main>
    );
  }
}

export default SingleArticle;
