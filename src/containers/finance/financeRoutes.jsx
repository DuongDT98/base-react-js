import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CategoryLayout from "./layouts/categoryLayouts";

const RevenueManager = lazy(() => import("./revenue/revenue"));
const Request = lazy(() => import("./request/Request"));

const Finance = ({ match: { url } }) => {
  console.log(url);
  return (
    <CategoryLayout>
      <Route exact path={`${url}`}>
        <Redirect to={`${url}/revenue-manager`} />
      </Route>
      <Switch>
        <Route
          exact
          path={`${url}/revenue-manager`}
          component={RevenueManager}
        />
        <Route exact path={`${url}/list-register`} component={Request} />
      </Switch>
    </CategoryLayout>
  );
};
export default Finance;
