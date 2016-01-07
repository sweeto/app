import mqtt from 'mqtt';
import { Map } from 'immutable';

import {
  MQTT_LOGIN_INIT,
  MQTT_CONNECT,
  MQTT_RECONNECT,
  MQTT_CLOSE,
  MQTT_OFFLINE,
  MQTT_ERROR,
  MQTT_MESSAGE
  // MQTT_POST
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

function mqttMessage(topic, message) {
  return { type: MQTT_MESSAGE, payload: { topic, message }};
}

export function mqttPost(topic, message) {
  client.publish(topic, message);
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
        mqttPost('neato/commands', JSON.stringify({cmd: 'Ping'}));
        return dispatch(mqttConnect());
      });
    });
    client.on('reconnect', () => dispatch(mqttReconnect()));
    client.on('close', () => dispatch(mqttClose()));
    client.on('offline', () => dispatch(mqttOffline()));
    client.on('error', (error) => dispatch(mqttError(error)));
    client.on('message', (topic, message) => {
      let messageObj = {};

      try {
        messageObj = JSON.parse(message.toString());
      } catch (e) {
        /* eslint no-console: 0 */
        console.error('Could not parse message from Neato');
        console.error(message.toString());
      }

      dispatch(mqttMessage(topic, Map(messageObj)));
    });
  };
}
