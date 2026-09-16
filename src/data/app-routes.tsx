import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import ConfigParamList from "../pages/admin/config-param/list";
import ConfigGroupList from "../pages/admin/config-group/list";
import RoleList from "../pages/admin/roles/list";
import UserList from "../pages/admin/users/list";
import NotFound from "../pages/not-found/NotFound";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default root route - redirect to admin */}
      <Route
        path='/'
        element={<Navigate to='/admin/dashboard' replace />}
      />

      <Route
        path='/login'
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path='/register'
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        }
      />
      <Route
        path='/admin/dashboard'
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path='/admin/config-param'
        element={
          <DashboardLayout>
            <ConfigParamList />
          </DashboardLayout>
        }
      />
      <Route
        path='/admin/config-group'
        element={
          <DashboardLayout>
            <ConfigGroupList />
          </DashboardLayout>
        }
      />
      <Route
        path='/admin/users'
        element={
          <DashboardLayout>
            <UserList />
          </DashboardLayout>
        }
      />
      <Route
        path='/admin/roles'
        element={
          <DashboardLayout>
            <RoleList />
          </DashboardLayout>
        }
      />

      {/* 404 — catch all unmatched routes */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
