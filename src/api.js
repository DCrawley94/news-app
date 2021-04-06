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
    .get('/articles', {
      params: {
        topic: topic
      }
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};
