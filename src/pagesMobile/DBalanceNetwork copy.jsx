import React, { useState, useEffect } from 'react';
import { dBalanceNetwork } from '../assets';
//=============={Using wallet Connect}======================
import {
  useAccount,
  useSwitchNetwork,
  useBalance,
  useNetwork,
  useDisconnect,
} from 'wagmi';

import { useConnect } from 'wagmi';

import { fetchChainPriceData } from '../redux/features/swap/swapService';
import { useSelector } from 'react-redux';
import { networksOptions } from '../constants';
import { Link } from 'react-router-dom';
import stylesFromToken from './FromTokenList.module.css';
const DBalanceNetwork = () => {

  const {
    connect,
    connectors,
  } = useConnect();
  
  const activeConnection = localStorage.getItem('activeConnection')
    ? JSON.parse(localStorage.getItem('activeConnection'))
    : null; // prices update, withoout allTokens

    const userPricesL = localStorage.getItem('userPrices')
    ? JSON.parse(localStorage.getItem('userPrices'))
    : null; // prices update, withoout allTokens

  const usdtToken = userPricesL?.usdtToken || null;

  console.log({ usdtToken: usdtToken });
  // const usdtToken = useSelector((state) => state.swap?.usdtToken);

  //==============={Secondary Data}=========================

  const { address, isConnected } = useAccount();

  console.log({ isConnected: isConnected });

  const { disconnect } = useDisconnect();

  const chain = useSelector((state) => state?.swap?.chain);
  const chainId = chain ? chain.id : 1;
  const chainSymbol = chain ? chain.chainSymbol : 'ETH';
  console.log({ chainId: chainId });

  const { data } = useBalance({
    address,
    // chainId: chainId,
    chainId: chainId,
    watch: true,
  });

  const [balance, setBalance] = useState('');

  const [chainPriceData, setChainPriceData] = useState(null);
  console.log({ chainPriceData: chainPriceData });

  console.log({ balance: balance });

  console.log({ address: address });

  useEffect(() => {
    if (isConnected) {
      const tokenbal = Number(data?.formatted).toFixed(3);
      setBalance(tokenbal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, isConnected]);

  useEffect(() => {
    localStorage.setItem('chainBalance', JSON.stringify(balance));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  // useEffect(() => {
  //   if (isConnected === true) {
  //     fetchUpdatedChainPrice();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [chainId, usdtToken, isConnected]);

  useEffect(() => {
    if (isConnected === true) {
      fetchUpdatedChainPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, isConnected]);

  //=======Prices at intervals}======
  // useEffect(() => {
  //   setInterval(() => {
  //     if (fToken !== null || undefined) {
  //       fetchUpdatedPrice();
  //     }

  //     // }, 300000); // every 30 seconds: 30000 milisec
  //   }, 300000);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  async function fetchUpdatedChainPrice() {
    if (
      chainId === 0 ||
      chainId === '0' ||
      chainId === null ||
      chainId === undefined
    ) {
      return;
    }
    if (usdtToken === null || usdtToken === undefined) {
      return;
    }
    let userData = {
      chainId,
      chainBalance: balance ? balance : 0,
      usdtToken,

      // isChainChange: isChainChange ? isChainChange : false,
    };
    console.log('entryfetchChainPriceData', userData);
    fetchChainPriceData(userData)
      .then((response) => {
        console.log('fetchChainPriceData', response);
        localStorage.setItem('chainPrices', JSON.stringify(response));

        const chainPriceDataL = {
          chainPrice: response?.chainPrice,
          totalChainPrice: response?.totalChainPrice,
        };

        setChainPriceData(chainPriceDataL);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {isConnected ? (
        <div className={stylesFromToken.frameContainer}>
          <div className={stylesFromToken.selectATokenParent}>
            <div className="flex-1 flex flex-row items-center justify-center gap-[12px]">
              <img
                className="relative w-6 h-6 shrink-0 overflow-hidden"
                alt=""
                src="/wallet-icon7.svg"
              />
              <div className="relative tracking-[0.02em] leading-[22px] font-medium">
                Connected with MetaMask
              </div>
            </div>
            <Link
              className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
              to="/"
            >
              <img
                className={stylesFromToken.xCloseIcon}
                // onClick={() => setIsFromTokenPage(false)}
                alt=""
                src="/xclose.svg"
              />
            </Link>
          </div>
          <div className="self-stretch rounded-2xl bg-surface-tint-d-8 overflow-hidden flex flex-col py-8 px-4 items-center justify-start gap-[8px] text-center text-13xl">
            <div className="self-stretch relative tracking-[0.02em] leading-[44px]">
              {/* 1.56 ETH */}
              {balance} {chainSymbol}
            </div>
            <div className="self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-surface-tint-64-d">
              ~$ {chainPriceData ? chainPriceData?.totalChainPrice : ''}
            </div>
          </div>
          <div className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-0 items-center justify-start gap-[12px]">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-8 h-8 shrink-0">
                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl [background:linear-gradient(89.96deg,_#74ff63,_#7c90fe_30.21%,_#f05dfd_70.31%,_#fff73f)]" />
              </div>
            </div>
            <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
              {/* 0x54b7...7984 */}
              {address.substring(0, 6) + '...' + address.substring(10, 14)}
            </div>
            <button
              className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-10 h-10 shrink-0 flex flex-row box-border items-center justify-center"
              onClick={''}
            >
              <img
                className="relative w-5 h-5 shrink-0 overflow-hidden"
                alt=""
                src="/share04.svg"
              />
            </button>
            <button
              className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-10 h-10 shrink-0 flex flex-row box-border items-center justify-center"
              onClick={''}
            >
              <img
                className="relative w-5 h-5 shrink-0 overflow-hidden"
                alt=""
                src="/copy031.svg"
              />
            </button>
            <Link
              className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-10 h-10 shrink-0 flex flex-row box-border items-center justify-center"
              to="/"
              onClick={() => {
                disconnect();
              }}
            >
              <img
                className="relative w-5 h-5 shrink-0 overflow-hidden"
                alt=""
                src="/logout01.svg"
              />
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DBalanceNetwork;
