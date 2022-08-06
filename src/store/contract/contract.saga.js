import { all, put, call, takeLatest } from "redux-saga/effects";
import apiRequestService from "service/api/apiRequest.service";
import { toastError } from "service/api/toast.service";
import * as constants from "../constants/contract";

function getListContractRequest(params) {
  return apiRequestService.getParams("/contract", params);
}

function* getListContract(actions) {
  try {
    const response = yield call(getListContractRequest, actions?.payload);
    const data = response?.data;
    yield put({
      type: constants.GET_LIST_CONTRACT_REQUEST_SUCCEEDED,
      data: data,
    });
  } catch (e) {
    yield toastError(e);
    yield put({ type: constants.GET_LIST_CONTRACT_REQUEST_FAILED });
  }
}

export function* contractSaga() {
  yield all([takeLatest(constants.GET_LIST_CONTRACT_REQUEST, getListContract)]);
}
