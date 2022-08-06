import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ROUTES, { PREFIX_ROUTES } from "constant/routers.constant";
import AuthLayouts from "layouts/auth/auth.layouts";

const Login = lazy(() => import("containers/auth/components/Auth"));

const routes = [
  {
    path: PREFIX_ROUTES.AUTH,
    component: Login,
    exact: true,
  },
];

const AuthRoute = () => {
  return (
    <AuthLayouts>
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
          <Route
            path={PREFIX_ROUTES.AUTH}
            component={() => <Redirect to={ROUTES.AUTH.LOGIN} />}
          />
        </Switch>
      </Suspense>
    </AuthLayouts>
  );
};

export default AuthRoute;
