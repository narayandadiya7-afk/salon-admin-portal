import classNames from "classnames";
import useDrawer from "../../hooks/useDrawer";
import styles from "./drawer-container.module.css";

export default function DrawerContainer() {
  const {
    showDrawer,
    onCloseDrawer,
    DrawerComponent,
    // drawerTitle,
    // dimmer,
    position,
    width,
  } = useDrawer();
  const handleOverlayClick = (event: {
    target: unknown;
    currentTarget: unknown;
  }) => {
    if (event.target === event.currentTarget) {
      onCloseDrawer();
    }
  };

  const drawerContainerClasses = classNames(
    styles.drawerContainer,
    styles[position],
    {
      [styles.closing]: !showDrawer,
    }
  );

  return (
    <div
      className={classNames(styles.drawerOverlay, {
        [styles.show]: showDrawer,
      })}
      onClick={handleOverlayClick}
    >
      <div
        className={drawerContainerClasses}
        style={{
          width: width,
          boxShadow: "0px 0px 20px rgba(34, 36, 38, 0.15)",
        }}
      >
        {DrawerComponent && <DrawerComponent />}
      </div>
    </div>
  );
}
