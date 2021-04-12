import React, { Component } from 'react';
import { postComment } from '../api';
import styles from './AddComment.module.css';

class AddComment extends Component {
  state = {
    commentBody: '',
    err: null
  };

  componentDidUpdate(prevState) {
    if (prevState.commentBody !== this.state.commentBody) {
    }
  }
  handleChange(event) {
    this.setState({ commentBody: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, article_id, addPostedComment } = this.props;
    const { commentBody } = this.state;
    const commentToPost = {
      username: username,
      body: commentBody
    };

    postComment(article_id, commentToPost)
      .then((newComment) => {
        this.setState({ commentBody: '' });
        addPostedComment(newComment);
      })
      .catch((err) => {
        console.dir(err);
        this.setState({ err });
      });
  }

  render() {
    const { loggedIn } = this.props;
    const { commentBody, err } = this.state;

    if (err) return <h4>Sorry! You Cannot Post Comments At This Time</h4>;
    if (loggedIn) {
      return (
        <form
          onSubmit={(event) => this.handleSubmit(event)}
          className={styles.commentForm}
        >
          <label htmlFor="commentBody" className={styles.commentFormLabel}>
            Add Comment
          </label>
          <input
            value={commentBody}
            type="text"
            id="commentBody"
            onChange={(event) => this.handleChange(event)}
            placeholder="Post your comment ..."
            className={styles.commentFormInput}
          />

          <input
            type="submit"
            value="Submit"
            className={styles.commentFormSubmit}
          />
        </form>
      );
    } else {
      return <h4> You Need To Log In To Post A Comment!</h4>;
    }
  }
}

export default AddComment;
