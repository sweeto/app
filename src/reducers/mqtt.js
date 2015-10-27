import { Map } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';
import * as MqttStates from '../constants/MqttStates';

const initialState = Map({ state: MqttStates.DISCONNECTED });

export function mqtt(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
  case ActionTypes.MQTT_LOGIN:
    return state.merge({
      state: MqttStates.PENDING,
      address: payload.address,
      username: payload.username
    });
  default:
    return state;
  }
}
