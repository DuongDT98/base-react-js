import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";

// import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav";
import NavbarToggle from "./NavbarToggle";

const Header = ({ layout, stickyTop, showSidebar }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar
          type="light"
          className="align-items-stretch flex-md-nowrap flex-row-reverse p-0"
        >
          {/* <NavbarSearch /> */}
          <NavbarNav />
          <NavbarToggle showSidebar={showSidebar} />
        </Navbar>
      </Container>
    </div>
  );
};

Header.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool,
};

Header.defaultProps = {
  stickyTop: true,
};

export default Header;
