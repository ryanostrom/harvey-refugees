import * as types from './actionTypes';

export function setSavings(payload) {
  return {
    type: types.SAVINGS,
    payload: payload
  };
}

export function setSalePrice(payload) {
  return {
    type: types.SALEPRICE,
    payload: payload
  };
}
