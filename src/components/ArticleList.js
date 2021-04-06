import React, { Component } from 'react';
import { getArticles } from '../api';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
  };

  componentDidMount() {
    getArticles().then((articles) => {
      this.setState({ articles });
    });
  }
  render() {
    const { articles } = this.state;
    return (
      <section className="article-list">
        {articles.map((article) => {
          return (
            <div className="article-card" key={article.article_id}>
              <p> {article.title}</p>
              <p>{article.created_at.slice(0, 10)}</p>
            </div>
          );
        })}
      </section>
    );
  }
}

export default ArticleList;
