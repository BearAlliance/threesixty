export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(username) {
  return {
    type: LOGIN,
    payload: { username, isLoggedIn: true }
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
