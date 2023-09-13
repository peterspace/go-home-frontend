import styles from "./BlenderyForm.module.css";
const BlenderyForm = () => {
  return (
    <div className={styles.notificationHeader}>
      <div className={styles.govercityLogo}>
        <img className={styles.logoFrameIcon} alt="" src="/logoframe.svg" />
        <div className={styles.blendery}>Blendery</div>
      </div>
    </div>
  );
};

export default BlenderyForm;
