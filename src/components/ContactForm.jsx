import ConatctUs from './ConatctUs';
import ContactUsForm from './ContactUsForm';
import styles from './ContactForm.module.css';
const ContactForm = () => {
  return (
    <div className={styles.contactformContainer}>
      <div className={styles.contactForm}>
        <ConatctUs
          conatctUsPosition="absolute"
          conatctUsBackgroundImage="unset"
          conatctUsBackgroundSize="unset"
          conatctUsBackgroundRepeat="unset"
          conatctUsBackgroundPosition="unset"
          conatctUsTop="0px"
          conatctUsLeft="300px"
          conatctUsBorder="1px solid var(--color-mediumpurple-100)"
          conatctUsBoxSizing="border-box"
          contactUsFontFamily="Poppins"
          conatctUsCardBackgroundColor="unset"
          frameInputFontFamily="Poppins"
          frameInputFontFamily1="Poppins"
          frameInputFontFamily2="Poppins"
          frameTextareaFontFamily="Poppins"
          sendFontFamily="Poppins"
        />
        <div className={`text-white ${styles.govercity}`}>Govercity</div>
        <img className={styles.contactFormChild} alt="" src="/group-103.svg" />
      </div>
    </div>
  );
};

export default ContactForm;
