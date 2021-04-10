import { Link } from '@reach/router';
import React, { Component } from 'react';
import { deleteComment } from '../api';
import Voter from './Voter';

class CommentCard extends Component {
  state = {
    deleted: false
  };

  handleDelete() {
    console.log('DELET THIS');
    deleteComment(this.props.comment_id).then(() => {
      this.setState({ deleted: true });
    });
  }

  render() {
    const {
      body,
      author,
      votes,
      created_at,
      loggedInUser,
      comment_id
    } = this.props;
    const { deleted } = this.state;

    if (deleted) {
      return <h4>Comment Successfully Deleted</h4>;
    } else {
      return (
        <div className="comment-card">
          <Link to={`/user/${author}`}>{author}</Link>
          <p>{created_at.slice(0, 10)}</p>
          <p>Votes: {votes}</p>
          <p>{body}</p>
          {loggedInUser === author ? (
            <button onClick={() => this.handleDelete()}>Delete Comment</button>
          ) : null}
          <Voter id={comment_id} votes={votes} type="comment" />
        </div>
      );
    }
  }
}

export default CommentCard;
