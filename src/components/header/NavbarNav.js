import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import User from "./User";

const NavbarNav = () => (
  <Nav navbar className="border-left flex-row nav-bar">
    <Notifications />
    <User />
  </Nav>
);

export default NavbarNav;
