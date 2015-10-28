import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { todos, filter } from './todos.js';
import { connection } from './connection.js';

const rootReducer = combineReducers({
  todos,
  filter,
  connection,
  router
});

export default rootReducer;
