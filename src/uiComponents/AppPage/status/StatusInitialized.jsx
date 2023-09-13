import BlenderyForm from './BlenderyForm';
import FormProgress from './FormProgress';
import styles from './StatusInitialized.module.css';
const StatusInitialized = (props) => {
  const { setNextPage, setIsProcessingOrder, setIsSubmitted } = props;
  return (
    <div className={styles.statusInitialized}>
      <BlenderyForm />
      <div className={styles.notificationTitle}>
        <div className={styles.transaction}>TRANSACTION</div>
        {/* <div className={styles.orderQ67ax2}>{`Order: Q67A&X2`}</div> */}
      </div>
      <FormProgress
        dimensionCode="/doneicon.svg"
        dimensionCodeImageUrl="/doneicon1.svg"
        dimensionCodeText="/doneicon1.svg"
        dimensionCodeTextAlt="/doneicon1.svg"
        propColor="#0099ff"
        propColor1="#eb003c"
        propColor2="#eb003c"
        propColor3="#eb003c"
      />
      <div className={styles.notificationBody}>
        <div
          className={`cursor-pointer ${styles.confirmButton}`}
          onClick={() => {
            setNextPage(false);
            setIsProcessingOrder(false);
            setIsSubmitted(false);
          }}
        >
          <div className={styles.okay}>Okay</div>
        </div>
        <div className={styles.bgStatus}>
          <div className={styles.startNotification}>
            <div className={styles.pleaseHoldWhile}>
              Please hold while we confirm your deposit
            </div>
            <div className={styles.transactionInProgress}>
              Transaction in progress
            </div>
            <div className={styles.thisCouldTake}>
              {' '}
              This could take up to 20 minutes
            </div>
          </div>
        </div>
        <img
          className={styles.notificationBodyChild}
          alt=""
          src="/group-125.svg"
        />
      </div>
    </div>
  );
};

export default StatusInitialized;
