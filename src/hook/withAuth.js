import React from "react";

import { Redirect } from "react-router-dom";
import ROUTES from "constant/routers.constant";
import useAuth from "./useAuth";

export default function withAuth(Wrapped, customOptions) {
  const options = { needAuth: true, ...customOptions };

  if (!options.unMatchingRedirect) {
    console.log("sakjdgsakdgsajdh");
    console.log(options);
    options.unMatchingRedirect = options.needAuth
      ? ROUTES.AUTH.LOGIN
      : ROUTES.MAIN.HOME;
  }
  const WithAuth = (props) => {
    console.log("options", options);
    const isAuth = useAuth();
    if (options.needAuth !== isAuth) {
      return (
        <Redirect
          to={{
            pathname: options.unMatchingRedirect,
          }}
          push={true}
        />
      );
    }
    return <Wrapped {...props} />;
  };

  return WithAuth;
}
