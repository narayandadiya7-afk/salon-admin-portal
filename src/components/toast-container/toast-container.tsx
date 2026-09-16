/**
 * ToastContainer.tsx
 * This container used to show alert and  has controlled by useDrawer hook
 */
import React, { ReactNode, useEffect } from "react";
import useToast from "../../hooks/useToast";
import styles from "./toast-container.module.css";
import classNames from "classnames";

type ToastProps = {
  time?: number;
};

export default function ToastContainer(props: ToastProps) {
  let { time = 3000 } = props;
  const {
    showToast,
    closeToast,
    onCloseToast,
    position,
    content,
    title,
    type,
  } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseToast();
    }, time);
    return () => clearTimeout(timer);
  }, [showToast, time]);
  if (!showToast) return <></>;

  return (
    <div className={classNames(styles.toast, styles[position])}>
      <div className={classNames(styles.toastContainer, styles[type])}>
        <div className={styles.toastTitle}>{title}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}
