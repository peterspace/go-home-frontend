import { useMemo } from "react";
import styles from "./ContainerHeaderDesktop1.module.css";
const ContainerHeaderDesktop1 = ({
  dimensions,
  containerHeaderDesktopPosition,
  containerHeaderDesktopTop,
  containerHeaderDesktopLeft,
}) => {
  const containerHeaderDesktop1Style = useMemo(() => {
    return {
      position: containerHeaderDesktopPosition,
      top: containerHeaderDesktopTop,
      left: containerHeaderDesktopLeft,
    };
  }, [
    containerHeaderDesktopPosition,
    containerHeaderDesktopTop,
    containerHeaderDesktopLeft,
  ]);

  return (
    <div
      className={styles.containerHeaderDesktop}
      style={containerHeaderDesktop1Style}
    >
      <div className={styles.headerDesktop}>
        <div className={styles.govercityLogo}>
          <img className={styles.logoFrameIcon} alt="" src={dimensions} />
          <div className={styles.govercity}>Govercity</div>
        </div>
        <div className={styles.headerDesktopInner}>
          <div className={styles.servicesParent}>
            <div className={styles.services}>Services</div>
            <div className={styles.contact}>Contact</div>
            <div className={styles.contact}>About</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerHeaderDesktop1;
