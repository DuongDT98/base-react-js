import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import RequestLayout from "./layouts/RequestLayout";

const Request = lazy(() => import("./components/Request"));
const AddRequest = lazy(() => import("./components/AddRequest"));
const RequestDetail = lazy(() => import("./components/RequestDetail"));

const RequestRoute = ({ match: { url } }) => (
  <RequestLayout>
    <Route exact path={`${url}`}>
      <Redirect to={`${url}/list`} />
    </Route>
    <Switch>
      <Route exact path={`${url}/add`} component={AddRequest} />
      <Route exact path={`${url}/detail/:id`} component={RequestDetail} />
      <Route exact path={`${url}/list`} component={Request} />
    </Switch>
  </RequestLayout>
);
export default RequestRoute;
