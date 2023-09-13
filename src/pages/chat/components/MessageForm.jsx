import { useEffect, useState } from 'react';
import axios from 'axios';
import TextCardSender from './TextCardSender';
import TextCardReceiver from './TextCardReceiver';
import styles from './MessageForm.module.css';
import stylesProfile from './FormContainer.module.css';
import ProfileContainer from './ProfileContainer';
import stylesGroup from './CreateTicketForm.module.css';
import CreateGroupContainer from './CreateGroupContainer';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import ChatHome from '../pages/ChatHome';
import ScrollableFeed from 'react-scrollable-feed';
import stylesFilter from './CreateTicketForm2.module.css';
import {
  getTransactionByTxId,
  updateTransactionById,
} from '../../../redux/api/api';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../config/ChatLogic';
import DexChat from '../../../uiComponents/AppPage/DexChat';
import LaunchApp from '../../../LaunchApp';
import ActiveTransaction from '../../../uiComponents/AppPage/ActiveTransaction';

// import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
// const ENDPOINT = 'http://localhost:4000'; // "https://talk-a-tive.herokuapp.com"; -> After deployment

// const ENDPOINT = 'http://127.0.0.1:5173' || 'http://localhost:5173';

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const ENDPOINT = FRONTEND_URL;

var socket, selectedChatCompare;

