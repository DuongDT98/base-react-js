import * as constants from "../constants/contract";

export function getListContractAction(payload) {
  return {
    type: constants.GET_LIST_CONTRACT_REQUEST,
    payload,
  };
}
