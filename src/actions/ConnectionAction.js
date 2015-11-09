import mqtt from 'mqtt';

import {
  MQTT_LOGIN_INIT,
  MQTT_CONNECT,
  MQTT_RECONNECT,
  MQTT_CLOSE,
  MQTT_OFFLINE,
  MQTT_ERROR,
  MQTT_MESSAGE
} from '../constants/ActionTypes';

let client;

function mqttConnect() {
  return { type: MQTT_CONNECT };
}

function mqttReconnect() {
  return { type: MQTT_RECONNECT };
}

function mqttClose() {
  return { type: MQTT_CLOSE };
}

function mqttOffline() {
  return { type: MQTT_OFFLINE };
}

function mqttError(error) {
  return { type: MQTT_ERROR, payload: { error } };
}

function mqttMessage(topic, message, packet) {
  return { type: MQTT_MESSAGE, payload: { topic, message, packet }};
}

export function mqttLogin(address, port, username, password) {
  return (dispatch) => {
    dispatch({
      type: MQTT_LOGIN_INIT,
      payload: { address, port, username, password }
    });

    client = mqtt.connect(`wss://${address}:${port}/mqtt`, {
      username,
      password
    });

    client.on('connect', () => {
      client.subscribe('neato/status', (err) => {
        if (err) {
          return dispatch(mqttError(err));
        }
        return dispatch(mqttConnect());
      });
    });
    client.on('reconnect', () => dispatch(mqttReconnect()));
    client.on('close', () => dispatch(mqttClose()));
    client.on('offline', () => dispatch(mqttOffline()));
    client.on('error', (error) => dispatch(mqttError(error)));
    client.on('message', (topic, message, packet) => dispatch(mqttMessage(topic, message, packet)));
  };
}
