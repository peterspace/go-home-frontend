import { useMemo } from "react";
import styles from "./FormProgress.module.css";
const FormProgress = ({
  dimensionCode,
  dimensionCodeImageUrl,
  dimensionCodeText,
  dimensionCodeTextAlt,
  propColor,
  propColor1,
  propColor2,
  propColor3,
}) => {
  const initializedStyle = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor]);

  const inProgressStyle = useMemo(() => {
    return {
      color: propColor1,
    };
  }, [propColor1]);

  const depositedStyle = useMemo(() => {
    return {
      color: propColor2,
    };
  }, [propColor2]);

  const completedStyle = useMemo(() => {
    return {
      color: propColor3,
    };
  }, [propColor3]);

  return (
    <div className={styles.notificationProgress}>
      <div className={styles.transactionProgressBar}>
        <img className={styles.doneIcon} alt="" src={dimensionCode} />
        <img className={styles.doneIcon1} alt="" src={dimensionCodeImageUrl} />
        <img className={styles.doneIcon2} alt="" src={dimensionCodeText} />
        <img className={styles.doneIcon3} alt="" src={dimensionCodeTextAlt} />
        <div className={styles.initialized} style={initializedStyle}>
          Initialized
        </div>
        <div className={styles.inProgress} style={inProgressStyle}>
          in progress
        </div>
        <div className={styles.deposited} style={depositedStyle}>
          deposited
        </div>
        <div className={styles.completed} style={completedStyle}>
          Completed
        </div>
      </div>
    </div>
  );
};

export default FormProgress;
