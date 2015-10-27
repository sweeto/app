import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { todos, filter } from './todos.js';
import { mqtt } from './mqtt.js';

const rootReducer = combineReducers({
  todos,
  filter,
  mqtt,
  router
});

export default rootReducer;
