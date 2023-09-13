import { useMemo } from 'react';
import styles from './ContactUsForm.module.css';
const ContactUsForm = ({
  frameButtonLeft,
  contactUsFontFamily,
  conatctUsCardBackgroundColor,
  frameInputFontFamily,
  frameInputFontFamily1,
  frameInputFontFamily2,
  frameTextareaFontFamily,
  sendFontFamily,
}) => {
  const conatctUsCard1Style = useMemo(() => {
    return {
      left: frameButtonLeft,
    };
  }, [frameButtonLeft]);

  const frameInputStyle = useMemo(() => {
    return {
      fontFamily: frameInputFontFamily,
    };
  }, [frameInputFontFamily]);

  const frameInput1Style = useMemo(() => {
    return {
      fontFamily: frameInputFontFamily1,
    };
  }, [frameInputFontFamily1]);

  const frameInput2Style = useMemo(() => {
    return {
      fontFamily: frameInputFontFamily2,
    };
  }, [frameInputFontFamily2]);

  const frameTextareaStyle = useMemo(() => {
    return {
      fontFamily: frameTextareaFontFamily,
    };
  }, [frameTextareaFontFamily]);

  const sendStyle = useMemo(() => {
    return {
      fontFamily: sendFontFamily,
    };
  }, [sendFontFamily]);



  return (
    <div className={styles.conatctUsCard} style={conatctUsCard1Style}>
      <input
        className={styles.conatctUsCardChild}
        type="text"
        placeholder="Name"
        required
        style={frameInputStyle}
      />
      <input
        className={styles.conatctUsCardItem}
        type="text"
        placeholder="Email"
        required
        style={frameInput1Style}
      />
      <input
        className={styles.conatctUsCardInner}
        type="text"
        placeholder="Subject"
        required
        style={frameInput2Style}
      />
      <textarea
        className={styles.frameTextarea}
        placeholder="Message"
        required
        style={frameTextareaStyle}
      />
      <button className={styles.sendWrapper}>
        <div className={styles.send} style={sendStyle}>
          Send
        </div>
      </button>
    </div>
  );
};

export default ContactUsForm;
