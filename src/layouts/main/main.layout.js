import React, { useState } from "react";
import { Header, Sidebar } from "components/index";
import useAuth from "hook/useAuth";
import withAuthenticated from "service/authenticate/withAuthenticate";

const MainLayout = ({ children }) => {
  const isToken = useAuth();
  const [isSidebarOpen, setSiderbarOpen] = useState(true);
  return (
    <>
      {isToken && <Header showSidebar={() => setSiderbarOpen(true)} />}
      <div className="layout">
        {isToken && (
          <div className="layout-sidebar">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              closeSidebar={() => setSiderbarOpen(false)}
              pathName={window?.location?.pathname}
            />
          </div>
        )}
        <div
          className="content-main"
          style={{
            width: isToken ? "calc(100% - 240px)" : "100%",
            marginLeft: isToken ? "50px" : "0px",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default withAuthenticated({
  needAuthenticated: true,
  unMatchingRedirect: "/auth",
})(MainLayout);
