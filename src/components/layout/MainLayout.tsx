/**
 * Main Layout Component
 * Professional layout with sidebar, header, breadcrumbs, and content area
 */

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import './MainLayout.css';
import AuthUtil from '../../utils/auth';
import apiUtil from '../../utils/api';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [collapsed, setCollapsed] = useState(isMobile); // Start collapsed on mobile
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Auth guard - redirect to login if no valid token
  useEffect(() => {
    const checkAuthentication = () => {
      if (!AuthUtil.isTokenExist()) {
        AuthUtil.logout();
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuthentication();

    // Abort pending requests when component unmounts
    return () => {
      apiUtil.abortAllRequests();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-collapse sidebar when switching to mobile
      if (mobile) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeSidebarOnMobile = () => {
    if (isMobile && !collapsed) {
      setCollapsed(true);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout className="main-layout">
      {/* Backdrop for mobile */}
      {isMobile && !collapsed && (
        <div 
          className="sidebar-backdrop active" 
          onClick={closeSidebarOnMobile}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 900, // Below sidebar (1000) so sidebar is clickable
          }}
        />
      )}
      
      <Sidebar collapsed={collapsed} onNavigate={closeSidebarOnMobile} />
      
      <Layout
        className="site-layout"
        style={{
          marginLeft: isMobile ? 0 : (collapsed ? 80 : 250),
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header collapsed={collapsed} onToggle={toggleSidebar} />
        
        <div style={{ marginTop: 64 }}>
          <Breadcrumbs />
          
          <Content className="main-content">
            {children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
