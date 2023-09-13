import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ContainerHeaderDesktop from '../components/ContainerHeaderDesktop';
import ChatHeaderSearchContainer from '../components/ChatHeaderSearchContainer';
import FormContainer1 from '../components/FormContainer1';
import MessageForm from '../components/MessageForm';
import styles from './ChateMessage.module.css';
import { getUser } from '../../../redux/api/api';
import { toast } from 'react-toastify';
const ChateMessage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const selectedChatL = localStorage.getItem('selectedChat')
    ? JSON.parse(localStorage.getItem('selectedChat'))
    : null;
  const [selectedChat, setSelectedChat] = useState(selectedChatL);
  // console.log({ selectedChat: selectedChat });

  const [fetchAgain, setFetchAgain] = useState(false);
  const [userInfo, setUserInfo] = useState();
  console.log({ userInfo: userInfo });
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isAllChats, setIsAllChats] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sendTxMessage, setSendTxMessage] = useState(false);

  const [txInfo, setTxInfo] = useState();
  // console.log({ selectedUsers: selectedUsers });
  const [groupSearchResult, setGroupSearchResult] = useState();
  const [blockchainTransactionData, setBlockchainTransactionData] = useState();
  const [isActiveBlockchain, setIsActiveBlockchain] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    localStorage.setItem('selectedChat', JSON.stringify(selectedChat));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);
  const navigate = useNavigate();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${BACKEND_URL}/api/user/getUser`,
        config
      );
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      toast.error({
        title: 'Error Occured!',
        description: 'Failed to Load the userInfo',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem('user')));
    fetchChats();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.chateMessage}>
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
      {user && (
        <div className={styles.chatHeaderContainerParent}>
          <ChatHeaderSearchContainer
            setNotification={setNotification}
            notification={notification}
            setSelectedChat={setSelectedChat}
            setIsProfile={setIsProfile}
            setIsGroupChat={setIsGroupChat}
            setIsActiveBlockchain={setIsActiveBlockchain}
            setIsHome={setIsHome}
            setIsAllChats={setIsAllChats}
            timestamp="/bell.svg"
          />
          <div className={styles.inboxParent}>
            <FormContainer1
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              isGroupChat={isGroupChat}
              isAllChats={isAllChats}
              setIsProfile={setIsProfile}
              setIsGroupChat={setIsGroupChat}
              setIsActiveBlockchain={setIsActiveBlockchain}
              setIsHome={setIsHome}
              setIsAllChats={setIsAllChats}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              groupSearchResult={groupSearchResult}
              setTxInfo={setTxInfo}
              txInfo={txInfo}
              sendTxMessage={sendTxMessage}
              setSendTxMessage={setSendTxMessage}
              setBlockchainTransactionData={setBlockchainTransactionData}
            />
            <MessageForm
              fetchAgain={fetchAgain}
              selectedChat={selectedChat}
              setFetchAgain={setFetchAgain}
              isGroupChat={isGroupChat}
              isProfile={isProfile}
              setIsProfile={setIsProfile}
              setIsGroupChat={setIsGroupChat}
              setIsActiveBlockchain={setIsActiveBlockchain}
              setIsHome={setIsHome}
              setIsAllChats={setIsAllChats}
              isHome={isHome}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              setGroupSearchResult={setGroupSearchResult}
              txInfo={txInfo}
              sendTxMessage={sendTxMessage}
              setSendTxMessage={setSendTxMessage}
              blockchainTransactionData={blockchainTransactionData}
              isActiveBlockchain={isActiveBlockchain}
              isAllChats={isAllChats}
              setNotification={setNotification}
              notification={notification}
              setSelectedChat={setSelectedChat}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChateMessage;
