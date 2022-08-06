import { CHANGE_ACTIVE } from "store/constants/drawer";

export function changeActive(payload) {
  return {
    type: CHANGE_ACTIVE,
    payload,
  };
}
