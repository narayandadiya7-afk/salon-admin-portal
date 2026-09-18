import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ConfigParamList from "../pages/admin/config-param/list";
import ConfigGroupList from "../pages/admin/config-group/list";
import NotFound from "../pages/not-found/NotFound";
import AdminPortalLayout from "../pages/admin/AdminPortalLayout";
import DashboardPage from "../pages/admin/dashboard";
import TenantsPage from "../pages/admin/tenants";
import TenantProfilePage from "../pages/admin/tenant-detail";
import PlansPage from "../pages/admin/plans";
import RevenuePage from "../pages/admin/revenue";
import BillingPage from "../pages/admin/billing";
import PaymentsPage from "../pages/admin/payments";
import UsersPage from "../pages/admin/users";
import RolesPage from "../pages/admin/roles";
import FeaturesPage from "../pages/admin/feature-flags";
import SupportPage from "../pages/admin/support";
import AuditLogsPage from "../pages/admin/audit-logs";
import NotificationsPage from "../pages/admin/notifications";
import IntegrationsPage from "../pages/admin/integrations";
import SecurityPage from "../pages/admin/security";
import SettingsPage from "../pages/admin/settings";

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

      {/* SalonOS super admin portal */}
      <Route path='/admin' element={<AdminPortalLayout />}>
        <Route index element={<Navigate to='/admin/dashboard' replace />} />
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='tenants' element={<TenantsPage />} />
        <Route path='tenants/:tenantId' element={<TenantProfilePage />} />
        <Route path='plans' element={<PlansPage />} />
        <Route path='revenue' element={<RevenuePage />} />
        <Route path='billing' element={<BillingPage />} />
        <Route path='payments' element={<PaymentsPage />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='roles' element={<RolesPage />} />
        <Route path='feature-flags' element={<FeaturesPage />} />
        <Route path='support' element={<SupportPage />} />
        <Route path='audit-logs' element={<AuditLogsPage />} />
        <Route path='notifications' element={<NotificationsPage />} />
        <Route path='integrations' element={<IntegrationsPage />} />
        <Route path='security' element={<SecurityPage />} />
        <Route path='settings' element={<SettingsPage />} />
      </Route>

      {/* Legacy standalone admin pages (inside the old dashboard shell) */}
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

      {/* 404 â€” catch all unmatched routes */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;