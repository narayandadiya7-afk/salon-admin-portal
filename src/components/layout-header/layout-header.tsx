/*
 *  LayoutHeader.tsx
 * This Component is used to manage menu functionality in a single header and we'll use it all over the project.
 */

import UserProfile from "./user-profile";
// import { useState } from "react";
import styles from "./layout-header.module.css";
// import useDrawer from "../../hooks/useDrawer";
// import { DrawerOpen } from "../../state/drawer/slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  // faUser,
  faCaretSquareRight,
  faCaretSquareLeft,
} from "@fortawesome/free-solid-svg-icons";
// import classNames from "classnames";

type TProps = {
  onToggleSideBar: () => void;
  sideBarStatus: boolean;
};

export default function LayoutHeader(props: TProps) {
  // const { onShowDrawer, onCloseDrawer } = useDrawer();
  // const context: any = useContext(UserContext)
  // const [userDetails, setUserDetails] = useState(context.user)
  // const [clicked, setClicked] = useState(false);

  // useEffect(() => {
  //   setUserDetails(context.user)
  // }, [context.user, userDetails])

  // const handleClick = () => {
  //   console.log("Hi, I am Admin", clicked);
  //   setClicked(true);
  // };

  const onHandleEdit = () => {
    props.onToggleSideBar();
    // onShowDrawer({
    //   dimmer: true,
    //   width: '18rem',
    //   name: 'Show Drawer Form',
    //   Component: SiderBarComponent,
    //   position: DrawerOpen.left,
    // })
  };

  const HomeButton = () => {};

  return (
    <div className={styles.header}>
      <div className={styles.logoSize}>
        <div className={styles.logo} onClick={onHandleEdit}>
          <FontAwesomeIcon
            icon={props.sideBarStatus ? faCaretSquareLeft : faCaretSquareRight}
            size="xs"
            className={styles.primaryColor}
            // onClick={() => HomeButton()}
          />
        </div>
        <div className={styles.welcomelogo}></div>
        {/* <div className={styles.displayNamee}>{userDetails?.displayName}</div> */}
      </div>

      <div className={styles.headerMenu}>
        <div style={{ marginTop: "2px", cursor: "pointer" }}>
          <FontAwesomeIcon
            icon={faHome}
            size="lg"
            onClick={() => HomeButton()}
          />
        </div>
        <div className={styles.userProfileIcon}>
          <UserProfile />
        </div>
        <div className={styles.gearicon}>
          {/* {" "}
          <FontAwesomeIcon
            icon={faGear}
            size="lg"
            onClick={() => onHandleEdit2()}
          /> */}
          {/* <Label>Select Language</Label>
          <LanguageSelector /> */}
        </div>
      </div>
    </div>
  );
}
