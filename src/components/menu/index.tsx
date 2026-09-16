import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
// import DashboardLayout from "../../components/layout/dashboard";
import styles from "./menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { TContext, TMenuItem } from "../../types/config";

library.add(fas, fab, far);

type TProps = {
  isOpen?: boolean;
  sideBarStatus?: boolean;
};

export default function SidebarComponent(props: TProps) {
  const context: TContext = useContext(UserContext);
  const menuData = context.menuHierarchy;
  const navigate = useNavigate(); // Replaces useRouter from Next.js

  const handleClick = (url: string) => {
    navigate(url); // Use navigate to change routes
  };

  const MenuItem = (item: TMenuItem) => {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const toggleSubMenu = () => {
      setIsSubMenuVisible(!isSubMenuVisible);
      if (item.parentId === 0 || (item.children && item.children.length > 0)) {
        setIsActive(!isActive);
      }
    };

    const hasChildren = (item: TMenuItem) => {
      return item.children && item.children.length > 0;
    };

    const isChildActiveRecursive = (children: any) => {
      return (
        children &&
        children.some((child: any) => {
          if (child.children) {
            return isChildActiveRecursive(child.children);
          }
          // Replace this with react-router's logic if needed, for example:
          return window.location.pathname === child.entityUrl;
        })
      );
    };

    useEffect(() => {
      const isChildActive = isChildActiveRecursive(item.children);

      setIsSubMenuVisible(isChildActive);
      setIsActive(isChildActive || window.location.pathname === item.entityUrl);
    }, [item.children, item.entityUrl, item.parentId]);

    return (
      <div className={classNames(styles.user_menu)}>
        <div
          className={classNames(styles.item, { [styles.active]: isActive })}
          onClick={toggleSubMenu}
        >
          {hasChildren(item) ? (
            <div className={styles.iconStyle}>
              <span className={styles.spanOfInconStyle}>
                <FontAwesomeIcon
                  size="lg"
                  icon={item?.iconName}
                  className={styles.primaryColor}
                />
              </span>
              <span className={`${styles.menu_name} ${styles.spanDispName}`}>
                {props?.sideBarStatus ? item.dispName : ""}
              </span>
            </div>
          ) : (
            <span
              className={styles.linkStyle}
              onClick={() => handleClick(item.entityUrl)} // Navigate on click
            >
              <span className={styles.linkSpan}>
                <FontAwesomeIcon
                  size="lg"
                  icon={item?.iconName}
                  className={styles.primaryColor}
                />
              </span>
              <span className={`${styles.menu_name} ${styles.spanDispName}`}>
                {props?.sideBarStatus ? item.dispName : ""}
              </span>
            </span>
          )}
          {hasChildren(item) && props.sideBarStatus && (
            <div>
              <FontAwesomeIcon
                icon={isSubMenuVisible ? faCaretUp : faCaretDown}
              />
            </div>
          )}
        </div>
        {isSubMenuVisible && hasChildren(item) && (
          <div className={styles.sub_menu}>
            {item.children.map((subItem: any, index: any) => (
              <MenuItem key={index} item={subItem} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className={styles.user_sidebar}>
        <div className={styles.user_detail}>
          <div className={styles.user_box}>
            <span
              className={
                props?.sideBarStatus ? styles.user_pic : styles.user_pic_compact
              }
            ></span>
          </div>
        </div>
        <div className={styles.menuSection}>
          {menuData &&
            menuData?.map((item: any, index: number) => (
              <MenuItem key={index} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}
