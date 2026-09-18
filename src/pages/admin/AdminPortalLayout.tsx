import React from "react";
import { Outlet } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminPortalLayout() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}