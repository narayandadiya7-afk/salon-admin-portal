/**
 * ModalContainer.tsx
 * This container used to wrap the modal functionality has controlled by useModal hook
 */
import classNames from "classnames";
import React, { useEffect } from "react";
import useModal from "../../hooks/useModal";
import styles from "./modal-container.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";

export default function ModalContainer() {
  const {
    showModal,
    onCloseModal,
    title,
    size,
    ModalComponent,
    onSave,
    content,
    showTitle,
    showButton,
    remarkOpen = true,
    preview,
  } = useModal();
  const handleOverlayClick = (event: any) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };
  if (!showModal || ModalComponent === null) return <></>;
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div
        className={classNames(
          preview == false ? styles.modalContainer1 : styles.modalContainer,
          styles[size],
          "rounded-lg"
        )}
      >
        {showTitle && (
          <div
            className={classNames(styles.modalTitle, "py-4 px-4  rounded-t-lg")}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-3" />
            <span>{title}</span>
          </div>
        )}
        <div className={classNames("px-6 py-6")}>
          {content ? content : <ModalComponent />}
        </div>
        {showButton && (
          <div
            className={classNames(
              styles.modalFooter,
              "py-4 px-4  rounded-b-lg"
            )}
          >
            <div className={classNames("flex justify-end")}>
              <div className={classNames("mr-2")}>
                <Button onClick={onCloseModal}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />{" "}
                  No
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    if (onSave) {
                      onSave();
                    }
                    if (remarkOpen) {
                      onCloseModal();
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="lg"
                    style={{ color: "#ffffff", marginRight: "7px" }}
                  />
                  Yes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
