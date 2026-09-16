/**
 * Advance Panel.tsx
 * This Advance Panel component will be act as right sidebar contains advance configuration
 */
import DashboardLayout from "../../components/layout/dashboard";
import styles from "./advance.module.css";

type TProps = {
  isOpen?: boolean;
  sideBarStatus?: boolean;
};

export default function AdvanceSidebarComponent(props: TProps) {
  console.log({ props });
  return (
    <div className={styles.parentContainer}>
      <span className={styles.verticalText}>Coming soon ....</span>
    </div>
  );
}

AdvanceSidebarComponent.getLayout = DashboardLayout;
