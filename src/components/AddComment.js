import React, { Component } from 'react';
import { postComment } from '../api';

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
    const { loggedInUser, article_id, addPostedComment } = this.props;
    const { commentBody } = this.state;
    const commentToPost = {
      username: loggedInUser,
      body: commentBody
    };

    postComment(article_id, commentToPost)
      .then((newComment) => {
        this.setState({ commentBody: '' });
        addPostedComment(newComment);
      })
      .catch((err) => {
        this.setState({ err });
      });
  }

  render() {
    const { loggedIn } = this.props;
    const { commentBody, err } = this.state;

    if (err) return <h4>Cannot Post Comments At This Time</h4>;
    if (loggedIn) {
      return (
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>
            Share Your Thoughts!
            <input
              value={commentBody}
              type="text"
              id="commentBody"
              onChange={(event) => this.handleChange(event)}
              placeholder="Post your comment ..."
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    } else {
      return <div></div>;
    }
  }
}

export default AddComment;
