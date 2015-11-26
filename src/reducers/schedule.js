import { Map } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = Map({});

export function schedule(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
  case ActionTypes.MQTT_MESSAGE:
    return state.merge(payload.message.get('schedule'));
  default:
    return state;
  }
}
