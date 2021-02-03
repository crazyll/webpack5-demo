import React, { useState } from 'react';
import Button from 'Component/Button';
import styles from './index.css';

export default function Index() {
  const [count, setCount] = useState(1);

  return (
    <div id="viewDiv" className={styles.container}>
      <p className={styles.title}>主页 {count}</p>
      <Button
        onClick={() => {
          const t = count + 1;
          setCount(t);
        }}
      >Click</Button>
    </div>
  );
}
