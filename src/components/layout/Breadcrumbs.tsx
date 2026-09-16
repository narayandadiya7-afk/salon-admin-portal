/**
 * Breadcrumbs Component
 * Automatic breadcrumb generation from current route
 */

import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
      onClick: () => navigate('/admin/dashboard'),
      className: 'breadcrumb-home',
    },
    ...pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const isLast = index === pathSnippets.length - 1;
      
      // Capitalize and format the breadcrumb text
      const label = snippet
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        title: label,
        onClick: !isLast ? () => navigate(url) : undefined,
        className: isLast ? 'breadcrumb-current' : 'breadcrumb-link',
      };
    }),
  ];

  return (
    <div className="breadcrumbs-container">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumbs;
