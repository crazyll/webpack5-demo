import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import './style/global.css';

function App() {
  let staticContext = {};

  return (
    <Router>
      <Layout />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
