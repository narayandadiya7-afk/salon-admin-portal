/*
 *  page-header.tsx
 *  This component to render the page header in the entire application from this single file.
 *  Also we manage the common styling of page header
 */

import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "../page-header/page-header.module.css";

type Size = "small" | "basic" | "medium" | "large";

type PageHeaderProps = {
  title?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  itemsClassName?: string;
  titleClassName?: string;
  size?: Size;
  searchButton?: any;
};

export const PageHeader = (props: PageHeaderProps) => {
  let {
    children,
    className,
    itemsClassName,
    titleClassName,
    icon,
    title,
    size,
    searchButton,
    ...pageHeaderProps
  } = props;

  title = title ?? "PageTitle";
  children = children;
  size = size ?? "small";

  const sizeClass = styles[size];

  return (
    <div
      {...pageHeaderProps}
      className={classNames(styles.mainHeader, className)}
    >
      <div
        {...pageHeaderProps}
        className={classNames(styles.headerTitle, titleClassName, sizeClass)}
      >
        <span className={styles.headerIcon}>{icon}</span>
        <strong className={styles.title}>{title}</strong>
        &nbsp;
        <div
          {...pageHeaderProps}
          className={classNames(styles.headerTitle, titleClassName, sizeClass)}
        >
          {searchButton}
        </div>
      </div>
      <div
        {...pageHeaderProps}
        className={classNames(styles.headerItems, itemsClassName, sizeClass)}
      >
        {children}
      </div>
    </div>
  );
};
