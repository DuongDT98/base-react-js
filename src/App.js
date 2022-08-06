import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PREFIX_ROUTES } from "constant/routers.constant";
import AuthRoute from "router/auth.router";
import MainRoute from "router/main.router";

const App = ({ history }) => (
  <>
    <Router history={history}>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path={PREFIX_ROUTES.AUTH} component={AuthRoute} />
          <Route path={PREFIX_ROUTES.MAIN} component={MainRoute} />
        </Switch>
      </Suspense>
    </Router>
    <ToastContainer
      key="toast"
      hideProgressBar
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      autoClose={3000}
      position="top-right"
    />
  </>
);
export default App;
