import { useMemo } from 'react';
import styles from './UsersCard.module.css';
// import getSender from '../config/ChatLogic';
const UsersListCard = ({
  user,
  usersCardPosition,
  usersCardWidth,
  usersCardAlignSelf,
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
      <img className={styles.userAvatarIcon} src={user?.pic} alt={user?.name} />
      <div className={styles.adrainParent}>
        <div className={styles.adrain}>{user?.name}</div>
        <div className={styles.itsGoingWell}>{user?.email}</div>
      </div>
    </div>
  );
};

export default UsersListCard;
