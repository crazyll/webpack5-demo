import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.css';

const menus = [{
  name: '相关',
  url: '/about',
}, {
  name: '主页',
  url: '/',
}, {
  name: '数据',
  url: '/data',
}];

export default function Nav() {
  return (
    <header className={styles.container}>
      {menus.map((i) => (
        <Link className={styles.link} key={i.name} to={i.url}>
          {i.name}
        </Link>
      ))}
    </header>
  );
}
