import React, { Component } from 'react';
import { postComment } from '../api';

class AddComment extends Component {
  state = {
    commentBody: ''
  };

  componentDidUpdate (prevState) {
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
      });
  }

  render() {
    const { loggedIn } = this.props;
    const {commentBody} = this.state
    if (loggedIn) {
      return (
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>
            Share Your Thoughts!
            <input
              value = {commentBody}
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
