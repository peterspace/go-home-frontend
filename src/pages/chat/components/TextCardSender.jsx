import { useMemo } from "react";
import styles from "./TextCardSender.module.css";
const TextCardSender = ({
  companyMission,
  textCardSenderPosition,
  textCardSenderTop,
  textCardSenderLeft,
}) => {
  const textCardSenderStyle = useMemo(() => {
    return {
      position: textCardSenderPosition,
      top: textCardSenderTop,
      left: textCardSenderLeft,
    };
  }, [textCardSenderPosition, textCardSenderTop, textCardSenderLeft]);

  return (
    <div className={styles.textCardSender} style={textCardSenderStyle}>
      <div className={styles.sampleText}>
        <div className={styles.atGovercityWe}>{companyMission}</div>
      </div>
      <div className={styles.deliveryNotification}>
        <div className={styles.aug20}>16:10</div>
        <img
          className={styles.checkDoubleIcon}
          alt=""
          src="/checkdouble1.svg"
        />
      </div>
    </div>
  );
};

export default TextCardSender;
