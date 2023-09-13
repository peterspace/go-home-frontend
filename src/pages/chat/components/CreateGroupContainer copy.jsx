import { useState, useEffect, useMemo } from 'react';
import styles from './CreateGroupContainer.module.css';
import UsersListCard from './UsersListCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Country, State, City } from 'country-state-city';

const statusList = [
  {
    name: 'Pending',
  },
  {
    name: 'Completed',
  },
  {
    name: 'InProgress',
  },
  {
    name: 'Cancelled',
  },
  {
    name: 'Active',
  },
];

const CreateGroupContainer = ({
  setIsGroupChat,
  createGroupContainerPosition,
  createGroupContainerTop,
  createGroupContainerLeft,
}) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const createGroupContainerStyle = useMemo(() => {
    return {
      position: createGroupContainerPosition,
      top: createGroupContainerTop,
      left: createGroupContainerLeft,
    };
  }, [
    createGroupContainerPosition,
    createGroupContainerTop,
    createGroupContainerLeft,
  ]);
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const chats = localStorage.getItem('chats')
    ? JSON.parse(localStorage.getItem('chats'))
    : null;

    const selectedUsers = localStorage.getItem('selectedUsers')
    ? JSON.parse(localStorage.getItem('selectedUsers'))
    : null;

  const [groupChatName, setGroupChatName] = useState();
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showUsers, setShowUsers] = useState(false);

  //================{User Location}======================================

  const allCountry = Country.getAllCountries();
  const [countryData, setCountryData] = useState(allCountry[0]);
  const [country, setCountry] = useState(countryData?.name);
  const allState = State.getStatesOfCountry(countryData?.isoCode);
  const allCity = City.getCitiesOfCountry(countryData?.isoCode);
  console.log({ allCountry: allCountry });
  console.log({ allState: allState });
  console.log({ allCity: allCity });
  const [stateData, setStateData] = useState(allState[0]);
  const [state, setState] = useState(stateData?.name);
  const [cityData, setCityData] = useState(allCity[0]);
  const [city, setCity] = useState(cityData?.name);

  const [userAddress, setUserAddress] = useState([]);
  //================{Transaction Status}======================================
  const [status, setStatus] = useState([]);

  const [isCountry, setIsCountry] = useState(false);
  const [isState, setIsState] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [isStatus, setIsStatus] = useState(false);

  // const handleGroup = (userToAdd) => {
  //   if (selectedUsers.includes(userToAdd)) {
  //     toast.error('User already added');
  //     return;
  //   }

  //   setSelectedUsers([...selectedUsers, userToAdd]);
  // };

  useEffect(() => {
    if (!groupChatName) {
      setShowUsers(false);
    } else {
      setTimeout(() => {
        setShowUsers(true);
      }, 2000);
    }
  }, [groupChatName]);

  useEffect(() => {
    handleSearch2();
  }, []);

  const handleSearch2 = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${BACKEND_URL}/api/user/adminUsers`);
      console.log(data);
      setLoading(false);
      // setSearchResult(data);
      

      localStorage.setItem('groupSearchResult', JSON.stringify(data));
    } catch (error) {
      toast.error('Error Occured!');
    }
  };

  const handleDelete = (delUser) => {
    // setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    localStorage.setItem('selectedUsers', selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error({
        title: 'Please fill all the feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${BACKEND_URL}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      // setChats([data, ...chats]);
      localStorage.setItem('chats', JSON.stringify([data, ...chats]));
      // onClose();
      // setIsVisible(false) // for modal control
      toast.success('New Group Chat Created!');
      //====={Turn of Group Modal}============
      setTimeout(() => {
        setIsGroupChat(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to Create the Chat!');
    }
  };

  return (
    <div
      className={styles.createGroupContainer}
      style={createGroupContainerStyle}
    >
      <div className={styles.createGroupCard}>
        <div className={styles.createTicket}>Create Ticket</div>
        <div className={styles.ticketFilter}>
          <div
            className={styles.buttonState}
            onClick={() => {
              setIsCountry(false);
              setIsState(true);
              setIsCity(false);
              setIsStatus(false);
            }}
          >
            <div className={styles.state}>State</div>
          </div>
          <div
            className={styles.buttonCity}
            onClick={() => {
              setIsCountry(false);
              setIsState(false);
              setIsCity(true);
              setIsStatus(false);
            }}
          >
            <div className={styles.city}>City</div>
          </div>
          <div
            className={styles.buttonStatus}
            onClick={() => {
              setIsCountry(false);
              setIsState(false);
              setIsCity(false);
              setIsStatus(true);
            }}
          >
            <div className={styles.status}>Status</div>
          </div>
          <div
            className={styles.buttonCountry}
            onClick={() => {
              setIsCountry(true);
              setIsState(false);
              setIsCity(false);
              setIsStatus(false);
            }}
          >
            <div className={styles.country}>Country</div>
          </div>
        </div>
        <div className={styles.groupNameCard}>
          <input
            type="text"
            placeholder="Enter group name ..."
            className={`outline-none [border:none] text-gray-50 bg-[#191521] ${styles.enterGroupName}`}
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-center items-center w-[100%] absolute z-10">
          {selectedUsers.map((u) => (
            <div className="" key={u._id} onClick={() => handleDelete(u)}>
              <span>{u?.name}</span>
            </div>
          ))}
        </div>
        {/* {!showUsers ? (
        
          <div>Loading...</div>
        ) : (
          searchResult?.slice(0, 4).map((user) => (
            <div key={user._id} onClick={handleGroup(user)} className='absolute z-10'>
              <UsersListCard
                user={user}
                usersCardPosition="unset"
                usersCardWidth="unset"
                usersCardAlignSelf="stretch"
              />
            </div>
          ))
        )} */}

        <>
          <div>
            <div
              className="mb-1 bg-[#EB003C]"
              placeholder={`Country: ${country}`}
            ></div>
          </div>
          <div>
            <div
              placeholder={`State: ${state ? state : null}`}
              className="mb-1 bg-[#EB003C]"
            ></div>
          </div>
          <div>
            <div
              placeholder={`City: ${city ? city : null}`}
              className="mb-1 bg-[#EB003C]"
            ></div>
          </div>
          <div>
            <div
              placeholder={`Status: ${status}`}
              className="mb-1 bg-[#EB003C]"
            ></div>
          </div>
        </>
        <div className={styles.buttonStatus1} onClick={handleSubmit}>
          <div className={styles.status}>Create</div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupContainer;
