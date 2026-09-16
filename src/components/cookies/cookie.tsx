// CookieBanner.js
import { useState } from "react";
import styles from "./cookie.module.css";

const CookieBanner = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("acceptedCookies") === "true"
      : false
  );

  const handleAcceptCookies = () => {
    setAcceptedCookies(true);
    localStorage?.setItem("acceptedCookies", "true");
  };

  return (
    <div
      className={`${styles["cookie-banner"]} ${acceptedCookies ? styles["hidden"] : styles["visible"]}`}
    >
      {/* <div>
        <p style={{ margin: '0px' }}>We use cookies to ensure that we give you the best experience on our website. If you continue to use this site, we will assume that you are happy with it.</p>
      </div> */}
      <div className={styles["buttons-container"]}>
        <button
          className={styles["accept-button"]}
          onClick={handleAcceptCookies}
        >
          Ok
        </button>
        <button className={styles["privacy-button"]}>Privacy policy</button>
      </div>
    </div>
  );
};

export default CookieBanner;
