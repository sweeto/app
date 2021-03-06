/* eslint react/self-closing-comp:0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as ConnectionStates from './constants/ConnectionStates';

import App from './components/App';
import { IndexPage, LoginPage, PlotPage, SchedulePage } from './pages';

import store from './lib/store';

const requireLogin = (nextState, replaceState, cb) => {
  function checkAuth() {
    if (!store) {
      replaceState(null, '/login');
      return cb();
    }

    const { connection } = store.getState();

    if (connection && connection.get('state') !== ConnectionStates.CONNECTED) {
      replaceState(null, '/login');
    }

    cb();
  }

  checkAuth();
};

export default (
  <div>
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} onEnter={requireLogin}/>
    </Route>
    <Route path="/plot" component={App}>
      <IndexRoute component={PlotPage} onEnter={requireLogin}/>
    </Route>
    <Route path="/schedule" component={App}>
      <IndexRoute component={SchedulePage} onEnter={requireLogin}/>
    </Route>

  </div>
);
