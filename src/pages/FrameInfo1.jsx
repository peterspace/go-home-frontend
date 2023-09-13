import styles from "./FrameInfo1.module.css";
const FrameInfo1 = () => {
  return (
    <div className={styles.frameInfo}>
      <div className={styles.div}>350+</div>
      <div className={styles.supportedCryptoCurrencies}>
        Supported crypto currencies
      </div>
    </div>
  );
};

export default FrameInfo1;
