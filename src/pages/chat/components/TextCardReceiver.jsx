import { useMemo } from "react";
import styles from "./TextCardReceiver.module.css";
const TextCardReceiver = ({
  companyMission,
  textCardReceiverPosition,
  textCardReceiverTop,
  textCardReceiverRight,
}) => {
  const textCardReceiverStyle = useMemo(() => {
    return {
      position: textCardReceiverPosition,
      top: textCardReceiverTop,
      right: textCardReceiverRight,
    };
  }, [textCardReceiverPosition, textCardReceiverTop, textCardReceiverRight]);

  return (
    <div className={styles.textCardReceiver} style={textCardReceiverStyle}>
      <div className={styles.sampleText}>
        <div className={styles.atGovercityWe}>{companyMission}</div>
      </div>
      <div className={styles.deliveryNotification}>
        <div className={styles.aug20}>12:54</div>
        <img className={styles.checkDoubleIcon} alt="" src="/checkdouble.svg" />
      </div>
    </div>
  );
};

export default TextCardReceiver;
