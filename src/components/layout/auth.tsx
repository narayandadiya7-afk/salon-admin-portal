/**
 * Auth.tsx
 * This is the auth layout of all authentication pages.
 */

import React, { useEffect, useState } from "react";
import Styles from "./layout.module.css";
import AuthUtil from "../../utils/auth";
// import Loader from "../loader/loader";
// import CookieBanner from '../cookies/cookie'

interface AuthComponentProps {
  children: React.ReactNode; // Define the type for children
}

export default function AuthComponent({ children }: AuthComponentProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (AuthUtil.isTokenExist()) {
        setState(true);
        window.location.href = "/admin/dashboard";
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuthentication();
  }, [isAuthenticated]);

  if (state) {
    return null;
  }

  return isAuthenticated ? (
    <div className={Styles.authLayout}>
      {/* <div className={Styles.logo}></div> */}
      <div className={Styles.backgroundImage}></div>
      <div className={Styles.pages}>{children}</div>
    </div>
  ) : (
    <></>
  );
}
