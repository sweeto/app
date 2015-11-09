import { Map } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';
import * as MqttStates from '../constants/ConnectionStates';

const initialState = Map({ state: MqttStates.DISCONNECTED });

export function connection(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
  case ActionTypes.MQTT_LOGIN_INIT:
    return state.merge({
      state: MqttStates.PENDING,
      address: payload.address,
      port: payload.port,
      username: payload.username
    });
  case ActionTypes.MQTT_CONNECT:
    return state.merge({
      state: MqttStates.CONNECTED
    });
  case ActionTypes.MQTT_CLOSE:
  case ActionTypes.MQTT_ERROR:
    return state.merge({
      state: MqttStates.DISCONNECTED
    });
  default:
    return state;
  }
}
