import BlenderyForm from './BlenderyForm';
import FormProgress from './FormProgress';
import NotificationInprogress from './NotificationInprogress';
import styles from './StatusInprogress.module.css';
const StatusInprogress = (props) => {
  const {
    orderNo,
    updateTransactionCompleted,
    setIsActiveBlockchain,
    setIsAllChats,
    setIsProfile,
    setIsGroupChat,
    setIsHome,
  } = props;
  return (
    <div className={styles.statusInprogress}>
      <BlenderyForm />
      <div className={styles.notificationTitle}>
        <div className={styles.transaction}>TRANSACTION</div>
        <div className={styles.orderQ67ax2}>{`Order: ${orderNo}`}</div>
      </div>
      <FormProgress
        dimensionCode="/doneicon.svg"
        dimensionCodeImageUrl="/doneicon1.svg"
        dimensionCodeText="/doneicon.svg"
        dimensionCodeTextAlt="/doneicon.svg"
        propColor="#0099ff"
        propColor1="#0099ff"
        propColor2="#0099ff"
        propColor3="#eb003c"
      />
      <NotificationInprogress
        buttonText="Confirm"
        transactionStatusIcon="/group-125.svg"
        transactionStatusMessage="Transaction in progress"
        transactionConfirmationMe="Please confirm that the transaction is complete"
        propLeft="22px"
        propLeft1="calc(50% - 164px)"
        propWidth="328px"
        propLeft2="calc(50% - 164px)"
        propWidth1="328px"
        updateTransactionCompleted={updateTransactionCompleted}
        setIsActiveBlockchain={setIsActiveBlockchain}
        setIsAllChats={setIsAllChats}
        setIsProfile={setIsProfile}
        setIsGroupChat={setIsGroupChat}
        setIsHome={setIsHome}
      />
    </div>
  );
};

export default StatusInprogress;
