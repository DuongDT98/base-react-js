import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CategoryLayout from "./layouts/categoryLayouts";

const BanksManager = lazy(() => import("./components/banks/Banks"));
const ProjectManager = lazy(() => import("./components/project/Project"));
const FinanceResourceManager = lazy(() =>
  import("./components/finance-resource/FinanceResource")
);
const DepartmentManager = lazy(() =>
  import("./components/department/Department")
);
const RequestTypesManager = lazy(() =>
  import("./components/reqType/requestTypes")
);
const TaxTypeManager = lazy(() => import("./components/taxType/TaxType"));

const SupplyManager = lazy(() => import("./components/supply/Supply"));
const SupplyDetail = lazy(() =>
  import("./components/supply/share/SupplyDetail")
);
const BackAccountInfo = lazy(() =>
  import("./components/bank-account-info/BankAccountInfo")
);

const BackAccountInfoDetail = lazy(() =>
  import("./components/bank-account-info/detail/BankAccountInfoDetail")
);

const Employees = lazy(() => import("./components/employees/Employees"));

const EmployeesDetail = lazy(() =>
  import("./components/employees/detail/EmployeesDetail")
);

const ContactNumberManager = lazy(() =>
  import("./components/contact-number/ContactNumber")
);

const Category = ({ match: { url } }) => {
  console.log(url);
  return (
    <CategoryLayout>
      <Route exact path={`${url}`}>
        <Redirect to={`${url}/banks`} />
      </Route>

      <Switch>
        <Route exact path={`${url}/banks`} component={BanksManager} />
        <Route exact path={`${url}/project`} component={ProjectManager} />
        <Route
          exact
          path={`${url}/financial`}
          component={FinanceResourceManager}
        />
        <Route exact path={`${url}/department`} component={DepartmentManager} />
        <Route
          exact
          path={`${url}/request-type`}
          component={RequestTypesManager}
        />
        <Route exact path={`${url}/cost`} component={TaxTypeManager} />
        <Route exact path={`${url}/supply`} component={SupplyManager} />
        <Route
          exact
          path={`${url}/supply/detail/:id`}
          component={SupplyDetail}
        />
        <Route
          exact
          path={`${url}/banks-of-company`}
          component={BackAccountInfo}
        />
        <Route
          exact
          path={`${url}/banks-of-company/detail/:id`}
          component={BackAccountInfoDetail}
        />
        <Route exact path={`${url}/employee`} component={Employees} />
        <Route
          exact
          path={`${url}/employee/detail/:id`}
          component={EmployeesDetail}
        />
        <Route
          exact
          path={`${url}/contract`}
          component={ContactNumberManager}
        />
      </Switch>
    </CategoryLayout>
  );
};
export default Category;
