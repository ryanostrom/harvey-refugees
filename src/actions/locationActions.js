import * as types from './actionTypes';

export function setCurrent(payload) {
  return {
    type: types.SETCURRENT,
    payload: payload
  }
}
