import { all, put, call, takeLatest } from "redux-saga/effects";
import apiRequestService from "service/api/apiRequest.service";
import { toastError } from "service/api/toast.service";
import * as constants from "../constants/employees";

function getListEmployeesRequest(params) {
  return apiRequestService.getParams("/user", params);
}

function* getListEmployees(actions) {
  try {
    const response = yield call(getListEmployeesRequest, actions?.payload);
    const data = response?.data;
    yield put({
      type: constants.GET_LIST_EMPLOYEES_REQUEST_SUCCEEDED,
      data: data,
    });
  } catch (e) {
    yield toastError(e);
    yield put({ type: constants.GET_LIST_EMPLOYEES_REQUEST_FAILED });
  }
}

export function* employeesSaga() {
  yield all([
    takeLatest(constants.GET_LIST_EMPLOYEES_REQUEST, getListEmployees),
  ]);
}
