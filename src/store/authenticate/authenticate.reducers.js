// import Cookie from "js-cookie";
import * as constants from "../constants/authenticate";
// import { setHeaderToken } from "../../services/common/apiRequest.service";

// function getInitToken() {
// //   const remember = Cookie.get("remember");
//   if (remember) {
//     const token = localStorage.getItem("_token");
//     return token || null;
//   } else return null;
// }

// function getInitUserInfo() {
// //   const remember = Cookie.get("remember");
//   if (remember) {
//     const user_info = localStorage.getItem("user_info");
//     return JSON.parse(user_info) || null;
//   } else return null;
// }

// const initToken = getInitToken();
// const initUserInfo = getInitUserInfo();

// if (initToken) {
//   setHeaderToken(initToken);
// }

let INIT_STATE = {
  token: "",
  user_info: "",
  disabledButton: false,
};

function AuthenticateReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case constants.LOGIN:
      return { ...state, disabledButton: true };

    case constants.LOGIN_SUCCEEDED:
      return {
        ...state,
        token: action.data.token,
        user_info: action.data.user_info,
        disabledButton: false,
      };

    case constants.LOGIN_FAILED:
      return { ...state, token: "", data: null, disabledButton: false };

    case constants.LOGOUT:
      return { ...state, token: "", data: null };

    default:
      return state;
  }
}

export default AuthenticateReducer;
