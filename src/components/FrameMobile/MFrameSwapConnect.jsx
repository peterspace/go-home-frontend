import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FaDotCircle } from 'react-icons/fa';
import Modal from './Modal';
import { ethers } from 'ethers';
import { networksOptions } from '../../constants';

import { formatUnits, parseUnits } from '@ethersproject/units';

//=============={Using wallet Connect}======================

import {
  useConnect,
  useAccount,
  useSwitchNetwork,
  useSigner,
  useBalance,
} from 'wagmi';

import erc20ABI from '../engine/erc20.json';
// import { useSendTransaction, useWaitForTransaction } from 'wagmi';

import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../../redux/localStorage';

//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================

// import TokenComponent from './TokenComponent';
// import FavoriteTokenComponent from './FavoriteTokenComponent';
import TokenListButton from './TokenListButton';
// import ActiveTokenComponent from './ActiveTokenComponent';
import ActiveChainComponent from './ActiveChainComponent';

import {
  fetchSpender,
  // updatePrice,
} from '../../redux/features/swap/swapService';

import { Link } from 'react-router-dom';

import {
  updateChain,
  updateChainSymbol,
  updateConnectedNetwork,
  updateSlippage,
  updateIsChangeChainId,
  updateConnecting,
} from '../../redux/features/swap/swapSlice';
import {
  fetchFromPrice,
  fetchToPrice,
} from '../../redux/features/swap/swapSlice';

//========={importing Page}======================================

//=========={Styles}======================

import stylesSwapTx from './SwapTransact.module.css';

import stylesSwap from './Component11.module.css';
import stylesSwapDetail from './Component9.module.css';

import useWindowResize from '../../hooks/useWindowResize';
import stylesManageToken from './Component4.module.css';
import stylesFromToken from './Component6.module.css';

import stylesSlippage from './Component3.module.css';
import stylesLowSlippage from './Component2.module.css';
import stylesWarningSlippage from './Component3.module.css';

