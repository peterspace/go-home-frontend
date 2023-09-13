import BlenderyForm from './BlenderyForm';
import FormProgress from './FormProgress';
import styles from './StatusSubmitted.module.css';
const StatusSubmitted = (props) => {
  const { setNextPage, setIsProcessingOrder, setIsSubmitted } = props;
  return (
    <div className={styles.statusSubmitted}>
      <BlenderyForm />
      <div className={styles.notificationTitle}>
        <div className={styles.transaction}>TRANSACTION</div>
        {/* <div className={styles.orderQ67ax2}>{`Order: Q67A&X2`}</div> */}
      </div>
      <FormProgress
        dimensionCode="/doneicon1.svg"
        dimensionCodeImageUrl="/doneicon1.svg"
        dimensionCodeText="/doneicon1.svg"
        dimensionCodeTextAlt="/doneicon1.svg"
        propColor="#eb003c"
        propColor1="#eb003c"
        propColor2="#eb003c"
        propColor3="#eb003c"
      />
      <div className={styles.notificationBody}>
        <div
          className={`cursor-pointer ${styles.confirmButton}`}
          onClick={() => {
            setNextPage(false);
            setIsProcessingOrder(true);
            setIsSubmitted(false);
          }}
        >
          <div className={styles.confirm}>Confirm</div>
        </div>
        <div className={styles.bgStatus}>
          <div className={styles.startNotification}>
            <div className={styles.pleaseConfirmThe}>
              Please confirm the deposit of 2000 USDT to the address
            </div>
            <div className={styles.yourRequestHas}>
              Your request has been received
            </div>
            <div className={styles.xdb5d650c8c7b37e5c99f1f01df49d}>
              0xdb5D650c8c7b37e5C99f1f01dF49DDDB2Bc6C553
            </div>
          </div>
        </div>
        <img className={styles.iconsFrame} alt="" src="/iconsframe.svg" />
      </div>
    </div>
  );
};

export default StatusSubmitted;
