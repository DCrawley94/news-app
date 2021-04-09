import React from 'react';

const Sorter = ({ sortByOptions, handleChange }) => {
  return (
    <div>
      <h5>Sort By:</h5>
      {sortByOptions.map(({ name, option }) => {
        return (
          <button
            key={name}
            value={option}
            onClick={() => handleChange(option)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default Sorter;
