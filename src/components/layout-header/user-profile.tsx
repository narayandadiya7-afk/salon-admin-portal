import { useContext, useEffect, useState } from "react";
import Utils from "../../utils";
import AuthUtil from "../../utils/auth";
import { UserContext } from "../../context";
import {
  faEnvelope,
  faPhone,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Avatar from "../avatar/avatar";
import styles from "./layout-header.module.css";
import GenericPopover from "../pop-over";
import { TContext } from "../../types/config";

// type Options = {
//   value: string;
//   label: string;
// };

export default function UserProfile() {
  const context: TContext = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(context.user);
  const navigate = useNavigate(); // Replaces Next.js router
  // const [options, setOptions] = useState<Options[]>([]);

  useEffect(() => {
    setUserDetails(context.user);
    // fetchListOfModelData();
    // setModuleId(context.ActiveModuleId);
  }, [context.user]);

  function signOut() {
    AuthUtil.logout();
    Utils.redirectUrl(`/login`);
  }

  const handleClick = () => {
    navigate("/dashboard/user-profile/form"); // Replaces router.push
  };

  // const fetchListOfModelData = async () => {
  //   // Populate options based on the user's module list
  //   // let options = context?.user?.moduleList.map((item: any) => ({
  //   //   value: item.moduleUniqueId,
  //   //   label: item.moduleName,
  //   // }));
  //   // setOptions(options);
  // };

  const userProfileContent = (
    <div className={styles.userBox}>
      <div className={styles.pencil}>
        <Avatar name={userDetails?.displayName || ""} />
        <span className={styles.userName}>
          {userDetails?.displayName
            ? userDetails?.displayName
            : userDetails?.emailId}
        </span>
      </div>
      <div className={styles.userProfile}>
        <div className={styles.profileWrapper}>
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
          <span>{userDetails?.emailId}</span>
        </div>
        <div className={styles.profileWrapper}>
          <FontAwesomeIcon icon={faPhone} size="lg" />
          <span>{userDetails?.mobileNo}</span>
        </div>
        <div
          className={styles.profileWrapper}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          View More
        </div>
      </div>
      <div className={styles.logoutDiv}>
        <Button onClick={signOut}>
          <FontAwesomeIcon icon={faSignOut} size="lg" />
          <span> Sign Out</span>
        </Button>
      </div>
    </div>
  );

  return (
    <GenericPopover
      content={userProfileContent}
      icon={faUser}
      overlayClassName={styles.popoverOverlay}
      iconClassName={styles.userIcon}
      containerClassName={styles.tooltipContainer}
    />
  );
}