//============{Styles}=======================
const MFrameSwapConnect = () => {
  const fee = import.meta.env.VITE_SWAP_FEE;
  const dexAddress = import.meta.env.VITE_DEX_ADDRESS;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log({ dexAddressFrontend: dexAddress });
  console.log({ BACKEND_URLFrontEnd: BACKEND_URL });

  const dispatch = useDispatch();
  const {
    connect,
    connectors,
    error: isErrorConnector,
    isLoading: isLoadingConnector,
    pendingConnector,
  } = useConnect();

  let axiosCancelToken = useRef(null); // axios ref

  //=============={Loading State}==========================
  const [isToLoading, setIsToLoading] = useState(false);
  const [isFromLoading, setIsFromLoading] = useState(false);
  //=============={Loading State}==========================

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucess] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [isApproved, setIsApproved] = useState(false); // approval granted
  const [isTxValue, setIsTxValue] = useState(false);

  console.log({ isApproved: isApproved });

  //================{PAGES}==================

  const [isSwap, setIsSwap] = useState(false);
  const [isFromTokenPage, setIsFromTokenPage] = useState(false);
  const [isToTokenPage, setIsToTokenPage] = useState(false);
  const [isSlippagePage, setIsSlippagePage] = useState(false);
  const [isNetworkPage, setIsNetworkPage] = useState(false);

  //================{ORDER OF EXECUTION}==================

  //isChange ==> fetchUserOrder();
  //activeDataFetched ==> fetchUser()();
  //isUpdateData ==> fetchSetData();

  //======================================={REDUX BLOCK BEGINS}===============================================
  //======================================={REDUX BLOCK BEGINS}===============================================
  //======================================={REDUX BLOCK BEGINS}===============================================
  //==============={Primary Data}=========================
  const fullState = useSelector((state) => state?.swap);
  // console.log({ fullState: fullState });

  // const userPricesL = localStorage.getItem('userPrices')
  //   ? JSON.parse(localStorage.getItem('userPrices'))
  //   : null; // prices update, withoout allTokens

  // const userPricesL =
  //   localStorage.getItem('userPrices') ?
  //   JSON.parse(localStorage.getItem('userPrices')) : null; // prices update, withoout allTokens

  // const userPricesL =
  //   localStorage.getItem('userPrices') !== null
  //     ? JSON.parse(localStorage.getItem('userPrices'))
  //     : null; // prices update, withoout allTokens

  // const userPricesL = getLocalStorage('userPrices') || null;

  // const userPricesL = getLocalStorage('userPrices');

  const userPricesL =
    getLocalStorage('userPrices') !== undefined &&
    getLocalStorage('userPrices');

  // const userPrices =
  //   getLocalStorage('userPrices') !== undefined &&
  //   getLocalStorage('userPrices');

  // const [userPricesL, setUserPricesL] = useState(userPrices);

  // console.log({ USERPricesLValue: localStorage.getItem('userPrices') });
  // console.log({ userPricesL: userPricesL });

  const isChainChange = localStorage.getItem('chainSwitch')
    ? JSON.parse(localStorage.getItem('chainSwitch'))
    : false;

  const chainL = localStorage.getItem('chain')
    ? JSON.parse(localStorage.getItem('chain'))
    : networksOptions[0];

  const [chain, setChain] = useState(chainL);
  // const [chain, setChain] = useState(chainL);
  const chainId = chain ? chain.id : 1;

  const allTokensL = localStorage.getItem('allTokens')
    ? JSON.parse(localStorage.getItem('allTokens'))
    : null;

  const fTokenL = localStorage.getItem('fToken')
    ? JSON.parse(localStorage.getItem('fToken'))
    : null;

  const tTokenL = localStorage.getItem('tToken')
    ? JSON.parse(localStorage.getItem('tToken'))
    : null;

  const slippageL = localStorage.getItem('slippage')
    ? JSON.parse(localStorage.getItem('slippage'))
    : '1';

  const fValueL = localStorage.getItem('fValue')
    ? JSON.parse(localStorage.getItem('fValue'))
    : 1;

  // const fValueL =
  //   getLocalStorage('fValue') !== undefined ? getLocalStorage('fValue') : 1;

  const usdtTokenL = localStorage.getItem('usdtToken')
    ? JSON.parse(localStorage.getItem('usdtToken'))
    : null;

  const allProtocols = userPricesL?.allProtocols || null;

  //==============={Secondary Data}=========================

  const tValueL = userPricesL?.tValueFormatted || 0;
  const [usdtToken, setUsdtToken] = useState(usdtTokenL);
  const [allTokens, setAllTokens] = useState(allTokensL);
  const [fToken, setFromToken] = useState(fTokenL);

  const [tToken, setToToken] = useState(tTokenL);
  const [activeToToken, setActiveToToken] = useState({});
  const [slippage, setSlippage] = useState(slippageL);
  const [fValue, setFromValue] = useState(fValueL);
  console.log({ fValueType: typeof fValue });
  // console.log({ fValueLength: fValue.length });
  // console.log({ fValueSlice: fValue && fValue.slice(0, 3) });

  const fSymbol = (fToken && fToken?.symbol) || null;
  const fLogoURI = (fToken && fToken?.logoURI) || null;
  const tSymbol = (tToken && tToken?.symbol) || null;
  const tLogoURI = (tToken && tToken?.logoURI) || null;

  // const fromPriceData = localStorage.getItem('fromPriceData')
  //   ? JSON.parse(localStorage.getItem('fromPriceData'))
  //   : null;

  //====={Active fromPriceData}==============================
  // const fromPriceData =
  //   getLocalStorage('fromPriceData') !== undefined &&
  //   getLocalStorage('fromPriceData');
  // console.log({ fromPriceData: fromPriceData });
  //====={Active fromPriceData}==============================
  const fromPriceData =
    (getLocalStorage('fromPriceData') !== undefined &&
      getLocalStorage('fromPriceData')) ||
    (userPricesL && userPricesL?.totalFromPrice);
  // console.log({ fromPriceData: fromPriceData });

  //======================================={ISCHANGE CONDITIONS}===============================================

  //======================================={OLD BLOCK BEGINS}===============================================
  //======================================={OLD BLOCK BEGINS}===============================================
  //======================================={OLD BLOCK BEGINS}===============================================

  const signer = useSigner();
  const { address, isConnected } = useAccount();
  const walletAddress = address;
  const { switchNetwork } = useSwitchNetwork();

  const [swapRoutes, setSwapRoutes] = useState([]);
  const [activeProtocols, setActiveProtocols] = useState([]);
  const [protocols, setProtocols] = useState('');
  const [validationOwner, setValidationOwner] = useState(false);
  console.log({ validationOwner: validationOwner });
  const [validationPrice, setValidationPrice] = useState(false);
  //========={Tokens}===============================
  const [isFromValueChange, setIsFromValueChange] = useState(false);
  const [isToValueChange, setIsToValueChange] = useState(false);
  const [tValue, setToValue] = useState(tValueL);
  const [tValueFormatted, setToValueFormatted] = useState(0.0);
  const [checkData, setCheckData] = useState(null);
  // console.log({ checkData: checkData });
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [validatedValue, setValidatedValue] = useState(0.0);
  // console.log({ validatedValue: validatedValue });
  // console.log({ validatedValue: typeof validatedValue });
  //====================={Prices}===============================

  const connectedNetworkSwitchL = useSelector(
    (state) => state.swap?.connectedNetwork
  );
  const [isChainModalVisible, setIsChainModalVisible] = useState(
    connectedNetworkSwitchL
  );
  // const [isChainModalVisible, setIsChainModalVisible] = useState(false);

  //==========={Connection}=============
  // const [isConnected, setIsConnected] = useState(true);
  const [isCaution, setIsCaution] = useState(false);
  //==========={Connection}=============

  const [isRouting, setIsRouting] = useState(false);
  // const [fromBalance, setFromBalance] = useState('');
  // const [toBalance, setToBalance] = useState('');

  const [totalCost, setTotalCost] = useState();
  const [spender, setSpender] = useState();
  //==========={Favorite List}=============
  const [token, setToken] = useState();

  const [swapFullData, setSwapFullData] = useState(); //Rate: To From/ USD

  const [networksUSDBalance, setNetworksUSDBalance] = useState(0.0);
  const [isNetworkBalance, setIsNetworkBalance] = useState(false);

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');

  const [info, setInfo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [isTransactionMessage, setIsTransactionMessage] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');

  console.log({ transactionMessage: transactionMessage });

  const [approvalStatus, setApprovalStatus] = useState('pending'); // approval granted

  //===========================================================================

  const [isFromTokenChange, setIsFromTokenChange] = useState(false);
  const [isToTokenChange, setIsToTokenChange] = useState(false);
  const [selectedToken, setSelectedToken] = useState();
  const [filteredfTokens, setFilteredfTokens] = useState();
  const [favoriteTokens, setFavoriteTokens] = useState([]);
  const [favoriteTokensTwo, setFavoriteTokensTwo] = useState([]);
  const [favoriteToken1, setFavoriteToken1] = useState({});
  const [favoriteToken2, setFavoriteToken2] = useState({});
  const [favoriteToken3, setFavoriteToken3] = useState({});
  const [favoriteToken4, setFavoriteToken4] = useState({});
  const [favoriteToken5, setFavoriteToken5] = useState({});
  const [favoriteToken6, setFavoriteToken6] = useState({});
  const [favoriteToken7, setFavoriteToken7] = useState({});
  const [favoriteToken8, setFavoriteToken8] = useState({});

  //==========={Connection}=============
  const [isCustom, setIsCustom] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isLowSlippage, setIsLowSlippage] = useState(false);
  const [customSlippage, setCustomSlippage] = useState('');
  const [isSlippageChange, setIsSlippageChange] = useState(false);
  const [isSlippageAuto, setIsSlippageAuto] = useState(true); // default state is

  // console.log({ customSlippage: customSlippage });

  const isConnectingL = useSelector((state) => state?.swap?.isConnecting);

  const [isConnecting, setIsConnecting] = useState(isConnectingL);
  const [activeConnection, setActiveConnection] = useState(
    connectors && connectors[0]
  );

  console.log({ activeConnection: activeConnection });
  //====================================================================================================
  //======================================={BALANCES}=====================================
  //====================================================================================================

  const { data: dataBal } = useBalance({
    address,
    // chainId: chainId,
    chainId: chainId,
    watch: true,
  });

  const [balance, setBalance] = useState('');
  // const [balance, setBalance] = useState(0.0);

  // console.log({ newChainBalance: balance });
  // console.log({ chainBalanceType: typeof balance });

  const [fromBalance, setFromBalance] = useState(0.0);
  const [fromBalancePercent, setFromBalancePercent] = useState(75);

  const fromBalanceTest = 1.25; // to check if percentage values for fromvalue works

  // console.log({ fromBalance: fromBalance });
  const [toBalance, setToBalance] = useState(0.0);
  // console.log({ toBalance: toBalance });
  // console.log({ toBalanceType: typeof toBalance });

  console.log({ fValueReal: fValue });
  console.log({ fValueFormatted: new Intl.NumberFormat().format(fValue) });
  console.log({ tValueFormatted: new Intl.NumberFormat().format(tValue) });
  const [priceDeviation, setPriceDeviation] = useState(0.0);
  console.log({ priceDeviation: priceDeviation });
  console.log({ priceDeviationType: typeof priceDeviation });
  const [toValueTotal, setToValueTotal] = useState(0.0);

  console.log({ toValueTotal: toValueTotal });
  console.log({ toValueTotalType: typeof toValueTotal });

  const [fromValueTotal, setFromValueTotal] = useState(0.0);

  console.log({ fromValueTotal: fromValueTotal });
  console.log({ fromValueTotalType: typeof fromValueTotal });
  const [isPriceDeviation, setIsPriceDeviation] = useState(true);

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================

  //====================================================================================================
  //======================================={Format Number Function}=====================================
  //====================================================================================================

  const [fromInput, setFromInput] = useState('');

  console.log({ fromInput: fromInput });

  const [toInput, setToInput] = useState('');

  console.log({ toInput: toInput });

  const [isSwapSuccess, setIsSwapSuccess] = useState(false);
  const [isSwapError, setIsSwapError] = useState(false);
  const [isApproveSuccess, setIsApproveSuccess] = useState(false);
  const [isApproveError, setIsApproveError] = useState(false);

  // useEffect(()=>{
  //   handleInput()
  // },[fValue])

  useEffect(() => {
    if (isConnected) {
      const tokenbal = Number(dataBal?.formatted).toFixed(3);
      setBalance(tokenbal);
      localStorage.setItem('chainBalance', JSON.stringify(tokenbal));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, isConnected]);

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================
  //

  useEffect(() => {
    if (userPricesL === null) {
      setIsToLoading(true);
      //  setIsFromLoading(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPricesL]);

  useEffect(() => {
    if (connectedNetworkSwitchL === true) {
      setIsChainModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedNetworkSwitchL]);

  useEffect(() => {
    if (isConnectingL === true) {
      setIsConnecting(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnectingL]);

  // useEffect(() => {
  //   setIsChainModalVisible(connectedNetworkSwitchL)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [connectedNetworkSwitchL]);

  useEffect(() => {
    localStorage.setItem('isConnecting', JSON.stringify(isConnecting));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnecting]);

  useEffect(() => {
    localStorage.setItem('chain', JSON.stringify(chain));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  // useEffect(() => {
  //   localStorage.setItem('activeConnection', JSON.stringify(activeConnection));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeConnection]);

  useEffect(() => {
    if (isConnected === true) {
      setIsConnecting(false);
      dispatch(updateConnecting(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    localStorage.setItem('allToken', JSON.stringify(allTokens));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokens]);

  useEffect(() => {
    localStorage.setItem('usdtToken', JSON.stringify(usdtToken));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usdtToken]);

  useEffect(() => {
    localStorage.setItem('fToken', JSON.stringify(fToken));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    localStorage.setItem('tToken', JSON.stringify(tToken));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    localStorage.setItem('slippage', JSON.stringify(slippage));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slippage]);

  useEffect(() => {
    localStorage.setItem('fValue', JSON.stringify(fValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue]);

  //============================{ CURRENT STATE DATA SET}===========================================

  //==================================================================================================
  // fetch favoriteTokenList
  useEffect(() => {
    if (allTokens !== null || undefined) {
      getFavorites();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokens]);

  useEffect(() => {
    getPriceDeviation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceDeviation, userPricesL]);

  async function getPriceDeviation() {
    let toValueTotal =
      userPricesL && Number(userPricesL?.toPrice) * Number(tValue);
    let fromValueTotalL =
      fromPriceData && Number(fromPriceData?.totalFromPrice);
    // if(toValueTotal > fromValueTotal){
    //   setIsPriceDeviation(true)

    // }else{
    //   setIsPriceDeviation(false)
    // }
    setFromValueTotal(fromValueTotalL);
    setToValueTotal(toValueTotal);

    let priceDifference = fromValueTotalL - toValueTotal;
    let priceDeviationL = priceDifference / fromValueTotalL;
    let priceDeviationPercentageRaw = priceDeviationL * 100;
    let priceDeviationPercentage = priceDeviationPercentageRaw.toFixed(2);

    setPriceDeviation(priceDeviationPercentage);
    if (toValueTotal > fromValueTotal) {
      setIsPriceDeviation(true);
    } else {
      setIsPriceDeviation(false);
    }

    // setPriceDeviation(priceDeviationPercentage);
  }

  //====================================================================================================
  //======================================={Format Number Function}=====================================
  //====================================================================================================

  useEffect(() => {
    handleToInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue]);

  const handleToInput = () => {
    if (fValue !== null) {
      const formattedToNumber = new Intl.NumberFormat().format(tValue);

      // const toNumberEdited = formattedToNumber.replace(/[^\d]/g, '');
      const toNumberEdited = formattedToNumber.replace(/,/g, ' '); // replace comme with space
      setToInput(toNumberEdited);
    }
  };

  //====={Phone Number Format}===============

  async function getFavorites() {
    // await Promise?.allSettled?(
    allTokens?.map(async (b) => {
      // let favoriteList = [];
      // if (b.address === fromToken.address) {
      if (b.symbol === 'WBTC') {
        setFavoriteToken1(b);
      }
      if (b.symbol === 'USDC') {
        setFavoriteToken2(b);
      }
      // if (b.symbol === 'TONCOIN') {
      //   setFavoriteToken3(b);
      // }

      if (b.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        setFavoriteToken3(b);
      }
      if (b.symbol === 'USDT') {
        setFavoriteToken4(b);
      }
      if (b.symbol === 'BUSD') {
        setFavoriteToken5(b);
      }
      if (b.symbol === 'MATIC') {
        setFavoriteToken6(b);
      }
      if (b.symbol === 'DAI') {
        setFavoriteToken7(b);
      }
      if (b.symbol === 'UNI') {
        setFavoriteToken8(b);
      }
    });
    // )
  }

  useEffect(() => {
    if (allTokens !== null || undefined) {
      let newTokens = [];
      let newTokensTwo = [];

      newTokens.push(
        favoriteToken1,
        favoriteToken2,
        favoriteToken3
        // favoriteToken4
      );

      newTokensTwo.push(
        favoriteToken5,
        favoriteToken6,
        favoriteToken7
        // favoriteToken8
      );
      console.log({ newTokensOnly: newTokens });
      setFavoriteTokens(newTokens);

      setFavoriteTokensTwo(newTokensTwo);
    }
  }, [
    allTokens,
    favoriteToken1,
    favoriteToken2,
    favoriteToken3,
    favoriteToken4,
    favoriteToken5,
    favoriteToken6,
    favoriteToken7,
    favoriteToken8,
  ]);

  //=======================================================================
  useEffect(() => {
    if (
      fToken !== undefined ||
      allTokens !== undefined ||
      tToken !== undefined
    ) {
      filterFTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  function filterFTokens() {
    let filteredFTokens = allTokens?.filter((filter) => {
      return filter?.symbol?.toLowerCase() !== tToken?.symbol.toLowerCase();
    });
    setFilteredfTokens(filteredFTokens);
  }

  useEffect(() => {
    if (
      fToken !== undefined ||
      allTokens !== undefined ||
      tToken !== undefined
    ) {
      filterTTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  function filterTTokens() {
    let filteredTTokens = allTokens?.filter((filter) => {
      return filter?.symbol.toLowerCase() !== fToken?.symbol.toLowerCase();
    });
    setFilteredtTokens(filteredTTokens);
  }

  //=======================================================================
  //=======================================================================

  //================={Slippage controller}===============
  useEffect(() => {
    let slippageValue = Number(slippage);
    if (slippage !== null && slippageValue > 0 && slippageValue < 0.09) {
      setIsLowSlippage(true);
    }

    if (slippageValue > 3) {
      setIsWarning(true);
    }

    if (slippage !== null && slippageValue > 0.09 && slippageValue <= 3) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }

    if (slippage === null || undefined) {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
    if (slippage === '') {
      setIsLowSlippage(false);
      setIsWarning(false);
    }
  }, [slippage, isWarning, isLowSlippage]);

  //===================================================================================================

  useEffect(() => {
    if (isProcessing === true) {
      setTimeout(() => {
        setIsProcessing(false);
      }, 10000); // reduce time
    }
  });

  //==============={useEffect Blocks}=================================

  useEffect(() => {
    updateProtocols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProtocols]); //======================================={OLD BLOCK BEGINS}===============================================

  // function onFromValueChanged(e) {
  //   if (e.target.validity.valid) {
  //     setToValue(0);
  //     setFromValue(e.target.value);
  //     // localStorage.setItem('fValue', JSON.stringify(e.target.value))
  //     // let parsed = parseUnits(e.target.value, fToken?.decimals.toString());
  //     // let validBigNumber = BigInt(parsed).toString();
  //     // setValidatedValue(validBigNumber);
  //     setIsFromValueChange(true);

  //     // eslint-disable-next-line no-undef
  //   }
  // }

  function onFromValueChanged(ev) {
    setToValue(0);
    setFromValue(ev.target.value);
    // localStorage.setItem('fValue', JSON.stringify(e.target.value))
    // let parsed = parseUnits(e.target.value, fToken?.decimals.toString());
    // let validBigNumber = BigInt(parsed).toString();
    // setValidatedValue(validBigNumber);
    setIsFromValueChange(true);
  }

  /*
 ====================================================================
        The Swap function
 ====================================================================
*/

  /*
 ====================================================================
        Swap Owner
 ====================================================================
*/

  useEffect(() => {
    setTimeout(() => {
      validateSwapOwner();
      if (validationOwner === true) {
        setInfo('');
        setIsCaution(false);
      }
    }, 1000);
  });

  useEffect(() => {
    resetProtocolsValidation();
  }, [fValue, fToken, tToken, chainId]);

  async function resetProtocolsValidation() {
    setProtocols('');
    setInfo('No routes available');
    setIsCaution(true);

    setValidationOwner(false);
  }

  useEffect(() => {
    setTimeout(() => {
      validateSwapOwner();
      if (fromBalance <= fValue) {
        setValidationOwner(false);
        setInfo('Insufficient balance');
        setIsCaution(true);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, fToken, tToken, chainId, protocols, fromBalance]);

  async function validateSwapOwner() {
    setValidationOwner(false);

    if (!walletAddress) {
      setInfo('Wallet not connected');
      setIsCaution(true);

      setValidationOwner(false);
    } else if (!fValue) {
      setInfo('Please enter amount');
      setIsCaution(true);

      setValidationOwner(false);
    } else if (balance <= 0) {
      setInfo(`Insufficient network balance`);
      setIsCaution(true);

      //   setValidationOwner(false);
      // } else if (balance <= 0) {
      //   setInfo(`Insufficient balance`);
      //   setIsCaution(true);

      setValidationOwner(false);
    } else if (fromBalance <= fValue) {
      setInfo('Insufficient balance');
      setIsCaution(true);

      setValidationOwner(false);
    } else if (!protocols) {
      setInfo('No routes available');
      setIsCaution(true);

      setValidationOwner(false);
    } else {
      setValidationOwner(true);
    }
  }

  useEffect(() => {
    if (isApprove) {
      setIsTransactionMessage(true);
      if (isSent) {
        setTransactionMessage('Approval sent');
      }
      if (isLoading) {
        setTransactionMessage('Approval in progress...');
      }
      if (isSuccess) {
        setTransactionMessage('Approval successful');
      }
      if (isError) {
        setTransactionMessage('Approval Denied');
      }
      setIsTransactionMessage(false);
    }
  }, [isApprove, isSent, isLoading, isSuccess, isError]);

  useEffect(() => {
    if (isSwap) {
      setIsTransactionMessage(true);
      if (isSent) {
        setTransactionMessage('Swap sent');
      }
      if (isLoading) {
        setTransactionMessage('Swap in progress...');
      }
      if (isSuccess) {
        setTransactionMessage('Swap successful');
      }
      if (isError) {
        setTransactionMessage('Swap Denied');
      }
      setIsTransactionMessage(false);
    }
  }, [isSwap, isSent, isLoading, isSuccess, isError]);

  //======================================================================================

  async function swapToken() {
    if (
      fToken?.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' ||
      fToken?.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      setIsSwap(true);
      await swapOwner();
    } else {
      setIsApprove(true);
      await approve();
    }
  }

  // send for approval from backend
  async function approve() {
    setIsProcessing(true);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.1inch.exchange/v5.0/${chainId}/approve/transaction?tokenAddress=${fToken?.address}&amount=${validatedValue}`
      );
      if (response.data) {
        let tx = response.data;

        let wallet = signer.data;
        setIsSent(true);
        const approval = await wallet.sendTransaction(tx);
        console.log({ approvalReward: approval });

        let approvalStatus = await approval.wait();

        if (approvalStatus?.status) {
          // if (approvalStatus?.status === 1) {
          setIsSucess(true);
          setIsApproved(true);
          setIsApproveSuccess(true);
          console.log({ approvalData: approvalStatus });
          console.log({
            txHash:
              (approvalStatus?.hash && approvalStatus?.hash) ||
              (approvalStatus?.transactionHash &&
                approvalStatus?.transactionHash) ||
              '',
          });
          setTimeout(() => {
            setIsSwap(false);
          }, 2000);
          setTimeout(async () => {
            await swapOwner();
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
      setIsError(true); // original
      setIsApproveError(true);
      // For testing purpose
      // if (error?.message) {
      //   setTimeout(async()=>{
      //     await swapOwner();
      //   }, 2000)
      //   setIsApproved(false);
      // }

      // For testing purpose
      // if (error?.message) {
      //   setTimeout(async()=>{
      //     setIsChainModalVisible(true)
      //   }, 2000)
      // }
      setTimeout(() => {
        setIsApproved(false);
      }, 20000);
      console.log({ ApproveError: error?.message });
      // return error?.message;
    }
  }

  useEffect(() => {
    if (isApprove === false && isSwap === false) {
      resetStatus();
    }
  }, [isApprove, isSwap]);

  async function resetStatus() {
    setIsLoading(false);
    setIsError(false);
    setIsSucess(false);
    setIsSent(false);
    setIsApprove(false);
    setIsApproved(false);
    setIsTransactionMessage(false);
    setTransactionMessage('');
  }

  //====================================================

  async function swapOwner() {
    if (validationOwner === true) {
      setIsProcessing(true);
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.1inch.io/v5.0/${chainId}/swap?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${validatedValue}&fromAddress=${walletAddress}&slippage=${slippage}&protocols=${protocols}&referrerAddress=${dexAddress}&fee=${fee}&disableEstimate=true&allowPartialFill=false&gasLimit=3000000`
        );

        if (response?.data) {
          let tx = {
            data: response.data.tx.data,
            from: response.data.tx.from,
            gasLimit: userPricesL?.estimatedGas,
            gasPrice: response.data.tx.gasPrice,
            to: response.data.tx.to,
            value: response.data.tx.value,
          };

          let wallet = signer.data;
          setIsSent(true);

          const transaction = await wallet.sendTransaction(tx);

          console.log({ swapReward: transaction });

          let txStatus = await transaction.wait();

          if (txStatus?.status) {
            // if (txStatus?.status === 1) {
            setIsSucess(true);
            setIsSwapSuccess(true);
            console.log({ txData: txStatus });
            console.log({
              txHash:
                (txStatus?.hash && txStatus?.hash) ||
                (txStatus?.transactionHash && txStatus?.transactionHash) ||
                '',
            });
            console.log({ txStatus: 'Successful' });
            setTimeout(() => {
              setIsSwap(false);
            }, 20000);
          }
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsSwapError(true);
        console.log({ SwapError: error?.message });
        // return error?.message;
        setTimeout(() => {
          setIsSwap(false);
        }, 20000);
      }
    }
  }

  //=====================================================================================

  function swapTokensPosition() {
    let tmpToken = fToken;
    setFromToken(tToken);
    setToToken(tmpToken);
    setIsFromTokenChange(true);
    setIsToTokenChange(true);
  }

  //======={ To be tested for switching inpute values}=========
  function swapValuesTo() {
    let tmpToken = fToken;
    setFromToken(tToken);
    setToToken(tmpToken);
    setIsFromTokenChange(true);
    setIsToTokenChange(true);

    let tmpValue = fValue;
    setFromValue(tValue);
    setToValue(tmpValue);
  }

  function onToValueChanged(e) {
    if (e.target.validity.valid) {
      setFromValue(0);
      setToValue(e.target.value);

      // setIsToValueChange(true);
      swapValuesTo();
      setIsFromValueChange(true);

      // eslint-disable-next-line no-undef
    }
  }

  //================={updateProtocols}===============

  async function updateProtocols() {
    if (activeProtocols.length >= 1) {
      let protocolsList = [];

      for (let i = 0; i < activeProtocols.length; i++) {
        let name = activeProtocols[i].name;
        protocolsList.push(name);
      }

      console.log({ protocolsList: protocolsList });

      const formattedProtocols = protocolsList.toString();
      console.log({ formattedProtocols: formattedProtocols });
      setProtocols(formattedProtocols); // Selected Protocols
    }
  }

  useEffect(() => {
    if (isConnected) {
      setFromBalance(0.0);
      fTokenBalance();
      // setTimeout(() => {
      //   fTokenBalance();
      // }, 2000); // production 2000
    }

    if (isConnected === true && isFromTokenChange === true) {
      setFromBalance(0.0);
      setTimeout(() => {
        fTokenBalance();
        setIsFromTokenChange(false);
      }, 2000); // production 2000
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, fromBalance, balance, isFromTokenChange]);

  async function fTokenBalance() {
    let tokenAddress = fToken?.address;
    if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      // setFromBalance(balance);
      setFromBalance(Number(balance));
    } else {
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signer.data
      );
      const tokenbal = await ERC20Contract.balanceOf(walletAddress);
      const balanceRaw = formatUnits(tokenbal, fToken?.decimals);
      if (Number(balanceRaw) > 0) {
        const formattedBalance = Number(balanceRaw).toFixed(5);
        setFromBalance(formattedBalance);
      }
    }
  }

  useEffect(() => {
    if (isConnected) {
      setToBalance(0.0);
      tTokenBalance();
      // setTimeout(() => {
      //   tTokenBalance();
      // }, 2000); // production 2000
    }

    if (isConnected === true && isToTokenChange === true) {
      setToBalance(0.0);
      setTimeout(() => {
        tTokenBalance();
        setIsToTokenChange(false);
      }, 2000); // production 2000
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken, toBalance, balance, isToTokenChange]);

  async function tTokenBalance() {
    let tokenAddress = tToken?.address;
    if (tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      // setToBalance(balance);
      setToBalance(Number(balance));
    } else {
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signer.data
      );
      const tokenbal = await ERC20Contract.balanceOf(walletAddress);
      const balanceRaw = formatUnits(tokenbal, tToken?.decimals);
      if (Number(balanceRaw) > 0) {
        const formattedBalance = Number(balanceRaw).toFixed(5);
        setToBalance(formattedBalance);
      }
    }
  }

  //======================================={USD Value Converter}===============================================
  //======================================={USD Value Converter}===============================================

  //========{API CALLS}=========================
  useEffect(() => {
    UpdateSpender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spender, chain]);

  async function UpdateSpender() {
    fetchSpender(chainId)
      .then((response) => {
        console.log('Spender', response);
        setSpender(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //=============={BACKEND CALLS}==========================

  //================================{USER  DATA PERSIST}===========================
  /**
   *
   * @returns Persisting user state is acheived by taking the raw data and storing to the
   * backend before refetching with the "getUser()"
   * Emphasis is placed on "chainId: chian?.id" as agains "chainId" fetched from the "Redux State"
   * Initial state of the "chainId" is manged with updated with "Redux" and "localStorage"
   * A similar approach is used in this app for persisting "UserId"
   */

  //===========================================================

  useEffect(() => {
    //   //=================={First loading/ rendering}=======================================
    dispatch(updateChain(chain));
    dispatch(updateChainSymbol(chain?.chainSymbol));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  //======={AllIn One Call}========================================

  useEffect(() => {
    // setExchangeRateData(exchangeRate);
    let routes = [];
    allProtocols?.[0].forEach((route) => {
      routes.push(route);
    });
    setSwapRoutes(routes); // send the routes to the SwapRoute component through Layout

    //================{SET AUTOMATIC PROTOCOL}===================
    if (routes.length > 0) {
      console.info({ aroute: routes[0] });
      let newRoute = routes[0];

      let autoRoute = newRoute?.map((l) => {
        const activeRoute = l.name;
        return activeRoute;
      });
      let pRoute = autoRoute.toString();
      setProtocols(pRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, slippage, fToken, fValue, tToken]);

  //======================================={PRICING UPDATES}============================================
  //======================================={PRICING UPDATES}============================================

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

  //========{On component mount}=======================
  useEffect(() => {
    setTimeout(() => {
      setIsFromLoading(true);
      if (validationPrice === true) {
        let userData = {
          chainId,
          fToken,
          usdtToken,
          fValue,
        };
        dispatch(fetchFromPrice(userData));
        setIsFromLoading(false);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationPrice]);

  //========{On state changes}=======================

  useEffect(() => {
    if (validationPrice === true) {
      setIsFromLoading(true);
      if (chainId === undefined || chainId === null || chainId === '') {
        return;
      }
      let userData = {
        chainId,
        fToken,
        usdtToken,
        fValue,
      };
      dispatch(fetchFromPrice(userData));
      setIsFromLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, usdtToken, fValue]);

  //========{UserPriceData}==================================================
  useEffect(() => {
    if (userPricesL !== null) {
      fetchUpdatedPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPricesL]);

  async function fetchUpdatedPrice() {
    setValidatedValue(userPricesL?.validatedValue);
    setToValueFormatted(userPricesL?.tValueFormatted);
    setToValue(userPricesL?.tValueFormatted); // formatted to 3 S.F
  }

  //==========={using validation technique}===========================

  //========{On User value changes}=========================

  useEffect(() => {
    setTimeout(() => {
      validatePrices();
      if (validationPrice === true && userPricesL !== null) {
        if (
          fValue === 0 ||
          fValue === '0' ||
          fValue === null ||
          fValue === undefined
        ) {
          return;
        }

        if (
          tValueFormatted === 0 ||
          tValueFormatted === '0' ||
          tValueFormatted === null ||
          tValueFormatted === undefined ||
          tValueFormatted === 'NaN'
        ) {
          return;
        }
        if (chainId === undefined || chainId === null || chainId === '') {
          return;
        }
        let userData = {
          chainId,
          fToken,
          tToken,
          usdtToken,
          slippage,
          fValue,
          isChainChange: isChainChange ? isChainChange : false,
        };
        dispatch(fetchToPrice(userData));
        setIsToLoading(true);
        setTimeout(() => {
          setIsToLoading(false);
        }, 1000);
      }
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken, usdtToken, slippage, fValue]);

  //========{On IntervalChanges}=========================

  useEffect(() => {
    const intervalId = setInterval(() => {
      validatePrices();
      if (validationPrice === true) {
        if (chainId === undefined || chainId === null || chainId === '') {
          return;
        }
        let userData = {
          chainId,
          fToken,
          tToken,
          usdtToken,
          slippage,
          fValue,
          isChainChange: isChainChange ? isChainChange : false,
        };
        dispatch(fetchToPrice(userData));

        setIsToLoading(true);
        setTimeout(() => {
          setIsToLoading(false);
        }, 1000);
      }
    }, 20000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationPrice, fToken, tToken, usdtToken, slippage, fValue]);

  async function validatePrices() {
    setValidationPrice(false);

    if (
      fValue === 0 ||
      fValue === '0' ||
      fValue === null ||
      fValue === undefined
    ) {
      setValidationPrice(false);
    } else if (
      slippage === 0 ||
      slippage === '0' ||
      slippage === null ||
      slippage === undefined
    ) {
      setValidationPrice(false);
    } else if (
      chainId === 0 ||
      chainId === '0' ||
      chainId === null ||
      chainId === undefined
    ) {
      setValidationPrice(false);
    } else if (fToken === null || fToken === undefined) {
      setValidationPrice(false);
    } else if (tToken === null || tToken === undefined) {
      setValidationPrice(false);
    } else if (usdtToken === null || usdtToken === undefined) {
      setValidationPrice(false);
    } else {
      setValidationPrice(true);
    }
  }

  useEffect(() => {
    fetchChainData();
    if (isChainChange === true) {
      setTimeout(() => {
        fetchChainData();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  useEffect(() => {
    if (isSwapSuccess) {
      setTimeout(() => {
        setIsSwapSuccess(false);
      }, 5000);
    }
    if (isSwapError) {
      setTimeout(() => {
        setIsSwapError(false);
      }, 5000);
    }
    if (isApproveSuccess) {
      setTimeout(() => {
        setIsApproveSuccess(false);
      }, 5000);
    }
    if (isApproveError) {
      setTimeout(() => {
        setIsApproveError(false);
      }, 5000);
    }
  }, [isSwapSuccess, isSwapError, isApproveSuccess, isApproveError]);

  async function fetchChainData() {
    setIsFromLoading(true);
    // let userData = chainId ? chainId : 1;
    let userData = {
      chainId: chainId ? chainId : 1,
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/swap/updateTokens`,
        userData
      );

      // const response = await axios.get(`${BACKEND_URL}/swap/updateTokens/${1}`);
      if (response.data) {
        setUsdtToken(response.data?.usdtToken);
        setAllTokens(response.data?.allTokens);

        if (fTokenL === null) {
          setUsdtToken(response.data?.usdtToken);

          setAllTokens(response.data?.allTokens);
          setFromToken(response.data?.fToken);
          setToToken(response.data?.tToken);
          setIsFromTokenChange(true);
          setIsToTokenChange(true);
        }

        if (isChainChange === true && chainId !== null) {
          setUsdtToken(response.data?.usdtToken);

          setAllTokens(response.data?.allTokens);
          setFromToken(response.data?.fToken);
          setToToken(response.data?.tToken);
          localStorage.setItem('chainSwitch', JSON.stringify(false));
          setIsFromTokenChange(true);
          setIsToTokenChange(true);
        }

        localStorage.setItem('chainId', JSON.stringify(userData?.chainId));
        networksOptions?.map(async (b) => {
          if (b.id === userData?.chainId) {
            localStorage.setItem('chain', JSON.stringify(b));
          }
        });
        setIsFromLoading(false);
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
      {isConnected === false && isConnecting === true ? (
        <div className={stylesFromToken.frameParent8}>
          <div className={stylesFromToken.connectWalletParent}>
            <div className={stylesFromToken.connectWallet1}>Connect Wallet</div>
            <div className={stylesFromToken.iconButton}>
              <img
                className={stylesFromToken.arrowDownIcon}
                onClick={() => {
                  setIsConnecting(false);
                  dispatch(updateConnecting(false));
                }}
                alt=""
                src="/xclose3.svg"
              />
            </div>
          </div>
          <div className={stylesFromToken.frameChild} />
          <div className={stylesFromToken.frameParent9}>
            <div
              className={stylesFromToken.walletIconParent}
              onClick={() => {
                connect({ connector: connectors[0] });
                setActiveConnection(connectors[0]);
              }}
            >
              <img
                className={stylesFromToken.walletLinkIcon}
                alt=""
                src="/wallet-icon1.svg"
              />
              <div className={stylesFromToken.metamask}>MetaMask</div>
              {activeConnection?.name === connectors[0]?.name ? (
                <div className={stylesFromToken.ellipseParent}>
                  <div className={stylesFromToken.frameItem} />
                  <div className={stylesFromToken.txCost}>Connected</div>
                </div>
              ) : (
                <img
                  className={stylesFromToken.arrowDownIcon}
                  alt=""
                  src="/chevronright1.svg"
                />
              )}
            </div>
            <div
              className={stylesFromToken.walletIconParent}
              onClick={() => {
                connect({ connector: connectors[3] });
                setActiveConnection(connectors[3]);
              }}
            >
              <img
                className={stylesFromToken.walletLinkIcon}
                alt=""
                src="/walletlink.svg"
              />
              <div className={stylesFromToken.metamask}>Coinbase Wallet</div>
              {activeConnection?.name === connectors[3]?.name ? (
                <div className={stylesFromToken.ellipseParent}>
                  <div className={stylesFromToken.frameItem} />
                  <div className={stylesFromToken.txCost}>Connected</div>
                </div>
              ) : (
                <img
                  className={stylesFromToken.arrowDownIcon}
                  alt=""
                  src="/chevronright1.svg"
                />
              )}
            </div>
            <div
              className={stylesFromToken.walletIconParent}
              onClick={() => {
                connect({ connector: connectors[2] });
                setActiveConnection(connectors[2]);
              }}
            >
              <img
                className={stylesFromToken.walletLinkIcon}
                alt=""
                src="/walletconnect.svg"
              />
              <div className={stylesFromToken.metamask}>Wallet Connect</div>
              {activeConnection?.name === connectors[2]?.name ? (
                <div className={stylesFromToken.ellipseParent}>
                  <div className={stylesFromToken.frameItem} />
                  <div className={stylesFromToken.txCost}>Connected</div>
                </div>
              ) : (
                <img
                  className={stylesFromToken.arrowDownIcon}
                  alt=""
                  src="/chevronright1.svg"
                />
              )}
            </div>
            <div
              className={stylesFromToken.walletIconParent}
              onClick={() => {
                connect({ connector: connectors[4] });
                setActiveConnection(connectors[4]);
              }}
            >
              <img
                className={stylesFromToken.frameIcon}
                alt=""
                src="/frame-1321314394.svg"
              />
              <div className={stylesFromToken.metamask}>Ledger</div>
              {activeConnection?.name === connectors[4]?.name ? (
                <div className={stylesFromToken.ellipseParent}>
                  <div className={stylesFromToken.frameItem} />
                  <div className={stylesFromToken.txCost}>Connected</div>
                </div>
              ) : (
                <img
                  className={stylesFromToken.arrowDownIcon}
                  alt=""
                  src="/chevronright1.svg"
                />
              )}
            </div>
            <div
              className={stylesFromToken.walletIconParent}
              onClick={() => {
                connect({ connector: connectors[3] });
                setActiveConnection(connectors[3]);
              }}
            >
              <img
                className={stylesFromToken.braveLogoSansText2Icon}
                alt=""
                src="/bravelogosanstext-2.svg"
              />
              <div className={stylesFromToken.metamask}>Brave</div>
              {activeConnection?.name === connectors[3]?.name ? (
                <div className={stylesFromToken.ellipseParent}>
                  <div className={stylesFromToken.frameItem} />
                  <div className={stylesFromToken.txCost}>Connected</div>
                </div>
              ) : (
                <img
                  className={stylesFromToken.arrowDownIcon}
                  alt=""
                  src="/chevronright1.svg"
                />
              )}
            </div>
          </div>
          <div className={stylesFromToken.checkboxParent}>
            <div className={stylesFromToken.checkbox}>
              <img
                className={stylesFromToken.checkIcon}
                alt=""
                src="/check.svg"
              />
            </div>
            <div className={stylesFromToken.metamask}>
              <span>{`I have read, understand, and agree to the `}</span>
              <span className={stylesFromToken.termsOfService}>
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* SWITCH NETWORK */}
      {isChainModalVisible === true &&
      isFromTokenPage === false &&
      isToTokenPage === false &&
      isSlippagePage === false &&
      isConnecting === false ? (
        <>
          {/* <div className="absolute top-[162px] left-[600px] rounded-13xl bg-surface-1-64-d shadow-[0px_0px_16px_rgba(0,_0,_0,_0.04),_0px_24px_48px_-12px_rgba(16,_24,_40,_0.08)] box-border w-[480px] h-[586px] flex flex-col p-6 items-center justify-center gap-[24px] border-[1px] border-solid border-surface-tint-16-d"> */}
          {/* <div className="top-[134px] rounded-13xl bg-surface-1-64-d [backdrop-filter:blur(40px)] box-border w-[480px] flex flex-col pt-4 px-3 pb-6 items-center justify-center gap-[16px] border-[1px] border-solid border-surface-tint-16-d"> */}
          <div className={stylesFromToken.frameContainer}>
            <div className={stylesFromToken.selectATokenParent}>
              <div className={stylesFromToken.selectAToken}>
                Select a Network
              </div>
              <div
                className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
              >
                <img
                  className={stylesFromToken.xCloseIcon}
                  onClick={() => {
                    setIsChainModalVisible(false);
                    dispatch(updateConnectedNetwork(false));
                  }}
                  alt=""
                  src="/xclose.svg"
                />
              </div>
            </div>
            <div className={stylesFromToken.frameChild} />
            <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[8px] overflow-y-auto">
              <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
                {isConnected ? (
                  <div className="self-stretch">
                    {networksOptions?.map((c, idx) => (
                      <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
                        <div
                          className="px-3 py-2 w-full flex flex-row gap-4"
                          key={idx}
                          onClick={() => {
                            switchNetwork(c.id);
                            setChain(c);
                            setIsNetworkBalance(true);
                            setIsChainModalVisible(false);
                            localStorage.setItem(
                              'chainSwitch',
                              JSON.stringify(true)
                            );
                            // localStorage.setItem('chain', JSON.stringify(c));
                            dispatch(updateIsChangeChainId(true));
                            dispatch(updateConnectedNetwork(false));
                          }}
                        >
                          <img src={c.logoURI} alt="logo" className="w-8 h-8" />

                          <div className="flex flex-col">
                            <span className="text-xs text-primaryText">
                              {c?.name}
                            </span>
                            <span className="text-xs text-secondaryText">
                              {c?.chainSymbol}
                            </span>
                          </div>
                        </div>
                        <span className="justify-start items-start mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#9D9DA3"
                            className={`w-6 h-6 hover:stroke-infoText active:fill-infoText ${
                              c === chain
                                ? 'stroke-infoText fill-infoText'
                                : 'stroke-secondaryText'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="self-stretch">
                    {networksOptions?.map((c, idx) => (
                      <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
                        <div
                          className="px-3 py-2 w-full flex flex-row gap-4"
                          key={idx}
                          onClick={() => {
                            setChain(c);
                            setIsNetworkBalance(true);
                            setIsChainModalVisible(false);

                            localStorage.setItem(
                              'chainSwitch',
                              JSON.stringify(true)
                            );
                            dispatch(updateIsChangeChainId(true));
                            dispatch(updateConnectedNetwork(false));
                          }}
                        >
                          <img src={c.logoURI} alt="logo" className="w-8 h-8" />

                          <div className="flex flex-col">
                            <span className="text-xs text-primaryText">
                              {c?.name}
                            </span>
                            <span className="text-xs text-secondaryText">
                              {c?.chainSymbol}
                            </span>
                          </div>
                        </div>
                        <span className="justify-start items-start mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#9D9DA3"
                            className={`w-6 h-6 hover:stroke-infoText active:fill-infoText ${
                              c === chain
                                ? 'stroke-infoText fill-infoText'
                                : 'stroke-secondaryText'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* CARD */}
      {/* <div className={stylesFromToken.frameContainer}>
          <div className={stylesFromToken.selectATokenParent}>
            <div className={stylesFromToken.selectAToken}>Select a token</div>
            <div
              className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
            >
              <img
                className={stylesFromToken.xCloseIcon}
                onClick={() => setIsFromTokenPage(false)}
                alt=""
                src="/xclose.svg"
              />
            </div>
          </div>
          <div className={stylesFromToken.frameChild} />
          
        </div> */}

      {/* {isChainModalVisible === true &&
      isFromTokenPage === false &&
      isToTokenPage === false &&
      isSlippagePage === false &&
      isConnecting === false ? (
        <>
          <div className={stylesManageToken.frameContainer}>
            <div className={stylesManageToken.iconButtonParent}>
              <div
                className={`cursor-pointer hover:bg-secondaryFillLight ${stylesManageToken.iconButton} `}
              >
                <img
                  className={stylesManageToken.chevronLeftIcon}
                  alt=""
                  src="/chevronleft.svg"
                  onClick={() => {
                    setIsChainModalVisible(false);
                    localStorage.setItem('newNetwork', JSON.stringify(false));
                  }}
                />
              </div>
              <div className={stylesManageToken.manage}>test Chain Connect</div>
              <div
                className={`cursor-pointer hover:bg-secondaryFillLight ${stylesManageToken.iconButton} `}
              >
                <img
                  className={stylesManageToken.chevronLeftIcon}
                  alt=""
                  src="/xclose.svg"
                  onClick={() => setIsChainModalVisible(false)}
                />
              </div>
            </div>
            <div className={stylesManageToken.frameChild} />
          </div>
        </>
      ) : null} */}

      {/* ================================{SWAP MAIN ACTIVE STATE}===================================== */}

      {isChainModalVisible === false &&
      isFromTokenPage === false &&
      isToTokenPage === false &&
      isSlippagePage === false &&
      isConnecting === false ? (
        <div className={stylesSwap.frameGroup}>
          <div className={stylesSwap.swapParent}>
            <div className={stylesSwap.swap}>Swap</div>
            <img
              className={`cursor-pointer ${stylesSwap.settings04Icon}`}
              onClick={() => {
                setIsSlippagePage(true);
              }}
              alt=""
              src="/settings04.svg"
            />
          </div>
          <div className={stylesSwap.frameContainer}>
            <div className={stylesSwap.frameDiv}>
              <div className={stylesSwap.frameParent1}>
                <div className={stylesSwap.frameParent2}>
                  <div
                    className={`cursor-pointer ${stylesSwap.protocolIconGroup}`}
                    onClick={() => setIsFromTokenPage(true)}
                  >
                    <img
                      className={stylesSwap.protocolIcon}
                      alt=""
                      src={fLogoURI}
                    />
                    <div className={`font-medium ${stylesSwap.horiza}`}>
                      {fSymbol}
                    </div>
                    <img
                      className={stylesSwap.chevronDownIcon}
                      alt=""
                      src="/chevrondown.svg"
                    />
                  </div>
                  {/* <div className={stylesSwap.div1}>3859.042109</div> */}
                  <input
                    className={`[border:none] font-satoshi font-medium  text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
                      isFromLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
                        : ''
                    }`}
                    type="text"
                    pattern="[0-9]*.[0-9]*"
                    placeholder={isFromLoading ? '' : '0.0'}
                    value={isFromLoading ? '' : `${fValue}`}
                    onChange={onFromValueChanged}
                  />
                </div>
                {/* <div className={stylesSwap.balance0Parent}>
                <div className={stylesSwap.balance0}>Balance: 0</div>
                <div className={stylesSwap.txCost}>~$1432.54</div>
              </div> */}
                <div className={stylesSwap.balance0Parent}>
                  {/* <div className={stylesSwap.transactionDetails}>Balance: 0</div> */}
                  <div
                    className={`${stylesSwap.balance0} ${
                      isFromLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                        : ''
                    }`}
                  >
                    {isFromLoading
                      ? ''
                      : `Balance: ${fromBalance.toString() || ''}`}
                  </div>
                  {/* <div className={stylesSwap.txCost}>~$1432.54</div> */}
                  <div className={stylesSwap.txCost}>
                    {isFromLoading
                      ? ''
                      : `~$${
                          fromPriceData
                            ? new Intl.NumberFormat().format(
                                fromPriceData?.totalFromPrice
                              )
                            : ''
                        }`}
                  </div>
                </div>
              </div>
              <div className={stylesSwap.frameParent3}>
                <div
                  className={`cursor-pointer ${stylesSwap.wrapper} ${
                    fromBalancePercent === 25
                      ? `bg-surface-tint-16-d`
                      : `bg-surface-tint-d-8`
                  }`}
                >
                  <div
                    className={`${stylesSwap.txCost} ${
                      fromBalancePercent === 25
                        ? `text-text-1-d`
                        : `text-text-2-d`
                    }`}
                    onClick={() => {
                      let newValue = 0.25 * fromBalance;
                      setFromValue(newValue);
                      setFromBalancePercent(25);
                    }}
                  >
                    25%
                  </div>
                </div>
                <div
                  className={`cursor-pointer ${stylesSwap.wrapper} ${
                    fromBalancePercent === 50
                      ? `bg-surface-tint-16-d`
                      : `bg-surface-tint-d-8`
                  }`}
                >
                  <div
                    className={`${stylesSwap.txCost} ${
                      fromBalancePercent === 50
                        ? `text-text-1-d`
                        : `text-text-2-d`
                    }`}
                    onClick={() => {
                      let newValue = 0.5 * fromBalance;
                      setFromValue(newValue);
                      setFromBalancePercent(50);
                    }}
                  >
                    50%
                  </div>
                </div>
                <div
                  className={`cursor-pointer ${stylesSwap.wrapper} ${
                    fromBalancePercent === 75
                      ? `bg-surface-tint-16-d`
                      : `bg-surface-tint-d-8`
                  }`}
                >
                  <div
                    className={`${stylesSwap.txCost} ${
                      fromBalancePercent === 75
                        ? `text-text-1-d`
                        : `text-text-2-d`
                    }`}
                    onClick={() => {
                      let newValue = 0.75 * fromBalance;
                      setFromValue(newValue);
                      setFromBalancePercent(75);
                    }}
                  >
                    75%
                  </div>
                </div>
                <div
                  className={`cursor-pointer ${stylesSwap.wrapper} ${
                    fromBalancePercent === 100
                      ? `bg-surface-tint-16-d`
                      : `bg-surface-tint-d-8`
                  }`}
                >
                  <div
                    className={`${stylesSwap.txCost} ${
                      fromBalancePercent === 100
                        ? `text-text-1-d`
                        : `text-text-2-d`
                    }`}
                    onClick={() => {
                      let newValue = 1 * fromBalance;
                      setFromValue(newValue);
                      setFromBalancePercent(100);
                    }}
                  >
                    100%
                  </div>
                </div>
              </div>
            </div>
            <div className={stylesSwap.frameParent4}>
              <div className={stylesSwap.parent}>
                {/* <b className={stylesSwap.b}>􀅈</b> */}
                <img
                  className="relative w-5 h-5 shrink-0 overflow-hidden"
                  alt=""
                  src="/processBar.svg"
                />
                {/* <b className={stylesSwap.eth167771}>1 ETH = 1677.71 USDT</b> */}
                <b
                  className={`${stylesSwap.eth167771} ${
                    isToLoading
                      ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                      : ''
                  }`}
                >
                  {isToLoading
                    ? ''
                    : `${`1 ${fSymbol} = ${
                        userPricesL ? userPricesL?.exchangeRate : '---'
                      }  ${tSymbol}`}`}
                </b>
              </div>
              <div
                className={`cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-180 ${stylesSwap.arrowDownWrapper}`}
                onClick={swapTokensPosition}
              >
                <img
                  className={stylesSwap.arrowDownIcon}
                  alt=""
                  src="/arrowdown.svg"
                />
              </div>
            </div>
            <div className={stylesSwap.frameWrapper}>
              <div className={stylesSwap.frameParent1}>
                <div className={stylesSwap.frameParent2}>
                  <div
                    className={`cursor-pointer ${stylesSwap.protocolIconGroup}`}
                    onClick={() => setIsToTokenPage(true)}
                  >
                    <img
                      className={stylesSwap.walletIcon}
                      alt=""
                      src={tLogoURI}
                    />
                    <div className={`font-medium ${stylesSwap.horiza}`}>
                      {tSymbol}
                    </div>
                    <img
                      className={stylesSwap.chevronDownIcon}
                      alt=""
                      src="/chevrondown.svg"
                    />
                  </div>
                  {/* <div className={stylesSwap.div1}>3859.042109</div> */}
                  <input
                    className={`[border:none] font-satoshi font-medium text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
                      isToLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
                        : ''
                    }`}
                    type="text"
                    pattern="[0-9]*.[0-9]*"
                    placeholder={isToLoading ? '' : '0.0'}
                    // value={isToLoading ? '' : `${tValue}`}
                    // value={
                    //   (isToLoading && '') ||
                    //   (tValue && `${new Intl.NumberFormat().format(tValue)}`)
                    // }
                    value={(isToLoading && '') || (tValue && `${toInput}`)}
                    disabled={true}
                  />
                </div>
                <div className={stylesSwap.balance0Parent}>
                  <div
                    className={`${stylesSwap.balance0} ${
                      isToLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                        : ''
                    }`}
                  >
                    {isToLoading
                      ? ''
                      : `Balance: ${toBalance.toString() || ''}`}
                  </div>
                  {/* {isPriceDeviation ? (
                    <div
                      className={`${stylesSwap.txCost} ${
                        isToLoading
                          ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                          : ''
                      }`}
                    >
                      {isToLoading
                        ? ''
                        : `~$${
                            userPricesL
                              ? Number(userPricesL?.toPrice) * Number(tValue)
                              : ''
                          } (${priceDeviation ? priceDeviation : ''}%)`}
                    </div>
                  ) : (
                    <div
                      className={`${stylesSwap.txCost} ${
                        isToLoading
                          ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                          : ''
                      }`}
                    >
                      {isToLoading
                        ? ''
                        : `~$${
                            userPricesL
                              ? Number(userPricesL?.toPrice) * Number(tValue)
                              : ''
                          }`}
                    </div>
                  )} */}
                  <div className={stylesSwap.txCost}>
                    {isToLoading
                      ? ''
                      : `~$${
                          fromPriceData
                            ? new Intl.NumberFormat().format(
                                fromPriceData?.totalFromPrice
                              )
                            : ''
                        }`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={stylesSwap.frameParent7}>
        <div className={stylesSwap.txCostParent}>
          <div className={stylesSwap.txCost}>Tx cost</div>
          <div className={stylesSwap.div9}>$6.65</div>
        </div>
        <img
          className={stylesSwap.chevronDownIcon}
          alt=""
          src="/chevrondown.svg"
        />
      </div>
      <div className={stylesSwap.connectWalletWrapper}>
        <div className={stylesSwap.connectWallet}>Connect Wallet</div>
      </div> */}
          {/* //============================================================ */}
          {!isConnected && isTxValue ? (
            <>
              <div className={stylesSwapDetail.frameParent7}>
                <div className={stylesSwapDetail.transactionDetailsParent}>
                  <div className={stylesSwapDetail.transactionDetails}>
                    Transaction details
                  </div>
                  <img
                    className={stylesSwapDetail.chevronDownIcon}
                    onClick={() => {
                      setIsTxValue(false);
                    }}
                    alt=""
                    src="/chevronup.svg"
                  />
                </div>
                <div className={stylesSwapDetail.usdtPriceParent}>
                  <div className={stylesSwapDetail.usdtPrice}>
                    1 {fSymbol} price
                  </div>
                  <div
                    className={`${stylesSwapDetail.div9} ${
                      isFromLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                        : ''
                    }`}
                  >
                    {/* ~${fromPriceData ? fromPriceData?.fromPrice : ''} */}{' '}
                    {isFromLoading
                      ? ''
                      : `~$${fromPriceData ? fromPriceData?.fromPrice : ''}`}
                  </div>
                </div>
                <div className={stylesSwapDetail.usdtPriceParent}>
                  <div className={stylesSwapDetail.usdtPrice}>
                    1 {tSymbol} price
                  </div>
                  <div
                    className={`${stylesSwapDetail.div9} ${
                      isToLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                        : ''
                    }`}
                  >
                    {/* ~${userPricesL ? userPricesL?.toPrice : ''} */}{' '}
                    {isToLoading
                      ? ''
                      : `~$${userPricesL ? userPricesL?.toPrice : ''}`}
                  </div>
                </div>
                <div className={stylesSwapDetail.usdtPriceParent}>
                  <div className={stylesSwapDetail.txCost}>Tx cost</div>
                  {/* <div className={stylesSwapDetail.div9}>$6.65</div> */}
                  <div
                    className={`${stylesSwapDetail.div9} ${
                      isToLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                        : ''
                    }`}
                  >
                    {' '}
                    {isToLoading
                      ? ''
                      : `${
                          userPricesL?.estimatedGas &&
                          (userPricesL?.estimatedGas / 10 ** 9).toString()
                        } Gwei`}
                  </div>
                </div>
              </div>
              <div
                className={`button_gradient cursor-pointer ${stylesSwapDetail.connectWalletWrapper}`}
                onClick={() => {
                  setIsConnecting(true);
                  dispatch(updateConnectedNetwork(true));
                }}
              >
                <div
                  className={`font-medium ${stylesSwapDetail.connectWallet}`}
                >
                  Connect Wallet
                </div>
              </div>
              {/* <div
                className={`cursor-pointer ${stylesSwapDetail.insufficientBalanceWrapper}`}
                onClick={() => {
                  setIsConnecting(true);
                  dispatch(updateConnectedNetwork(true));
                }}
              >
                <div className={`font-medium ${stylesSwapDetail.insufficientBalance}`}>
                  insufficient balance
                </div>
              </div> */}
            </>
          ) : null}
          {!isConnected && !isTxValue ? (
            <>
              <div
                className={stylesSwapTx.frameParent7}
                onClick={() => {
                  setIsTxValue(true);
                }}
              >
                <div className={stylesSwapTx.txCostParent}>
                  <div className={stylesSwapTx.txCost}>Tx cost</div>
                  {/* <div className={stylesSwapTx.div9}>$6.65</div> */}
                  <div
                    className={`${stylesSwapTx.div9} ${
                      isToLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                        : ''
                    }`}
                  >
                    {' '}
                    {isToLoading
                      ? ''
                      : `${
                          userPricesL?.estimatedGas &&
                          (userPricesL?.estimatedGas / 10 ** 9).toString()
                        } Gwei`}
                  </div>
                </div>
                <img
                  className={stylesSwapTx.chevronDownIcon}
                  alt=""
                  src="/chevrondown.svg"
                />
              </div>
              <div
                className={`button_gradient cursor-pointer ${stylesSwapTx.connectWalletWrapper}`}
                onClick={() => {
                  setIsConnecting(true);
                  dispatch(updateConnectedNetwork(true));
                }}
              >
                <div className={`font-medium ${stylesSwapTx.connectWallet}`}>
                  Connect Wallet
                </div>
              </div>
            </>
          ) : null}
          {isConnected && !isCaution ? (
            <>
              {validationOwner === true && (
                // <button
                //   className="cursor-pointer [border:none] py-3 px-10 bg-[transparent] self-stretch rounded-xl overflow-hidden flex flex-row items-center justify-center button_gradient"
                //   disabled={fValue === 0 ? true : false}
                //   onClick={() => swapToken()}
                // >
                //   <div className="relative text-lg tracking-[0.02em] leading-[24px] font-text-16-md text-text-1-d text-left">
                //     Swap
                //   </div>
                // </button>

                <div
                  className={`button_gradient cursor-pointer ${stylesSwapDetail.connectWalletWrapper}`}
                  disabled={fValue === 0 ? true : false}
                  onClick={() => swapToken()}
                >
                  <div
                    className={`font-medium ${stylesSwapDetail.connectWallet}`}
                  >
                    Swap
                  </div>
                </div>
              )}
            </>
          ) : null}
          {isConnected && isCaution ? (
            <>
              <button className={styles.insufficientBalanceWrapper}>
                <div className={styles.insufficientBalance}>{info}</div>
              </button>
            </>
          ) : null}
          {isConnected && isPriceDeviation ? (
            <>
              {/* <div className={styles.connectWalletWrapper}>
      <div className={styles.connectWallet}>Connect Wallet</div>
    </div> */}
              <div
                className={`button_gradient cursor-pointer ${stylesSwapTx.connectWalletWrapper}`}
                onClick={() => {
                  setIsConnecting(true);
                  dispatch(updateConnectedNetwork(true));
                }}
              >
                <div className={`font-medium ${stylesSwapTx.connectWallet}`}>
                  Connect Wallet
                </div>
              </div>
              <div className={styles?.priceDeviation1373LargeWrapper}>
                <div className={styles?.priceDeviation1373}>
                  {` Price Deviation ${priceDeviationPercentage}%. Large price deviation means that you will
              likely trade at a worse price.`}
                </div>
              </div>
            </>
          ) : null}
          {isConnected ? (
            <div className="self-stretch flex flex-col py-0 px-2 items-start justify-start gap-[8px] text-text-1-48-d">
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
                <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                  Tx cost
                </div>
                <div
                  className={`flex-1 relative tracking-[0.02em] leading-[20px] font-medium text-right ${
                    isToLoading
                      ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                      : ''
                  }`}
                >
                  {isToLoading
                    ? ''
                    : `${
                        userPricesL?.estimatedGas &&
                        (userPricesL?.estimatedGas / 10 ** 9).toString()
                      } Gwei`}
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
                <button
                  className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-sm tracking-[0.02em] leading-[20px] font-medium font-text-16-md text-text-1-48-d text-left inline-block"
                  onClick={() => setIsRouting((prev) => !prev)}
                >
                  Route
                </button>
                <div className="flex-1 flex flex-row items-center justify-end gap-[4px]">
                  <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                    {fSymbol}
                  </div>
                  <img
                    className="relative w-3 h-3 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright.svg"
                  />
                  <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                    {tSymbol}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* FROM TOKEN COMPONENT: PART THREE */}
      {isChainModalVisible === false &&
      isFromTokenPage === true &&
      isToTokenPage === false &&
      isSlippagePage === false &&
      isConnecting === false ? (
        <div className={stylesFromToken.inner1}>
        {/* <div className={stylesSwap.frameGroup}> */}
          <div className={stylesFromToken.frameParent7}>
            <div className={stylesFromToken.selectATokenParent}>
              <div className={stylesFromToken.selectAToken}>Select a token</div>
              className=
              {`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
              <img
                className={stylesFromToken.arrowDownIcon}
                onClick={() => setIsFromTokenPage(false)}
                alt=""
                src="/xclose1.svg"
              />
            </div>
          </div>
          <div className={stylesFromToken.frameChild} />
          {/* <div className={stylesFromToken.searchMdParent}>
        <img className={stylesFromToken.arrowDownIcon} alt="" src="/searchmd.svg" />
        <div className={stylesFromToken.searchByName}>
          Search by name or paste address
        </div>
      </div> */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/searchmd.svg"
              />
            </div>
            <input
              type="search"
              id="search"
              className="[border:none] block p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-surface-tint-d-8 w-[432px] text-secondaryFillDim"
              placeholder="Search by name or paste address"
              onChange={(e) => {
                if (e.target.value === '') {
                  setFilteredfTokens(allTokens);
                  return;
                }
                let ffToken = allTokens.filter(({ symbol }) => {
                  return symbol
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                });
                if (ffToken !== null) {
                  setFilteredfTokens(ffToken);
                }
              }}
            />
          </div>
          <div className={stylesFromToken.frameParent8}>
            {favoriteTokens?.map((token, idx) => (
              <div
                key={idx}
                className={`cursor-pointer hover:bg-secondaryFill ${
                  stylesFromToken.protocolIconGroup
                } ${token?.name === fTokenL?.name && 'bg-secondaryFill'}`}
                onClick={() => {
                  setFromToken(token);
                  setIsFromTokenChange(true);
                  setIsFromTokenPage(false);
                }}
              >
                <img
                  className={stylesFromToken.protocolIcon}
                  alt=""
                  src={token?.logoURI}
                />
                <div className={stylesFromToken.searchByName}>
                  {token?.symbol}
                </div>
              </div>
            ))}
          </div>
          <div className={stylesFromToken.frameChild} />

          <div
            className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent9}`}
          >
            <div className={stylesFromToken.frameParent10}>
              {filteredfTokens?.map((token, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer ${stylesFromToken.mdImageContainer} hover:bg-secondaryFill`}
                  onClick={() => {
                    setFromToken(token);
                    setIsFromTokenChange(true);
                    setIsFromTokenPage(false);
                  }}
                >
                  <img
                    className={stylesFromToken.protocolIcon3}
                    alt=""
                    src={token?.logoURI}
                  />
                  <div className={stylesFromToken.ethereumParent}>
                    <div className={stylesFromToken.ethereum}>
                      {token?.name}
                    </div>
                    {/* <div className={stylesFromToken.ethereum}>
                      {token?.name}
                    </div> */}
                    <div className={stylesFromToken.eth3}>{token?.symbol}</div>
                  </div>
                  <span className="justify-start items-start mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#9D9DA3"
                      className={`w-5 h-5 hover:stroke-infoText active:fill-infoText ${
                        token?.name === fTokenL?.name
                          ? 'stroke-infoText'
                          : 'stroke-secondaryText'
                      } ${token?.name === fTokenL?.name && 'fill-infoText'}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </span>
                </div>
              ))}
            </div>

            {/* <div className={stylesFromToken.scrollbar}>
              <div className={stylesFromToken.scrollbarChild} />
            </div> */}
          </div>
        </div>
      ) : null}

      {/* To TOKEN COMPONENT: PART THREE */}
      {isChainModalVisible === false &&
      isFromTokenPage === false &&
      isToTokenPage === true &&
      isSlippagePage === false &&
      isConnecting === false ? (
        <div className={stylesFromToken.inner1}>
          <div className={stylesFromToken.frameParent7}>
            <div className={stylesFromToken.selectATokenParent}>
              <div className={stylesFromToken.selectAToken}>Select a token</div>
              className=
              {`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
              <img
                className={stylesFromToken.arrowDownIcon}
                onClick={() => setIsToTokenPage(false)}
                alt=""
                src="/xclose1.svg"
              />
            </div>
          </div>
          <div className={stylesFromToken.frameChild} />
          {/* <div className={stylesFromToken.searchMdParent}>
          <img className={stylesFromToken.arrowDownIcon} alt="" src="/searchmd.svg" />
          <div className={stylesFromToken.searchByName}>
            Search by name or paste address
          </div>
        </div> */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/searchmd.svg"
              />
            </div>
            <input
              type="search"
              id="search"
              className="[border:none] block p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-surface-tint-d-8 w-[432px] text-secondaryFillDim"
              placeholder="Search by name or paste address"
              onChange={(e) => {
                if (e.target.value === '') {
                  setFilteredtTokens(allTokens);
                  return;
                }
                let ttToken = allTokens.filter(({ symbol }) => {
                  return symbol
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                });
                if (ttToken !== null) {
                  setFilteredtTokens(ttToken);
                }
              }}
            />
          </div>
          <div className={stylesFromToken.frameParent8}>
            {favoriteTokens?.map((token, idx) => (
              <div
                key={idx}
                className={`cursor-pointer hover:bg-secondaryFill ${
                  stylesFromToken.protocolIconGroup
                } ${token?.name === tTokenL?.name && 'bg-secondaryFill'}`}
                onClick={() => {
                  setToToken(token);
                  setIsToTokenChange(true);
                  setIsToTokenPage(false);
                }}
              >
                <img
                  className={stylesFromToken.protocolIcon}
                  alt=""
                  src={token?.logoURI}
                />
                <div className={stylesFromToken.searchByName}>
                  {token?.symbol}
                </div>
              </div>
            ))}
          </div>
          <div className={stylesFromToken.frameChild} />

          <div
            className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent9}`}
          >
            <div className={stylesFromToken.frameParent10}>
              {filteredfTokens?.map((token, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer ${stylesFromToken.mdImageContainer} hover:bg-secondaryFill`}
                  onClick={() => {
                    setToToken(token);
                    setIsToTokenChange(true);
                    setIsToTokenPage(false);
                  }}
                >
                  <img
                    className={stylesFromToken.protocolIcon3}
                    alt=""
                    src={token?.logoURI}
                  />
                  <div className={stylesFromToken.ethereumParent}>
                    <div className={stylesFromToken.ethereum}>
                      {token?.name}
                    </div>
                    {/* <div className={stylesFromToken.ethereum}>
                        {token?.name}
                      </div> */}
                    <div className={stylesFromToken.eth3}>{token?.symbol}</div>
                  </div>
                  <span className="justify-start items-start mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#9D9DA3"
                      className={`w-5 h-5 hover:stroke-infoText active:fill-infoText ${
                        token?.name === tTokenL?.name
                          ? 'stroke-infoText'
                          : 'stroke-secondaryText'
                      } ${token?.name === tTokenL?.name && 'fill-infoText'}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </span>
                </div>
              ))}
            </div>

            {/* <div className={stylesFromToken.scrollbar}>
                <div className={stylesFromToken.scrollbarChild} />
              </div> */}
          </div>
        </div>
      ) : null}

      {/* MANAGE TOKEN COMPONENT: PART THREE */}
      {/* {isChainModalVisible === false &&
      isFromTokenPage === false &&
      isToTokenPage === true &&
      isSlippagePage === false &&
      isConnecting === false ? (
        <div className={stylesManageToken.inner1}>
          <div className={stylesManageToken.frameParent7}>
            <div className={stylesManageToken.iconButtonParent}>
              <div
                className={`cursor-pointer hover:bg-secondaryFillLight ${stylesManageToken.iconButton} `}
              >
                <img
                  className={stylesManageToken.arrowDownIcon}
                  onClick={() => setIsToTokenPage(false)}
                  alt=""
                  src="/chevronleft.svg"
                />
              </div>
              <div className={stylesManageToken.manage}>Manage</div>
              <div
                className={`cursor-pointer hover:bg-secondaryFillLight ${stylesManageToken.iconButton} `}
              >
                <img
                  className={stylesManageToken.arrowDownIcon}
                  onClick={() => setIsToTokenPage(false)}
                  alt=""
                  src="/xclose1.svg"
                />
              </div>
            </div>
            <div className={stylesManageToken.frameChild} />
            <div className="relative">
              <input
                type="search"
                id="search"
                className="[border:none] block p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-surface-tint-d-8 w-[432px] text-secondaryFillDim"
                placeholder="Address"
                onChange={(e) => {
                  if (e.target.value === '') {
                    setFilteredtTokens(allTokens);
                    return;
                  }
                  let ttToken = allTokens.filter(({ symbol }) => {
                    return symbol
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase());
                  });
                  if (ttToken !== null) {
                    setFilteredtTokens(ttToken);
                  }
                }}
              />
            </div>
            <div className={stylesManageToken.customTokensParent}>
              <div className={stylesManageToken.customTokens}>
                Custom tokens
              </div>
              <div className={stylesManageToken.frameParent8}>
                <div
                  className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent9}`}
                >
                  <div className={stylesFromToken.frameParent10}>
                    {filteredfTokens?.map((token, idx) => (
                      <div
                        key={idx}
                        className={`cursor-pointer ${stylesFromToken.mdImageContainer} hover:bg-secondaryFill`}
                        onClick={() => {
                          setToToken(token);
                          setIsToTokenChange(true);
                          setIsToTokenPage(false);
                        }}
                      >
                        <img
                          className={stylesFromToken.protocolIcon3}
                          alt=""
                          src={token?.logoURI}
                        />
                        <div className={stylesFromToken.ethereumParent}>
                          <div className={stylesFromToken.ethereum}>
                            {token?.name}
                          </div>
                          <div className={stylesFromToken.eth3}>
                            {token?.symbol}
                          </div>
                        </div>
                        <span className="justify-start items-start mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#9D9DA3"
                            className={`w-5 h-5 hover:stroke-infoText active:fill-infoText ${
                              token?.name === tTokenL?.name
                                ? 'stroke-infoText'
                                : 'stroke-secondaryText'
                            } ${
                              token?.name === tTokenL?.name && 'fill-infoText'
                            }`}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                            />
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={stylesManageToken.scrollbar}>
                  <div className={stylesManageToken.scrollbarChild} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}
      {/* ============================{Slippage}=============================== */}
      {isChainModalVisible === false &&
      isFromTokenPage === false &&
      isToTokenPage === false &&
      isSlippagePage === true &&
      isConnecting === false ? (
        <>
          <div className={stylesWarningSlippage.inner1}>
            <div className={stylesWarningSlippage.frameParent7}>
              <div className={stylesWarningSlippage.iconButtonParent}>
                <div
                  className={stylesWarningSlippage.iconButton}
                  onClick={() => {
                    setIsCustom(false);
                    setIsSlippagePage(false);
                  }}
                >
                  <img
                    className={stylesWarningSlippage.arrowDownIcon}
                    alt=""
                    src="/chevronleft.svg"
                  />
                </div>
                <div className={stylesWarningSlippage.swapSettings}>
                  Swap settings
                </div>
                <div className={stylesWarningSlippage.iconButton1}>
                  <img className={stylesWarningSlippage.arrowDownIcon} alt="" />
                </div>
              </div>
              <div className={stylesWarningSlippage.frameChild} />
              <div className={stylesWarningSlippage.transactionDeadlineParent}>
                <div className={stylesWarningSlippage.slippageToleranceParent}>
                  <div className={stylesWarningSlippage.slippageTolerance}>
                    Slippage tolerance
                  </div>
                  {isSlippageAuto && !isWarning && !isLowSlippage ? (
                    <div className={stylesSlippage.autoWrapper}>
                      <div className={stylesSlippage.auto}>Auto</div>
                    </div>
                  ) : null}
                  {!isSlippageAuto && !isWarning && !isLowSlippage ? (
                    <div className={stylesSlippage.autoWrapper}>
                      <div className={stylesSlippage.auto}>{slippage}%</div>
                    </div>
                  ) : null}
                  {!isSlippageAuto && isWarning && !isLowSlippage ? (
                    <div className={stylesWarningSlippage.alertCircleParent}>
                      <img
                        className={stylesWarningSlippage.arrowDownIcon}
                        alt=""
                        src="/alertcircle1.svg"
                      />
                      <div className={stylesWarningSlippage.custom}>
                        {slippage}% Custom
                      </div>
                    </div>
                  ) : null}
                  {!isSlippageAuto && !isWarning && isLowSlippage ? (
                    <div className={stylesLowSlippage.alertTriangleParent}>
                      <img
                        className={stylesLowSlippage.arrowDownIcon}
                        alt=""
                        src="/alerttriangle1.svg"
                      />
                      <div className={stylesLowSlippage.custom}>
                        {slippage}%
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* first Approach with auto state */}
                <div className={stylesSlippage.frameParent8}>
                  {isSlippageAuto ? (
                    <div className={stylesSlippage.autoWrapper}>
                      <div className={stylesSlippage.auto}>Auto</div>
                    </div>
                  ) : (
                    <div className={stylesSlippage.autoWrapper2}>
                      <div
                        className={`${stylesSlippage.auto} text-[#B27CFF]`}
                        onClick={() => {
                          dispatch(updateSlippage('0.7'));
                          setSlippage('0.7');
                          setIsSlippageChange(true);
                          setIsSlippageAuto(true);
                          setIsCustom(false);
                        }}
                      >
                        Auto
                      </div>
                    </div>
                  )}

                  <div className={stylesSlippage.frameParent9}>
                    <div
                      className={`${stylesSlippage.wrapper3} ${
                        slippage === '0.1'
                          ? 'rounded-2xl bg-surface-tint-16-d'
                          : 'rounded-2xl'
                      }`}
                    >
                      <div
                        className={stylesSlippage.auto}
                        onClick={() => {
                          dispatch(updateSlippage('0.1'));
                          setSlippage('0.1');
                          setIsSlippageChange(true);
                          setIsSlippageAuto(false);
                          setIsCustom(false);
                        }}
                      >
                        0.1%
                      </div>
                    </div>
                    <div
                      className={`${stylesSlippage.wrapper3} ${
                        slippage === '0.5'
                          ? 'rounded-2xl bg-surface-tint-16-d'
                          : 'rounded-2xl'
                      }`}
                    >
                      <div
                        className={stylesSlippage.auto}
                        onClick={() => {
                          dispatch(updateSlippage('0.5'));
                          setSlippage('0.5');
                          setIsSlippageChange(true);
                          setIsSlippageAuto(false);
                          setIsCustom(false);
                        }}
                      >
                        0.5%
                      </div>
                    </div>
                    {/* <div
                    className={`${stylesSlippage.wrapper3} ${
                      slippage === '1'
                        ? 'rounded-2xl bg-surface-tint-16-d'
                        : 'rounded-2xl'
                    }`}
                  >
                    <div
                      className={stylesSlippage.auto}
                      onClick={() => {
                        dispatch(updateSlippage('1'));
                        setSlippage('1');
                        setIsSlippageChange(true);
                        setIsSlippageAuto(false);
                        setIsCustom(false);
                      }}
                    >
                      1%
                    </div>
                  </div> */}
                    {isCustom === true ? (
                      <div className="flex">
                        <div className="flex object-contain ml-2">
                          <input
                            type="text"
                            placeholder="custom"
                            className="ml-2 py-1.5 rounded-lg w-[70px] object-contain
                active:bg-black active:text-primaryText bg-transparent text-secondaryText
                border border-secondaryFillLight hover:border-secondaryText"
                            value={customSlippage}
                            onChange={(e) => {
                              setCustomSlippage(e.target.value);
                              setSlippage(e.target.value);
                              dispatch(updateSlippage(e.target.value));
                              setIsSlippageChange(true);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`${stylesSlippage.customParent} ${
                          slippage === 'custom'
                            ? 'rounded-2xl bg-surface-tint-16-d'
                            : 'rounded-2xl'
                        }`}
                      >
                        <div
                          className={stylesSlippage.auto}
                          onClick={() => setIsCustom(true)}
                        >
                          Custom
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Second Approach without auto state */}
                {/* <div className={stylesLowSlippage.frameParent9}>
          <div
            className={`${stylesLowSlippage.wrapper3} ${
              slippage === '0.1'
                ? 'rounded-2xl bg-surface-tint-16-d'
                : 'rounded-2xl'
            }`}
          >
            <div
              className={stylesLowSlippage.auto}
              onClick={() => {
                dispatch(updateSlippage('0.1'));
                setSlippage('0.1');
                setIsSlippageChange(true);
                setIsSlippageAuto(false);
                setIsCustom(false);
              }}
            >
              0.1%
            </div>
          </div>
          <div
            className={`${stylesLowSlippage.wrapper3} ${
              slippage === '0.5'
                ? 'rounded-2xl bg-surface-tint-16-d'
                : 'rounded-2xl'
            }`}
          >
            <div
              className={stylesLowSlippage.auto}
              onClick={() => {
                dispatch(updateSlippage('0.5'));
                setSlippage('0.5');
                setIsSlippageChange(true);
                setIsSlippageAuto(false);
                setIsCustom(false);
              }}
            >
              0.5%
            </div>
          </div>
          <div
            className={`${stylesLowSlippage.wrapper3} ${
              slippage === '1'
                ? 'rounded-2xl bg-surface-tint-16-d'
                : 'rounded-2xl'
            }`}
          >
            <div
              className={stylesLowSlippage.auto}
              onClick={() => {
                dispatch(updateSlippage('1'));
                setSlippage('1');
                setIsSlippageChange(true);
                setIsSlippageAuto(false);
                setIsCustom(false);
              }}
            >
              1%
            </div>
          </div>
          {isCustom === true ? (
            <div className="flex">
              <div className="flex object-contain ml-2">
                <input
                  type="text"
                  placeholder="custom"
                  className="ml-2 py-1.5 rounded-lg w-[70px] object-contain
                active:bg-black active:text-primaryText bg-transparent text-secondaryText
                border border-secondaryFillLight hover:border-secondaryText"
                  value={customSlippage}
                  onChange={(e) => {
                    setCustomSlippage(e.target.value);
                    setSlippage(e.target.value);
                    dispatch(updateSlippage(e.target.value));
                    setIsSlippageChange(true);
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              className={`${stylesLowSlippage.customParent} ${
                slippage === 'custom'
                  ? 'rounded-2xl bg-surface-tint-16-d'
                  : 'rounded-2xl'
              }`}
            >
              <div
                className={stylesLowSlippage.auto}
                onClick={() => setIsCustom(true)}
              >
                Custom
              </div>
            </div>
          )}
        </div> */}
              </div>
              {isLowSlippage && (
                <div
                  className={
                    stylesLowSlippage.transactionWithExtremelyLowWrapper
                  }
                >
                  <div className={stylesLowSlippage.slippageTolerance}>
                    Transaction with extremely low slippage tolerance might be
                    reverted because of very small market movement
                  </div>
                </div>
              )}
              {isWarning && (
                <div
                  className={
                    stylesWarningSlippage.youMayReceive12LessWithWrapper
                  }
                >
                  <div className={stylesWarningSlippage.slippageTolerance}>
                    {`You may receive ${slippage}% less with this level of slippage tolerance`}
                  </div>
                </div>
              )}

              <div className={stylesWarningSlippage.frameChild} />
              <div className={stylesWarningSlippage.slippageToleranceParent}>
                <div className={stylesWarningSlippage.slippageTolerance}>
                  Transaction deadline
                </div>
                <div className={stylesWarningSlippage.frameParent10}>
                  <div className={stylesWarningSlippage.wrapper6}>
                    <div className={stylesWarningSlippage.auto}>20</div>
                  </div>
                  <div className={stylesWarningSlippage.minutes}>minutes</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* {isChainModalVisible === false &&
      isFromTokenPage === false &&
      isToTokenPage === false &&
      isSlippagePage === true &&
      isConnecting === false ? (
        <>
          <Modal visible={true}>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className={stylesSlippage.iconButton}
                  onClick={() => {
                    setIsCustom(false);
                    setIsSlippagePage(false);
                  }}
                >
                  <img
                    className={stylesSlippage.chevronLeftIcon}
                    alt=""
                    src="/chevronleft.svg"
                  />
                </div>
                <div className={stylesSlippage.swapSettings}>Swap settings</div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.frameDiv}>
                <div className={stylesSlippage.slippageToleranceParent}>
                  <div className={stylesSlippage.slippageTolerance}>
                    Slippage tolerance
                  </div>
                  {isSlippageAuto && !isWarning && !isLowSlippage ? (
                    <div className={stylesSlippage.autoWrapper}>
                      <div className={stylesSlippage.ethereum}>Auto</div>
                    </div>
                  ) : null}
                  {!isSlippageAuto && !isWarning && !isLowSlippage ? (
                    <div className={stylesSlippage.autoWrapper}>
                      <div className={stylesSlippage.ethereum}>{slippage}%</div>
                    </div>
                  ) : null}
                  {!isSlippageAuto && isWarning && !isLowSlippage ? (
                    <div className={stylesSlippage.alertCircleParent}>
                      <img
                        className={stylesSlippage.chevronLeftIcon}
                        alt=""
                        src="/alertcircle1.svg"
                      />
                      <div className={stylesSlippage.ethereum}>
                        {slippage}% Custom
                      </div>
                    </div>
                  ) : null}
                  {!isSlippageAuto && !isWarning && isLowSlippage ? (
                    <div className={stylesSlippage.alertCircleParent}>
                      <img
                        className={stylesSlippage.chevronLeftIcon}
                        alt=""
                        src="/alerttriangle1.svg"
                      />
                      <div className={stylesSlippage.ethereum}>{slippage}%</div>
                    </div>
                  ) : null}
                </div>
                <div className={stylesSlippage.frameParent1}>
                  {isSlippageAuto ? (
                    <div className={stylesSlippage.autoContainer}>
                      <div className={stylesSlippage.ethereum}>Auto</div>
                    </div>
                  ) : (
                    <div className={stylesSlippage.autoWrapper2}>
                      <div
                        className={`${stylesSlippage.ethereum} text-[#B27CFF]`}
                        onClick={() => {
                          dispatch(updateSlippage('0.7'));
                          setSlippage('0.7');
                          setIsSlippageChange(true);
                          setIsSlippageAuto(true);
                          setIsCustom(false);
                        }}
                      >
                        Auto
                      </div>
                    </div>
                  )}

                  <div className={stylesSlippage.frameParent2}>
                    <div
                      className={`${stylesSlippage.wrapper} ${
                        slippage === '0.1'
                          ? 'rounded-2xl bg-surface-tint-16-d'
                          : 'rounded-2xl'
                      }`}
                    >
                      <div
                        className={stylesSlippage.ethereum}
                        onClick={() => {
                          dispatch(updateSlippage('0.1'));
                          setSlippage('0.1');
                          setIsSlippageChange(true);
                          setIsSlippageAuto(false);
                          setIsCustom(false);
                        }}
                      >
                        0.1%
                      </div>
                    </div>
                    <div
                      className={`${stylesSlippage.container} ${
                        slippage === '0.5'
                          ? 'rounded-2xl bg-surface-tint-16-d'
                          : 'rounded-2xl'
                      }`}
                    >
                      <div
                        className={stylesSlippage.ethereum}
                        onClick={() => {
                          dispatch(updateSlippage('0.5'));
                          setSlippage('0.5');
                          setIsSlippageChange(true);
                          setIsSlippageAuto(false);
                          setIsCustom(false);
                        }}
                      >
                        0.5%
                      </div>
                    </div>
                    <div
                      className={`${stylesSlippage.container} ${
                        slippage === '1'
                          ? 'rounded-2xl bg-surface-tint-16-d'
                          : 'rounded-2xl'
                      }`}
                    >
                      <div
                        className={stylesSlippage.ethereum}
                        onClick={() => {
                          dispatch(updateSlippage('1'));
                          setSlippage('1');
                          setIsSlippageChange(true);
                          setIsSlippageAuto(false);
                          setIsCustom(false);
                        }}
                      >
                        1%
                      </div>
                    </div>
                    {isCustom === true ? (
                      <div className="flex">
                        <div className="flex object-contain ml-2">
                          <input
                            type="text"
                            placeholder="custom"
                            className="ml-2 py-1.5 rounded-lg w-[70px] object-contain
                active:bg-black active:text-primaryText bg-transparent text-secondaryText
                border border-secondaryFillLight hover:border-secondaryText"
                            value={customSlippage}
                            onChange={(e) => {
                              setCustomSlippage(e.target.value);
                              setSlippage(e.target.value);
                              dispatch(updateSlippage(e.target.value));
                              setIsSlippageChange(true);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`${stylesSlippage.customWrapper} ${
                          slippage === 'custom'
                            ? 'rounded-2xl bg-surface-tint-16-d'
                            : 'rounded-2xl'
                        }`}
                      >
                        <div
                          className={stylesSlippage.ethereum}
                          onClick={() => setIsCustom(true)}
                        >
                          Custom
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {isLowSlippage && (
                <div
                  className={stylesSlippage.transactionWithExtremelyLowWrapper}
                >
                  <div className={stylesSlippage.slippageTolerance}>
                    Transaction with extremely low slippage tolerance might be
                    reverted because of very small market movement
                  </div>
                </div>
              )}
              {isWarning && (
                <div className={stylesSlippage.youMayReceive12LessWithWrapper}>
                  <div className={stylesSlippage.slippageTolerance}>
                    {`You may receive ${slippage}% less with this level of slippage tolerance`}
                  </div>
                </div>
              )}

              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.frameDiv}>
                <div className={stylesSlippage.transactionDeadline}>
                  Transaction deadline
                </div>
                <div className={stylesSlippage.frameParent3}>
                  <div className={stylesSlippage.wrapper1}>
                    <div className={stylesSlippage.ethereum}>20</div>
                  </div>
                  <div className={stylesSlippage.minutes}>minutes</div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null} */}

      {/* =====================Information Desk============================= */}
      {/* Transaction sucessfull */}
      {isConnected === true &&
      isSwapSuccess === true &&
      isSwapError === false &&
      isApproveSuccess === false &&
      isApproveError === false ? (
        <>
          <Modal visible={true}>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className={stylesSlippage.iconButton}
                  onClick={() => {
                    setIsSwapSuccess(false);
                  }}
                >
                  <img
                    className={stylesSlippage.chevronLeftIcon}
                    alt=""
                    src="/chevronleft.svg"
                  />
                </div>
                <div className={stylesSlippage.swapSettings}>
                  Transaction Status
                </div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  Sucessful
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
                  onClick={() => {
                    setIsSwapSuccess(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}

      {/* Transaction unsucessfull */}
      {isConnected === true &&
      isSwapSuccess === false &&
      isSwapError === true &&
      isApproveSuccess === false &&
      isApproveError === false ? (
        <>
          <Modal visible={true}>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className={stylesSlippage.iconButton}
                  onClick={() => {
                    setIsSwapError(false);
                  }}
                >
                  <img
                    className={stylesSlippage.chevronLeftIcon}
                    alt=""
                    src="/chevronleft.svg"
                  />
                </div>
                <div className={stylesSlippage.swapSettings}>
                  Transaction Status
                </div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  Unsucessful
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
                  onClick={() => {
                    setIsSwapError(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}

      {/* Approval sucessfull */}
      {isConnected === true &&
      isSwapSuccess === false &&
      isSwapError === false &&
      isApproveSuccess === true &&
      isApproveError === false ? (
        <>
          <Modal visible={true}>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className={stylesSlippage.iconButton}
                  onClick={() => {
                    setIsApproveSuccess(false);
                  }}
                >
                  <img
                    className={stylesSlippage.chevronLeftIcon}
                    alt=""
                    src="/chevronleft.svg"
                  />
                </div>
                <div className={stylesSlippage.swapSettings}>
                  Approval Status
                </div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">Granted</div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
                  onClick={() => {
                    setIsApproveSuccess(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}

      {/* Approval unsucessfull */}
      {isConnected === true &&
      isSwapSuccess === false &&
      isSwapError === false &&
      isApproveSuccess === false &&
      isApproveError === true ? (
        <>
          <Modal visible={true}>
            <div className={stylesSlippage.frameContainer}>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className={stylesSlippage.iconButton}
                  onClick={() => {
                    setIsApproveError(false);
                  }}
                >
                  <img
                    className={stylesSlippage.chevronLeftIcon}
                    alt=""
                    src="/chevronleft.svg"
                  />
                </div>
                <div className={stylesSlippage.swapSettings}>
                  Approval Status
                </div>
                <div className={stylesSlippage.iconButton1}>
                  <img className={stylesSlippage.chevronLeftIcon} alt="" />
                </div>
              </div>
              <div className={stylesSlippage.frameChild} />
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div className="flex justify-center items-center">Denied</div>
              </div>
              <div className={stylesSlippage.iconButtonParent}>
                <div
                  className="cursor-pointer flex flex-row justify-center items-center w-[393px] h-[24px] px-[40px] py-[12px] rounded-xl bg-[#8D3DFF] text-white text-normal"
                  onClick={() => {
                    setIsApproveError(false);
                  }}
                >
                  Close
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}

      {/* Project 2 */}

      <>
        {/* <Modal visible={isConfirmation}>
          <>
            <section className="flex flex-col justify-center items-center gap-2 mb-8">
              <div className="border border-secondaryFillLight rounded-xl bg-primaryFill">
                <section className="w-fit h-fit flex flex-col gap-2 text-infoText/50">
                  <div className="flex flex-row gap-2 justify-center items-center bg-infoFill rounded-xl w-[432px] py-4 outline">
                    <div className="p-2 text-sm text-secondaryText flex flex-col">
                      <section className="flex flex-row  gap-[30px] mb-5 mt-4 ml-4 mr-4">
                        <span
                          className="px-1 py-1 bg-secondaryFill rounded-lg cursor-pointer border border-transparent hover:scale-110 ease-in duration-200"
                          onClick={() => {
                            setIsConfirmation(false);
                            setValidationOwner(false);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#FFFFFF"
                            className="w-5 h-5 stroke-secondaryText active:fill-infoText hover:stroke-infoText"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </span>
                        <div className="text-primaryText text-lg w-[312px] h-[28px] flex justify-center items-center">
                          Confirmation
                        </div>
                      </section>
                      <div className="border-b border-infoText/20 m-1"></div>
                      <section className="overflow-y-auto max-h-[320px] mb-5 ml-4 mt-4 mr-4 flex flex-row justify-between items-center">
                        <div className="flex flex-row w-[312px] gap-2">
                          <span className="py-1 text-sm justify-start items-start text-primaryText">
                            Network
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <ActiveChainComponent currentItem={chain} />
                        </div>
                      </section>
                      <div className="border-b border-infoText/20 m-1"></div>
                      <section className="flex flex-col gap-1 text-primaryText/50 mb-4 mt-4 ml-4 mr-4">
                        <div className="flex justify-between">
                          <span className="py-1 text-sm justify-start items-start text-primaryText">
                            Send:
                          </span>
                          <span
                            className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                          >
                            {fValue ? fValue : 0} {fSymbol}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="py-1 text-sm justify-start items-start text-primaryText">
                            Receive:
                          </span>
                          <span
                            className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                          >
                            {tValueFormatted ? tValueFormatted : 0} {tSymbol}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <div className="">
                            <span className="py-1 text-sm justify-start items-start text-primaryText">
                              Gas
                            </span>
                            <span className="ml-1 py-1 text-sm justify-start items-start text-secondaryText">
                              (estimate)
                            </span>
                            <span className="ml-1 py-1 text-sm justify-start items-start text-primaryText">
                              :
                            </span>
                          </div>

                          <span
                            className="px-2.5 py-1 cursor-pointer 
                    text-secondaryText"
                          >
                            {estimatedGas ? estimatedGas / 10 ** 9 : null} Gwei
                          </span>
                        </div>
                      </section>

                      <div className="border-b border-infoText/20 m-1"></div>

                      <section
                        className="overflow-y-auto py-4 max-h-[320px]  flex flex-row justify-between text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill hover:bg-infoFill
                  outline hover:outline-attentionText shadow-lg  w-[350px] mb-8 mt-4 ml-8 mr-4 hover:scale-105 ease-in duration-200 shadow-infoText/20"
                      >
                        {approvalStatus === 'yes' && (
                          <button
                            className="py-1 px-4 h-full w-full outline-none text-primaryText"
                            disabled={fValue === 0 ? true : false}
                            onClick={() => {
                              setIsConfirmation(false);
                              setApprovalStatus('pending');
                            }}
                          >
                            Return
                          </button>
                        )}
                        {approvalStatus === 'no' && (
                          <button
                            className="py-1 px-4 h-full w-full outline-none text-primaryText"
                            disabled={fValue === 0 ? true : false}
                            onClick={() => {
                              setIsConfirmation(false);
                              setApprovalStatus('pending');
                            }}
                          >
                            Return
                          </button>
                        )}
                        {approvalStatus === 'pending' && (
                          <button
                            className="py-1 px-4 h-full w-full outline-none text-primaryText"
                            disabled={fValue === 0 ? true : false}
                            onClick={() => {
                              swapToken();
                            }}
                          >
                            Swap Now!
                          </button>
                        )}
                        {approvalStatus === 'not required' && (
                          <button
                            className="py-1 px-4 h-full w-full outline-none text-primaryText"
                            disabled={fValue === 0 ? true : false}
                            onClick={() => {
                              setIsConfirmation(false);
                              setApprovalStatus('pending');
                            }}
                          >
                            Return
                          </button>
                        )}
                      </section>
                      <section
                        className="py-2 mb-2 ml-4 mr-4 flex flex-row text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill
                  shadow-lg"
                      >
                        <div className="text-xs flex flex-row justify-center items-center ml-4">
                          Please note that Gas prices are likely to change on
                          the network
                        </div>
                      </section>

                      {isTransactionMessage ? (
                        <section
                          className="py-2 mb-2 ml-4 mr-4 flex flex-row text-infoText items-center rounded-lg cursor-pointer border border-secondaryFill bg-infoFill
                  shadow-lg"
                        >
                          <div className="text-xs flex flex-row justify-center items-center ml-4">
                            {transactionMessage}
                          </div>
                        </section>
                      ) : null}
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </>
        </Modal> */}

        {/*
            ====================================================================
                Switch Network Modals
            ====================================================================
            */}
        {/* <Modal visible={isChainModalVisible}> */}

        {/* </Modal> */}
        {/* Swap Routing*/}
        <Modal visible={isRouting}>
          <section className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl shadow-lg mb-8">
            <div className="block mt-6 max-w-screen-sm overflow-scroll scrollbar-hide">
              <div className="w-full h-fit flex flex-col">
                {/* Heading */}
                <section className="flex flex-row  gap-[30px] mb-4 mt-4 ml-4 mr-4">
                  {/* Back Button*/}
                  <span
                    className="px-1 py-1 bg-secondaryFill rounded-lg border border-transparent hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer"
                    onClick={() => setIsRouting((prev) => !prev)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#FFFFFF"
                      className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </span>
                  <div className="text-primaryText w-[312px] h-[28px] flex justify-center items-center text-base">
                    Swap Routes {swapRoutes.length < 1 && 'are not available'}
                  </div>
                </section>
                <div className="border-b border-secondaryFill mb-3"></div>

                <section className="border-white/20">
                  <div className="my-1 flex flex-col gap-4 mb-4 mt-4 ml-4 mr-4">
                    {swapRoutes.length > 0 && (
                      <>
                        {swapRoutes?.map((routesArray, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              setActiveProtocols(
                                // routesArray ? routesArray : swapRoutes[0]
                                routesArray ? routesArray : swapRoutes[0]
                              );
                            }}
                            className="flex flex-col gap-10 "
                          >
                            <span
                              className={`w-fit flex flex-row gap-3 px-3 py-3 rounded-lg items-center border ${
                                routesArray === activeProtocols
                                  ? 'border-infoText'
                                  : 'border-secondaryFill'
                              } hover:bg-infoFill hover:border-blue-300 ${
                                routesArray === activeProtocols
                                  ? 'text-primaryText'
                                  : 'text-secondaryText'
                              }`}
                            >
                              {/* {routesArray[0].name} */}
                              {routesArray?.map((route, idx) => (
                                <>
                                  <div className="multi-route-path">
                                    <span className="">
                                      <FaDotCircle />
                                    </span>
                                    {routesArray.length > 1 && (
                                      <i className="">
                                        {' '}
                                        <HiArrowNarrowRight />{' '}
                                      </i>
                                    )}
                                  </div>
                                  <div className="px-4 py-1 flex flex-col gap-1 items-end bg-black/20 rounded-lg">
                                    <div
                                      key={idx}
                                      className="text-sm font-mono"
                                    >
                                      {route.name}
                                    </div>
                                    <div className="text-xs">{route.part}%</div>
                                  </div>
                                </>
                              ))}
                            </span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </section>
        </Modal>

        {/* Profile */}
      </>
    </>
  );
};

export default MFrameSwapConnect;
