import { all, put, call, takeLatest } from "redux-saga/effects";
import { history } from "../../index";
import apiRequestService, {
  setHeaderToken,
} from "service/api/apiRequest.service";
import { toastError, toastSuccess } from "service/api/toast.service";
import * as constants from "../constants/authenticate";
import { AUTH_TOKEN } from "helpers/common.constants";

function loginFetchRequest(payload) {
  return apiRequestService.post("login", payload);
}

function* logIn(actions) {
  try {
    const payload = {
      email: actions.payload.userName,
      password: actions.payload.password,
    };
    const response = yield call(loginFetchRequest, payload);
    const data = {
      token: response?.token,
      email: response?.email,
    };
    yield localStorage.setItem(AUTH_TOKEN, data.token);
    yield toastSuccess("Đăng nhập thành công");
    yield put({ type: constants.LOGIN_SUCCEEDED, data: data });
    yield setHeaderToken(data.token);
    yield history.push("/over-view");
  } catch (e) {
    yield toastError(e);
    yield put({ type: constants.LOGIN_FAILED });
  }
}

function* logOut() {
  setHeaderToken("");
  toastSuccess("Đăng xuất thành công");
  window.location.reload();
  yield history.push("/auth");
  localStorage.removeItem(AUTH_TOKEN);
}

export function* authSaga() {
  yield all([
    takeLatest(constants.LOGIN, logIn),
    takeLatest(constants.LOGOUT, logOut),
  ]);
}
