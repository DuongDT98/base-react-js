import React, { useCallback, useEffect, useState } from "react";
import { Col, Navbar, NavbarBrand } from "shards-react";
import classNames from "classnames";
import SidebarNavItem from "./SidebarNavItem.js";
import { useDispatch, useSelector } from "react-redux";
import "./sidebar.scss";
import { matchPath } from "react-router-dom";
import { changeActive } from "store/drawer/drawer.actions.js";
import { isRoleMatch } from "helpers/helpers.js";
import { List } from "@material-ui/core";

const sidebarItems = [
  {
    title: "Tổng quan",
    to: "/over-view",
    htmlBefore: '<i class="material-icons">home</i>',
    htmlAfter: "",
  },
  {
    title: "Danh mục",
    htmlBefore: '<i class="material-icons">list</i>',
    // to: "/category",
    childrens: [
      {
        title: "Danh mục ngân hàng",
        htmlBefore: "",
        to: "/category/banks",
      },
      {
        title: "Danh mục ngân hàng của công ty",
        htmlBefore: "",
        to: "/category/banks-of-company",
      },
      {
        title: "Danh mục nhà cung cấp",
        htmlBefore: "",
        to: "/category/supply",
      },
      {
        title: "Danh mục nhân viên",
        htmlBefore: "",
        to: "/category/employee",
      },
      {
        title: "Danh mục loại đề nghị",
        htmlBefore: "",
        to: "/category/request-type",
      },
      {
        title: "Danh mục loại chi phí",
        htmlBefore: "",
        to: "/category/cost",
      },
      {
        title: "Danh mục phòng ban",
        htmlBefore: "",
        to: "/category/department",
      },
      {
        title: "Danh mục dự án",
        htmlBefore: "",
        to: "/category/project",
      },
      {
        title: "Danh mục nguồn tài chính",
        htmlBefore: "",
        to: "/category/financial",
      },
      {
        title: "Danh mục hợp đồng",
        htmlBefore: "",
        to: "/category/contract",
      },
    ],
  },
  {
    title: "Đề nghị",
    htmlBefore: '<i class="material-icons">request_page</i>',
    // to: "/request",
    childrens: [
      {
        title: "Đăng ký đề nghị",
        htmlBefore: "",
        to: "/request/add",
      },
      {
        title: "Danh sách đề nghị",
        htmlBefore: "",
        to: "/request/list",
      },
    ],
  },
  {
    title: "Tài chính",
    htmlBefore: '<i class="material-icons">currency_exchange</i>',
    // to: "/finance",
    childrens: [
      {
        title: "Danh sách đề nghị",
        htmlBefore: "",
        to: "/finance/list-register",
      },
      {
        title: "Quản lý chi",
        htmlBefore: "",
        to: "/finance/pay-manager",
      },
      {
        title: "Quản lý thu",
        htmlBefore: "",
        to: "/finance/revenue-manager",
      },
    ],
  },
  {
    title: "Báo cáo",
    htmlBefore: '<i class="material-icons">summarize</i>',
    to: "/report",
    // childrens: [],
  },
  {
    title: "Thông tin cá nhân",
    htmlBefore: '<i class="material-icons">person</i>',
    to: "/user-profile",
    // childrens: [],
  },
];

const Sidebar = ({ isSidebarOpen, closeSidebar, pathName }) => {
  const dispatch = useDispatch();
  const [hideLogoText] = useState(false);
  const { active } = useSelector((state) => state?.drawer);

  const checkRoutePath = useCallback(() => {
    const currentActiveNav = sidebarItems.find((a) => {
      if (!a.to && a.childrens) {
        return a.childrens.some((i) =>
          matchPath(pathName, {
            path: i.to,
            exact: false,
            strict: false,
          })
        );
      } else {
        return (
          matchPath(pathName, {
            path: a.to,
            exact: false,
            strict: false,
          }) ||
          (a.childrens &&
            a.childrens.some((i) =>
              matchPath(pathName, {
                path: i.to,
                exact: false,
                strict: false,
              })
            ))
        );
      }
    });
    if (currentActiveNav) {
      dispatch(changeActive(currentActiveNav.title));
    } else {
      dispatch(changeActive());
    }
  }, [dispatch, pathName]);

  useEffect(() => {
    checkRoutePath();
  }, [checkRoutePath]);

  function filter(menu, role) {
    return menu
      .filter((menuItem) => {
        let matchRole = isRoleMatch(role, menuItem.role);
        return matchRole;
      })
      .map((menuItem) => {
        if (menuItem.childrens) {
          return {
            ...menuItem,
            submenu: filter(menuItem.childrens),
          };
        }
        return menuItem;
      });
  }

  const filterMenu = filter(sidebarItems, "ROLE_ADMIN");

  return (
    <Col
      tag="aside"
      className={classNames(
        "main-sidebar",
        "px-0",
        "col-12",
        isSidebarOpen && "open"
      )}
      lg={{ size: 2 }}
      md={{ size: 3 }}
      style={{ maxWidth: "290px" }}
    >
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto">
              <img
                id="sidebar-main-logo"
                className="d-inline-block align-top mr-1 sidebar-main-logo"
                src="/logo.png"
                alt="Shards Dashboard"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">Hawee</span>
              )}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={closeSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
        <div className="nav-wrapper">
          <List component="nav" className="nav--no-borders flex-column">
            {filterMenu.map((item) => (
              <SidebarNavItem key={item?.title} item={item} isActive={active} />
            ))}
          </List>
        </div>
      </div>
    </Col>
  );
};

export default Sidebar;
