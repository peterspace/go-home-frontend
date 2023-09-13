import { useMemo } from 'react';
import styles from './ContainerHeaderDesktop.module.css';
const ContainerHeaderDesktop = ({
  containerHeaderDesktopPosition,
  containerHeaderDesktopTop,
  containerHeaderDesktopLeft,
}) => {
  const containerHeaderDesktopStyle = useMemo(() => {
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
      style={containerHeaderDesktopStyle}
    >
      <div className={styles.headerDesktop}>
        <div className={styles.govercityLogo}>
          <img className={styles.logoFrameIcon} alt="" src="/logoframe.svg" />
          <div className={styles.govercity}>Govercity</div>
        </div>
        <div className={styles.headerDesktopInner}>
          <div className={styles.servicesParent}>
            <div className={`cursor-pointer ${styles.services}`}>Services</div>
            <div className={styles.contact}>Contact</div>
            <div className={styles.contact}>About</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerHeaderDesktop;
