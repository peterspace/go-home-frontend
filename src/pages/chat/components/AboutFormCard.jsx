import AboutMenu from "./AboutMenu";
import styles from "./AboutFormCard.module.css";
const AboutFormCard = () => {
  return (
    <div className={styles.aboutformContainer}>
      <div className={styles.aboutForm}>
        <div className={styles.aboutFormChild} />
        <div className={styles.aboutBody}>
          <div className={styles.aboutUsAtContainer}>
            <p className={styles.aboutUs}>**About us**</p>
            <p className={styles.blankLine}>&nbsp;</p>
            <p className={styles.blankLine}>
              At Govercity, we are committed to revolutionizing the blockchain
              ecosystem and ushering in a new era of Web 3.0 services. Our
              platform is built on the principles of decentralization, security,
              and innovation, providing a wide range of services that empower
              users to explore the limitless potential of blockchain technology.
            </p>
          </div>
        </div>
        <AboutMenu
          aboutMenuPosition="absolute"
          aboutMenuTop="calc(50% - 187px)"
          aboutMenuLeft="58px"
        />
      </div>
    </div>
  );
};

export default AboutFormCard;
