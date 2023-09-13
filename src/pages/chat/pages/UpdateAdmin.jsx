// import PhotosUploader from '../PhotosUploader.jsx';
import CryptoOptions from '../CryptoOptions.jsx';
import FiatOptions from '../FiatOptions.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import { useDispatch } from 'react-redux';
import { registerAdmin } from '../../../redux/api/api.js';

const cities = [
  {
    name: 'moscow',
  },
  {
    name: 'saint-petersburg',
  },
  {
    name: 'dubai',
  },
];

const types = [
  {
    name: 'hotel',
  },
  {
    name: 'hotelApart',
  },
  {
    name: 'apartment',
  },
  {
    name: 'resort',
  },
];

const availability = [
  {
    name: 'true',
  },
  {
    name: 'false',
  },
];

export default function UpdateAdmin() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const [businessName, setBusinessName] = useState('');
  // const [city, setCity] = useState(cities[0]?.name);
  const [address, setAddress] = useState('');
  const [type, setType] = useState(types[0]?.name);
  const [isAvailable, setIsAvailable] = useState(availability[0]?.name);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [tokens, setTokens] = useState([]);
  const [fiat, setFiat] = useState([]);

  const [redirect, setRedirect] = useState(false);

  //================{User Location}======================================

  const allCountry = Country.getAllCountries();
  const [countryData, setCountryData] = useState(allCountry[0]);

  const countryL =
    (localStorage.getItem('country') &&
      JSON.parse(localStorage.getItem('country'))) ||
    countryData?.name ||
    null;
  const [country, setCountry] = useState(countryL);
  const allState = State.getStatesOfCountry(countryData?.isoCode);
  const allCity = City.getCitiesOfCountry(countryData?.isoCode);

  console.log({ country: country });
  const [stateData, setStateData] = useState(allState[0]);

  const stateL =
    (localStorage.getItem('state') &&
      JSON.parse(localStorage.getItem('state'))) ||
    stateData?.name ||
    null;
  const [state, setState] = useState(stateL);
  const [cityData, setCityData] = useState(allCity[0]);

  const cityL =
    (localStorage.getItem('city') &&
      JSON.parse(localStorage.getItem('city'))) ||
    cityData?.name ||
    null;
  const [city, setCity] = useState(cityL);
  const [walletAddress, setWalletAddress] = useState('');
  const [regData, setRegData] = useState();
  console.log({ regData: regData });

  //================{User Location}======================================

  //===={Update Admin Profile}
  useEffect(() => {
    if (!user) {
      return;
    }
    axios.get('/places/' + user?._id).then((response) => {
      const { data } = response;
      // owner
      setBusinessName(data.businessName);
      setCity(data.city);
      setAddress(data.address);
      setType(data.type);
      setAddedPhotos(data.photos);
      setTokens(data.tokens);

      setFiat(data.fiat);
      // rating
      // totalrating
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
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
    console.log('placeData', placeData);
    if (user) {
      let userId = user?._id;
      // update
      // await axios.put('/places', {
      await axios.patch('/places', {
        userId,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }
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

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  // TODO: add/ update rooms tab

  return (
    <div>
      <div className="flex justify-center items-center bg-gray-50 border">
        <div className="mt-10 bg-white rounded-2xl px-10 py-10 mb-10 border shadow-md">
          <div className="border-b mb-6">
            <div className="py-2 flex justify-between">
              <h2 className="text-2xl font-bold text-blue-500">
                {' '}
                Add new property
              </h2>
            </div>
          </div>

          <form onSubmit={savePlace}>
            {preInput('BusinessName', 'The name of your company')}
            <input
              type="text"
              value={businessName}
              onChange={(ev) => setBusinessName(ev.target.value)}
              placeholder="BExchange"
            />
            {preInput('name', 'your name')}
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="name"
            />
            {preInput('email', 'your email')}
            <input
              type="text"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="email"
            />
            {preInput('password', 'your password')}
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="password"
            />
            {preInput('walletAddress', 'your walletAddress')}
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
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 mt-6 mb-6">
              <div className="flex flex-row gap-2 items-center">
                <label htmlFor="country" className="text-lg text-gray-500">
                  Country:
                </label>
                <select
                  name="country"
                  className="dropdown bg-gray-50 rounded-lg text-gray-500 border border-blue-700 hover:text-gray-900 focus:ring-1 focus:outline-none focus:ring-blue-500 px-2 py-1"
                  value={country}
                  onChange={(ev) => setCountry(ev.target.value)}
                >
                  <option value="">Choose Country</option>
                  {allCountry &&
                    allCountry.map((country, index) => (
                      <option key={index} value={country?.name}>
                        {country?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <label htmlFor="state" className="text-lg text-gray-500">
                  States:
                </label>
                <select
                  name="state"
                  className="dropdown bg-gray-50 rounded-lg text-gray-500 border border-blue-700 hover:text-gray-900 focus:ring-1 focus:outline-none focus:ring-blue-500 px-2 py-1"
                  value={state}
                  onChange={(ev) => setState(ev.target.value)}
                >
                  <option value="">Choose State</option>
                  {allState &&
                    allState.map((state, index) => (
                      <option key={index} value={state?.name}>
                        {state?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <label htmlFor="city" className="text-lg text-gray-500">
                  City:
                </label>
                <select
                  name="city"
                  className="dropdown bg-gray-50 rounded-lg text-gray-500 border border-blue-700 hover:text-gray-900 focus:ring-1 focus:outline-none focus:ring-blue-500 px-2 py-1"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                >
                  <option value="">Choose City</option>
                  {allCity &&
                    allCity.map((city, index) => (
                      <option key={index} value={city?.name}>
                        {city?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {preInput(
              'Payment Options',
              'select all the Payments Options of your business'
            )}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <FiatOptions selected={fiat} onChange={setFiat} />
            </div>

            {preInput(
              'tokens',
              'select all the crypto tokens of your business'
            )}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <CryptoOptions selected={tokens} onChange={setTokens} />
            </div>

            <button className="primary my-4">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
