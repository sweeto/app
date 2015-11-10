import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import { connection } from './connection.js';
import { lastSuccessfulLogin } from './lastSuccessfulLogin';
import { analog } from './analog';
import { sensors } from './sensors';
import { motors } from './motors';
import { accel } from './accel';

const rootReducer = combineReducers({
  connection,
  router,
  lastSuccessfulLogin,
  analog,
  sensors,
  motors,
  accel
});

export default rootReducer;
