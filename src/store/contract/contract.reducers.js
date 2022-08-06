import * as constants from "../constants/contract";

let INIT_STATE = {
  listContract: [],
  disabledButton: false,
};

function ContractReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case constants.GET_LIST_CONTRACT_REQUEST:
      return { ...state, disabledButton: true };

    case constants.GET_LIST_CONTRACT_REQUEST_SUCCEEDED:
      return {
        ...state,
        listContract: action.data,
        disabledButton: false,
      };

    case constants.GET_LIST_CONTRACT_REQUEST_FAILED:
      return { ...state, listContract: null, disabledButton: false };

    default:
      return state;
  }
}

export default ContractReducer;
