import styles from './ExchangeHeader.module.css';
const Footer = () => {
  return (
    <div className={styles.documentationParent}>
      <div className={styles.documentation}>Documentation</div>
      <div className={styles.documentation}>FAQ</div>
      <div className={styles.documentation}>Privacy policy</div>
      <div className={styles.documentation}>Terms of use</div>
    </div>
  );
};

export default Footer;
