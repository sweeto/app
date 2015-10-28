import { MQTT_LOGIN } from '../constants/ActionTypes';

export function mqttLogin(address, port, username, password) {
  return {
    type: MQTT_LOGIN,
    payload: {
      address,
      port,
      username,
      password
    }
  };
}
