import React from 'react';

const Title = ({ title }) => {
  if (title) {
    return <h1 className="title"> {title} </h1>;
  } else {
    return <h1 className="title">Welcome To NC News</h1>;
  }
};

export default Title;
