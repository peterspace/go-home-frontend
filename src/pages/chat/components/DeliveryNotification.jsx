import { useMemo } from "react";
import styles from "./DeliveryNotification.module.css";
const DeliveryNotification = ({ timestamp, deliveryNotificationPosition }) => {
  const deliveryNotificationStyle = useMemo(() => {
    return {
      position: deliveryNotificationPosition,
    };
  }, [deliveryNotificationPosition]);

  return (
    <div
      className={styles.deliveryNotification}
      style={deliveryNotificationStyle}
    >
      <div className={styles.aug20}>{timestamp}</div>
      <img className={styles.checkDoubleIcon} alt="" src="/checkdouble.svg" />
    </div>
  );
};

export default DeliveryNotification;
