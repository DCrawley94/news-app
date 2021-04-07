import React from 'react';

const ErrorPage = ({ status, msg }) => {
  return (
    <p>
      {status}-{msg}
    </p>
  );
};

export default ErrorPage;
