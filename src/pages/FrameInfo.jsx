import styles from "./FrameInfo.module.css";
const FrameInfo = () => {
  return (
    <div className={styles.frameInfo}>
      <div className={styles.div}>40+</div>
      <div className={styles.supportedFiatCurrencies}>
        Supported fiat currencies
      </div>
    </div>
  );
};

export default FrameInfo;
