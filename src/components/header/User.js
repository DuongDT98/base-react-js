import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";

import { useDispatch } from "react-redux";
import { logout } from "store/authenticate/authenticate.actions";
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN } from "helpers/common.constants";

const User = () => {
  const [visible, setVisible] = useState(false);
  const token = jwt_decode(localStorage.getItem(AUTH_TOKEN));

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <NavItem tag={Dropdown} caret toggle={() => setVisible(!visible)}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        {token?.gender === "MALE" ? (
          <img
            className="user-avatar rounded-circle mr-2"
            src="/avatar-male.png"
            alt="User Avatar"
          />
        ) : token?.gender === "FEMALE" ? (
          <img
            className="user-avatar rounded-circle mr-2"
            src="/avatar-female.png"
            alt="User Avatar"
          />
        ) : (
          <img
            className="user-avatar rounded-circle mr-2"
            src="/avatar-unknown.png"
            alt="User Avatar"
          />
        )}

        <span className="d-none d-md-inline-block">{token?.email}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem tag={Link} to="user-profile">
          <i className="material-icons">&#xE7FD;</i> Thông tin cá nhân
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="edit-user-profile">
          <i className="material-icons">&#xE8B8;</i> Sửa thông tin
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem> */}
        <DropdownItem divider />
        <DropdownItem onClick={handleLogout} to="/" className="text-danger">
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );
};

export default User;
