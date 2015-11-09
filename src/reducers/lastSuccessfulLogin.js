import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = Map({
  address: '',
  port: '',
  username: '',
  password: ''
});

export function lastSuccessfulLogin(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
  case REHYDRATE:
    return state.merge(payload);
  case ActionTypes.MQTT_LOGIN_INIT:
    return state.merge(payload);
  default:
    return state;
  }
}
