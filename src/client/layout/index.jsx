import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Nav from './nav';
import routes from './routes';
import styles from './index.css';

export default function Layout() {
  return (
    <Switch>
      <Nav />
      <div className={styles.container}>
        {routes.map((i) => (
          <Route
            key={i.path}
            path={i.path}
            exact={i.exact}
            component={
              Loadable({
                loader: i.loader,
                loading() {
                  return <div>Loading...</div>;
                },
                render(loaded, props) {
                  const Component = loaded.default;
                  return (
                    <Component {...props} />
                  );
                },
              })
            }
          />
        ))}
      </div>
    </Switch>
  );
}
