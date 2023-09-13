import { useMemo } from "react";
import styles from "./DeliveryNotification1.module.css";
const DeliveryNotification1 = ({ dateTime, deliveryNotificationPosition }) => {
  const deliveryNotification1Style = useMemo(() => {
    return {
      position: deliveryNotificationPosition,
    };
  }, [deliveryNotificationPosition]);

  return (
    <div
      className={styles.deliveryNotification}
      style={deliveryNotification1Style}
    >
      <div className={styles.aug20}>{dateTime}</div>
      <img className={styles.checkDoubleIcon} alt="" src="/checkdouble1.svg" />
    </div>
  );
};

export default DeliveryNotification1;
