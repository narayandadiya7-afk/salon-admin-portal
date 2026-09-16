// Advance.tsx
// This component is used to show the toggle icon for advance panel

import styles from "./advance.module.css";
import classNames from "classnames";
import {
  faArrowCircleLeft,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TProps = {
  isAdvancePanel: boolean;
  onToggleAdvancePanel: () => void;
};

const RightIcon = (props: TProps) => {
  return (
    <div
      className={classNames(
        styles.iconContainer,
        { [styles.openPanelWidth]: props.isAdvancePanel },
        { [styles.closePanelWidth]: !props.isAdvancePanel }
      )}
    >
      <FontAwesomeIcon
        className={styles.icon}
        icon={props.isAdvancePanel ? faTimesCircle : faArrowCircleLeft}
        onClick={() => props.onToggleAdvancePanel()}
      ></FontAwesomeIcon>
    </div>
  );
};

export default RightIcon;
