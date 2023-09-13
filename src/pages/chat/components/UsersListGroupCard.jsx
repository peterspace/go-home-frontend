import { useState, useMemo } from 'react';
import styles from './UsersCard.module.css';
// import getSender from '../config/ChatLogic';
const UsersListGroupCard = ({
  user,
  // selectedUser,
  setSelectedUsers,
  // handleGroup,
  // handleDelete,
  selectedUsers,
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

  // selectedUsers?.includes(user)

  const [selected, setSelected] = useState();

  // async function filterSelected() {
  //   selectedUsers?.map(async (user) => {
  //     if (user) {
  //       setSelected(true);
  //     }
  //   });
  // }

  // const buttonState  = {
  //   position: absolute;
  //   top: 0;
  //   left: calc(50% - 87.5px);
  //   border-radius: var(--br-7xs);
  //   background-color: var(--color-gray-200-z);
  //   border: 1px solid var(--color-crimson);
  //   box-sizing: border-box;
  //   width: 85px;
  //   height: 30px;
  //   overflow: hidden;
  // }

  const handleGroup = (userToAdd) => {
    if (selectedUsers?.includes(userToAdd)) {
      // toast.error('User already added');
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
    // localStorage.setItem('selectedUsers', [...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers?.filter((sel) => sel._id !== delUser._id));
    // localStorage.setItem('selectedUsers', selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <div className={styles.usersCard} style={usersCardStyle}>
      <img className={styles.userAvatarIcon} src={user?.pic} alt={user?.name} />
      <div className={styles.adrainParent}>
        <div className={styles.adrain}>{user?.name}</div>
        <div className={styles.itsGoingWell}>{user?.email}</div>

        {/* <button className="cursor-pointer bg-blue-600 w-[70px] rounded-[6px]" onClick={handleGroup}>
            Add
          </button>
          <button className="cursoe-pointer bg-red-600 w-[70px] rounded-[6px]" onClick={handleDelete}>
            Remove
          </button> */}
        {/* {selected ? (
          <button
            className="border-none cursor-pointer bg-[#EB003C] px-4 py-1 rounded-[6px] text-white overflow-hidden"
            onClick={handleDelete(selectedUser)}
          >
            Remove
          </button>
        ) : (
          <button
            className="border-none cursor-pointer bg-[#0099FF] px-4 py-1 rounded-[6px] text-white overflow-hidden"
            onClick={handleGroup(selectedUser)}
          >
            Add
          </button>
        )} */}
        <div className="flex flex-row gap-1">
          <button
            className="border-none cursor-pointer bg-[#EB003C] px-4 py-1 rounded-[6px] text-white overflow-hidden"
            // onClick={handleDelete(selectedUser)}
            onClick={handleDelete(user)}
          >
            Remove
          </button>
          <button
            className="border-none cursor-pointer bg-[#0099FF] px-4 py-1 rounded-[6px] text-white overflow-hidden"
            // onClick={handleGroup(selectedUser)}
            onClick={handleGroup(user)}
          >
            Add
          </button>
        </div>

        {/* <div className={styles.itsGoingWell}>{user?.state || user?.city}</div> */}
      </div>
    </div>
  );
};

export default UsersListGroupCard;
