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
import axios from 'axios';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import stylesFromToken from './FromTokenList.module.css';
import useWindowResize from '../hooks/useWindowResize';
import Component7 from '../pagesMobileApp/Component7';
const DBalanceNetwork = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { width, height } = useWindowResize();
  console.log(width, height);
  //=============={Loading State}==========================
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  const userPricesL = localStorage.getItem('userPrices')
    ? JSON.parse(localStorage.getItem('userPrices'))
    : null; // prices update, withoout allTokens

  const usdtToken = userPricesL?.usdtToken || null;

  // console.log({ usdtToken: usdtToken });
  // const usdtToken = useSelector((state) => state.swap?.usdtToken);

  //==============={Secondary Data}=========================

  const { address, isConnected } = useAccount();

  console.log({ isConnected: isConnected });

  const { disconnect } = useDisconnect();

  const [chainPrice, setChainPrice] = useState('');

  console.log({chainPrice: chainPrice})
  const [check, setCheck] = useState('');

  console.log({ check: check });

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

  console.log({ balance: balance });

  console.log({ address: address });

  const [chainUsdBalance, setChainUsdBalance] = useState(0);

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

  useEffect(() => {
    if (isConnected) {
      const chainUsdValueRaw = chainPrice
        ? Number(chainPrice) * Number(balance)
        : 0;

      const chainUsdValue = chainUsdValueRaw.toFixed(4);

      setChainUsdBalance(chainUsdValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, chainPrice, chainUsdBalance, isConnected]);

  useEffect(() => {
    if (isConnected === true) {
      fetchUpdatedChainPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, isConnected]);

  useEffect(() => {
    if (isConnected === true) {
      const intervalId = setInterval(() => {
        fetchUpdatedChainPrice();
      }, 60000);
      // }, 20000);
      return () => {
        clearInterval(intervalId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance, isConnected]);

  async function fetchUpdatedChainPrice() {
    if (
      chainId === 0 ||
      chainId === '0' ||
      chainId === null ||
      chainId === undefined
    ) {
      return;
    }
    setIsBalanceLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/swap/chainPrice/${chainId.toString()}`
      );
      if (response?.data) {
        setCheck(response?.data);
        setChainPrice(response?.data?.chainPrice);

        setIsBalanceLoading(false);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  }

  return (
    <>
      {width > 375 ? (
        <>
          {/* ==============================={Desktop View}====================================== */}
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
                {/* {activeConnection?.name === connectors[0]?.name && (
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
            )}
             {activeConnection?.name === connectors[1]?.name && (
              <div className="flex-1 flex flex-row items-center justify-center gap-[12px]">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/walletlink.svg"
                />
                <div className="relative tracking-[0.02em] leading-[22px] font-medium">
                  Connected with  Coinbase Wallet
                </div>
              </div>
            )}
             {activeConnection?.name === connectors[2]?.name && (
              <div className="flex-1 flex flex-row items-center justify-center gap-[12px]">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/walletconnect.svg"
                />
                <div className="relative tracking-[0.02em] leading-[22px] font-medium">
                  Connected with  Wallet Connect
                </div>
              </div>
            )}
             {activeConnection?.name === connectors[3]?.name && (
              <div className="flex-1 flex flex-row items-center justify-center gap-[12px]">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/bravelogosanstext-21.svg"
                />
                <div className="relative tracking-[0.02em] leading-[22px] font-medium">
                  Connected with Brave
                </div>
              </div>
            )}
             {activeConnection?.name === connectors[4]?.name && (
              <div className="flex-1 flex flex-row items-center justify-center gap-[12px]">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/frame-1321314394.svg"
                />
                <div className="relative tracking-[0.02em] leading-[22px] font-medium">
                  Connected with  Ledger
                </div>
              </div>
            )} */}

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
                <div
                  className={`self-stretch relative tracking-[0.02em] leading-[44px] ${
                    isBalanceLoading
                      ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[44px]'
                      : ''
                  }`}
                >
                  {isBalanceLoading ? '' : `${balance} ${chainSymbol}`}
                </div>
                <div
                  className={`self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-surface-tint-64-d ${
                    isBalanceLoading
                      ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                      : ''
                  }`}
                >
                  {isBalanceLoading ? '' : `~$ ${chainUsdBalance}`}
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
                  {address
                    ? address?.substring(0, 6) +
                      '...' +
                      address?.substring(10, 14)
                    : ''}
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
      ) : (
        <>
          {/* ==============================={Mobile View}====================================== */}
          <Component7
            isBalanceLoading={isBalanceLoading}
            balance={balance}
            chainSymbol={chainSymbol}
            chainUsdBalance={chainUsdBalance}
            address={address}
          />
        </>
      )}
    </>
  );
};

export default DBalanceNetwork;
