import React from 'react';
import { Link } from '@reach/router';

const ArticleList = ({ articles }) => {
  console.log(articles, '<-- in articleList');
  return (
    <section className="article-list">
      {articles.map((article) => {
        const { article_id, title, created_at, votes, comment_count } = article;
        return (
          <div className="article-card" key={article_id}>
            <Link to={`/articles/${article_id}`}>{title}</Link>
            <p>{created_at.slice(0, 10)}</p>
            <p>{comment_count} comments</p>
            <p>{votes} votes</p>
          </div>
        );
      })}
    </section>
  );
};

export default ArticleList;
