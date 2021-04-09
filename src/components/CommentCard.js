import React, { Component } from 'react';
import { deleteComment } from '../api';

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
    const { body, author, votes, created_at, username } = this.props;
    const { deleted } = this.state;

    if (deleted) {
      return <h4>Comment Successfully Deleted</h4>;
    } else {
      return (
        <div className="comment-card">
          <h5>{author}</h5>
          <p>{created_at.slice(0, 10)}</p>
          <p>Votes: {votes}</p>
          <p>{body}</p>
          {username === author ? (
            <button onClick={() => this.handleDelete()}>Delete Comment</button>
          ) : null}
        </div>
      );
    }
  }
}

export default CommentCard;
