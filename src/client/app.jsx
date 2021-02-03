import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import routes from './routes';
import Layout from './layout';
import './style/global.css';

function App() {
  return (
    <Router>
      <Switch>
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
                    <Layout>
                      <Component {...props} />
                    </Layout>
                  );
                },
              })
            }
          />
        ))}
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
