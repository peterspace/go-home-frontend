import styles from "./FrameComponent.module.css";
const FrameComponent = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.xCloseWrapper}>
        <img className={styles.xCloseIcon} alt="" src="/xclose.svg" />
      </div>
      <div className={styles.docsParent}>
        <div className={styles.docs}>Docs</div>
        <div className={styles.governanceParent}>
          <div className={styles.governance}>Governance</div>
          <div className={styles.comingSoonWrapper}>
            <div className={styles.comingSoon}>Coming Soon</div>
          </div>
        </div>
        <div className={styles.governanceParent}>
          <div className={styles.governance}>Voting</div>
          <div className={styles.comingSoonWrapper}>
            <div className={styles.comingSoon}>Coming Soon</div>
          </div>
        </div>
      </div>
      <div className={styles.launchAppWrapper}>
        <div className={styles.launchApp}>Launch App</div>
      </div>
    </div>
  );
};

export default FrameComponent;
