import { useMemo } from 'react';
import styles from './UsersCard.module.css';
// import getSender from '../config/ChatLogic';
const UsersCard = ({
  iconCode,
  imageSize,
  usersCardPosition,
  usersCardWidth,
  usersCardAlignSelf,
  chat,
  name,
  pic,
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
      <img
        className={styles.userAvatarIcon}
        // src={chat.latestMessage.sender.pic}
        src={pic}
        alt={name}
      />
      <div className={styles.adrainParent}>
        <div className={styles.adrain}>{name}</div>
        <div className={styles.itsGoingWell}>
          {chat?.latestMessage?.content.length > 50
            ? chat?.latestMessage?.content.substring(0, 51) + '...'
            : chat?.latestMessage?.content}
        </div>
      </div>
      {/* Considering using a title */}
      {/* <div className={styles.adrainParent}>
        <div className={styles.adrain}>
          {!chat.isGroupChat
            ? getSender(loggedUser, chat.users)
            : chat.chatName}
        </div>
      </div> */}
      {/* Considering using a title */}
      <div className={styles.usersCardInner}>
        <div className={styles.lineChatParent}>
          <img className={styles.lineChatIcon} alt="" src={imageSize} />
          {/* <div className={styles.aug20}>Aug 20</div> */}
          <div className={styles.aug20}>
            {/* {new Date(chat?.latestMessage?.createdAt).toLocaleTimeString()} */}
            {chat?.latestMessage?.createdAt
              ? new Date(chat?.latestMessage?.createdAt).toLocaleTimeString()
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
