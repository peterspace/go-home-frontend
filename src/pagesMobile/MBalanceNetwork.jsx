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

// import { useConnect } from 'wagmi';

import { fetchChainPriceData } from '../redux/features/swap/swapService';
import { useSelector } from 'react-redux';
import { networksOptions } from '../constants';
import { Link } from 'react-router-dom';
// import stylesFromToken from './FromTokenList.module.css';
import stylesNetworkBalance from './Component7.module.css';
const MBalanceNetwork = () => {
  //=============={Loading State}==========================
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  //=============={Loading State}==========================

  // const { connectors } = useConnect();

  // const activeConnection = localStorage.getItem('activeConnection')
  //   ? JSON.parse(localStorage.getItem('activeConnection'))
  //   : null;

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
      const chainUsdValueRaw = chainPriceData
        ? Number(chainPriceData?.chainPrice) * Number(balance)
        : 0;

      const chainUsdValue = chainUsdValueRaw.toFixed(4);

      setChainUsdBalance(chainUsdValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, chainPriceData, chainUsdBalance, isConnected]);

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
      }, 20000);
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
    setIsBalanceLoading(true);
    fetchChainPriceData(userData)
      .then((response) => {
        console.log('fetchChainPriceData', response);
        localStorage.setItem('chainPrices', JSON.stringify(response));

        const chainPriceDataL = {
          chainPrice: response?.chainPrice,
          totalChainPrice: response?.totalChainPrice,
        };

        setChainPriceData(chainPriceDataL);
        setIsBalanceLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {isConnected ? (
        <div className={stylesNetworkBalance.inner1}>
          <div className={stylesNetworkBalance.frameParent7}>
            <div className={stylesNetworkBalance.frameParent8}>
              <div className={stylesNetworkBalance.walletIconParent}>
                <img
                  className={stylesNetworkBalance.mdImageIcon}
                  alt=""
                  src="/wallet-icon.svg"
                />
                <div className={stylesNetworkBalance.connectedWithMetamask}>
                  Connected with MetaMask
                </div>
              </div>
              <Link
                className={`cursor-pointer hover:bg-secondaryFillLight ${stylesNetworkBalance.iconButton}`}
                to="/mswap"
              >
                <img
                  className={stylesNetworkBalance.arrowDownIcon}
                  alt=""
                  src="/xclose3.svg"
                />
              </Link>
            </div>
            <div className={stylesNetworkBalance.ethGroup}>
              <div className={stylesNetworkBalance.eth2}>1.56 ETH</div>
              <div className={stylesNetworkBalance.div10}>~$1432.54</div>

              <div
                className={`${stylesNetworkBalance.eth2} ${
                  isBalanceLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[44px]'
                    : ''
                }`}
              >
                {isBalanceLoading ? '' : `${balance} ${chainSymbol}`}
              </div>
              <div
                className={`${stylesNetworkBalance.div10} ${
                  isBalanceLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                    : ''
                }`}
              >
                {isBalanceLoading ? '' : `~$ ${chainUsdBalance}`}
              </div>
            </div>
            <div className={stylesNetworkBalance.avatarParent}>
              <div className={stylesNetworkBalance.avatar}>
                <div className={stylesNetworkBalance.avatar1}>
                  <div className={stylesNetworkBalance.base} />
                </div>
              </div>
              <div className={stylesNetworkBalance.x54b77984}>
                {/* 0x54b7...7984 */}
                {address.substring(0, 6) + '...' + address.substring(10, 14)}
              </div>
              <div
                className={`cursor-pointer ${stylesNetworkBalance.iconButton1}`}
                onClick={''}
              >
                <img
                  className={stylesNetworkBalance.arrowDownIcon}
                  alt=""
                  src="/share04.svg"
                />
              </div>
              <div
                className={`cursor-pointer ${stylesNetworkBalance.iconButton1}`}
                onClick={''}
              >
                <img
                  className={stylesNetworkBalance.arrowDownIcon}
                  alt=""
                  src="/copy03.svg"
                />
              </div>
              <Link
                className={`cursor-pointer hover:bg-secondaryFillLight ${stylesNetworkBalance.iconButton1}`}
                to="/"
                onClick={() => {
                  disconnect();
                }}
              >
                <img
                  className={stylesNetworkBalance.arrowDownIcon}
                  alt=""
                  src="/logout01.svg"
                />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MBalanceNetwork;
