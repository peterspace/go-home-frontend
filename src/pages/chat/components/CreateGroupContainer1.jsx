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
  setIsAllChats,
  selectedUsers,
  // setSelectedUsers,
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

    // const selectedUsers = localStorage.getItem('selectedUsers')
    // ? JSON.parse(localStorage.getItem('selectedUsers'))
    // : null;

  const [groupChatName, setGroupChatName] = useState();
  const [groupSearchResult, setGroupSearchResult] = useState();
  const [loadingGroupSearch, setLoadingGroupSearch] = useState(false);
 

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

  //=========={Favorite}============================================
  const [selectedToken, setSelectedToken] = useState();
  const [isAddToGroup, setIsAddToGroup] = useState();
  const [isRemoveFromGroup, setIsRemoveFromGroup] = useState();

  const [filteredGroupMembers, setFilteredGroupMembers] = useState();

  const userGroupMembersL = localStorage.getItem('userGroupMembers')
    ? JSON.parse(localStorage.getItem('userGroupMembers'))
    : null;
  // const [favoriteMembers, setFavoriteMembers] = useState(userGroupMembersL);
  // const [favoriteMembers, setFavoriteMembers] = useState([]);
  const [favoriteMembers, setFavoriteMembers] = useState(null);

  console.log({ favoriteMembers: favoriteMembers });
  console.log({ favoriteMembersType: typeof favoriteMembers });

  const [savedFavoriteMembers, setSavedFavoriteMembers] = useState(userGroupMembersL); // last used
  // const [savedFavoriteMembers, setSavedFavoriteMembers] = useState([]);
  console.log({ savedFavoriteMembers: savedFavoriteMembers });


  //=========={Favorite}============================================
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


  // const handleDelete = (delUser) => {
  //   setSelectedUsers(selectedUsers?.filter((sel) => sel._id !== delUser._id));
  //   // localStorage.setItem('selectedUsers', selectedUsers.filter((sel) => sel._id !== delUser._id));
  // };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error('Please fill all the feilds');
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
          users: JSON.stringify(selectedUsers?.map((u) => u._id)),
        },
        config
      );
      // setChats([data, ...chats]);
      localStorage.setItem('chats', JSON.stringify([data, ...chats]));
     
      toast.success('New Group Chat Created!');
      //====={Turn of Group Modal}============
      setTimeout(() => {
        setIsGroupChat(false);
        setIsAllChats(true);
      }, 1000);
    } catch (error) {
      toast.error('Failed to Create the Chat!');
    }
  };

  // useEffect(() => {
  //   if (!groupSearchResult) {
  //     handleSearch2();
  //   }
  //   // handleSearch2();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [groupSearchResult]);

  useEffect(() => {
    handleSearch2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSearch2 = async () => {
    try {
      // setLoading(true);

      const { data } = await axios.get(`${BACKEND_URL}/api/user/adminUsers`);
      // console.log(data);
      // setLoading(false);
      // setSearchResult(data);

      setGroupSearchResult(data);
      // localStorage.setItem('groupSearchResult', JSON.stringify(data));
      setLoadingGroupSearch(true);
    } catch (error) {
      toast.error('Error Occured!');
    }
  };

    //========{On IntervalChanges}=========================

  //setSelectedToken=======================================================================

  useEffect(() => {
    if (savedFavoriteMembers) {
      localStorage.setItem('userGroupMembers', JSON.stringify(savedFavoriteMembers));
      setFavoriteMembers(savedFavoriteMembers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedFavoriteMembers]);

  useEffect(() => {
    if (isAddToGroup) {
      addToGroup(selectedToken);
      setIsAddToGroup(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddToGroup]);

  useEffect(() => {
    if (isRemoveFromGroup) {
      removeFromGroup(selectedToken);
      setIsRemoveFromGroup(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRemoveFromGroup]);


  // <img src="image.png" onError="this.onerror=null;this.src='/images/noimage.gif';" />
  // <img src="image.png" onError="this.onerror=null;this.src='/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png';" />

  async function addToGroup(newToken) {
    let isActive;
    favoriteMembers?.map(async (b) => {
      if (b?.email === newToken?.email) {
        isActive = true;
      }
    });
    if (isActive === true) {
      return;
    } else {
      let updatedMembers = favoriteMembers;
      updatedMembers.push(newToken);
      setSavedFavoriteMembers(updatedMembers);
      localStorage.setItem('userGroupMembers', JSON.stringify(updatedMembers));
    
    }
  }

  async function removeFromGroup(newToken) {
    let updatedMembers = [];
    favoriteMembers?.map(async (b) => {
      if (b !== newToken) {
        updatedMembers.push(b);
      }
    });
    setSavedFavoriteMembers(updatedMembers);
    localStorage.setItem('userGroupMembers', JSON.stringify(updatedMembers));
   
  }

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
        {/* <div className="flex flex-rcol justify-center items-center w-[100%]">
          {selectedUsers && selectedUsers?.map((u) => (
            <div className="" key={u._id} onClick={() => handleDelete(u)}>
              <span>{u?.name}</span>
            </div>
          ))}
        </div> */}
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
        <div className={`cursor-pointer ${styles.buttonStatus1}`} onClick={handleSubmit}>
          <div className={styles.status}>Create</div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupContainer;
