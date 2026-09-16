import React, { ReactNode } from "react";
// import { Layout } from "antd";
import AuthComponent from "../components/layout/auth";
import ToastContainer from "../components/toast-container/toast-container";

// const { Content } = Layout;

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthComponent>
      {children}
      <ToastContainer />
    </AuthComponent>
  );
};

export default AuthLayout;
