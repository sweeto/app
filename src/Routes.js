/* eslint react/self-closing-comp:0 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import { IndexPage, TodosPage } from './pages';

export default (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} />
      <Route path="todos" component={TodosPage} />
    </Route>
  </div>
);
