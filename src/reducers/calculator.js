import * as types from '../actions/actionTypes';

const initialState = {
  savings: 0,
  salePrice: 300000,
}

export default function calculator(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVINGS:
      return {
        ...state,
        savings: action.payload
      }
    case types.SALEPRICE:
      return {
        ...state,
        salePrice: action.payload
      }
    default:
      return state
  }
}
