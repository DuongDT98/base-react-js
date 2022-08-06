import * as constants from "../constants/authenticate";

export function loginAction(payload) {
  return {
    type: constants.LOGIN,
    payload,
  };
}

export function logout() {
  return {
    type: constants.LOGOUT,
  };
}
