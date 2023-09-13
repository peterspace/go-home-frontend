import UsersCard from './UsersCard';
import styles from './FormContainer1.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import UsersListCard from './UsersListCard';
import UsersListGroupCard from './UsersListGroupCard';
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

const FormContainer1 = (props) => {
  const {
    fetchAgain,
    selectedChat,
    setSelectedChat,
    isGroupChat,
    setIsGroupChat,
    isSearch,
    setIsSearch,
    isAllChats,
    setIsAllChats,
    setIsProfile,
    isHome,
    setIsHome,
    selectedUsers,
    setSelectedUsers,
    groupSearchResult,
    setTxInfo,
    txInfo,
    setSendTxMessage,
    sendTxMessage,
    setIsBlockchain,
    setBlockchainTransactionData,
    setIsActiveBlockchain,
  } = props;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  // const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  // const [isSearch, setIsSearch] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingGroupSearch, setLoadingGroupSearch] = useState(false);

  // const [selectedUsers, setSelectedUsers] = useState([]);
  // const [isAllSingleChats, setisAllSingleChats] = useState();
  // const [isAllGroupChats, setisAllGroupChats] = useState();

  // const [loggedUser, setLoggedUser] = useState();

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const searchResult = localStorage.getItem('searchResult')
    ? JSON.parse(localStorage.getItem('searchResult'))
    : null;

  const txInfoL = localStorage.getItem('txInfo')
    ? JSON.parse(localStorage.getItem('txInfo'))
    : null;

  const [selectedUser, setSelectedUser] = useState();

  const [newGroupData, setNewGroupData] = useState();
  // console.log({ newGroupData: newGroupData });

  const [userInactiveTransactions, setUserInactiveTransactions] = useState();
  const [userActiveTransactions, setUserActiveTransactions] = useState();
  const [ManagerActiveTransactions, setManagerActiveTransactions] = useState();
  // console.log({ userInactiveTransactions: userInactiveTransactions });

  const [isActiveTransactions, setIsActiveTransactions] = useState(false);
  const [isInActiveTransactions, setIsInActiveTransactions] = useState(false);

  const [selectedExchangeData, setSelectedExchangeData] = useState();
  // console.log({ selectedExchangeData: selectedExchangeData });

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

  // {
  //   allChat?.map((token, idx) => (
  //     <div
  //       key={idx}
  //       onClick={() => {
  //         setSelectedChat(token);
  //       }}
  //     ></div>
  //   ));
  // }

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

  const createGroupBySearch = async (selectedUser) => {
    let txId = '23';
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_URL}/api/chat/group`,
        {
          name: `TxId: ${txId}`,
          users: JSON.stringify([selectedUser]),
          // users: JSON.stringify([groupSearchResult[1], groupSearchResult[2]]),
        },
        config
      );
      setNewGroupData(data);
      // setChats([data, ...chats]);
      setLoadingChat(true);

      // setChats([data, ...chats]);
      localStorage.setItem('chats', JSON.stringify([data, ...chats]));

      toast.success('New Group Chat Created!');
      if (data) {
        setTxInfo({ txId: txId, chatId: data?._id });
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

  // const createTIcketChat = async (selectedUser, txId) => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     const { data } = await axios.post(
  //       `${BACKEND_URL}/api/chat/group`,
  //       {
  //         name: `TxId: ${txId}`,
  //         users: JSON.stringify([selectedUser]),
  //         // users: JSON.stringify([groupSearchResult[1], groupSearchResult[2]]),
  //       },
  //       config
  //     );
  //     setNewGroupData(data);
  //     // setChats([data, ...chats]);
  //     setLoadingChat(true);

  //     // setChats([data, ...chats]);
  //     localStorage.setItem('chats', JSON.stringify([data, ...chats]));

  //     toast.success('New Group Chat Created!');
  //     if (data) {
  //       setTxInfo({txId: txId, chatId: data?._id});
  //       setSendTxMessage(true)
  //     }
  //     //====={Turn of Group Modal}============
  //     setTimeout(() => {
  //       setIsGroupChat(false);
  //       setIsAllChats(true);
  //     }, 1000);
  //   } catch (error) {
  //     toast({
  //       title: 'Error fetching the chat',
  //       description: error.message,
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'bottom-left',
  //     });
  //   }
  // };

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
          // users: JSON.stringify([groupSearchResult[1], groupSearchResult[2]]),
        },
        config
      );
      setNewGroupData(data);
      // setChats([data, ...chats]);
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

  // useEffect(() => {
  //   if (sendTxMessage === true) {
  //     updateTransaction();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sendTxMessage]);

  // useEffect(() => {
  //   fetchUserInactiveTransactions();
  // }, [userInactiveTransactions]);

  //===={User Inactive transactions}============================
  const fetchUserInactiveTransactions = async () => {
    const data = await getUserInactiveTransactions();
    setUserInactiveTransactions(data);
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

  // const fetchUserInactiveTransactions2 = async () => {
  //   const response = getUserInactiveTransactions();
  //   if (response) {
  //     let promise = new Promise(function (resolve, reject) {
  //       resolve(response);
  //     });
  //     promise.then((result) => {
  //       console.log(result);
  //       setUserInactiveTransactions(result);
  //     });
  //   }
  // };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // const handleGroup = (userToAdd) => {
  //   if (selectedUsers?.includes(userToAdd)) {
  //     setSelectedUsers(
  //       selectedUsers?.filter((sel) => sel._id !== userToAdd._id)
  //     );
  //     // toast.error('User already added');
  //     // return;
  //   } else {
  //     setSelectedUsers([...selectedUsers, userToAdd]);
  //   }
  // };

  // useEffect(() => {
  //   if (!groupSearchResult) {
  //     handleSearch2();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [groupSearchResult]);

  // const handleSearch2 = async () => {
  //   try {
  //     const { data } = await axios.get(`${BACKEND_URL}/api/user/adminUsers`);
  //     setGroupSearchResult(data);
  //     setLoadingGroupSearch(true);
  //   } catch (error) {
  //     toast.error('Error Occured!');
  //   }
  // };

  return (
    <div className={styles.inbox}>
      <div className={styles.inboxInner}>
        <div className={styles.groupChatsParent}>
          {/* {user?.isAdmin === true ? (
            <div
              className={`cursor-pointer ${styles.groupChats}`}
              onClick={() => {
                setIsSearch(false);
                setIsAllChats(false);
                setIsProfile(false);
                setIsHome(false);
                setIsGroupChat(true);
              }}
            >
              <div className={styles.groups}>Groups</div>
            </div>
          ) : null} */}
          {user?.isAdmin === true ? (
            <>
              <div
                className={`cursor-pointer ${styles.groupChats}`}
                onClick={() => {
                  setIsSearch(false);
                  setIsAllChats(false);
                  setIsProfile(false);
                  setIsHome(false);
                  setIsGroupChat(true);
                }}
              >
                <div className={styles.groups}>Groups</div>
              </div>
              <div
                className={`cursor-pointer ${styles.allChats}`}
                onClick={() => {
                  localStorage.setItem('searchResult', JSON.stringify(''));
                  setIsGroupChat(false);
                  setIsSearch(false);
                  setIsProfile(false);
                  setIsHome(false);
                  setIsAllChats(true);
                  setIsBlockchain(false);
                }}
              >
                <div className={styles.all}>{`All `}</div>
              </div>
            </>
          ) : (
            // <>
            //   <div
            //     className={`cursor-pointer ${styles.groupChats}`}
            //     onClick={() => {
            //       fetchUserInactiveTransactions();
            //       setIsSearch(false);
            //       setIsAllChats(false);
            //       setIsProfile(false);
            //       setIsGroupChat(false);
            //       setIsHome(true);
            //       setIsBlockchain(true);
            //     }}
            //   >
            //     <div className={styles.groups}>Inactive</div>
            //   </div>
            //   <div
            //     className={`cursor-pointer ${styles.allChats}`}
            //     onClick={() => {
            //       fetchUserActiveTransactions()
            //       localStorage.setItem('searchResult', JSON.stringify(''));
            //       setIsGroupChat(false);
            //       setIsSearch(false);
            //       setIsProfile(false);
            //       setIsHome(false);
            //       setIsAllChats(true);
            //       setIsBlockchain(false);
            //     }}
            //   >
            //     <div className={styles.all}>{`All `}</div>
            //   </div>
            // </>
            <>
              <div
                className={`flex flex-row justify-between ${styles.groupChatsCustom}`}
              >
                <div
                  className="relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900)] px-2 rounded-lg text-[14px] w-[80px]"
                  onClick={() => {
                    localStorage.setItem('searchResult', JSON.stringify(''));
                    setIsGroupChat(false);
                    setIsSearch(false);
                    setIsProfile(false);
                    setIsHome(false);
                    setIsBlockchain(false);
                    setIsActiveBlockchain(false);
                    setIsAllChats(true);
                  }}
                >{`All `}</div>
                <div
                  className="relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900) px-2 rounded-lg text-[14px] w-[80px]"
                  onClick={() => {
                    fetchUserActiveTransactions();
                    setIsSearch(false);
                    setIsAllChats(false);
                    setIsProfile(false);
                    setIsGroupChat(false);
                    setIsInActiveTransactions(false); // turn of activeInTransactions fetching
                    setIsBlockchain(false); // turn of activeInTransactions
                    setIsActiveTransactions(true);
                    setIsHome(true);
                    setIsActiveBlockchain(true);
                  }}
                >
                  Active
                </div>
                <div
                  className="relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900) px-2 rounded-lg text-[14px] w-[80px]"
                  onClick={() => {
                    fetchUserInactiveTransactions();
                    setIsSearch(false);
                    setIsAllChats(false);
                    setIsProfile(false);
                    setIsGroupChat(false);
                    setIsActiveTransactions(false); // turn of activeTransactions fetching
                    setIsActiveBlockchain(false); // turn of activeTransactions transactions
                    setIsInActiveTransactions(true);
                    setIsHome(true);
                    setIsBlockchain(true);
                  }}
                >
                  New
                </div>
              </div>
              {/* <div
                className={`cursor-pointer ${styles.allChats}`}
                onClick={() => {
                  fetchUserActiveTransactions()
                  localStorage.setItem('searchResult', JSON.stringify(''));
                  setIsGroupChat(false);
                  setIsSearch(false);
                  setIsProfile(false);
                  setIsHome(false);
                  setIsAllChats(true);
                  setIsBlockchain(false);
                }}
              >
                <div className={styles.all}>{`All `}</div>
              </div> */}
            </>
          )}
        </div>
      </div>
      <div className={styles.inboxContainerWrapper}>
        <div className={styles.inboxContainer}>
          {isHome ? (
            <>
              {isInActiveTransactions ? (
                <div className={styles.inboxUsers}>
                  {userInactiveTransactions?.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedExchangeData(t);
                        localStorage.setItem(
                          'transactionData',
                          JSON.stringify(t)
                        );
                        setBlockchainTransactionData(t);
                        setIsBlockchain(true);
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
              ) : null}
              {isActiveTransactions ? (
                <div className={styles.inboxUsers}>
                  {userActiveTransactions?.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedExchangeData(t);
                        localStorage.setItem(
                          'transactionData',
                          JSON.stringify(t)
                        );
                        setBlockchainTransactionData(t);
                        setIsBlockchain(true);
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
              ) : null}
            </>
          ) : (
            // <div className={`cursor-pointer ${styles.inboxUsers}`}>
            //   <div onClick={fetchUserInactiveTransactions}>Check</div>
            // </div>
            <>
              {isGroupChat ? (
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
              {isSearch ? (
                <div className={styles.inboxUsers}>
                  {searchResult?.map((user, idx) => (
                    <div key={idx} onClick={() => createGroupBySearch(user)}>
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
                </div>
              ) : null}

              {isAllChats ? (
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
                        <UsersCard
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
          )}
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
