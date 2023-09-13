import { useState, useEffect, useMemo } from 'react';
import styles from './CreateGroupContainer.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { Country, State, City } from 'country-state-city';
import stylesFilter from './CreateTicketForm2.module.css';
import { getAllTransactions } from '../../../redux/api/api';

const statusList = [
  {
    name: 'Pending',
  },
  {
    name: 'InActive',
  },
  {
    name: 'Active',
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
];

const allState = [
  {
    name: 'Moscow',
  },
  {
    name: 'Saint petersburg',
  },
];

const allCountry = [
  {
    name: 'Russia',
  },
];

const CreateGroupContainer = ({

  createGroupContainerPosition,
  createGroupContainerTop,
  createGroupContainerLeft,
  setGroupSearchResult,
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

  console.log({ currentUser: user });

  const [loading, setLoading] = useState(false);

  //================{User Location}======================================

  const countryL =
    (localStorage.getItem('country') &&
      JSON.parse(localStorage.getItem('country'))) ||
    allCountry[0]?.name ||
    null;
  const [country, setCountry] = useState(countryL);

  const stateL =
    (localStorage.getItem('state') &&
      JSON.parse(localStorage.getItem('state'))) ||
    allState[0]?.name ||
    null;
  const [state, setState] = useState(stateL);

  const [filteredData, setFilteredData] = useState();
  console.log({ filteredData: filteredData });
  const allTransactionsL = localStorage.getItem('allTransactions')
    ? JSON.parse(localStorage.getItem('allTransactions'))
    : null;
  const [allTransactions, setAllTransactions] = useState(allTransactionsL);
  console.log({ allTransactions: allTransactions });
  //================{Transaction Status}======================================

  const statusL =
    (localStorage.getItem('status') &&
      JSON.parse(localStorage.getItem('status'))) ||
    statusList[0]?.name ||
    null;
  const [status, setStatus] = useState(statusL);
  // const [status, setStatus] = useState([]);

  const [isCountry, setIsCountry] = useState(false);
  const [isState, setIsState] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [isStatus, setIsStatus] = useState(false);

  useEffect(() => {
    fetchAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTransactions]);

  const fetchAllTransactions = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${BACKEND_URL}/api/transaction/getAllTransactions`,
        config
      );
      setLoading(false);

      if (data) {
        setAllTransactions(data);
      }
    } catch (error) {
      toast.error('Error Occured!');
    }
  };

  useEffect(() => {
    if (allTransactions !== undefined) {
      // consider using local storage
      filterUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, state, status]);

  function filterUserData() {
    let filteredUsers = [];
    if (allTransactions !== undefined) {
      allTransactions?.map(async (b) => {
        if (b.state === state && b.status === status) {
          filteredUsers.push(b);
        }
      });
      setFilteredData(filteredUsers);
      setGroupSearchResult(filteredUsers);
    }
  }

  return (
    <div
      className={styles.createGroupContainer}
      style={createGroupContainerStyle}
    >
      <div className={`h-[410px] ${styles.createGroupCard}`}>
        <div className={styles.createTicket}>Create Ticket</div>

        <div className={`flex flex-row justify-between ${styles.ticketFilter}`}>
          <div
            className={`ml-1 relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900)] px-2 rounded-lg text-[14px] w-[80px]`}
            onClick={() => {
              setIsCountry(true);
              setIsState(false);
              setIsStatus(false);
            }}
          >
            <div className={styles.country}>Country</div>
          </div>
          <div
            className={`relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900)] px-2 rounded-lg text-[14px] w-[80px]`}
            onClick={() => {
              setIsCountry(false);
              setIsState(true);

              setIsStatus(false);
            }}
          >
            <div className={styles.state}>State</div>
          </div>
          <div
            className={`mr-1 relative cursor-pointer outline flex justify-center items-center bg-[var(--color-gray-900)] px-2 rounded-lg text-[14px] w-[80px]`}
            onClick={() => {
              setIsCountry(false);
              setIsState(false);
              setIsStatus(true);
            }}
          >
            <div className={styles.status}>Status</div>
          </div>
        </div>

        <div
          className={`h-[200px] overflow-auto ${stylesFilter.countryListContainer}`}
        >
          {isCountry
            ? allCountry?.map((place, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer ${stylesFilter.countryListItem}`}
                  onClick={() => {
                    setCountry(place?.name);
                    localStorage.setItem(
                      'country',
                      JSON.stringify(place?.name)
                    );
                    setState('');
                    setStatus('');
                    setIsCountry(false);
                  }}
                >
                  <div className={stylesFilter.afghanistan}>
                    {place.flag} {place.name}
                  </div>
                </div>
              ))
            : null}
          {isState
            ? allState?.map((place, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer ${stylesFilter.countryListItem}`}
                  onClick={() => {
                    setState(place?.name);
                    localStorage.setItem('state', JSON.stringify(place?.name));
                    setStatus('');
                    setIsState(false);
                  }}
                >
                  <div className={stylesFilter.afghanistan}>{place.name}</div>
                </div>
              ))
            : null}
          {isStatus
            ? statusList?.map((place, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer ${stylesFilter.countryListItem}`}
                  onClick={() => {
                    setStatus(place?.name);
                    localStorage.setItem('status', JSON.stringify(place?.name));
                    setIsStatus(false);
                  }}
                >
                  <div className={stylesFilter.afghanistan}>{place.name}</div>
                </div>
              ))
            : null}
          {isCountry === false && isState === false && isStatus === false ? (
            <>
              <div className={styles.countryListItem}>
                <div className={stylesFilter.afghanistan}>{country}</div>
              </div>
              <div className={styles.countryListItem}>
                <div className={stylesFilter.afghanistan}>{state}</div>
              </div>
              <div className={styles.countryListItem}>
                <div className={stylesFilter.afghanistan}>{status}</div>
              </div>
            </>
          ) : null}
        </div>
        <div
          className={`cursor-pointer ${styles.buttonStatus1}`}
          onClick={filterUserData}
        >
          <div className={styles.status}>Search</div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupContainer;
