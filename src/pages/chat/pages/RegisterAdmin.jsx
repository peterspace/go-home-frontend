// import PhotosUploader from '../PhotosUploader.jsx';
import CryptoOptions from './CryptoOptions.jsx';
import FiatOptions from './FiatOptions.jsx';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { registerAdmin } from '../../../redux/api/api.js';
import stylesFilter from './RegisterAdmin.module.css';
// import CreateGroupContainer from '../components/CreateGroupContainer.jsx';
import styles from '../components/CreateGroupContainer.module.css';
import { createCountry } from '../../../redux/api/api.js';

export default function RegisterAdmin() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const countryL = localStorage.getItem('country')
    ? JSON.parse(localStorage.getItem('country'))
    : null;

  const stateL = localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [pic, setPic] = useState();
  console.log({ pic: pic });
  const [picLoading, setPicLoading] = useState(false);

  const [businessName, setBusinessName] = useState('');
  // const [city, setCity] = useState(cities[0]?.name);
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [tokens, setTokens] = useState([]);
  const [fiat, setFiat] = useState([]);

  console.log({ fiat: fiat });
  console.log({ tokens: tokens });

  const [redirect, setRedirect] = useState(false);

  //================{User Location}======================================

  const allCountry = Country.getAllCountries();
  const [countryData, setCountryData] = useState(allCountry[0]);

  const [country, setCountry] = useState(countryData?.name);
  const allState = State.getStatesOfCountry(countryData?.isoCode);
  const allCity = City.getCitiesOfCountry(countryData?.isoCode);

  console.log({ country: country });
  const [stateData, setStateData] = useState(allState[0]);

  const [state, setState] = useState(stateData?.name);
  const [cityData, setCityData] = useState(allCity[0]);

  const [city, setCity] = useState(cityData?.name);
  const [walletAddress, setWalletAddress] = useState('');

  const [countryCode, setCountryCode] = useState();
  console.log({ countryCode: countryCode });

  const [isCountry, setIsCountry] = useState(false);
  const [isState, setIsState] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [regData, setRegData] = useState();
  console.log({ regData: regData });
  const [beforeData, setBeforeData] = useState();
  console.log({ beforeData: beforeData });

  console.log({
    country: country,
    state: state,
    city: city,
  });

  //================{User Location}======================================

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const submitHandler = async () => {
    setPicLoading(true);
    if (
      !name ||
      !email ||
      !password ||
      !country ||
      !state ||
      !city ||
      !walletAddress ||
      !tokens ||
      !fiat
    ) {
      toast.error('Please Fill all the Feilds');
      setPicLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
      pic,
      country,
      state,
      city,
      walletAddress,
      businessName,
      tokens,
      fiat,
    };

    try {
      const data = await registerAdmin(userData);

      if (data) {
        console.log({ userData: data });
        setRegData(data);
        // localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(data));
        setPicLoading(false);
        setRedirect(true);
      }
    } catch (error) {
      toast.error('Registration failed');
      // setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast.error('Please Select an Image!');
      return;
    }
    console.log(pics);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'kxxtmdn1');
      data.append('cloud_name', 'datkh2oxv');
      fetch('https://api.cloudinary.com/v1_1/datkh2oxv/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast.error('Please Select an Image!');
      setPicLoading(false);
      return;
    }
  };

  // if registration is sucessfull, update country list before redirect
  const countrySubmitHandler = async () => {
    if (!country || !state) {
      // toast.error('Please Fill all the Feilds');

      return;
    }
    // const userData = {
    //   country,
    //   state,
    // };
    const userData = {
      country: countryL,
      state: stateL,
    };

    setBeforeData(userData);

    try {
      const data = await createCountry(userData);

      if (data) {
        console.log({ userData: data });
        setRegData(data);
      }
    } catch (error) {
      // toast.error('Registration failed');
    }
  };

  async function handleSubmit() {
    submitHandler();
    countrySubmitHandler();
  }

  // if (redirect) {
  //   setTimeout(() => {
  //     return <Navigate to={'/login'} />;
  //   }, 2000);
  // }

  // TODO: add/ update rooms tab

  return (
    <div>
      <div className="flex justify-center items-center bg-gray-50 border">
        <div className="mt-10 bg-white rounded-2xl px-10 py-10 mb-10 border shadow-md">
          <div className="border-b mb-6">
            <div className="py-2 flex justify-between">
              <h2 className="text-2xl font-bold text-blue-500">
                {' '}
                Register Partner
              </h2>
            </div>
          </div>
          <button
            className="text-white bg-blue-500 px-2 py-1 rounded-lg"
            onClick={countrySubmitHandler}
          >
            Add country
          </button>

          <form onSubmit={handleSubmit}>
            {preInput('Business Name', 'The name of your company')}
            <input
              type="text"
              value={businessName}
              onChange={(ev) => setBusinessName(ev.target.value)}
              placeholder="BExchange"
            />
            {preInput('Name', 'your name')}
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="name"
            />
            {preInput('Email', 'your email')}
            <input
              type="text"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="email"
            />
            {preInput('Password', 'your password')}
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="password"
            />
            {preInput('Wallet Address', 'your blockchain wallet address')}
            <input
              type="walletAddress"
              value={walletAddress}
              onChange={(ev) => setWalletAddress(ev.target.value)}
              placeholder="walletAddress"
            />

            <label className="mt-2 h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload
            </label>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 mt-6 mb-6 text-white">
              <div className={`h-[410px] ${styles.createGroupCard}`}>
                <div className={styles.createTicket}>Create Ticket</div>
                <div className={styles.ticketFilter}>
                  <div
                    className={`cursor-pointer ${styles.buttonState}`}
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
                    className={`cursor-pointer ${styles.buttonCity}`}
                    onClick={() => {
                      setIsCountry(false);
                      setIsState(false);
                      setIsCity(true);
                      setIsStatus(false);
                    }}
                  >
                    <div className={styles.city}>City</div>
                  </div>
                  {/* <div
                    className={`cursor-pointer ${styles.buttonStatus}`}
                    onClick={() => {
                      setIsCountry(false);
                      setIsState(false);
                      setIsCity(false);
                      setIsStatus(true);
                    }}
                  >
                    <div className={styles.status}>Status</div>
                  </div> */}
                  <div
                    className={`cursor-pointer ${styles.buttonCountry}`}
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
                {/* <div className={styles.groupNameCard}>
          <input
            type="text"
            placeholder="Enter group name ..."
            className={`outline-none [border:none] text-gray-50 bg-[#191521] ${styles.enterGroupName}`}
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
        </div> */}
                {/* <div className={styles.groupNameCard}>
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`outline-none [border:none] text-gray-50 bg-[#191521] ${styles.enterGroupName}`}
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                </div> */}
                <div
                  className={`h-[200px] overflow-auto ${stylesFilter.countryListContainer}`}
                >
                  {isCountry
                    ? allCountry?.map((place, idx) => (
                        <div
                          key={idx}
                          className={`cursor-pointer ${stylesFilter.countryListItem}`}
                          onClick={() => {
                            setCountryData(place);
                            setCountry(place?.name);
                            localStorage.setItem(
                              'country',
                              JSON.stringify(place?.name)
                            );
                            setState('');
                            setCity('');

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
                            setStateData(place);
                            setState(place?.name);
                            localStorage.setItem(
                              'state',
                              JSON.stringify(place?.name)
                            );
                            setCity('');

                            setIsState(false);
                          }}
                        >
                          <div className={stylesFilter.afghanistan}>
                            {place.name}
                          </div>
                        </div>
                      ))
                    : null}
                  {isCity
                    ? allCity?.map((place, idx) => (
                        <div
                          key={idx}
                          className={`cursor-pointer ${stylesFilter.countryListItem}`}
                          onClick={() => {
                            setCityData(place);
                            setCity(place?.name);
                            localStorage.setItem(
                              'city',
                              JSON.stringify(place?.name)
                            );

                            setIsCity(false);
                          }}
                        >
                          <div className={stylesFilter.afghanistan}>
                            {place.name}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>

            {preInput(
              'Payment Options',
              'select all fiat currencies accepted by your business'
            )}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <FiatOptions selected={fiat} onChange={setFiat} />
            </div>

            {preInput(
              'Tokens',
              'select all stable coins accepted by your business'
            )}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <CryptoOptions selected={tokens} onChange={setTokens} />
            </div>
            <button className="primary my-4">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
