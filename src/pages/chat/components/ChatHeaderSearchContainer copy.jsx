import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard";
import styles from "./ChatHeaderSearchContainer.module.css";
const ChatHeaderSearchContainer = ({ timestamp }) => {
  return (
    <div className={styles.chatHeaderContainer}>
      <div className={styles.chatHeader}>
        <SearchBar searchBarFlexShrink="0" />
      </div>
      <div className={styles.chatHeader1}>
        <div className={styles.homeIcon}>
          <div className={styles.shapeWithTextParent}>
            <div className={styles.shapeWithText} />
            <img className={styles.homeIcon1} alt="" src="/home.svg" />
          </div>
        </div>
        <div className={styles.homeIcon}>
          <div className={styles.shapeWithTextParent}>
            <div className={styles.shapeWithText} />
            <img className={styles.bellIcon} alt="" src={timestamp} />
          </div>
        </div>
        <div className={styles.homeIcon}>
          <div className={styles.shapeWithTextParent}>
            <div className={styles.shapeWithText} />
            <img className={styles.primaryIcon} alt="" src="/primary.svg" />
          </div>
        </div>
        <div className={styles.homeIcon}>
          <ProfileCard
            imageDescription="/useravatar1@2x.png"
            profileCardPosition="absolute"
            profileCardTop="calc(50% - 32px)"
            profileCardLeft="calc(50% - 27px)"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeaderSearchContainer;
