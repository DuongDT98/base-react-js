import React from "react";
import Link from "react-router-dom/Link";
import NavLink from "react-router-dom/NavLink";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import { ReactComponent as ArrowIcon } from "components/svg/arrow.svg";
import "./ItemNavigation.css";

class ItemNavigation extends React.Component {
  state = {
    isExpanded: this.props.isActive === this.props.item.title,
  };

  getStyledIcon(Icon, className) {
    return <Icon className={className} />;
  }

  componentDidUpdate({ isActive }) {
    if (isActive !== this.props.isActive) {
      this.setState({
        isExpanded: this.props.isActive === this.props.item.title,
      });
    }
  }

  handleClick = () => {
    if (this.props.item.title === "Logout") {
      this.props.logOut();
    } else {
      if (!this.props.item.to) {
        this.setState((prev) => ({ isExpanded: !prev.isExpanded }));
      }
    }
  };

  renderListItem() {
    const { isActive, item } = this.props;
    const { isExpanded } = this.state;

    return (
      <React.Fragment>
        <ListItem
          style={{ padding: "0px 15px" }}
          onClick={this.handleClick}
          button={true}
          disableRipple
          className={isActive === item.title ? "active-nav" : undefined}
        >
          <div className={"itemSideBar"}>
            {item.htmlBefore && (
              <div
                className="d-inline-block item-icon-wrapper"
                dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
              />
            )}
            <div className={"titleSideBar"}>{item.title}</div>
            {item.submenu && (
              <ArrowIcon
                style={
                  isExpanded
                    ? {
                        transition: "transform 0.3s",
                        transform: "rotate(90deg)",
                      }
                    : {
                        transition: "transform 0.3s",
                        transform: "rotate(0deg)",
                      }
                }
                className={"iconArrow"}
                alt=""
              />
            )}
          </div>
        </ListItem>
      </React.Fragment>
    );
  }

  renderSubMenu() {
    const { item } = this.props;
    const { isExpanded } = this.state;
    return (
      item.submenu && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.submenu.map((subItem) => (
              <NavLink
                to={subItem.to}
                activeClassName={"active-sub-nav"}
                exact={false}
                key={subItem.title}
              >
                <ListItem button={true} disableRipple>
                  {/* <ListItemIcon>
                    {this.getStyledIcon(subItem.icon, 'iconSubmenu')}
                  </ListItemIcon> */}
                  <div className={"titleSubmenu"}>{subItem.title}</div>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Collapse>
      )
    );
  }

  renderNormalNav() {
    return (
      <React.Fragment>
        {this.renderListItem()}
        {this.renderSubMenu()}
      </React.Fragment>
    );
  }

  renderNavWithLink() {
    const { item } = this.props;
    return (
      <React.Fragment>
        <Link to={item.to}>{this.renderListItem()}</Link>
        {this.renderSubMenu()}
      </React.Fragment>
    );
  }

  render() {
    const { item } = this.props;
    if (!item.to) {
      return this.renderNormalNav();
    }
    return this.renderNavWithLink();
  }
}

export default ItemNavigation;
