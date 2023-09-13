import { useMemo } from 'react';
import styles from './ContainerHeaderDesktop.module.css';
const ContainerHeaderDesktop = (props) => {
  const {
    containerHeaderDesktopPosition,
    containerHeaderDesktopTop,
    containerHeaderDesktopLeft,
    setIsAbout,
    setIsLaunch,
    setIsContact,
    setIsHome,
  } = props;
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
      <div className={`flex flex-row justify-between ${styles.headerDesktop}`}>
        <div
          className={styles.govercityLogo}
          onClick={() => {
            setIsHome(true);
            setIsAbout(false);
            setIsLaunch(false);
            setIsContact(false);
          }}
        >
          <img className={styles.logoFrameIcon} alt="" src="/logoframe.svg" />
          <div className={styles.govercity}>Govercity</div>
        </div>
        <div className={styles.headerDesktopInner}>
          <div className={styles.servicesParent}>
            <div
              className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.services}`}
              onClick={() => {
                setIsHome(true);
                setIsAbout(false);
                setIsLaunch(false);
                setIsContact(false);
              }}
            >
              Services
            </div>
            <div
              className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.contact}`}
              onClick={() => {
                setIsHome(false);
                setIsAbout(false);
                setIsLaunch(false);
                setIsContact(true);
              }}
            >
              Contact
            </div>
            <div
              className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.contact}`}
              onClick={() => {
                setIsHome(false);
                setIsAbout(true);
                setIsLaunch(false);
                setIsContact(false);
              }}
            >
              About
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerHeaderDesktop;
