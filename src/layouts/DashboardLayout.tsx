import React, { ReactNode } from "react";
import MainLayout from "../components/layout/MainLayout";
import DrawerContainer from "../components/drawer-container/drawer-container";
import ModalContainer from "../components/modal-container/modal-container";
import ToastContainer from "../components/toast-container/toast-container";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <MainLayout>
      {children}
      <DrawerContainer />
      <ModalContainer />
      <ToastContainer />
    </MainLayout>
  );
};

export default DashboardLayout;
