/*
 *  Loader.tsx
 * This Component is used to manage loader commonly.
 */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import styles from "./loader.module.css";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

type TLoader = {
  size?: SizeProp;
};
export default function Loader(props: TLoader) {
  const { size } = props;
  return (
    <div className={styles.loaderContainer}>
      <FontAwesomeIcon
        icon={faCircleNotch}
        className={styles.spin}
        spin
        size={size}
      />
    </div>
  );
}
