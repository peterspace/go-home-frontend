import { useMemo } from "react";
import styles from "./NotificationContainer.module.css";
const NotificationContainer = ({
  buttonText,
  transactionStatusIcon,
  transactionStatusMessage,
  transactionConfirmationMe,
  propLeft,
  propLeft1,
  propWidth,
  propLeft2,
  propWidth1,
}) => {
  const returnStyle = useMemo(() => {
    return {
      left: propLeft,
    };
  }, [propLeft]);

  const startNotificationStyle = useMemo(() => {
    return {
      left: propLeft1,
      width: propWidth,
    };
  }, [propLeft1, propWidth]);

  const thankYouForStyle = useMemo(() => {
    return {
      left: propLeft2,
      width: propWidth1,
    };
  }, [propLeft2, propWidth1]);

  return (
    <div className={styles.notificationBody}>
      <div className={styles.confirmButton}>
        <div className={styles.return} style={returnStyle}>
          {buttonText}
        </div>
      </div>
      <img
        className={styles.notificationBodyChild}
        alt=""
        src={transactionStatusIcon}
      />
      <div className={styles.bgStatus}>
        <div className={styles.transactionComplete}>
          {transactionStatusMessage}
        </div>
        <div
          className={styles.startNotification}
          style={startNotificationStyle}
        >
          <div className={styles.thankYouFor} style={thankYouForStyle}>
            {transactionConfirmationMe}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;
