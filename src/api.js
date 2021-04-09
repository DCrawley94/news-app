import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://news-api-project.herokuapp.com/api'
});

export const getTopics = () => {
  return newsApi.get('/topics').then(({ data: { topics } }) => {
    return topics;
  });
};

export const getArticles = (topic, sort_by) => {
  return newsApi
    .get('/articles', { params: { topic: topic, sort_by: sort_by } })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getSingleArticle = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getSingleArticleComments = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const patchArticleVotes = (article_id, inc_votes) => {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes });
};

export const postComment = (article_id, commentToPost) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, commentToPost)
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const deleteComment = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};

export const patchCommentVotes = (comment_id, inc_votes) => {
  return newsApi.patch(`/comments/${comment_id}`, { inc_votes });
};
