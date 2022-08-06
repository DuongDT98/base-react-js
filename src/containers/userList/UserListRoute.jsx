import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import UserListLayout from "./layouts/UserListLayout.jsx";

const UserList = lazy(() => import("./components/UserList"));

const UserDetailRoute = ({ match: { url } }) => (
  <UserListLayout>
    <Switch>
      <Route exact path={`${url}/`} component={UserList} />
    </Switch>
  </UserListLayout>
);
export default UserDetailRoute;
