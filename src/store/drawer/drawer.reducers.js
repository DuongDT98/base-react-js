import { CHANGE_ACTIVE } from "store/constants/drawer";

let INIT_STATE = {
  active: "",
};

export default function DrawerReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case CHANGE_ACTIVE: {
      return {
        ...state,
        active: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
