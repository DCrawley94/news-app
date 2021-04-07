import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getArticles } from '../api';
import Loader from './Loader';
import Title from './Title';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  componentDidMount() {
    const { topic } = this.props;
    this.getArticles(topic);
  }

  componentDidUpdate(prevProps) {
    const { topic } = this.props;
    if (topic !== prevProps.topic) {
      this.getArticles(topic);
    }
  }

  render() {
    const { articles, isLoading } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <section className="article-list">
        <Title title={this.props.topic} />
        {articles.map((article) => {
          const { article_id, title, created_at } = article;
          return (
            <div className="article-card" key={article_id}>
              <Link to={`/articles/${article_id}`}> {title}</Link>
              <p>{created_at.slice(0, 10)}</p>
            </div>
          );
        })}
      </section>
    );
  }

  getArticles(topic) {
    getArticles(topic).then((articles) => {
      this.setState({
        articles: articles,
        isLoading: false
      });
    });
  }
}

export default ArticleList;
