import ROUTES, { PREFIX_ROUTES } from "constant/routers.constant";
import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";

const Home = lazy(() => import("./components/Home"));

const HomeRoute = ({ match: { url } }) => (
  <HomeLayout>
    <Switch>
      <Route exact path={ROUTES.MAIN.HOME} component={Home} />
      <Route
        path={PREFIX_ROUTES.MAIN}
        component={() => <Redirect to={ROUTES.MAIN.HOME} />}
      />
    </Switch>
  </HomeLayout>
);
export default HomeRoute;
