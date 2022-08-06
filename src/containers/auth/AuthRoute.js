import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";

const Auth = lazy(() => import("./components/Auth"));

const AuthRouter = ({ match: { url } }) => (
  <AuthLayout>
    <Switch>
      <Route exact path={`${url}`} component={Auth} />
    </Switch>
  </AuthLayout>
);
export default AuthRouter;
