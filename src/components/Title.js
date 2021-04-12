import React from 'react';
import styles from './Title.module.css'

const Title = ({ title }) => {
  if (title) {
    return <h1 className={styles.title}> {title} </h1>;
  } else {
    return <h1 className={styles.mainTitle}>Welcome To NC News</h1>;
  }
};

export default Title;
