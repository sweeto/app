import { Map } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = Map({});
const MEASUREMENT_REGEX = /^([A-Za-z]+)\s\[([A-zA-z]+)\]/;

function convertMeasurements(values) {
  const converted = {};

  Object.keys(values).forEach(key => {
    const matches = MEASUREMENT_REGEX.exec(key);
    if (matches.length > 0) {
      const [measurement, unit] = matches.slice(1);
      if (unit[0] === 'm') {
        converted[measurement] = values[key] * 1e-3;
      } else {
        converted[measurement] = values[key];
      }
    } else {
      converted[key] = values[key];
    }
  });

  return converted;
}

export function analog(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
  case ActionTypes.MQTT_MESSAGE:
    return state.merge(
      convertMeasurements(payload.message.get('analog'))
    );
  default:
    return state;
  }
}
