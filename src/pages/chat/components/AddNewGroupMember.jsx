import { useMemo } from 'react';
import styles from './AddNewGroupMember.module.css';
const AddNewGroupMember = ({ user, addNewGroupMemberPosition, orderNo }) => {
  const addNewGroupMemberStyle = useMemo(() => {
    return {
      position: addNewGroupMemberPosition,
    };
  }, [addNewGroupMemberPosition]);

  return (
    <div className={styles.addNewGroupMember} style={addNewGroupMemberStyle}>
      {/* <img className={styles.userAvatarIcon} alt="" src="/useravatar@2x.png" /> */}
      <img className={styles.userAvatarIcon} alt={user?.name} src={user?.pic} />
      <div className={styles.userBasicInfo}>
        <b className={styles.adrain}>{user?.name}</b>
        {/* <div className={styles.berlin}>Berlin</div> */}
        <div className={styles.berlin}>
          {user?.city ? user?.city : user?.email}
        </div>
      </div>
      <div className={styles.addUser}>
        <div className={styles.addUserBox}>
          <img className={styles.addUserIcon} alt="" src="/addusericon.svg" />
          {/* <div className={styles.tx025}>{txId}</div> */}
          {/* <div className={styles.tx025}>Tx 025</div> */}
          <div className={styles.tx025}>{`Order ${orderNo}`}</div>
        </div>
      </div>
    </div>
  );
};

export default AddNewGroupMember;
