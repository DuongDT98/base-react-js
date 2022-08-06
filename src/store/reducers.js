import { combineReducers } from "redux";
import AuthenticateReducer from "./authenticate/authenticate.reducers";
import ContractReducer from "./contract/contract.reducers";
import DrawerReducer from "./drawer/drawer.reducers";
import EmployeesReducer from "./employees/employees.reducers";

const rootReducer = combineReducers({
  authenticate: AuthenticateReducer,
  drawer: DrawerReducer,
  contract: ContractReducer,
  employees: EmployeesReducer,
});

export default rootReducer;
