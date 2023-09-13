import { useMemo, useState, useEffect } from 'react';
// import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { createMessage, contactAutoReply } from '../redux/api/api';
import styles from './ConatctUs.module.css';
const ConatctUs = ({
  // showConatctUsCard,
  conatctUsPosition,
  conatctUsBackgroundImage,
  conatctUsBackgroundSize,
  conatctUsBackgroundRepeat,
  conatctUsBackgroundPosition,
  conatctUsTop,
  conatctUsLeft,
  conatctUsBorder,
  conatctUsBoxSizing,
  contactUsFontFamily,
  conatctUsCardBackgroundColor,
  frameInputFontFamily,
  frameInputFontFamily1,
  frameInputFontFamily2,
  frameTextareaFontFamily,
  sendFontFamily,
}) => {
  const conatctUsStyle = useMemo(() => {
    return {
      position: conatctUsPosition,
      backgroundImage: conatctUsBackgroundImage,
      backgroundSize: conatctUsBackgroundSize,
      backgroundRepeat: conatctUsBackgroundRepeat,
      backgroundPosition: conatctUsBackgroundPosition,
      top: conatctUsTop,
      left: conatctUsLeft,
      border: conatctUsBorder,
      boxSizing: conatctUsBoxSizing,
    };
  }, [
    conatctUsPosition,
    conatctUsBackgroundImage,
    conatctUsBackgroundSize,
    conatctUsBackgroundRepeat,
    conatctUsBackgroundPosition,
    conatctUsTop,
    conatctUsLeft,
    conatctUsBorder,
    conatctUsBoxSizing,
  ]);

  const contactUsStyle = useMemo(() => {
    return {
      fontFamily: contactUsFontFamily,
    };
  }, [contactUsFontFamily]);

  const conatctUsCardStyle = useMemo(() => {
    return {
      backgroundColor: conatctUsCardBackgroundColor,
    };
  }, [conatctUsCardBackgroundColor]);

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [checkData, setCheckData] = useState('');
  console.log({ checkData: checkData });

  const [redirect, setRedirect] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState('');
  const [submittedData, setsubmittedData] = useState('');
  console.log({ submittedData: submittedData });
  const [isAutoReplySent, setIsAutoReplySent] = useState(false);

  console.log({ name: name });

  console.log({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });

  useEffect(() => {
    if (isSubmitted) {
      SendAutoReply();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  async function SendAutoReply() {
    const userData = {
      name: submittedData?.name,
      email: submittedData?.email,
      subject: submittedData?.subject,
      message: submittedData?.message,
    };

    const data = await contactAutoReply(userData);
    if (data) {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsAutoReplySent(true);
      setIsSubmitted(false);
    }
  }

  async function SendMessage(ev) {
    ev.preventDefault();
    const userData = {
      name,
      email,
      subject,
      message,
    };

    console.log('userData', userData);
    setCheckData(userData);
    const data = await createMessage(userData);
    if (data) {
      setIsSubmitted(true);
      setsubmittedData(data);
    }
  }

  return (
    <div className={styles.conatctUs} style={conatctUsStyle}>
      <div className={styles.contactUs} style={contactUsStyle}>
        Contact Us
      </div>

      <form
        className={`text-white ${styles.conatctUsCard}`}
        style={conatctUsCardStyle}
        onSubmit={SendMessage}
      >
        <input
          className={`text-gray-50 outline-none ${styles.conatctUsCardChild}`}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          required
          style={frameInputStyle}
        />
        <input
          className={`text-gray-50 outline-none ${styles.conatctUsCardItem}`}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
          style={frameInput1Style}
        />
        <input
          className={`text-gray-50 outline-none ${styles.conatctUsCardInner}`}
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(ev) => setSubject(ev.target.value)}
          required
          style={frameInput2Style}
        />
        <textarea
          className={`text-gray-50 outline-none ${styles.frameTextarea}`}
          placeholder="Message"
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          required
          style={frameTextareaStyle}
        />
        {isAutoReplySent ? (
          <button
            className={`cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transform transition border border-color-slateblue ${styles.sendWrapper}`}
          >
            <div
              className={styles.send}
              style={sendStyle}
              onClick={setIsAutoReplySent(false)}
            >
              Sent
            </div>
          </button>
        ) : (
          <button
            className={`cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transform transition border border-color-slateblue ${styles.sendWrapper}`}
            type="submit"
          >
            <div className={styles.send} style={sendStyle}>
              Send
            </div>
          </button>
        )}
      </form>
    </div>
  );
};

export default ConatctUs;
