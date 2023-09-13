import { useMemo } from "react";
import styles from "./UsersCard.module.css";
const UsersCard = ({
  iconCode,
  imageSize,
  usersCardPosition,
  usersCardWidth,
  usersCardAlignSelf,
  chat,
}) => {
  const usersCardStyle = useMemo(() => {
    return {
      position: usersCardPosition,
      width: usersCardWidth,
      alignSelf: usersCardAlignSelf,
    };
  }, [usersCardPosition, usersCardWidth, usersCardAlignSelf]);

  return (
    <div className={styles.usersCard} style={usersCardStyle}>
      <img className={styles.userAvatarIcon} alt="" src={iconCode} />
      <div className={styles.adrainParent}>
        <div className={styles.adrain}>Adrain</div>
        <div className={styles.itsGoingWell}>It’s going well</div>
      </div>
      <div className={styles.usersCardInner}>
        <div className={styles.lineChatParent}>
          <img className={styles.lineChatIcon} alt="" src={imageSize} />
          <div className={styles.aug20}>Aug 20</div>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
