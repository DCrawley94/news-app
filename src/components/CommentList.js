import React, { Component } from 'react';
import CommentCard from './CommentCard';
import Sorter from './Sorter';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import AddComment from './AddComment';
import { getComments } from '../api';

class CommentList extends Component {
  state = {
    comments: {},
    isLoading: true,
    err: null,
    sort_by: null
  };

  componentDidMount() {
    const { article_id } = this.props;
    const { sort_by } = this.state;
    this.fetchComments(article_id, sort_by);
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    const { sort_by } = this.state;
    if (article_id !== prevProps.article_id || sort_by !== prevState.sort_by) {
      this.fetchComments(article_id, sort_by);
    }
  }

  fetchComments(article_id, sort_by) {
    getComments(article_id, sort_by)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  }

  addPostedComment = (newComment) => {
    console.log(newComment);
    this.setState((currState) => {
      console.log(currState);
      return {
        comments: [newComment, ...currState.comments]
      };
    });
  };

  handleChange = (option) => {
    this.setState({ sort_by: option });
  };

  render() {
    const { loggedIn, loggedInUser, comment_count, article_id } = this.props;
    const { comments, err, isLoading } = this.state;
    const sortByOptions = [
      { name: 'Newest First', option: 'created_at' },
      { name: 'Top Rated', option: 'votes' }
    ];

    return isLoading ? (
      <Loader />
    ) : err ? (
      <ErrorPage status={err.response.status} msg={err.response.data.msg} />
    ) : (
      <section className="comment-list">
        <AddComment
          loggedIn={loggedIn}
          username={loggedInUser}
          article_id={article_id}
          addPostedComment={(newComment) => this.addPostedComment(newComment)}
        />

        <p>{comment_count} Comments</p>

        <Sorter
          sortByOptions={sortByOptions}
          handleChange={(option) => this.handleChange(option)}
        />

        <ul>
          {comments.map(({ author, created_at, votes, body, comment_id }) => {
            return (
              <li key={comment_id} className="comment-card">
                <CommentCard
                  author={author}
                  created_at={created_at}
                  votes={votes}
                  body={body}
                  comment_id={comment_id}
                  loggedInUser={loggedInUser}
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default CommentList;
