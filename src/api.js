import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://news-api-project.herokuapp.com/api'
});

export const getTopics = () => {
  return newsApi.get('/topics').then(({ data: { topics } }) => {
    return topics;
  });
};

export const getArticles = (topic) => {
  return newsApi
    .get('/articles', { params: { topic } })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getSingleArticlePage = (article_id) => {
  const promise1 = newsApi.get(`/articles/${article_id}`);
  const promise2 = newsApi.get(`/articles/${article_id}/comments`);

  return Promise.all([promise1, promise2]).then(
    ([articleData, commentData]) => {
      const { article } = articleData.data;
      const { comments } = commentData.data;
      return { article, comments };
    }
  );
};
