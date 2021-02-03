import React from 'react';
import Button from 'Component/Button';
import styles from './index.css';

export default function Index() {
  return (
    <div id="viewDiv" className={styles.container}>
      <p className={styles.title}>主页</p>
      <Button>Click</Button>
    </div>
  );
}
