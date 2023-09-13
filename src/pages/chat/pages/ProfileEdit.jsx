import ContainerHeaderDesktop from "../components/ContainerHeaderDesktop";
import ChatHeaderSearchContainer from "../components/ChatHeaderSearchContainer";
import FormContainer1 from "../components/FormContainer1";
import CreateTicketForm from "../components/CreateTicketForm";
import styles from "./ProfileEdit.module.css";
const ProfileEdit = () => {
  return (
    <div className={styles.profileEdit}>
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

export default ProfileEdit;
