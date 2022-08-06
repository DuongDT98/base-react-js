import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import ROUTES from "constant/routers.constant";
import MainLayout from "layouts/main/main.layout";

const OverView = lazy(() => import("containers/home/homeRoute"));
const NotFound = lazy(() => import("containers/not-found/NotFound"));
const UseRolePage = lazy(() => import("containers/403-page/403Page"));
const ManageCsv = lazy(() => import("containers/manageCsv/ManageCsv"));
const UserDetail = lazy(() =>
  import("containers/userDetail/components/UserDetail")
);
//component request
const Request = lazy(() => import("containers/request/RequestRoute"));
const ListRequest = lazy(() => import("containers/request/components/Request"));
const AddRequest = lazy(() =>
  import("containers/request/components/AddRequest")
);
const RequestDetail = lazy(() =>
  import("containers/request/components/RequestDetail")
);

// component category
const Category = lazy(() => import("containers/category/categoryRoute"));
const BanksManager = lazy(() =>
  import("containers/category/components/banks/Banks")
);
const ProjectManager = lazy(() =>
  import("containers/category/components/project/Project")
);
const FinanceResourceManager = lazy(() =>
  import("containers/category/components/finance-resource/FinanceResource")
);
const FinanceRequest = lazy(() => import("containers/finance/request/Request"));
const DepartmentManager = lazy(() =>
  import("containers/category/components/department/Department")
);
const RequestTypesManager = lazy(() =>
  import("containers/category/components/reqType/requestTypes")
);
const TaxTypeManager = lazy(() =>
  import("containers/category/components/taxType/TaxType")
);
const SupplyManager = lazy(() =>
  import("containers/category/components/supply/Supply")
);
const SupplyDetail = lazy(() =>
  import("containers/category/components/supply/share/SupplyDetail")
);
const BackAccountInfo = lazy(() =>
  import("containers/category/components/bank-account-info/BankAccountInfo")
);
const BackAccountInfoDetail = lazy(() =>
  import(
    "containers/category/components/bank-account-info/detail/BankAccountInfoDetail"
  )
);
const Employees = lazy(() =>
  import("containers/category/components/employees/Employees")
);
const EmployeesDetail = lazy(() =>
  import("containers/category/components/employees/detail/EmployeesDetail")
);
const ContactNumberManager = lazy(() =>
  import("containers/category/components/contact-number/ContactNumber")
);

const RevenueManager = lazy(() => import("containers/finance/revenue/revenue"));

const routes = [
  { path: ROUTES.MAIN.HOME, component: OverView, exact: true },
  { path: ROUTES.MAIN, component: OverView, exact: true },
  {
    path: ROUTES.MAIN.REPORT,
    component: ManageCsv,
    exact: true,
  },
  {
    path: ROUTES.MAIN.USER_PROFILE,
    component: UserDetail,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.REQUEST}`,
    component: Request,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.REQUEST}/list`,
    component: ListRequest,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.REQUEST}/add`,
    component: AddRequest,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.REQUEST}/detail/:id`,
    component: RequestDetail,
    exact: true,
  },
  {
    path: ROUTES.MAIN.CATEGORY,
    component: Category,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/banks`,
    component: BanksManager,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/project`,
    component: ProjectManager,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/financial`,
    component: FinanceResourceManager,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.FINANCE}/revenue-manager`,
    component: RevenueManager,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.FINANCE}/list-register`,
    component: FinanceRequest,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/department`,
    component: DepartmentManager,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/request-type`,
    component: RequestTypesManager,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/cost`,
    component: TaxTypeManager,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/supply`,
    component: SupplyManager,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/supply/detail/:id`,
    component: SupplyDetail,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/banks-of-company`,
    component: BackAccountInfo,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/banks-of-company/detail/:id`,
    component: BackAccountInfoDetail,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/employee`,
    component: Employees,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/employee/detail/:id`,
    component: EmployeesDetail,
    exact: true,
  },
  {
    path: `${ROUTES.MAIN.CATEGORY}/contract`,
    component: ContactNumberManager,
    exact: true,
  },
  { path: ROUTES.NOT_FOUND.USE_ROLE, component: UseRolePage, exact: true },
  { path: ROUTES.NOT_FOUND.NOT_FOUND, component: NotFound },
];

const MainRoute = () => {
  return (
    <MainLayout>
      <Suspense fallback={<div />}>
        <Switch>
          {routes.map((i) => (
            <Route
              key={String(i.path)}
              exact={i.exact}
              path={i.path}
              component={i.component}
            />
          ))}
        </Switch>
      </Suspense>
    </MainLayout>
  );
};

export default MainRoute;
