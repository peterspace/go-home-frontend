import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from './SearchBar.module.css';
const SearchBar = ({
  searchBarFlexShrink,
  setIsProfile,
  setIsGroupChat,
  setIsHome,
  // handleSearch,
  // search,
  // setSearch,
}) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  console.log({ search: search });
  console.log({ searchResult: searchResult });

  // function onSearchValueChanged(e) {
  //   // setFromValue((existingValue) =>
  //   //     e.target.validity.valid ? e.target.value : existingValue
  //   // );

  //   if (e.target.validity.valid) {
  //     localStorage.setItem('searchResult', JSON.stringify(null));
  //     setSearch(e.target.value);
  //   }
  // }

  // const handleSearch = async () => {
  //   if (!search) {
  //     toast({
  //       title: 'Please Enter something in search',
  //       status: 'warning',
  //       duration: 5000,
  //       isClosable: true,
  //       position: 'top-left',
  //     });
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     const { data } = await axios.get(
  //       `${BACKEND_URL}/api/user?search=${search}`,
  //       config
  //     );

  //     setLoading(false);
  //     setSearchResult(data);
  //     localStorage.setItem('searchResult', JSON.stringify(data));
  //     setSearch(''); // empty search
  //     setIsProfile(false);
  //     setIsGroupChat(false);
  //     setIsHome(false)

  //   } catch (error) {
  //     toast.error('Failed to Load the Search Results');
  //   }
  // };

  const searchBarStyle = useMemo(() => {
    return {
      flexShrink: searchBarFlexShrink,
    };
  }, [searchBarFlexShrink]);

  return (
    <div className={styles.searchBar} style={searchBarStyle}>
      <div className={styles.searchParent}>
        {/* <div className={`${styles.search}`} onClick={handleSearch}> */}
        <div className={`${styles.search}`} onClick={''}>
          <img
            className={`cursor-pointer ${styles.searchBarContainerIcon}`}
            alt=""
            src="/searchbarcontainer.svg"
          />
          <div className={styles.searchChild} />
        </div>
        {/* <div className={styles.search1}>Search</div> */}
        {/* <div className={styles.search1}>Search</div> */}
        <input
          type="text"
          // className={`outline-none [border:none] text-gray-50 bg-[#191521] ${styles.sendAMessage}`}
          className={`outline-none [border:none] text-gray-50 bg-[#191521] text-[18px] ${styles.search1}`}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // onChange={onSearchValueChanged}
        />
      </div>
    </div>
  );
};

export default SearchBar;
