import BlenderyForm from "./BlenderyForm";
import FormProgress from "./FormProgress";
import styles from "./StatusDeposited.module.css";


const StatusDeposited = (props) => {
  const {orderNo, updateTransaction} = props
  return (
    <div className={styles.statusDeposited}>
      <BlenderyForm />
      <div className={styles.notificationTitle}>
        <div className={styles.transaction}>TRANSACTION</div>
        <div className={styles.orderQ67ax2}>{`Order: ${orderNo}`}</div>
      </div>
      <FormProgress
        dimensionCode="/doneicon.svg"
        dimensionCodeImageUrl="/doneicon1.svg"
        dimensionCodeText="/doneicon1.svg"
        dimensionCodeTextAlt="/doneicon.svg"
        propColor="#0099ff"
        propColor1="#eb003c"
        propColor2="#0099ff"
        propColor3="#eb003c"
      />
      <div className={styles.notificationBody}>
        <div className={`cursor-pointer ${styles.confirmButton}`} onClick={updateTransaction}>
          <div className={styles.okay}>Okay</div>
        </div>
        <img
          className={styles.notificationBodyChild}
          alt=""
          src="/group-124.svg"
        />
        <div className={styles.bgStatus}>
          <div className={styles.startNotification}>
            <div className={styles.pleaseWaitFor}>
              Please wait for our dispatcher to contact you
            </div>
            <div className={styles.depositConfirmed}>Deposit confirmed</div>
            <div className={styles.thisCouldTake}>
              This could take up to 5 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusDeposited;
