import { useMemo } from "react";
import AboutMenu from "./AboutMenu";
import styles from "./VisionContainer.module.css";
const VisionContainer = ({
  visionText,
  visionStatement,
  contentTop,
  contentLeft,
}) => {
  const aboutMenuStyle = useMemo(() => {
    return {
      top: contentTop,
      left: contentLeft,
    };
  }, [contentTop, contentLeft]);

  return (
    // <div className={styles.aboutformContainer}>
    //   <div className={styles.aboutForm}>
    //     <div className={styles.aboutFormChild} />
    //     <div className={styles.visionBody}>
    //       <div className={styles.ourVisionOurContainer}>
    //         <p className={styles.ourVision}>{visionText}</p>
    //         <p className={styles.blankLine}>&nbsp;</p>
    //         <p className={styles.blankLine}>{visionStatement}</p>
    //       </div>
    //     </div>
    //     <AboutMenu
    //       aboutMenuPosition="absolute"
    //       aboutMenuTop="calc(50% - 200px)"
    //       aboutMenuLeft="58px"
    //     />
    //   </div>
    // </div>
    <div className={styles.visionBody}>
          <div className={styles.ourVisionOurContainer}>
            <p className={styles.ourVision}>{visionText}</p>
            <p className={styles.blankLine}>&nbsp;</p>
            <p className={styles.blankLine}>{visionStatement}</p>
          </div>
        </div>
  );
};

export default VisionContainer;
