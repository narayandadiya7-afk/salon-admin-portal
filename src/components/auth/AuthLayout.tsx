/**
 * Simple Auth Layout
 * Clean and professional authentication layout
 */

import React, { ReactNode, useState, useEffect } from "react";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [largeLogo, setLargeLogo] = useState<string>("");

  // Load logo from localStorage
  useEffect(() => {
    const storedLargeLogo = localStorage.getItem("app-logo-large");
    setLargeLogo(storedLargeLogo || "");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            {largeLogo ? (
              <img
                src={largeLogo}
                alt='Logo'
                style={{ height: "40px", objectFit: "contain" }}
              />
            ) : (
              "WebaniX"
            )}
          </div>
          <p className={styles.tagline}>Modern Project Management</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
