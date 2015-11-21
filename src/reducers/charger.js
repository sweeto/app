import { Map } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = Map({});

export function charger(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
  case ActionTypes.MQTT_MESSAGE:
    return state.merge(payload.message.get('charger'));
  default:
    return state;
  }
}
