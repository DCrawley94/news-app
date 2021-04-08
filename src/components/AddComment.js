import React, { Component } from 'react';

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

  render() {
    const { loggedIn, username, article_id, commentBody } = this.state;
    if (loggedIn) {
      return (
        <form>
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
