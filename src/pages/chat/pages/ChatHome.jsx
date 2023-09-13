// import ContainerHeaderDesktop from '../components/ContainerHeaderDesktop';
// import ChatHeaderSearchContainer from '../components/ChatHeaderSearchContainer';
// import FormContainer1 from '../components/FormContainer1';
import styles from './ChatHome.module.css';
const ChatHome = () => {
  return (
    <div className={styles.messages}>
      <div className={styles.clickToChat}>
        <div className={styles.clickOnA}>Click on a user to start chatting</div>
      </div>
    </div>
  );
};

export default ChatHome;
