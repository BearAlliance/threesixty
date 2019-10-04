import { LOGIN, LOGOUT } from '../actions';

const initialState = {};

export function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
