/**
 * Sidebar Component
 * Collapsible sidebar with navigation menu
 */

import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  TeamOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [smallLogo, setSmallLogo] = useState<string>("");
  const [largeLogo, setLargeLogo] = useState<string>("");

  // Load logos from localStorage
  useEffect(() => {
    const loadLogos = () => {
      const storedSmallLogo = localStorage.getItem("app-logo-small");
      const storedLargeLogo = localStorage.getItem("app-logo-large");

      setSmallLogo(storedSmallLogo || "/assets/images/webpm.ico");
      setLargeLogo(storedLargeLogo || "");
    };

    loadLogos();

    // Listen for custom event for logo updates
    const handleLogoUpdate = () => {
      loadLogos();
    };

    window.addEventListener("logo-updated", handleLogoUpdate);
    return () => {
      window.removeEventListener("logo-updated", handleLogoUpdate);
    };
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (onNavigate) {
      setTimeout(() => onNavigate(), 100);
    }
  };

  const menuItems: MenuItem[] = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => handleMenuClick("/admin/dashboard"),
    },
    {
      key: "/admin/users",
      icon: <TeamOutlined />,
      label: "Users",
      onClick: () => handleMenuClick("/admin/users"),
    },
    {
      key: "/admin/roles",
      icon: <SafetyOutlined />,
      label: "Roles",
      onClick: () => handleMenuClick("/admin/roles"),
    },
    {
      key: "config",
      icon: <SettingOutlined />,
      label: "Configuration",
      children: [
        {
          key: "/admin/config-param",
          label: "Parameters",
          onClick: () => handleMenuClick("/admin/config-param"),
        },
        {
          key: "/admin/config-group",
          label: "Groups",
          onClick: () => handleMenuClick("/admin/config-group"),
        },
      ],
    },
    {
      key: "docs",
      icon: <FileTextOutlined />,
      label: "Documentation",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];

  // Get the current selected key from the location
  const selectedKey = location.pathname;

  // Detect mobile screen
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile, sidebar is open when not collapsed (inverted logic)
  const isMobileOpen = isMobile ? !collapsed : false;

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className='app-sidebar'
      width={250}
      collapsedWidth={80}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        // Removed left: 0 to allow CSS media queries to control positioning
        top: 0,
        bottom: 0,
      }}
      data-mobile-open={isMobileOpen}
    >
      <div className='sidebar-logo'>
        <div className='logo-icon'>
          {collapsed ? (
            <img
              src={smallLogo}
              alt='Logo'
              className='w-10 h-10'
              style={{ objectFit: "contain" }}
            />
          ) : largeLogo ? (
            <img
              src={largeLogo}
              alt='WebaniX'
              style={{ height: "40px", objectFit: "contain" }}
            />
          ) : (
            "WebaniX"
          )}
        </div>
      </div>

      <Menu
        mode='inline'
        selectedKeys={[selectedKey]}
        defaultOpenKeys={["config"]}
        items={menuItems}
        className='sidebar-menu'
      />
    </Sider>
  );
};

export default Sidebar;
