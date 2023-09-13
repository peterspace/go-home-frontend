import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import ProfileCard from './ProfileCard';
import styles from './ChatHeaderSearchContainer.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  getSender,
} from '../config/ChatLogic';

const ChatHeaderSearchContainer = (props) => {
  const {
    timestamp,
    setIsProfile,
    setIsGroupChat,
    setIsHome,
    notification,
    setNotification,
    setSelectedChat,
  } = props;

  // const notification = localStorage.getItem('notification')
  //   ? JSON.parse(localStorage.getItem('notification'))
  //   : null;

  const loggedUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  return (
    <div className={styles.chatHeaderContainer}>
      {loggedUser?.isAdmin === true && (
        <>
          <div className={styles.chatHeader}>
            <SearchBar
              setIsProfile={setIsProfile}
              setIsGroupChat={setIsGroupChat}
              setIsHome={setIsHome}
              searchBarFlexShrink="0"
            />
          </div>
        </>
      )}
      {/* <div className={styles.chatHeader}>
        <SearchBar searchBarFlexShrink="0" />
      </div> */}
      {/* =================={Menu}============================ */}
      <div className={`${styles.chatHeader1}`}>
        {/* =================={Home}============================ */}
        <div
          className={`cursor-pointer ${styles.homeIcon}`}
          onClick={() => {
            setIsProfile(false);
            setIsGroupChat(false);

            setIsHome(true);
          }}
        >
          <div className={styles.shapeWithTextParent}>
            <div className={styles.shapeWithText} />
            <img className={styles.homeIcon1} alt="" src="/home.svg" />
          </div>
        </div>
        {/* =================={Notification}============================ */}
        {/* <div className={`cursor-pointer ${styles.homeIcon}`}>
          <div className={styles.shapeWithTextParent}>
            <div className={styles.shapeWithText} />
            {notification ? (
              <img className={styles.bellIcon} alt="" src={timestamp} />
            ) : (
              <img className={styles.bellIcon} alt="" src={timestamp} />
            )}
          </div>
        </div> */}
         <div className={`cursor-pointer ${styles.homeIcon}`}>
          <div className={styles.shapeWithTextParent}>
            <div className={styles.shapeWithText} />
            <img className={styles.bellIcon} alt="" src={timestamp} />
          </div>
        </div>
        {/* <div>
          <button className="p-1 bg-gray-800">
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
            <div className={`cursor-pointer ${styles.homeIcon}`}>
              <div className={styles.shapeWithTextParent}>
                <div className={styles.shapeWithText} />
                <img className={styles.bellIcon} alt="" src={timestamp} />
              </div>
            </div>
          </button>
          <div className="ml-2">
            {!notification.length && 'No New Messages'}
            {notification.map((notif) => (
              <div
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </div>
            ))}
          </div>
        </div> */}
        {/* =================={Settings}============================ */}
        <div className={`cursor-pointer ${styles.homeIcon}`}>
          <div className={styles.shapeWithTextParent}>
            <div className={styles.shapeWithText} />
            <img className={styles.primaryIcon} alt="" src="/primary.svg" />
          </div>
        </div>
        {/* =================={Profile}============================ */}
        <div
          className={`cursor-pointer ${styles.homeIcon}`}
          onClick={() => {
            setIsGroupChat(false); // turn of group modal

            setIsHome(false);
            setIsProfile(true); // turn on profile modal
          }}
        >
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

{
  /* <>
  <div>
    <button className='flex flex-row gap-1 p-1'>
      <NotificationBadge count={notification.length} effect={Effect.SCALE} />
   
      <img className={styles.bellIcon} alt="" src={timestamp} />
    </button>
    <div className='p-2'>
      {!notification.length && 'No New Messages'}
      {notification.map((notif) => (
        <div
          key={notif._id}
          onClick={() => {
            localStorage.setItem('selectedChat', JSON.stringify(notif.chat));

            localStorage.setItem(
              'notification',
              JSON.stringify(notification.filter((n) => n !== notif))
            );
          }}
        >
          {notif.chat.isGroupChat
            ? `New Message in ${notif.chat.chatName}`
            : `New Message from ${getSender(user, notif.chat.users)}`}
        </div>
      ))}
    </div>
  </div>
</>; */
}

//=========={New pop chat list}==================================
{
  /* <div className={styles.inboxUsers}>
  {searchResult?.map((user, idx) => (
    <div key={idx} onClick={() => accessChat(user._id)}>
      <div className="cursor-pointer transition-transform duration-300 hover:scale-110">
        <UsersListCard
          user={user}
          usersCardPosition="unset"
          usersCardWidth="unset"
          usersCardAlignSelf="stretch"
        />
      </div>
    </div>
  ))}
</div>; */
}
