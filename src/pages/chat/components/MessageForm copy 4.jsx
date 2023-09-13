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
    setIsProfile,
    setIsGroupChat,
    setIsAllChats,
    selectedUsers,
    setSelectedUsers,
    setGroupSearchResult,
    txInfo,
    sendTxMessage,
    setSendTxMessage,
    isHome,
    isBlockchain,
    setIsBlockchain,
    blockchainTransactionData,
    setIsActiveBlockchain,
    isActiveBlockchain,
    notification,
    setNotification,
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

  // const selectedChat = localStorage.getItem('selectedChat')
  //   ? JSON.parse(localStorage.getItem('selectedChat'))
  //   : null;

  // const notification = localStorage.getItem('notification')
  //   ? JSON.parse(localStorage.getItem('notification'))
  //   : null;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  console.log({ newMessage: newMessage });
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [chatExists, setChatExists] = useState(false);

  const [newData, setNewData] = useState('');
  console.log({ newData: newData });

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
        managerWalletAddress: user?.walletAddress,
        status: 'InActive',
      };
      console.log({ userDataBefore: userData });

      const data = await updateTransactionById(userData);
      if (data) {
        console.log({ userTransactionInfo: data });

        setTransactionData(data);
      }
    }
  };

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
        const { data } = await axios.post(
          `${BACKEND_URL}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        setNewData(data);
        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
        // toast.error('Failed to send the Message');
      }
    }
  };

  // const sendMessage = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     setNewMessage('');
  //     const { data } = await axios.post(
  //       `${BACKEND_URL}/api/message`,
  //       {
  //         content: newMessage,
  //         chatId: selectedChat,
  //       },
  //       config
  //     );
  //     setNewData(data);

  //     setMessages([...messages, data]);
  //   } catch (error) {
  //     toast.error('Failed to send the Message');
  //   }
  // };

  // const sendMessage = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     setNewMessage('');
  //     const { data } = await axios.post(
  //       `${BACKEND_URL}/api/message`,
  //       {
  //         content: newMessage,
  //         chatId: selectedChat,
  //       },
  //       config
  //     );
  //     setNewData(data);

  //     setMessages([...messages, data]);
  //   } catch (error) {
  //     toast.error({
  //       title: 'Error Occured!',
  //       description: 'Failed to send the Message',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'bottom',
  //     });
  //   }
  // };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   fetchMessages();

  //   selectedChatCompare = selectedChat;
  //   // eslint-disable-next-line
  // }, [selectedChat]);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat, newData]);

  // useEffect(() => {
  //   socket.on('message recieved', (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //       selectedChatCompare._id !== newMessageRecieved.chat._id
  //     ) {
  //       if (!notification.includes(newMessageRecieved)) {
  //         // setNotification([newMessageRecieved, ...notification]);
  //         localStorage.setItem(
  //           'notification',
  //           JSON.stringify([newMessageRecieved, ...notification])
  //         );
  //         setFetchAgain(!fetchAgain);
  //       }
  //     } else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // });

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

  // const sendMessage = async () => {
  //   // let newContent = `
  //   // client: ${user?.name}
  //   // txId: ${transactionData?.txId}
  //   // country: ${transactionData?.country}
  //   // city: ${transactionData?.city}
  //   // chainId: ${transactionData?.chainId}
  //   // fromSymbol: ${transactionData?.fromSymbol}
  //   // toSymbol: ${transactionData?.toSymbol}
  //   // fromValue: ${transactionData?.fromValue}
  //   // toValue: ${transactionData?.toValue}
  //   // service: ${transactionData?.service}
  //   // `;

  //   let newContent = `
  //   client: Sasha
  //   txId: ${transactionData?.txId}
  //   country: ${transactionData?.country}
  //   city: ${transactionData?.city}
  //   chainId: ${transactionData?.chainId}
  //   fromSymbol: ${transactionData?.fromSymbol}
  //   toSymbol: ${transactionData?.toSymbol}
  //   fromValue: ${transactionData?.fromValue}
  //   toValue: ${transactionData?.toValue}
  //   service: ${transactionData?.service}
  //   `;
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     // setNewMessage('');
  //     const { data } = await axios.post(
  //       `${BACKEND_URL}/api/message`,
  //       {
  //         content: newContent,
  //         chatId: createdTxChat?._id,
  //       },
  //       config
  //     );
  //     if (data) {
  //       localStorage.setItem('createdTxMessage', JSON.stringify(data));
  //       console.log({ newMessage: data });
  //     }
  //   } catch (error) {
  //     toast.error('Error Occured!');
  //   }
  // };

  return (
    <>
      {isHome ? (
        //   <div className={`justify-center items-center ${styles.messages}`}>
        //   <DexChat isBlockchain={isBlockchain} blockchainTransactionData={blockchainTransactionData} />
        // </div>

        // <div className={`justify-center items-center ${styles.messagesCustom}`}>
        // <DexChat
        //   isBlockchain={isBlockchain}
        //   blockchainTransactionData={blockchainTransactionData}
        //   setIsBlockchain={setIsBlockchain}
        //   setIsActiveBlockchain={setIsActiveBlockchain}
        //   isActiveBlockchain={isActiveBlockchain}
        // />
        // </div>
        <div className={`justify-center items-center ${styles.messagesCustom}`}>
          <LaunchApp
            isBlockchain={isBlockchain}
            blockchainTransactionData={blockchainTransactionData}
            setIsBlockchain={setIsBlockchain}
            setIsActiveBlockchain={setIsActiveBlockchain}
            isActiveBlockchain={isActiveBlockchain}
          />
        </div>
      ) : (
        //   <div className={`justify-center items-center ${styles.messagesCustom}`}>
        //   <LaunchApp isBlockchain={isBlockchain} blockchainTransactionData={blockchainTransactionData} />
        // </div>
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
                          setIsAllChats={setIsAllChats}
                          setIsGroupChat={setIsGroupChat}
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
      )}
    </>
  );
};

export default MessageForm;
