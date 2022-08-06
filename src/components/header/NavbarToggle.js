import React from "react";

// import { Dispatcher, Constants } from "../../../flux";

class NavbarToggle extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick() {
  //   Dispatcher.dispatch({
  //     actionType: Constants.TOGGLE_SIDEBAR,
  //   });
  // }

  render() {
    return (
      <nav className="nav">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          onClick={this.props.showSidebar}
          className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
        >
          <i className="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    );
  }
}

export default NavbarToggle;
