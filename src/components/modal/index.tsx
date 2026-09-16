import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import classNames from "classnames";
import styles from "./modal.module.css";

interface CustomModalProps {
  title: string;
  okText?: string;
  cancelText?: string;
  isOpen: boolean;
  onOk?: (...args: any) => void;
  onCancel: () => void;
  children: React.ReactNode;
  isFullScreen?: boolean; // Optional prop to determine if the modal is full-screen
  hideOkButton?: boolean; // Optional prop to hide the OK button
  hideCancelButton?: boolean; // Optional prop to hide the Cancel button
  useCustomHeader?: boolean; // New prop to conditionally apply header styles
  disableOk?: boolean; // New prop to disable the OK button
  width?: string | number;
  style?: React.CSSProperties;
  customColor?: string;
  footer?: React.ReactNode[] | null;
  bodyPadding?: string;
  cusHeader?: boolean;
}

/**
 * A reusable modal component that wraps Ant Design's Modal component
 * and expects a title, isOpen flag, onOk callback, onCancel callback, children,
 * and optional flags for full-screen mode, hiding the OK button, and disabling the OK button.
 */
const CustomModal: React.FC<CustomModalProps> = ({
  title,
  isOpen,
  onOk,
  onCancel,
  children,
  style,
  okText = "Ok",
  cancelText = "Close",
  isFullScreen = false,
  hideOkButton = false,
  hideCancelButton = false, // Use this prop to hide the Cancel button
  disableOk = false, // Default to false
  width,
  footer,
  bodyPadding = "12px",
  cusHeader = false,
}) => {
  const [hideOK, setHideOk] = useState(false);
  const [hideCancel, setHideCancel] = useState(false);

  useEffect(() => {
    setHideOk(hideOkButton);
    setHideCancel(hideCancelButton); // Set the hideCancel state based on the prop
  }, [hideOkButton, hideCancelButton]);

  const cusHeaderStyles = cusHeader
    ? {
        "--custom-header-bg": "white",
        "--custom-header-title-color": "black",
        "--custom-header-close-color": "black",
      }
    : {
        "--custom-header-close-color": "white",
      };

  return (
    <Modal
      footer={footer ? footer : null}
      title={title}
      open={isOpen}
      onCancel={onCancel}
      width={isFullScreen ? "80%" : width || undefined} // Set width to full screen if needed
      className={styles.noFullScreen}
      // className={classNames([
      //   isFullScreen ? styles.fullScreen : styles.noFullScreen,
      //   styles.antModalBody,
      //   {
      //     "custom-header": cusHeader,
      //   },
      // ])}
      styles={{
        body: {
          padding: bodyPadding,
        },
      }}
      style={{
        ...style,
        // ...cusHeaderStyles,
      }}
      destroyOnHidden
      centered
    >
      {children}

      {/* Custom footer */}

      <div
        className={styles.customFooter}
        style={{
          display:
            footer === null || (hideOkButton && hideCancelButton)
              ? "none"
              : "flex",
          justifyContent: "end",
          gap: "10px"
        }}
      >
        {!hideOK && (
          <Button
            onClick={() => {
              if (!disableOk && typeof onOk === "function") onOk(); // Prevent onClick if disableOk is true or onOk is not a function
            }}
            // className={classNames(
            //   okText?.toLowerCase() === "yes"
            //     ? styles.footerText
            //     : styles.buttonFooterText,
            //   { [styles.disabledOk]: disableOk } // Apply disabled style when disableOk is true
            // )}
            style={{
              cursor: disableOk ? "not-allowed" : "pointer", // Change cursor to indicate disabled state
              opacity: disableOk ? 0.5 : 1, // Dim the button if disabled
            }}
            type="primary"
          >
            {okText}
          </Button>
        )}
        {!hideCancel && (
          <Button
            onClick={onCancel}
            // className={
            //   okText?.toLowerCase() === "yes"
            //     ? styles.footerText
            //     : styles.buttonFooterText
            // }
            type="default"
          >
            {cancelText}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
