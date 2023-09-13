import ContainerHeaderDesktop from "../components/ContainerHeaderDesktop";
import ChatHeaderSearchContainer from "../components/ChatHeaderSearchContainer";
import FormContainer1 from "../components/FormContainer1";
import CreateTicketForm from "../components/CreateTicketForm";
import styles from "./ChatGroup.module.css";
const ChatGroup = () => {
  return (
    <div className={styles.chatGroup}>
      <div className={styles.shapeWithTextParent}>
        <div className={styles.shapeWithText} />
        <img
          className={styles.folderFavoriteIcon}
          alt=""
          src="/folderfavorite.svg"
        />
      </div>
      <ContainerHeaderDesktop
        containerHeaderDesktopPosition="absolute"
        containerHeaderDesktopTop="0px"
        containerHeaderDesktopLeft="-1px"
      />
      <div className={styles.chatHeaderContainerParent}>
        <ChatHeaderSearchContainer timestamp="/bell.svg" />
        <div className={styles.inboxParent}>
          <FormContainer1 />
          <CreateTicketForm />
        </div>
      </div>
    </div>
  );
};

export default ChatGroup;
