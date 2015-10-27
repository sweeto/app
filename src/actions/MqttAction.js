import { MQTT_LOGIN } from '../constants/ActionTypes';

export function mqttLogin(address, username, password) {
  return {
    type: MQTT_LOGIN,
    payload: {
      address,
      username,
      password
    }
  };
}
