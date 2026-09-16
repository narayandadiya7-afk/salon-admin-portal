import React, { ReactNode } from "react";
import { Layout } from "antd";

const { Header, Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Header>My App</Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
