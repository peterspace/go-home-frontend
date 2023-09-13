import React, { Fragment, useEffect, useState } from 'react';

import { AiTwotoneShopping } from 'react-icons/ai';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import Modal from './Modal';

import {
  useConnect,
  useDisconnect,
  useAccount,
  useSwitchNetwork,
  useNetwork,
  useSigner,
} from 'wagmi';

const Header = () => {
  //========{New}============================
  const {
    connect,
    connectors,
    error: isErrorConnector,
    isLoading: isLoadingConnector,
    pendingConnector,
  } = useConnect();

  //   const isConnectingL = useSelector((state) => state?.swap?.isConnecting);

  //   const [isConnecting, setIsConnecting] = useState(isConnectingL);
  const { disconnect } = useDisconnect();

  const { address, isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { chain, chains } = useNetwork();

  const [sticky, setSticky] = useState(false);
  const [isChainModalVisible, setIsChainModalVisible] = useState(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(address);
    toast.success('Wallet Address copied!', {
      style: {
        borderRadius: '20px',
        background: '#fff',
        color: '#333',
        height: '2rem',
        fontSize: '14px',
      },
    });
  }

  const showNavigation = () => (
    <nav className="flex flex-row items-center">
      <div className="ml-4 w-[32px] h-[32px]">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1101.000000 1199.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,1199.000000) scale(0.100000,-0.100000)"
            fill="#6366f1"
            stroke="none"
          >
            <path
              className="bg-red-500 dark:bg-white"
              fill="#ffffff"
              d="M3695 9934 c-294 -22 -493 -48 -668 -89 -606 -139 -1072 -389 -1499
-804 -242 -235 -386 -411 -543 -665 -316 -513 -503 -1120 -560 -1821 -19 -230
-19 -716 0 -940 49 -588 186 -1093 417 -1535 161 -308 303 -500 578 -784 258
-265 498 -445 792 -592 466 -234 908 -333 1479 -334 737 0 1281 173 1731 550
95 79 358 343 461 460 38 44 58 60 61 50 5 -15 146 -849 146 -863 0 -4 227 -7
505 -7 l505 0 0 328 1 327 104 -290 c58 -159 112 -309 121 -332 l16 -43 532 0
533 0 686 1903 c377 1046 689 1910 692 1920 7 16 -23 17 -537 17 l-545 0 -262
-912 c-145 -502 -327 -1135 -404 -1405 -94 -326 -145 -487 -150 -475 -11 26
-778 2752 -784 2790 l-6 32 -1503 0 -1504 0 0 -605 0 -605 830 0 c478 0 830
-4 830 -9 0 -34 -45 -217 -79 -321 -46 -140 -147 -356 -212 -452 -303 -451
-710 -699 -1264 -769 -130 -16 -419 -14 -547 5 -262 38 -525 132 -743 266 -99
60 -277 195 -362 274 -242 225 -425 585 -514 1014 -98 474 -101 1173 -8 1692
62 349 186 686 336 919 300 464 756 766 1273 841 130 18 397 24 521 11 742
-81 1236 -463 1409 -1094 l25 -87 742 0 c546 0 743 3 743 11 0 36 -36 230 -60
329 -123 492 -359 897 -731 1254 -149 143 -266 238 -410 332 -429 280 -910
436 -1519 494 -119 11 -567 21 -655 14z"
            />
            <path
              fill="#7f1d1d"
              d="M7365 9501 c-43 -19 -65 -58 -65 -118 0 -50 4 -61 37 -102 21 -25 49
-57 63 -71 14 -14 59 -64 100 -110 41 -47 77 -87 80 -90 6 -6 175 -192 230
-254 19 -21 40 -44 45 -50 9 -10 147 -164 220 -245 16 -19 35 -39 40 -45 6 -6
51 -56 100 -111 49 -55 100 -110 112 -123 13 -13 23 -27 23 -32 0 -5 -10 -19
-23 -32 -19 -20 -141 -154 -232 -257 -16 -19 -35 -39 -40 -45 -6 -6 -51 -56
-100 -111 -50 -55 -94 -105 -100 -111 -5 -6 -26 -29 -45 -50 -55 -62 -224
-248 -230 -254 -3 -3 -39 -43 -80 -90 -41 -46 -86 -96 -100 -110 -14 -14 -42
-46 -63 -71 -33 -41 -37 -52 -37 -103 0 -50 4 -61 30 -89 l30 -32 433 0 434 0
49 51 c27 28 65 69 84 91 124 138 186 207 196 217 5 6 48 54 95 106 122 138
151 170 175 194 12 12 57 62 99 111 43 50 85 97 94 105 9 8 50 53 91 100 41
46 86 97 100 111 169 182 193 215 193 269 0 54 -24 87 -193 269 -14 14 -59 65
-100 111 -41 47 -82 92 -91 100 -9 8 -53 58 -99 110 -45 52 -90 102 -99 111
-19 19 -54 58 -170 189 -47 52 -90 100 -95 106 -10 10 -72 79 -196 217 -19 22
-57 63 -84 91 l-49 51 -421 2 c-232 1 -430 -2 -441 -6z"
            />
            <path
              fill="#7f1d1d"
              d="M8970 9501 c-36 -10 -70 -66 -70 -115 0 -43 20 -83 65 -132 15 -16
53 -58 84 -94 31 -36 65 -74 76 -85 11 -11 58 -63 105 -115 46 -52 103 -115
126 -140 23 -25 66 -72 95 -105 29 -33 58 -65 63 -71 11 -11 90 -100 196 -219
30 -33 59 -65 64 -71 68 -73 163 -179 169 -190 4 -8 4 -20 0 -28 -6 -11 -101
-117 -169 -190 -5 -6 -34 -38 -64 -71 -106 -119 -185 -208 -196 -219 -5 -6
-34 -38 -63 -71 -29 -33 -72 -80 -95 -105 -23 -25 -80 -87 -126 -139 -47 -52
-96 -107 -110 -121 -14 -15 -52 -57 -85 -95 -33 -38 -68 -77 -78 -87 -35 -37
-57 -84 -57 -124 0 -54 34 -105 78 -116 18 -5 218 -8 443 -6 l410 3 52 55 c48
52 126 137 201 220 95 108 184 206 206 229 14 14 40 44 59 66 49 57 172 194
197 219 12 12 57 62 99 111 43 50 85 97 94 105 9 8 50 53 91 100 41 46 86 96
100 111 62 65 70 82 70 139 0 57 -8 74 -70 139 -14 15 -59 65 -100 111 -41 47
-82 92 -91 100 -9 8 -51 56 -94 105 -42 50 -87 99 -99 111 -24 24 -53 56 -175
194 -47 52 -90 100 -95 106 -10 11 -124 137 -192 214 -75 83 -153 168 -201
220 l-52 55 -418 2 c-230 1 -429 -2 -443 -6z"
            />
          </g>
        </svg>
      </div>
      <div className="py-1 w-full flex flex-row justify-center items-center text-sm text-gray-300">
        <Link to="/" className="logo header-items">
          GoDex
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="px-6 font-ubuntu" id="navbarTogglerDemo02">
          <ul className="flex flex-row gap-6 justify-end items-center">
            <Fragment>
              <li className="flex flex-row gap-2 header-items">
                <Link to="/app">
                  <i className="fas fa-home"></i> Dex
                </Link>
              </li>
              <li className="flex flex-row gap-6 header-items">
                <span className="flex flex-row gap-2">
                  <Link to="/corporate">
                    <i className="fas fa-sign-in-alt"></i> Partners
                  </Link>
                </span>
              </li>
            </Fragment>
            {!isConnected && (
              <button
                className="cursor-pointer hover:bg-secondaryFill self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px]"
                onClick={() => {
                  connect({ connector: connectors[0] });
                }}
              >
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Connect Wallet
                </div>
              </button>
            )}

            {isConnected && (
              <Fragment>
                <li className="flex flex-row gap-6">
                  <>
                    <div
                      className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                      onClick={copyToClipboard}
                    >
                      <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                        {address.substring(0, 15) + '...'}
                      </div>
                    </div>

                    <Link
                      className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-10 h-10 shrink-0 flex flex-row box-border items-center justify-center text-white"
                      to="/"
                      onClick={() => {
                        disconnect();
                      }}
                    >
                      {/* <img
                          className="relative w-5 h-5 shrink-0 overflow-hidden"
                          alt="disconnect"
                          src="/logout01.svg"
                        /> */}
                      Disconnect
                    </Link>
                  </>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsChainModalVisible(true)}
                  >
                    Chain
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
        <span className="z-50">
          <Toaster position="top-center" reverseOrder={false} />
        </span>
      </div>
    </nav>
  );

  // render
  return (
    <header
      id="header"
      className={`z-30 ${
        sticky
          ? 'sticky top-0 transition-all duration-300 bg-black bg-opacity-80 filter backdrop-blur-md backdrop-saturate-200'
          : 'bg-black'
      }`}
    >
      {showNavigation()}
      <Modal
        visible={isChainModalVisible}
        setVisible={setIsChainModalVisible}
        title="Select chain"
      >
        <div className="flex flex-col gap-3">
          {chains?.map((c) => (
            <div
              key={c.id}
              className={`px-3 py-2 flex flex-row gap-3 items-center border rounded-md hover:cursor-pointer
                            ${
                              chain?.id === c.id
                                ? 'info border-sky-400/20'
                                : 'text-gray-300/50 border-gray-300/10'
                            }`}
              onClick={() => {
                switchNetwork(c.id);
                setIsChainModalVisible(false);
              }}
            >
              <span>{c.name}</span>
              {c.testnet && (
                <span className="ml-auto text-warn">
                  <BsFillExclamationDiamondFill />
                </span>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </header>
  );
};

export default Header;
