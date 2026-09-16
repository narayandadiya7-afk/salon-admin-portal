/**
 * Theme Toggle Component
 * Modern, user-friendly theme selector with visual previews
 */

import React, { useMemo } from 'react';
import { Dropdown, Space, Tag } from 'antd';
import { BgColorsOutlined, CheckOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTheme } from '../../hooks/useTheme';
import { themes, themeNames, ThemeMode } from '../../config/theme';
import './ThemeToggle.css';

const ThemeToggle: React.FC = React.memo(() => {
  const { theme, setTheme } = useTheme();

  // Define theme categories for better organization
  const lightThemes: ThemeMode[] = ['light', 'ocean', 'forest', 'slate'];
  const darkThemes: ThemeMode[] = ['dark', 'midnight', 'nord', 'dracula'];

  // Memoize menu items to prevent re-creation on every render
  const items: MenuProps['items'] = useMemo(() => {
    // Create menu items with visual theme previews
    const createThemeItem = (themeMode: ThemeMode) => {
      const colors = themes[themeMode];
      const isSelected = theme === themeMode;
      const isDark = darkThemes.includes(themeMode);

      return {
        key: themeMode,
        label: (
          <div className="theme-menu-item">
            <div className="theme-preview">
              <div 
                className="theme-color-primary" 
                style={{ background: colors.primary }}
              />
              <div 
                className="theme-color-surface" 
                style={{ background: colors.surface }}
              />
              <div 
                className="theme-color-background" 
                style={{ background: colors.background }}
              />
            </div>
            <Space className="theme-info" size={4}>
              {isDark ? (
                <MoonOutlined style={{ fontSize: 14, color: 'var(--theme-text-secondary)' }} />
              ) : (
                <SunOutlined style={{ fontSize: 14, color: 'var(--theme-text-secondary)' }} />
              )}
              <span className="theme-name">{themeNames[themeMode]}</span>
              {isSelected && (
                <CheckOutlined style={{ fontSize: 12, color: 'var(--theme-primary)' }} />
              )}
            </Space>
          </div>
        ),
        onClick: () => setTheme(themeMode),
        className: isSelected ? 'theme-menu-item-selected' : '',
      };
    };

    return [
      {
        type: 'group',
        label: (
          <div className="theme-group-label">
            <SunOutlined style={{ fontSize: 12 }} />
            <span>Light Themes</span>
          </div>
        ),
        children: lightThemes.map(createThemeItem),
      },
      { type: 'divider' },
      {
        type: 'group',
        label: (
          <div className="theme-group-label">
            <MoonOutlined style={{ fontSize: 12 }} />
            <span>Dark Themes</span>
          </div>
        ),
        children: darkThemes.map(createThemeItem),
      },
    ] as MenuProps['items'];
  }, [theme, setTheme, lightThemes, darkThemes]); // Added lightThemes and darkThemes to dependencies as they are used inside createThemeItem

  const isDarkTheme = darkThemes.includes(theme);

  return (
    <Dropdown 
      menu={{ items }} 
      placement="bottomRight" 
      trigger={['click']}
      overlayClassName="theme-toggle-dropdown"
      destroyOnHidden={false}
    >
      <div className="theme-toggle-button">
        <Space size={8}>
          {isDarkTheme ? (
            <MoonOutlined className="theme-toggle-icon" />
          ) : (
            <SunOutlined className="theme-toggle-icon" />
          )}
          <span className="theme-toggle-text">{themeNames[theme]}</span>
          <Tag 
            className="theme-toggle-badge"
            style={{ 
              background: themes[theme].primary,
              border: 'none',
              margin: 0,
            }}
          >
            <BgColorsOutlined style={{ fontSize: 10, color: '#fff' }} />
          </Tag>
        </Space>
      </div>
    </Dropdown>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
