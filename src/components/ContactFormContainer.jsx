import AboutMenu from './AboutMenu';
import styles from './ContactFormContainer.module.css';
const ContactFormContainer = () => {
  return (
    // <div className={styles.aboutformContainer}>
    //   <div className={styles.aboutForm}>
    //     <div className={styles.aboutFormChild} />
    //     <div className={styles.contactUsBody}>
    //       <div className={styles.contactUsForContainer}>
    //         <p className={styles.contactUs}>**Contact Us**</p>
    //         <p className={styles.blankLine}>&nbsp;</p>
    //         <p className={styles.blankLine}>
    //           For any inquiries or support, feel free to reach out to our team
    //           at support.
    //         </p>
    //         <p className={styles.blankLine}>&nbsp;</p>
    //         <p className={styles.blankLine}>
    //           Together, let's build a decentralized future that empowers
    //           individuals and transforms the global economy.
    //         </p>
    //         <p className={styles.blankLine}>&nbsp;</p>
    //         <p className={styles.blankLine}>---</p>
    //       </div>
    //     </div>
    //     <AboutMenu
    //       aboutMenuPosition="absolute"
    //       aboutMenuTop="calc(50% - 200px)"
    //       aboutMenuLeft="58px"
    //     />
    //   </div>
    // </div>
    <div className={styles.contactUsBody}>
      <div className={styles.contactUsForContainer}>
        <p className={styles.contactUs}>**Contact Us**</p>
        <p className={styles.blankLine}>&nbsp;</p>
        <p className={styles.blankLine}>
          For any inquiries or support, feel free to reach out to our team at
          support.
        </p>
        <p className={styles.blankLine}>&nbsp;</p>
        <p className={styles.blankLine}>
          Together, let's build a decentralized future that empowers individuals
          and transforms the global economy.
        </p>
        <p className={styles.blankLine}>&nbsp;</p>
        <p className={styles.blankLine}>---</p>
      </div>
    </div>
  );
};

export default ContactFormContainer;
