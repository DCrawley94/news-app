import React from 'react';

const CommentCard = ({ body, author, votes, created_at }) => {
  return (
    <div className="comment-card">
      <h5>{author}</h5>
      <p>{created_at.slice(0, 10)}</p>
      <p>Votes: {votes}</p>
      <p>{body}</p>
    </div>
  );
};

export default CommentCard;
