import styles from './FormContainer1.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import AddNewGroupMember from './AddNewGroupMember';
import { useNavigate } from 'react-router-dom';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
  getSender,
  getSenderFull,
} from '../config/ChatLogic';
import {
  updateTransactionById,
  getUserInactiveTransactions,
  getUserActiveTransactions,
  getManagerActiveTransactions,
} from '../../../redux/api/api';
import TransactionCard from './TransactionCard';

const FormContainer1 = (props) => {
  const {
    fetchAgain,
    setFetchAgain,
    selectedChat,
    setSelectedChat,
    isGroupChat,
    setIsGroupChat,
    isAllChats,
    setIsAllChats,
    setIsProfile,
    setIsHome,
    selectedUsers,
    setSelectedUsers,
    groupSearchResult,
    setTxInfo,
    txInfo,
    setSendTxMessage,
    sendTxMessage,
    setBlockchainTransactionData,
    setIsActiveBlockchain,
  } = props;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [chats, setChats] = useState();
  const [loadingChat, setLoadingChat] = useState(false);

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const [userInactiveTransactions, setUserInactiveTransactions] = useState();
  const [userActiveTransactions, setUserActiveTransactions] = useState();
  const [managerActiveTransactions, setManagerActiveTransactions] = useState();
  // console.log({ userInactiveTransactions: userInactiveTransactions });

  const [isActiveTransactions, setIsActiveTransactions] = useState(false);

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${BACKEND_URL}/api/chat`, config);
      setChats(data);
      localStorage.setItem('chats', JSON.stringify(chats));
    } catch (error) {
      toast.error({
        title: 'Error Occured!',
        description: 'Failed to Load the chats',
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
    // setLoggedUser(JSON.parse(localStorage.getItem('user')));
    fetchChats();
    // eslint-disable-next-line
  }, [chats]);

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem('user')));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_URL}/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id))
        // setChats([data, ...chats]);
        localStorage.setItem('chats', JSON.stringify([data, ...chats]));
      // setSelectedChat(data);
      localStorage.setItem('selectedChat', JSON.stringify(data));

      setLoadingChat(false);
      // onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const createTIcketChat = async (_id, selectedUser, orderNo) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_URL}/api/chat/group`,
        {
          name: `TxId: ${orderNo}`,
          users: JSON.stringify([selectedUser]),
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);

      setLoadingChat(true);

      // setChats([data, ...chats]);
      localStorage.setItem('chats', JSON.stringify([data, ...chats]));

      toast.success('New Group Chat Created!');
      if (data) {
        setTxInfo({ id: _id, orderNo: orderNo, chatId: data?._id });
        localStorage.setItem(
          'txInfo',
          JSON.stringify({ id: _id, orderNo: orderNo, chatId: data?._id })
        );
        setSendTxMessage(true);
      }
      //====={Turn of Group Modal}============
      setTimeout(() => {
        setIsGroupChat(false);
        setIsAllChats(true);
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  //===={User Active transactions}============================
  const fetchUserActiveTransactions = async () => {
    const data = await getUserActiveTransactions();
    setUserActiveTransactions(data);
  };

  //===={Manager Active transactions}============================
  const fetchManagerActiveTransactions = async () => {
    const data = await getManagerActiveTransactions();
    setManagerActiveTransactions(data);
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={styles.inbox}>
      <div className={styles.inboxInner}>
        <div className={styles.groupChatsParent}>
          {user?.isAdmin === true ? (
            <>
              <div
                className={`flex flex-row justify-between ${styles.groupChatsCustom2}`}
              >
                <div
                  className="ml-1 relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900)] px-2 rounded-lg text-[14px] w-[80px]"
                  onClick={() => {
                    setIsGroupChat(false);
                    setIsProfile(false);
                    setIsHome(false);
                    setIsActiveBlockchain(false);
                    setIsAllChats(true);
                  }}
                >{`All `}</div>
                <div
                  className="relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900) px-2 rounded-lg text-[14px] w-[80px]"
                  onClick={() => {
                    fetchManagerActiveTransactions();
                    setIsAllChats(false);
                    setIsProfile(false);
                    setIsGroupChat(false);
                    setIsHome(false);
                    setIsActiveTransactions(true);
                    setIsActiveBlockchain(true);
                  }}
                >
                  Active
                </div>
                <div
                  className="mr-1 relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900) px-2 rounded-lg text-[14px] w-[80px]"
                  onClick={() => {
                    setIsAllChats(true);
                    setIsProfile(false);
                    setIsHome(false);
                    setIsActiveTransactions(false); // turn of activeTransactions fetching
                    setIsActiveBlockchain(false); // turn of activeTransactions transactions
                    setIsGroupChat(true);
                    
                  }}
                >
                  Groups
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={`flex flex-row justify-between ${styles.groupChatsCustom2}`}
              >
                <div
                  className="ml-1 relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900)] px-2 rounded-lg text-[14px] w-[80px]"
                  onClick={() => {
                    setIsGroupChat(false);
                    setIsProfile(false);
                    setIsHome(false);
                    setIsActiveBlockchain(false);
                    setIsAllChats(true);
                  }}
                >{`All `}</div>
                <div
                  className="relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900) px-2 rounded-lg text-[14px] w-[80px]"
                  onClick={() => {
                    fetchUserActiveTransactions();
                    setIsAllChats(false);
                    setIsProfile(false);
                    setIsGroupChat(false);
                    setIsHome(false);
                    setIsActiveTransactions(true);
                    setIsActiveBlockchain(true);
                  }}
                >
                  Active
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.inboxContainerWrapper}>
        <div className={styles.inboxContainer}>
          <>
            {isActiveTransactions ? (
              <>
                {user?.isAdmin === true ? (
                  <div className={styles.inboxUsers}>
                    {managerActiveTransactions?.map((t, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          localStorage.setItem(
                            'transactionData',
                            JSON.stringify(t)
                          );
                          setBlockchainTransactionData(t);
                          // setIsActiveBlockchain(true);
                        }}
                      >
                        <div className="cursor-pointer transition-transform duration-300 hover:scale-110">
                          <AddNewGroupMember
                            user={t?.user}
                            orderNo={t?.orderNo}
                            addNewGroupMemberPosition="unset"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.inboxUsers}>
                    {userActiveTransactions?.map((t, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          localStorage.setItem(
                            'transactionData',
                            JSON.stringify(t)
                          );
                          setBlockchainTransactionData(t);
                          // setIsActiveBlockchain(true);
                        }}
                      >
                        <div className="cursor-pointer transition-transform duration-300 hover:scale-110">
                          <AddNewGroupMember
                            user={t?.user}
                            orderNo={t?.orderNo}
                            addNewGroupMemberPosition="unset"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : null}
            {isAllChats && isGroupChat ? (
              <div className={styles.inboxUsers}>
                <>
                  {/* Not that the user is populated from the db */}
                  {groupSearchResult?.map(({ _id, user, orderNo }) => (
                    <div
                      key={orderNo}
                      onClick={() => createTIcketChat(_id, user, orderNo)}
                    >
                      <div className="cursor-pointer transition-transform duration-300 hover:scale-110">
                        <AddNewGroupMember
                          user={user}
                          orderNo={orderNo}
                          addNewGroupMemberPosition="unset"
                        />
                      </div>
                    </div>
                  ))}
                </>
              </div>
            ) : null}

            {isAllChats && !isGroupChat ? (
              <div className={styles.inboxUsers}>
                {chats?.map((chat, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedChat(chat);
                      localStorage.setItem(
                        'selectedChat',
                        JSON.stringify(selectedChat)
                      );
                    }}
                  >
                    <div className="cursor-pointer transition-transform duration-300 hover:scale-110">
                      <TransactionCard
                        chat={chat}
                        // name={!chat.isGroupChat
                        //   ? getSender(user, chat.users)
                        //   : chat.chatName}
                        // name={
                        //   !chat.isGroupChat
                        //     ? chat.latestMessage.sender.name
                        //     : chat.chatName
                        // }
                        name={
                          !chat.isGroupChat
                            ? getSender(user, chat.users)
                            : chat.chatName
                        }
                        pic={
                          !chat.isGroupChat
                            ? getSenderFull(user, chat.users)?.pic
                            : null
                        }
                        iconCode="/useravatar@2x.png"
                        imageSize="/linechat.svg"
                        usersCardPosition="unset"
                        usersCardWidth="unset"
                        usersCardAlignSelf="stretch"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        </div>
      </div>
      <div className={styles.logoutButtonContainer}>
        <div
          className={`cursor-pointer ${styles.logoutButton}`}
          onClick={logoutHandler}
        >
          <img
            className={styles.logoutButtonChild}
            alt=""
            src="/group-119.svg"
          />
          <div className={styles.logout}>{`Logout `}</div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer1;
