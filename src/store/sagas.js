import { all, fork } from "redux-saga/effects";
import { authSaga } from "./authenticate/authenticate.saga";
import { contractSaga } from "./contract/contract.saga";
import { employeesSaga } from "./employees/employees.saga";

export default function* rootSaga() {
  console.log("fork");
  yield all([fork(authSaga)]);
  yield all([fork(contractSaga)]);
  yield all([fork(employeesSaga)]);
}
