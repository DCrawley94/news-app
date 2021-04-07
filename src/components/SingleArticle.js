import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getSingleArticle } from '../api';
import Loader from './Loader';

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true
  };

  componentDidMount() {
    const { article_id } = this.props;
    this.getSingleArticle(article_id);
  }

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    if (article_id !== prevProps.article_id) {
      this.getSingleArticle(article_id);
    }
  }

  render() {
    const { isLoading } = this.state;
    const {
      author,
      body,
      comment_count,
      created_at,
      title,
      topic,
      votes
    } = this.state.article;
    console.log(typeof created_at);
    return isLoading ? (
      <Loader />
    ) : (
      <main>
        <h2>{title}</h2>
        <div class="article-info">
          <p>{author}</p>
          <p>{created_at.slice(0, 10)}</p>
          <p>{topic}</p>
          <p>{votes}</p>
        </div>
        <p>{body}</p>
        <p>{comment_count} comments</p>
      </main>
    );
  }

  getSingleArticle(article_id) {
    getSingleArticle(article_id).then((article) => {
      this.setState({ article: article, isLoading: false });
    });
  }
}

export default SingleArticle;
