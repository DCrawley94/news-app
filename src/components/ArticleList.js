import { Link } from '@reach/router';
import React, { Component } from 'react';
import { getArticles } from '../api';
import Loader from './Loader';
import Title from './Title';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: ''
  };

  componentDidMount() {
    const { topic } = this.props;
    this.getArticles(topic);
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sort_by } = this.state;
    if (topic !== prevProps.topic || prevState.sort_by !== sort_by) {
      this.getArticles(topic, sort_by);
    }
  }

  handleChange(sort_by) {
    this.setState({ sort_by });
  }

  render() {
    const { articles, isLoading } = this.state;

    return isLoading ? (
      <Loader />
    ) : (
      <section className="article-list">
        <Title title={this.props.topic} />

        <div className="sort-options">
          <h5>Sort By:</h5>
          <button onClick={() => this.handleChange('created_at')}>
            Most Recent
          </button>
          <button onClick={() => this.handleChange('comment_count')}>
            Popular
          </button>
          <button onClick={() => this.handleChange('votes')}>Top Rated</button>
        </div>

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

  getArticles(topic, sort_by) {
    getArticles(topic, sort_by)
      .then((articles) => {
        this.setState({
          articles: articles,
          isLoading: false
        });
      })
      .catch((err) => {
        console.dir(err);
      });
  }
}

export default ArticleList;
