import React from 'react';

const Sorter = ({ sortByOptions, handleChange }) => {
  return (
    <div>
      <h5>Sort By:</h5>
      {sortByOptions.map((option) => {

        return (
          <button
            key={option}
            value={option}
            onClick={() => handleChange(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Sorter;
