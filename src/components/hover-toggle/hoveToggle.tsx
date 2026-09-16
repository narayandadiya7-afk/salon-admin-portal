/* Hover toggle Section 
  This files contains the hover toggle section for the hover section and will be commonly used throughout the application.
*/
import classNames from "classnames";
import { useState, useEffect, useRef, ReactNode, HTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./hoverToggle.module.css";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

type HoverToggleProps = {
  Icon?: IconProp;
  children?: ReactNode;
  className?: string;
  position?: string;
  size?: SizeProp;
  isHover?: boolean;
  profile?: boolean;
  isButton?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const HoverToggle = (props: HoverToggleProps) => {
  const {
    Icon,
    children,
    size,
    className,
    position = "bottom",
    isHover = true,
    profile,
  } = props;
  const [isHidden, setIsHidden] = useState(true);
  const myDivRef = useRef<HTMLDivElement>(null);
  const hiddenDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (isHidden && hiddenDivRef.current) {
        const DivRefStyle = hiddenDivRef.current.style;
        DivRefStyle.display = "block";
        DivRefStyle.color = "black";
        DivRefStyle.backgroundColor = "white";
        DivRefStyle.position = "absolute";
        DivRefStyle.borderRadius = "0.2rem";
        DivRefStyle.zIndex = "2";
      }
    };

    //
    const handleMouseLeave = () => {
      if (isHidden && hiddenDivRef.current) {
        hiddenDivRef.current.style.display = "none";
      }
    };

    //when user click on icon
    const handleClick = () => {
      setIsHidden((prevIsHidden) => !prevIsHidden);
      if (hiddenDivRef.current) {
        hiddenDivRef.current.style.display = isHidden ? "block" : "none";
        hiddenDivRef.current.style.color = "black";
        hiddenDivRef.current.style.backgroundColor = "white";
        hiddenDivRef.current.style.position = "absolute";
        hiddenDivRef.current.style.borderRadius = "0.2rem";
        hiddenDivRef.current.style.zIndex = "2";
      }
    };

    //when user outside the hover then close the hover
    const handleBodyClick = (event: MouseEvent) => {
      if (
        myDivRef.current &&
        !myDivRef.current.contains(event.target as Node)
      ) {
        setIsHidden(true);
        if (hiddenDivRef.current) {
          hiddenDivRef.current.style.display = "none";
        }
      }
    };

    //eventListner code
    const myDivRedEvent = myDivRef.current;

    if (isHover) {
      myDivRedEvent?.addEventListener("mouseenter", handleMouseEnter);
      myDivRedEvent?.addEventListener("mouseleave", handleMouseLeave);
    }
    myDivRedEvent?.addEventListener("click", handleClick);
    document.body.addEventListener("click", handleBodyClick);

    return () => {
      myDivRedEvent?.removeEventListener("mouseenter", handleMouseEnter);
      myDivRedEvent?.removeEventListener("mouseleave", handleMouseLeave);
      myDivRedEvent?.removeEventListener("click", handleClick);
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [isHidden]);

  return (
    <div className="relative">
      <span ref={myDivRef} className={profile ? "profile" : "myDIV"}>
        {/* {props?.isButton
          ? Icon
          : Icon && <FontAwesomeIcon icon={Icon} size={size} />} */}
        <FontAwesomeIcon icon={Icon as IconProp} size={size} />
      </span>
      <div
        ref={hiddenDivRef}
        className={classNames(styles.hide, className, styles[position])}
      >
        {children}
      </div>
    </div>
  );
};

export default HoverToggle;
