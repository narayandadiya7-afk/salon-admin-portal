import {
  faCheck,
  faCircle,
  faCircleCheck,
  faEye,
  faPencil,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./statusLabel.module.css";

type TProps = {
  status?: string;
};

function StatusLabel(props: TProps) {
  return (
    <>
      {props.status ? (
        <span
          className={
            props.status === "Draft"
              ? styles.draftTag
              : props.status === "Approved"
                ? styles.approvedTag
                : props.status === "Submitted"
                  ? styles.submitTag
                  : props.status === "Reviewed"
                    ? styles.reviewedTag
                    : styles.defaultTag
          }
        >
          <span style={{ marginRight: "5px" }}>{props.status}</span>
          <FontAwesomeIcon
            icon={
              props.status === "Draft"
                ? faPencil
                : props.status === "Approved"
                  ? faCircleCheck
                  : props.status === "Submitted"
                    ? faSave
                    : props.status === "Reviewed"
                    ? faEye
                    : faCircle
            }
            size="sm"
          />
        </span>
      ) : (
        <></>
      )}
    </>
  );
}

export default StatusLabel;
