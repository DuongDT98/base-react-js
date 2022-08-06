import * as constants from "../constants/employees";

export function getListEmployeesAction(payload) {
  return {
    type: constants.GET_LIST_EMPLOYEES_REQUEST,
    payload,
  };
}
