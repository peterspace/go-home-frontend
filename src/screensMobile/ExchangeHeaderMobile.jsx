import React, { useState, useEffect } from 'react';

//=============={Using wallet Connect}======================
import {
  useAccount,
  useSwitchNetwork,
  useBalance,
  useNetwork,
  useDisconnect,
} from 'wagmi';

import { useSelector } from 'react-redux';

// import styles from './ExchangeHeader.module.css';
import stylesHeaderMobile from './Component.module.css';

import { useNavigate } from 'react-router-dom';

import {
  updateConnectedNetwork,
  updateConnecting,
} from '../redux/features/swap/swapSlice';
import { useDispatch } from 'react-redux';

const ExchangeHeaderMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userSessionL = localStorage.getItem('userSession')
    ? JSON.parse(localStorage.getItem('userSession'))
    : null; // all data, including token list
  const userPricesL = localStorage.getItem('userPrices')
    ? JSON.parse(localStorage.getItem('userPrices'))
    : null; // prices update, withoout allTokens
  const slippageL = localStorage.getItem('slippage')
    ? JSON.parse(localStorage.getItem('slippage'))
    : '1';

  //==============={Secondary Data}=========================
  //const chainPriceData = useSelector((state) => state?.swap?.userSession?.chainUSDData);
  const totalChainPrice =
    userPricesL?.totalChainPrice || userSessionL?.totalChainPrice;

  const chainPrice = userPricesL?.chainPrice || userSessionL?.chainPrice;

  const chainPriceData = {
    chainPrice,
    totalChainPrice,
  };

  const { address, isConnected } = useAccount();

  // const [isChainModalVisible, setIsChainModalVisible] = useState(false);

  const chain = useSelector((state) => state?.swap?.chain);
  const chainId = chain ? chain.id : 1;
  console.log({ chainId: chainId });

  const [slippage, setSlippage] = useState(slippageL);

  const [isRedirect, setIsRedirect] = useState(false);

  const [isSwapping, setIsSwapping] = useState(false);
  const [isLaunch, setIsLaunch] = useState(false);

  useEffect(() => {
    localStorage.setItem('slippage', JSON.stringify(slippage));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slippage]);

  useEffect(() => {
    if (isRedirect) {
      setTimeout(() => {
        navigate('/mbalancenetwork');
        setIsRedirect(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirect]);

  useEffect(() => {
    if (isSwapping) {
      setTimeout(() => {
        navigate('/mswap'); // check
        // navigate('/dbalancenetwork');
        setIsSwapping(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwapping]);

  useEffect(() => {
    if (isRedirect) {
      setTimeout(() => {
        navigate('/mswap');
        setIsRedirect(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirect]);

  useEffect(() => {
    if (isLaunch) {
      setTimeout(() => {
        navigate('/');
        setIsRedirect(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaunch]);

  return (
    <>
      {/* ========================={Header }==============================*/}
      <div className={stylesHeaderMobile.menu01Parent}>
        <img
          className={`cursor-pointer ${stylesHeaderMobile.menu01Icon}`}
          onClick={() => {
            setIsLaunch(true);
          }}
          alt=""
          src="/menu01.svg"
        />
        <div className={stylesHeaderMobile.horiza}>HORIZA</div>
        <div className={stylesHeaderMobile.frameParent}>
          <div
            className={`cursor-pointer ${stylesHeaderMobile.protocolIconParent}`}
            onClick={() => {
              dispatch(updateConnectedNetwork(true));
            }}
          >
            <img
              className={stylesHeaderMobile.protocolIcon}
              alt=""
              // src="/protocol-icon.svg"
              src={chain?.logoURI}
            />
            <img
              className={stylesHeaderMobile.chevronDownIcon}
              alt=""
              src="/chevrondown.svg"
            />
          </div>
          <div
            className={`cursor-pointer  ${stylesHeaderMobile.walletIconWrapper}`}
          >
            <img
              className={stylesHeaderMobile.walletIcon}
              alt=""
              src="/wallet-icon.svg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExchangeHeaderMobile;
