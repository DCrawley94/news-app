import React from 'react';
import styles from './Sorter.module.css';

const Sorter = ({ sortByOptions, handleChange }) => {
  return (
    <div className={styles.sorter}>
      <p>Sort By:</p>
      {sortByOptions.map(({ name, option }) => {
        return (
          <button
            className={styles.sortBtn}
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
