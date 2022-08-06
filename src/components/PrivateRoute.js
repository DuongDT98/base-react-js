import useAuth from "hook/useAuth";
import React, { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isToken = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!isToken) {
      history.push("/auth");
    }
  }, [isToken, history]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
