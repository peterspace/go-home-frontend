import { useEffect, useState } from 'react';
import axios from 'axios';
import TextCardSender from './TextCardSender';
import TextCardReceiver from './TextCardReceiver';
import styles from './MessageForm.module.css';
import io from 'socket.io-client';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { ChatState } from '../Context/ChatProvider';
const ENDPOINT = 'http://localhost:4000'; // "https://talk-a-tive.herokuapp.com"; -> After deployment
import { toast } from 'react-toastify';
var socket, selectedChatCompare;

const MessageForm = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const selectedChat = localStorage.getItem('selectedChat')
    ? JSON.parse(localStorage.getItem('selectedChat'))
    : null;

  // const notificationL = localStorage.getItem('notification')
  // ? JSON.parse(localStorage.getItem('notification'))
  // : null;

  // const [notification, setNotification] = useState(notificationL);
  // console.log({ notification: notification });

  const notification = localStorage.getItem('notification')
    ? JSON.parse(localStorage.getItem('notification'))
    : null;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const { setSelectedChat } = ChatState();

  // useEffect(() => {
  //   localStorage.setItem('selectedChat', JSON.stringify(notification));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [notification]);

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
        `/api/message/${selectedChat._id}`,
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

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
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
          '/api/message',
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error({
          title: 'Error Occured!',
          description: 'Failed to send the Message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
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
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          // setNotification([newMessageRecieved, ...notification]);
          localStorage.setItem(
            'selectedChat',
            JSON.stringify([newMessageRecieved, ...notification])
          );
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
    <div className={styles.messages}>
      <div className={styles.messagesArea}>
        <div className={styles.chatHistory}>
          <TextCardSender
            companyMission="Hi chizzy "
            textCardSenderPosition="absolute"
            textCardSenderTop="0px"
            textCardSenderLeft="0px"
          />
          <TextCardReceiver
            companyMission="Sup!"
            textCardReceiverPosition="absolute"
            textCardReceiverTop="106px"
            textCardReceiverRight="0px"
          />
          <TextCardSender
            companyMission="Any plans for the weekend yet? "
            textCardSenderPosition="absolute"
            textCardSenderTop="212px"
            textCardSenderLeft="0px"
          />
          <TextCardSender
            companyMission="I’d like us to hangout if you’re up for it"
            textCardSenderPosition="absolute"
            textCardSenderTop="318px"
            textCardSenderLeft="0px"
          />
          <TextCardReceiver
            companyMission="By all means, we can"
            textCardReceiverPosition="absolute"
            textCardReceiverTop="460px"
            textCardReceiverRight="0px"
          />
          <TextCardReceiver
            companyMission="Thanks Chizzy"
            textCardReceiverPosition="absolute"
            textCardReceiverTop="566px"
            textCardReceiverRight="0px"
          />
        </div>
      </div>
      <div className={styles.inputSection}>
        <img className={styles.inputSectionChild} alt="" src="/group-117.svg" />
        <div className={styles.placeholderTyping}>
          {/* <div className={styles.sendAMessage}>Send a message...</div> */}
          <div className={styles.sendAMessage}>
            <input
              type="text"
              placeholder="Send a message..."
              value={newMessage}
              onChange={typingHandler}
            />
          </div>
        </div>
        <div className="" onClick={sendMessage}>
          <img className={styles.attachIcons} alt="" src="/attachicons.svg" />
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
