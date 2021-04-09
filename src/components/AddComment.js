import React, { Component } from 'react';
import { postComment } from '../api';

class AddComment extends Component {
  state = {
    loggedIn: false,
    username: '',
    article_id: null,
    commentBody: ''
  };

  componentDidMount() {
    const { loggedIn, username, article_id } = this.props;
    this.setState({ loggedIn, username, article_id });
  }

  handleChange(event) {
    const commentBody = event.target.value;
    console.log(commentBody, 'handling change');
    this.setState({ commentBody: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { commentBody, username, article_id } = this.state;
    const commentToPost = {
      username: username,
      body: commentBody
    };
    postComment(article_id, commentToPost).then((newComment) => {
      this.setState({ commentBody: '' });
    });
  }

  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>
            Share Your Thoughts!
            <input
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
