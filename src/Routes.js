/* eslint react/self-closing-comp:0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import { IndexPage, TodosPage, LoginPage } from './pages';

const requireLogin = (nextState, replaceState, cb) => {
  function checkAuth() {
    // dummy never logged in
    replaceState(null, '/login');

    cb();
  }

  checkAuth();
};

export default (
  <div>
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} onEnter={requireLogin}/>
      <Route path="todos" component={TodosPage} onEnter={requireLogin} />
    </Route>
  </div>
);
