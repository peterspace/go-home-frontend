import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import styles from './ContactUsForm.module.css';
import { createMessage, contactAutoReply } from '../redux/api/api';
const ContactUsForm = ({ frameButtonLeft }) => {
  const conatctUsCard1Style = useMemo(() => {
    return {
      left: frameButtonLeft,
    };
  }, [frameButtonLeft]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  console.log({ name: name });

  const [checkData, setCheckData] = useState('');
  console.log({ checkData: checkData });

  const [redirect, setRedirect] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState('');
  const [submittedData, setsubmittedData] = useState('');
  console.log({ submittedData: submittedData });

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
      // setsubmittedData(data);
      setTimeout(() => {
        setRedirect(`/`);
      }, 2000);
    }
  }

  async function SendMessage() {
    const userData = {
      name,
      email,
      subject,
      message,
    };

    console.log('userData', userData);
    setCheckData(userData);
    // const data = await createMessage(userData);
    // if (data) {
    //   setIsSubmitted(true);
    //   const contactId = data?._id;
    //   console.log('contactId:', contactId);
    //   setsubmittedData(data);
    // }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      {/* <div className={styles.conatctUsCard} style={conatctUsCard1Style}>
      <input
        className={styles.conatctUsCardChild}
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        required
        style={frameInputStyle}
      />
      <input
        className={styles.conatctUsCardItem}
        type="text"
        placeholder="Email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        required
        style={frameInput1Style}
      />
      <input
        className={styles.conatctUsCardInner}
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(ev) => setSubject(ev.target.value)}
        required
        style={frameInput2Style}
      />
      
      <textarea
        className={styles.frameTextarea}
        placeholder="Message"
        value={message}
        onChange={(ev) => setMessage(ev.target.value)}
        required
        style={frameTextareaStyle}
      />
      <button className={styles.sendWrapper}>
        <div className={styles.send} style={sendStyle}>
          Send
        </div>
      </button>
    </div> */}
      <div className={styles.conatctUsCard}>
        <input
          className={styles.conatctUsCardChild}
          type="text"
          placeholder="Chizzy"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          required
        />
        <input
          className={styles.conatctUsCardItem}
          type="text"
          placeholder="men"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
        />
        <input
          className={styles.conatctUsCardInner}
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(ev) => setSubject(ev.target.value)}
          required
        />

        <textarea
          className={styles.frameTextarea}
          placeholder="Message"
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          required
        />
        <button className={`${styles.sendWrapper}`} onClick={SendMessage}>
          <div className={styles.send}>Send</div>
        </button>
      </div>
    </>
  );
};

export default ContactUsForm;
