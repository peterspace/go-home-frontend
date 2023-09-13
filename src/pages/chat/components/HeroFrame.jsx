import { useMemo } from "react";
import styles from "./HeroFrame.module.css";
const HeroFrame = ({
  imageDimensions,
  showLaunch2,
  showLaunch3,
  heroFramePosition,
  heroFrameBackgroundImage,
  heroFrameTop,
  heroFrameLeft,
}) => {
  const heroFrameStyle = useMemo(() => {
    return {
      position: heroFramePosition,
      backgroundImage: heroFrameBackgroundImage,
      top: heroFrameTop,
      left: heroFrameLeft,
    };
  }, [
    heroFramePosition,
    heroFrameBackgroundImage,
    heroFrameTop,
    heroFrameLeft,
  ]);

  return (
    <div className={styles.heroframe} style={heroFrameStyle}>
      <div className={styles.govercity}>Govercity</div>
      <div className={styles.seamlessExchangeBeyond}>
        Seamless exchange beyond boundaries
      </div>
      <img className={styles.heroframeChild} alt="" src={imageDimensions} />
      {showLaunch2 && (
        <div className={styles.launch2}>
          <div className={styles.explore}>Explore</div>
          <img
            className={styles.chevronRightIcon}
            alt=""
            src="/chevronright.svg"
          />
        </div>
      )}
      {showLaunch3 && (
        <div className={styles.launch3}>
          <div className={styles.explore}>Launch</div>
          <img
            className={styles.chevronRightIcon}
            alt=""
            src="/chevronright1.svg"
          />
        </div>
      )}
    </div>
  );
};

export default HeroFrame;
