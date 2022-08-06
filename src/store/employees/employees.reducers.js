import * as constants from "../constants/employees";

let INIT_STATE = {
  listEmployees: [],
  disabledButton: false,
};

function EmployeesReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case constants.GET_LIST_EMPLOYEES_REQUEST:
      return { ...state, disabledButton: true };

    case constants.GET_LIST_EMPLOYEES_REQUEST_SUCCEEDED:
      return {
        ...state,
        listEmployees: action.data,
        disabledButton: false,
      };

    case constants.GET_LIST_EMPLOYEES_REQUEST_FAILED:
      return { ...state, listEmployees: null, disabledButton: false };

    default:
      return state;
  }
}

export default EmployeesReducer;
