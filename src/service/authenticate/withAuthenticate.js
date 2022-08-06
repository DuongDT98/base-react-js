import { AUTH_TOKEN } from "helpers/common.constants";
import React from "react";
import { connect } from "react-redux";
import Redirect from "react-router-dom/Redirect";

// import { isRoleMatch } from "../../helpers/common/utilities";

function withAuthenticated(
  options = {
    unMatchingRedirect: "/auth",
    needAuthenticated: true,
  }
) {
  return function (Component) {
    // const isAuth = useAuth();
    class AuthenticateRoute extends React.PureComponent {
      render() {
        const { isLoggedIn, role, ...otherProps } = this.props;
        if (
          isLoggedIn !== options.needAuthenticated
          //   !isRoleMatch(role, options.roles)
        ) {
          return <Redirect to={options.unMatchingRedirect} push={false} />;
        }
        return <Component {...otherProps} />;
      }
    }

    const mapStateToProps = (state) => {
      return {
        isLoggedIn:
          !!state.authenticate?.token || !!localStorage.getItem(AUTH_TOKEN),
      };
    };

    return connect(mapStateToProps)(AuthenticateRoute);
  };
}

export default withAuthenticated;
