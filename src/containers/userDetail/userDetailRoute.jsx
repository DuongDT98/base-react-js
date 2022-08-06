import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import UserDetailLayout from "./layouts/UserDetailLayout";

const UserDetail = lazy(() => import("./components/UserDetail"));

const UserDetailRoute = ({ match: { url } }) => (
  <UserDetailLayout>
    <Switch>
      <Route exact path={`${url}/`} component={UserDetail} />
    </Switch>
  </UserDetailLayout>
);
export default UserDetailRoute;
