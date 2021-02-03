import React from 'react';
import Nav from './nav';
import styles from './index.css';

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        {children}
      </div>
    </>
  );
}
