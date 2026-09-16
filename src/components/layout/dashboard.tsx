import React, { useState } from "react";
import classNames from "classnames"; // Correct the import here
// import Header from "../header/header";
// import AuthUtil from "../../utils/auth";
import LayoutHeader from "../layout-header/layout-header";
import styles from "./layout.module.css";
import LayoutFooter from "../layout-footer/layout-footer";
// import CookieBanner from "../cookies/cookie";
import SiderBarComponent from "../../components/menu";
import RightIcon from "../advance-panel/advance.";
import AdvanceSidebarComponent from "../advance-panel/advance-sider";

interface DashboardComponentProps {
  children: React.ReactNode; // Define the type for children
}

export default function DashboardComponent({
  children,
}: DashboardComponentProps) {
  const [isSidebarToggle, setSidebarToggle] = useState(false);
  const onToggleSideBar = () => {
    setSidebarToggle(!isSidebarToggle);
  };
  const [isAdvancePanel, setAdvancePanel] = useState(false);
  const onToggleAdvancePanel = () => {
    setAdvancePanel(!isAdvancePanel);
  };
  // const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Uncomment and fix the authentication check if needed
  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     if (!AuthUtil.isTokenExist()) {
  //       window.location.href = "/login";
  //     } else {
  //       setIsAuthenticated(true);
  //     }
  //   };
  //   checkAuthentication();
  // });

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <div className={classNames(styles.dashboardLayout, "dashboard_layout")}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className={classNames(
            styles.sidebar,
            { [styles.sidebarExpanded]: isSidebarToggle },
            { [styles.sidebarCollapsed]: !isSidebarToggle }
          )}
        >
          <SiderBarComponent sideBarStatus={isSidebarToggle} />
        </div>
        <div
          className={classNames(
            styles.content,
            { [styles.contentExpanded]: isSidebarToggle },
            { [styles.contentCollapsed]: !isSidebarToggle },
            { [styles.contentAdvanceExpanded]: isAdvancePanel },
            { [styles.contentAdvanceCollapsed]: !isAdvancePanel }
          )}
        >
          <LayoutHeader
            onToggleSideBar={onToggleSideBar}
            sideBarStatus={isSidebarToggle}
          />
          {children}
          <LayoutFooter />
          <RightIcon
            isAdvancePanel={isAdvancePanel}
            onToggleAdvancePanel={onToggleAdvancePanel}
          />
        </div>
        <div
          className={classNames(
            styles.advanceSidebar,
            { [styles.advanceSidebarExpanded]: isAdvancePanel },
            { [styles.advanceSidebarCollapsed]: !isAdvancePanel }
          )}
        >
          <AdvanceSidebarComponent />
        </div>
      </div>
    </div>
  );
}
