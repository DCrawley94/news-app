import React, { Component } from 'react';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  componentDidMount() {
    console.log('mounto');
  }
  render() {
    return (
      <div className="content">
        <p> Article</p>
        <p> Article</p>
        <p> Article</p>
      </div>
    );
  }
}

export default ArticleList;
