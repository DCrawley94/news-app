import React from 'react';
import ArticleList from './ArticleList';

import Title from './Title';

const MainPage = ({ topic }) => {
  return (
    <section className="main-page">
      <Title title={topic} />
      <ArticleList topic={topic} />
    </section>
  );
};

export default MainPage;
