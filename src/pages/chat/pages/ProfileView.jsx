import ContainerHeaderDesktop from "../components/ContainerHeaderDesktop";
import ChatHeaderSearchContainer from "../components/ChatHeaderSearchContainer";
import FormContainer1 from "../components/FormContainer1";
import FormContainer from "../components/FormContainer";
import styles from "./ProfileView.module.css";
const ProfileView = () => {
  return (
    <div className={styles.profileView}>
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
          <FormContainer />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
