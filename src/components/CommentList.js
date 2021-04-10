import React, { Component } from 'react';
import CommentCard from './CommentCard';
import Sorter from './Sorter';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import { getSingleArticleComments } from '../api';

class CommentList extends Component {
  state = {
    comments: {},
    isLoading: true,
    err: null
  };

  componentDidMount() {
    const { article_id } = this.props;
    getSingleArticleComments(article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err, isLoading: false });
      });
  }

  render() {
    const { username } = this.props;
    const { comments, err, isLoading } = this.state;
    const sortByOptions = [
      { name: 'Newest First', option: 'created_at' },
      { name: 'Top Rated', option: 'votes' }
    ];

    if (isLoading) {
      return <Loader />;
    }

    if (err) {
      const { status, statusText } = err.response;
      return <ErrorPage status={status} msg={statusText} />;
    }

    return (
      <section className="comment-list">
        <Sorter
          sortByOptions={sortByOptions}
          handleChange={(option) => {
            console.log(option);
          }}
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
                  username={username}
                  comment_id={comment_id}
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
