import { List, Map, fromJS } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = List([]);

export function lds(state = initialState, action = null) {
  const { type, payload } = action;

  switch (type) {
  case ActionTypes.MQTT_MESSAGE:
    return fromJS(payload.message.get('lds'))
      .map(([deg, dist, int, err]) => Map({
        deg, dist, int, err
      }));
  default:
    return state;
  }
}
