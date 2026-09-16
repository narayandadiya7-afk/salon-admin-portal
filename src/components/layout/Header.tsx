/**
 * Enhanced Header Component
 * Professional header with logo settings, theme toggle, and user menu
 */

import React, { useState } from "react";
import {
  Layout,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Button,
  Modal,
} from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import ThemeToggle from "./ThemeToggle";
import AuthUtil from "../../utils/auth";
import { notification } from "../../utils/notification";
import "./Header.css";
import CustomDrawer from "../drawer";
import LogoSettings from "../logo/LogoSettings";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const [logoSettingsOpen, setLogoSettingsOpen] = useState(false);

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        AuthUtil.logout();
        notification.success("Logged out successfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      },
    });
  };

  const handleLogoUpdate = () => {
    // Dispatch custom event to notify Sidebar of logo update
    window.dispatchEvent(new Event("logo-updated"));
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "logo-settings",
      icon: <PictureOutlined />,
      label: (
        <CustomDrawer
          size="default"
          component={LogoSettings}
          title='Logo Settings'
          trigger={<span>Update Logo</span>}
          componentProps={{
            onCloseDrawer: () => setLogoSettingsOpen(false),
            onSuccess: handleLogoUpdate,
          }}
        />
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <AntHeader
        className='app-header'
        data-collapsed={collapsed}
      >
        <div className='app-header-left'>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggle}
            className='sidebar-toggle'
          />
        </div>

        <div className='app-header-right'>
          <Space size='middle'>
            {/* Notifications */}
            <Button
              type='text'
              icon={<BellOutlined style={{ fontSize: "18px" }} />}
              className='header-icon-btn'
            />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <Dropdown
              menu={{ items: userMenuItems }}
              placement='bottomRight'
              trigger={["click"]}
            >
              <Space
                className='user-menu'
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  size='small'
                  icon={<UserOutlined />}
                />
                <Text className='username'>John Doe</Text>
              </Space>
            </Dropdown>
          </Space>
        </div>
      </AntHeader>

    
    
    </>
  );
};

export default Header;