const MessageForm = (props) => {
  const {
    fetchAgain,
    setFetchAgain,
    selectedChat,
    isGroupChat,
    isProfile,
    selectedUsers,
    setSelectedUsers,
    setGroupSearchResult,
    txInfo,
    sendTxMessage,
    setSendTxMessage,
    isHome,
    blockchainTransactionData,
    isAllChats,
    isActiveBlockchain,
    notification,
    setNotification,
    setSelectedChat,
    setIsProfile,
    setIsGroupChat,
    setIsActiveBlockchain,
    setIsHome,
    setIsAllChats,
  } = props;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  //
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const txInfoL = localStorage.getItem('txInfo')
    ? JSON.parse(localStorage.getItem('txInfo'))
    : null;

  console.log({ txInfoL: txInfoL });

  const transactionDataL = localStorage.getItem('transactionData')
    ? JSON.parse(localStorage.getItem('transactionData'))
    : null;
  const [transactionData, setTransactionData] = useState(transactionDataL);
  console.log({ transactionData: transactionData });

  const selectedChatL = localStorage.getItem('selectedChat')
    ? JSON.parse(localStorage.getItem('selectedChat'))
    : null;

  // const selectedChat = localStorage.getItem('selectedChat')
  //   ? JSON.parse(localStorage.getItem('selectedChat'))
  //   : null;

  // const notification = localStorage.getItem('notification')
  //   ? JSON.parse(localStorage.getItem('notification'))
  //   : null;

  const [messages, setMessages] = useState([]);
  console.log({ messages: messages });
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  console.log({ newMessage: newMessage });
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [chatExists, setChatExists] = useState(false);

  const [newData, setNewData] = useState('');
  console.log({ newData: newData });
  const [isSent, setIsSent] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem('selectedChat', JSON.stringify(notification));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [notification]);

  useEffect(() => {
    if (selectedChat) {
      setChatExists(true);
    } else {
      setChatExists(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatExists]);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${BACKEND_URL}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      toast.error({
        title: 'Error Occured!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  // useEffect(() => {
  //   fetchTransactionByTxId();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [transactionData]);

  const fetchTransactionByTxId = async () => {
    // let newTxId = txInfo?.txId.toString();
    // let newTxId = '3';
    let newTxId = txInfoL?.id;
    //

    // const response = getTransactionByTxId(txInfo?.txId);
    if (newTxId) {
      const response = getTransactionByTxId(newTxId);

      if (response) {
        let promise = new Promise(function (resolve, reject) {
          resolve(response);
        });

        promise.then((result) => {
          console.log(result);
          setTransactionData(result);
        });
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('transactionData', JSON.stringify(transactionData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionData]);

  useEffect(() => {
    if (sendTxMessage === true) {
      setTimeout(() => {
        updateTransaction();
        // fetchTransactionByTxId()
        setSendTxMessage(false);
      }, [2000]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendTxMessage]);

  //=================={Send Message after creating  transaction Chat in database}=====================

  const updateTransaction = async () => {
    if (txInfoL) {
      const userData = {
        id: txInfoL?.id,
        managerId: user?._id,
        // status: 'InActive',
        status: 'Active',
      };
      console.log({ userDataBefore: userData });

      const data = await updateTransactionById(userData);
      if (data) {
        console.log({ userTransactionInfo: data });

        setTransactionData(data);
      }
    }
  };

  // const sendMessage = async (ev) => {
  //   ev.preventDefault();
  //   if (newMessage) {
  //     socket.emit('stop typing', selectedChat._id);
  //     try {
  //       const config = {
  //         headers: {
  //           'Content-type': 'application/json',
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       };
  //       setNewMessage('');
  //       const { data } = await axios.post(
  //         `${BACKEND_URL}/api/message`,
  //         {
  //           content: newMessage,
  //           chatId: selectedChat,
  //         },
  //         config
  //       );
  //       // setNewData(data?.message);
  //       setNewData(data);
  //       socket.emit('new message', data?.message);
  //       setMessages([...messages, data?.message]);
  //       setSelectedChat(data?.chat);
  //       // localStorage.setItem(
  //       //   'selectedChat',
  //       //   JSON.stringify(selectedChat)
  //       // );
  //     } catch (error) {
  //       console.log(error);
  //       // toast.error('Failed to send the Message');
  //     }
  //   }
  // };

  const sendMessage = async (ev) => {
    ev.preventDefault();
    if (newMessage) {
      socket.emit('stop typing', selectedChat._id);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage('');
        localStorage.setItem('selectedChat', JSON.stringify(selectedChat));
        setIsSent(true); // check
        // const { data } = await axios.post(
        //   `${BACKEND_URL}/api/message`,
        //   {
        //     content: newMessage,
        //     chatId: selectedChat,
        //   },
        //   config
        // );
        await axios.post(
          `${BACKEND_URL}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        // setNewData(data);
        // socket.emit('new message', data);
        // setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
        // toast.error('Failed to send the Message');
      }
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchMessagesAfter();
  //   }, 1000);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSent]);

  useEffect(() => {
    setTimeout(() => {
      fetchMessagesAfter();
    }, 400);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSent]);

  const fetchMessagesAfter = async () => {
    if (!isSent) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `${BACKEND_URL}/api/message/${selectedChatL._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChatL._id);
      setIsSent(false);
    } catch (error) {
      toast.error({
        title: 'Error Occured!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat, newData]);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {isHome ? (
        <div className={`justify-center items-center ${styles.messagesCustom}`}>
          <LaunchApp
            isHome={isHome}
            setIsProfile={setIsProfile}
            setIsGroupChat={setIsGroupChat}
            setIsActiveBlockchain={setIsActiveBlockchain}
            setIsHome={setIsHome}
            setIsAllChats={setIsAllChats}
            isActiveBlockchain={isActiveBlockchain}
          />
        </div>
      ) : null}
      {isAllChats ? (
        <>
          {messages ? (
            <div className={styles.messages}>
              <>
                <div className={styles.messagesArea}>
                  <div className={styles.chatHistory}>
                    <ScrollableFeed>
                      {messages &&
                        messages.map((m, i) => (
                          <div style={{ display: 'flex' }} key={m._id}>
                            <span
                              style={{
                                backgroundColor: `${
                                  m.sender._id === user._id
                                    ? '#37363C'
                                    : '#372F45'
                                }`,
                                marginLeft: isSameSenderMargin(
                                  messages,
                                  m,
                                  i,
                                  user._id
                                ),
                                marginTop: isSameUser(messages, m, i, user._id)
                                  ? 3
                                  : 10,

                                borderRadius: '12px',
                                border: 'gray.200',

                                padding: '10px 20px',
                                maxWidth: '75%',
                              }}
                            >
                              <p className="text-gray-50">{m.content}</p>
                              <p className="text-[8px] text-red-500 mt-[4px]">
                                {new Date(m?.createdAt).toLocaleTimeString()}
                              </p>
                            </span>
                          </div>
                        ))}
                    </ScrollableFeed>
                    {isProfile ? (
                      <div className={stylesProfile.profileOverlay}>
                        <ProfileContainer
                          setIsProfile={setIsProfile}
                          profileContainerPosition="absolute"
                          profileContainerTop="calc(50% - 260.5px)"
                          profileContainerLeft="calc(50% - 135px)"
                          updateProfileBorder="1px solid var(--color-mediumpurple-100)"
                        />
                      </div>
                    ) : null}
                    {isGroupChat === true ? (
                      <div className={stylesGroup.profileOverlay}>
                        <CreateGroupContainer
                          selectedUsers={selectedUsers}
                          setSelectedUsers={setSelectedUsers}
                          setGroupSearchResult={setGroupSearchResult}
                          createGroupContainerPosition="absolute"
                          createGroupContainerTop="calc(50% - 169.5px)"
                          createGroupContainerLeft="calc(50% - 187px)"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* ============================{Typing Section}============================== */}

                <div className={styles.inputSection}>
                  {/* ========{Uplaod photo}================== */}
                  <img
                    className={`cursor-pointer ${styles.inputSectionChild}`}
                    alt=""
                    src="/group-117.svg"
                    // onClick={''}
                  />
                  <div className={styles.placeholderTyping}>
                    <input
                      type="text"
                      className={`outline-none [border:none] text-gray-50 bg-[#191521] ${styles.sendAMessage}`}
                      placeholder="Send a message..."
                      value={newMessage}
                      onChange={typingHandler}
                    />
                  </div>
                  <div
                    type="submit"
                    className="cursor-pointer"
                    onClick={sendMessage}
                  >
                    <img
                      className={styles.attachIcons}
                      alt=""
                      src="/attachicons.svg"
                    />
                  </div>
                </div>
              </>
            </div>
          ) : (
            <ChatHome />
          )}
        </>
      ) : null}
      {isActiveBlockchain ? (
        <div className={`justify-center items-center ${styles.messagesCustom}`}>
          <ActiveTransaction
            blockchainTransactionData={blockchainTransactionData}
            setIsProfile={setIsProfile}
            setIsGroupChat={setIsGroupChat}
            setIsActiveBlockchain={setIsActiveBlockchain}
            setIsHome={setIsHome}
            setIsAllChats={setIsAllChats}
            isActiveBlockchain={isActiveBlockchain}
          />
        </div>
      ) : null}
    </>
  );
};

export default MessageForm;
