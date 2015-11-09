import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { todos, filter } from './todos.js';
import { connection } from './connection.js';
import { lastSuccessfulLogin } from './lastSuccessfulLogin';

const rootReducer = combineReducers({
  todos,
  filter,
  connection,
  router,
  lastSuccessfulLogin
});

export default rootReducer;
