import { useMemo } from 'react';
import styles from './ProfileCard.module.css';
const ProfileCard = ({
  imageDescription,
  profileCardPosition,
  profileCardTop,
  profileCardLeft,
}) => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const profileCardStyle = useMemo(() => {
    return {
      position: profileCardPosition,
      top: profileCardTop,
      left: profileCardLeft,
    };
  }, [profileCardPosition, profileCardTop, profileCardLeft]);

  return (
    <div className={styles.profileCard} style={profileCardStyle}>
      <div className={styles.maxwell}>{user.name}</div>
      <img className={styles.userAvatarIcon} src={user.pic} alt={user.name} />
    </div>
  );
};

export default ProfileCard;
