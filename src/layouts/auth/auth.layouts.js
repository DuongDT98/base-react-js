import React from "react";
import withAuthenticated from "service/authenticate/withAuthenticate";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default withAuthenticated({
  needAuthenticated: false,
  unMatchingRedirect: "/over-view",
})(AuthLayout);
