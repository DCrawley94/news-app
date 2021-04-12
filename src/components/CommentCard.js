import { Link } from '@reach/router';
import React, { Component } from 'react';
import { deleteComment } from '../api';
import Voter from './Voter';
import styles from './CommentCard.module.css';

class CommentCard extends Component {
  state = {
    deleted: false
  };

  handleDelete() {
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
        <div className={styles.commentCard}>
          <div className={styles.commentInfo}>
            <Link to={`/user/${author}`}>{author}</Link>
            <p>{created_at.slice(0, 10)}</p>
          </div>

          <p>{body}</p>
          <div className={styles.commentInteraction}>
            {loggedInUser === author ? (
              <button onClick={() => this.handleDelete()}>
                Delete Comment
              </button>
            ) : null}
            <Voter id={comment_id} votes={votes} type="comment" />
          </div>
        </div>
      );
    }
  }
}

export default CommentCard;
