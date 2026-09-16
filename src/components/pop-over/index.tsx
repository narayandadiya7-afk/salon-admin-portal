import React, { ReactNode } from "react";
import { Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type TGenericPopoverProps = {
  content: ReactNode; // Content of the popover
  trigger?: "click" | "hover" | "focus"; // Popover trigger
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"; // Placement of the popover
  icon?: IconProp; // FontAwesomeIcon to show on the trigger
  overlayClassName?: string; // Custom class for the overlay
  iconClassName?: string; // Custom class for the icon
  containerClassName?: string; // Custom class for the container div
};

const GenericPopover: React.FC<TGenericPopoverProps> = ({
  content,
  trigger = "click",
  placement = "bottomRight",
  icon,
  overlayClassName = "",
  iconClassName = "",
  containerClassName = "",
}) => {
  return (
    <Popover
      content={content}
      trigger={trigger}
      placement={placement}
      overlayClassName={overlayClassName}
    >
      <div className={containerClassName}>
        {icon && (
          <FontAwesomeIcon icon={icon} size="lg" className={iconClassName} />
        )}
      </div>
    </Popover>
  );
};

export default GenericPopover;
