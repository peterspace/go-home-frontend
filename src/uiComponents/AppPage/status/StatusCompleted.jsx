import BlenderyForm from './BlenderyForm';
import FormProgress from './FormProgress';
import NotificationCompleted from './NotificationCompleted';
import styles from './StatusCompleted.module.css';
const StatusCompleted = (props) => {
  const {
    orderNo,
    setIsActiveBlockchain,
    setIsAllChats,
    setIsProfile,
    setIsGroupChat,
    setIsHome,
  } = props;
  return (
    <div className={styles.statusCompleted}>
      <BlenderyForm />
      <div className={styles.notificationTitle}>
        <div className={styles.transaction}>TRANSACTION</div>
        <div className={styles.orderQ67ax2}>{`Order: ${orderNo}`}</div>
      </div>
      <FormProgress
        dimensionCode="/doneicon.svg"
        dimensionCodeImageUrl="/doneicon.svg"
        dimensionCodeText="/doneicon.svg"
        dimensionCodeTextAlt="/doneicon.svg"
      />
      <NotificationCompleted
        buttonText="Return"
        transactionStatusIcon="/group-126.svg"
        transactionStatusMessage="Transaction complete"
        transactionConfirmationMe="Thank you for choosing us.Hope to see you soon!"
        setIsActiveBlockchain={setIsActiveBlockchain}
        setIsAllChats={setIsAllChats}
        setIsProfile={setIsProfile}
        setIsGroupChat={setIsGroupChat}
        setIsHome={setIsHome}
      />
    </div>
  );
};

export default StatusCompleted;
