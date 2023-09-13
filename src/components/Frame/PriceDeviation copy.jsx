import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


//============{Styles}=======================
const Deviation = (props) => {
  const { setIsSwappingActive } = props;
  const fee = import.meta.env.VITE_SWAP_FEE;
  const dexAddress = import.meta.env.VITE_DEX_ADDRESS;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log({ dexAddressFrontend: dexAddress });
  console.log({ BACKEND_URLFrontEnd: BACKEND_URL });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    connect,
    connectors,
    error: isErrorConnector,
    isLoading: isLoadingConnector,
    pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();

  const [chainPrice, setChainPrice] = useState('');
  const [chainUsdBalance, setChainUsdBalance] = useState(0);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

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

  // const userPricesL =
  //   getLocalStorage('userPrices') && getLocalStorage('userPrices');

  //======={Current}==============================================

  const isChainChange = localStorage.getItem('chainSwitch')
    ? JSON.parse(localStorage.getItem('chainSwitch'))
    : false;

  //=============={To be Removed New}===============================
  const chainL = localStorage.getItem('chain')
    ? JSON.parse(localStorage.getItem('chain'))
    : networksOptions[0];
  const [chain, setChain] = useState(chainL);
  const chainId = chain ? chain.id : 1;
  const chainSymbol = chain ? chain.chainSymbol : 'ETH';

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

  const tValueL = localStorage.getItem('tValue')
    ? JSON.parse(localStorage.getItem('tValue'))
    : 1;

  // const fValueL =
  //   getLocalStorage('fValue') !== undefined ? getLocalStorage('fValue') : 1;

  const usdtTokenL = localStorage.getItem('usdtToken')
    ? JSON.parse(localStorage.getItem('usdtToken'))
    : null;

  // const allProtocols = userPricesL?.allProtocols || null;

  //==============={Secondary Data}=========================

  // const tValueL = userPricesL?.tValueFormatted && userPricesL?.tValueFormatted;
  const [usdtToken, setUsdtToken] = useState(usdtTokenL);
  const [allTokens, setAllTokens] = useState(allTokensL);
  console.log({ allTokens: allTokens });
  const [fToken, setFromToken] = useState(fTokenL);
  console.log({ fToken: fToken });

  const [tToken, setToToken] = useState(tTokenL);

  const [fromPrice, setFromPrice] = useState('');
  console.log({ fromPrice: fromPrice });
  const [toPrice, setToPrice] = useState('');
  console.log({ toPrice: toPrice });

  const [slippage, setSlippage] = useState(slippageL);
  const [fValue, setFromValue] = useState(fValueL);
  console.log({ fValueType: typeof fValue });
  // console.log({ fValueLength: fValue.length });
  // console.log({ fValueSlice: fValue && fValue.slice(0, 3) });

  const fSymbol = fToken && fToken?.symbol;
  const fLogoURI = fToken && fToken?.logoURI;
  const tSymbol = tToken && tToken?.symbol;
  const tLogoURI = tToken && tToken?.logoURI;

  //====={New Active fromPriceData}==============================
  const fromPriceData =
    (getLocalStorage('fromPriceData') !== undefined &&
      getLocalStorage('fromPriceData')) ||
    null;

  //======================================={ISCHANGE CONDITIONS}===============================================

  //======================================={OLD BLOCK BEGINS}===============================================
  //======================================={OLD BLOCK BEGINS}===============================================
  //======================================={OLD BLOCK BEGINS}===============================================

  const signer = useSigner();
  const { address, isConnected } = useAccount();
  const walletAddress = address;
  const { switchNetwork } = useSwitchNetwork();

  const [swapRoutes, setSwapRoutes] = useState([]);
  const [allProtocols, setAllProtocols] = useState([]);
  const [activeProtocols, setActiveProtocols] = useState([]);
  const [protocols, setProtocols] = useState('');
  const [validationOwner, setValidationOwner] = useState(false);
  console.log({ validationOwner: validationOwner });
  const [validationPrice, setValidationPrice] = useState(false);
  //========={Tokens}===============================
  const [isFromValueChange, setIsFromValueChange] = useState(false);
  const [tValue, setToValue] = useState(0.0);
  console.log({ tValue: tValue });
  const [validatedToValue, setValidatedToValue] = useState(false);

  const [tValueFormatted, setToValueFormatted] = useState(0.0);
  const [filteredtTokens, setFilteredtTokens] = useState();
  const [validatedValue, setValidatedValue] = useState(0.0);
  const [estimatedGas, setEstimatedGas] = useState(0.0);
  const [exchangeRate, setExchangeRate] = useState(0.0);

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

  const [spender, setSpender] = useState();
  //==========={Favorite List}=============

  const [info, setInfo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [isTransactionMessage, setIsTransactionMessage] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');

  console.log({ transactionMessage: transactionMessage });

  //===========================================================================

  const [isFromTokenChange, setIsFromTokenChange] = useState(false);
  const [isToTokenChange, setIsToTokenChange] = useState(false);
  const [selectedToken, setSelectedToken] = useState();
  const [isAddToFavorite, setIsAddToFavorite] = useState();
  const [isRemoveFromFavorite, setIsRemoveFromFavorite] = useState();

  const [filteredfTokens, setFilteredfTokens] = useState();

  const userTokensL = localStorage.getItem('userTokens')
    ? JSON.parse(localStorage.getItem('userTokens'))
    : null;
  // const [favoriteTokens, setFavoriteTokens] = useState(userTokensL);
  // const [favoriteTokens, setFavoriteTokens] = useState([]);
  const [favoriteTokens, setFavoriteTokens] = useState(null);

  console.log({ favoriteTokens: favoriteTokens });
  console.log({ favoriteTokensType: typeof favoriteTokens });

  const [savedFavoriteTokens, setSavedFavoriteTokens] = useState(userTokensL); // last used
  // const [savedFavoriteTokens, setSavedFavoriteTokens] = useState([]);
  console.log({ savedFavoriteTokens: savedFavoriteTokens });

  const [isAddFavorite, setIsAddFavorite] = useState(false);

  const [favoriteTokensMobile, setFavoriteTokensMobile] = useState([]);
  console.log({ favoriteTokensMobileType: typeof favoriteTokensMobile });

  const [updatedFavorites, setUpdatedFavorites] = useState([]);
  console.log({ updatedFavorites: updatedFavorites });

  const [favoriteToken1, setFavoriteToken1] = useState({});
  const [favoriteToken2, setFavoriteToken2] = useState({});
  const [favoriteToken3, setFavoriteToken3] = useState({});
  const [favoriteToken4, setFavoriteToken4] = useState({});

  //==========={Connection}=============
  const [isCustom, setIsCustom] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isLowSlippage, setIsLowSlippage] = useState(false);
  const [customSlippage, setCustomSlippage] = useState('');
  const [isSlippageChange, setIsSlippageChange] = useState(false);
  const [isSlippageAuto, setIsSlippageAuto] = useState(true); // default state is

  // console.log({ customSlippage: customSlippage });

  // const isConnectingL = useSelector((state) => state?.swap?.isConnecting);
  const isConnecting = localStorage.getItem('isConnecting')
    ? JSON.parse(localStorage.getItem('isConnecting'))
    : false;

  const [isConnectingL, setIsConnectingL] = useState(false);
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
  const [isNaNBalance, setIsNaNBalance] = useState(false);
  const [isNaNFromBalance, setIsNaNFromBalance] = useState(false);
  const [isNaNToBalance, setIsNaNToBalance] = useState(false);
  const [isNaNChainBalance, setIsNaNChainBalance] = useState(false);

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

  const [isPriceDeviation, setIsPriceDeviation] = useState(true);
  const [isCriticalPriceDeviation, setIsCriticalPriceDeviation] =
    useState(true);

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================

  //====================================================================================================
  //======================================={Format Number Function}=====================================
  //====================================================================================================

  const [fromInput, setFromInput] = useState('');

  // console.log({ fromInput: fromInput });

  const [toInput, setToInput] = useState('');

  console.log({ toInput: toInput });

  const [isSwapSuccess, setIsSwapSuccess] = useState(false);
  const [isSwapError, setIsSwapError] = useState(false);
  const [isApproveSuccess, setIsApproveSuccess] = useState(false);
  const [isApproveError, setIsApproveError] = useState(false);

  const { width, height } = useWindowResize();
  console.log({ screenWidth: width, sreenHeight: height });

  //====={PriceAPI from Binance}=============================
  const [rateETHEUR, setRateETHEUR] = useState('');
  console.log({ rateETHEUR: rateETHEUR });

  //====={PriceAPI from Google}=============================
  const [rateEURUSD, setRateEURUSD] = useState('');
  console.log({ rateEURUSD: rateEURUSD });

  //====={Function}=============================
  const [rateETHUSD, setRateETHUSD] = useState('');
  console.log({ rateETHUSD: rateETHUSD });

  //====={PriceAPI from Binance}=============================
  const [rateETHUSDT, setRateETHUSDT] = useState('');
  console.log({ rateETHUSDT: rateETHUSDT });

  //====={PriceAPI fFunction}=============================
  const [rateUSDTUSD, setRateUSDTUSD] = useState('');
  // const [rateUSDTUSD, setRateUSDTUSD] = useState(0.0);
  console.log({ rateUSDTUSD: rateUSDTUSD });
  console.log({ rateUSDTUSDType: typeof rateUSDTUSD });

  const usdExchangeRate = localStorage.getItem('rateUSDTUSD')
    ? JSON.parse(localStorage.getItem('rateUSDTUSD'))
    : null;

  console.log({ usdExchangeRate: usdExchangeRate });

  const [checkFNaN, setcheckFNaN] = useState(false);
  console.log({ checkFNaN: checkFNaN });
  const [updatedFNaN, setUpdatedFNaN] = useState(0.0);
  console.log({ updatedFNaN: updatedFNaN });
  const [checkTNaN, setcheckTNaN] = useState(false);
  console.log({ checkTNaN: checkTNaN });
  const [updatedTNaN, setUpdatedTNaN] = useState(0.0);
  console.log({ updatedTNaN: updatedTNaN });
  const [checkUSDRate, setCheckUSDRate] = useState(false);
  console.log({ checkUSDRate: checkUSDRate });

  const [check, setCheck] = useState();
  console.log({ check: check });
  const [isRedirect, setIsRedirect] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setIsDisconnecting(false);
      setBalance(0);
      setFromBalance(0);
      setToBalance(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    if (isRedirect) {
      setTimeout(() => {
        navigate('/dbalancenetwork');
        setIsRedirect(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirect]);

  //===={Update rateUSDTUSD in local storage only if there is value}===============
  useEffect(() => {
    if (rateUSDTUSD !== null) {
      localStorage.setItem('rateUSDTUSD', JSON.stringify(rateUSDTUSD));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateUSDTUSD]);

  

  async function getChainBalance() {
    if (isConnected) {
      const tokenbal = Number(dataBal?.formatted).toFixed(3);
      if (isNaN(tokenbal)) {
        setBalance(0);
        localStorage.setItem('chainBalance', JSON.stringify(0));
        //======================={FROM TOKEN BALANCE}==================================================
        if (fToken?.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          // setFromBalance(Number(balance));
          setFromBalance(0);
          // setFromBalance(balance);
        } else {
          const ERC20Contract = new ethers.Contract(
            fToken?.address,
            erc20ABI,
            signer.data
          );
          let erc20Bal = await ERC20Contract.balanceOf(walletAddress);
          const balanceRaw = formatUnits(erc20Bal, fToken?.decimals);
          if (Number(balanceRaw) > 0) {
            const formattedBalance = Number(balanceRaw).toFixed(5);
            setFromBalance(formattedBalance);
          }
        }

        //======================={TO TOKEN BALANCE}==================================================
        if (tToken?.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          // setToBalance(balance);
          setToBalance(0);
        } else {
          const ERC20Contract = new ethers.Contract(
            tToken?.address,
            erc20ABI,
            signer.data
          );
          let erc20Bal = await ERC20Contract.balanceOf(walletAddress);
          const balanceRaw = formatUnits(erc20Bal, tToken?.decimals);
          if (Number(balanceRaw) > 0) {
            const formattedBalance = Number(balanceRaw).toFixed(5);
            setToBalance(formattedBalance);
          }
        }
        setIsNaNBalance(true);
      } else {
        setBalance(tokenbal);
        localStorage.setItem('chainBalance', JSON.stringify(tokenbal));

        //======================={FROM TOKEN BALANCE}==================================================
        if (fToken?.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          // setFromBalance(Number(balance));
          setFromBalance(tokenbal);
          // setFromBalance(balance);
        } else {
          const ERC20Contract = new ethers.Contract(
            fToken?.address,
            erc20ABI,
            signer.data
          );
          let erc20Bal = await ERC20Contract.balanceOf(walletAddress);
          const balanceRaw = formatUnits(erc20Bal, fToken?.decimals);
          if (Number(balanceRaw) > 0) {
            const formattedBalance = Number(balanceRaw).toFixed(5);
            setFromBalance(formattedBalance);
          }
        }
        //======================={TO TOKEN BALANCE}==================================================
        if (tToken?.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
          // setToBalance(balance);
          setToBalance(tokenbal);
        } else {
          const ERC20Contract = new ethers.Contract(
            tToken?.address,
            erc20ABI,
            signer.data
          );
          let erc20Bal = await ERC20Contract.balanceOf(walletAddress);
          const balanceRaw = formatUnits(erc20Bal, tToken?.decimals);
          if (Number(balanceRaw) > 0) {
            const formattedBalance = Number(balanceRaw).toFixed(5);
            setToBalance(formattedBalance);
          }
        }
        setIsNaNBalance(false);
      }
    }
  }

  useEffect(() => {
    if (isNaNBalance) {
      // return NaN;
      setTimeout(() => {
        getChainBalance();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNaNBalance]);

  

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

  useEffect(() => {
    localStorage.setItem('tValue', JSON.stringify(tValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue]);



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
    if (tValue !== 0) {
      getPriceDeviation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue, fromPrice, toPrice]);

  async function getPriceDeviation() {
    let fromValueTotalL = Number(fValue) * Number(fromPrice);
    let toValueTotalL = Number(tValue) * Number(toPrice);
    if (fromValueTotalL > toValueTotalL) {
      let priceDifference = fromValueTotalL - toValueTotalL;
      let priceSum = toValueTotalL + fromValueTotalL;
      let priceAverage = priceSum / 2;
      let percentageDeviationRaw = 100 * (priceDifference / priceAverage);
      let percentageDeviation = percentageDeviationRaw.toFixed(2);

      setPriceDeviation(percentageDeviation);
      setIsPriceDeviation(true);

      if (Number(percentageDeviationRaw) > 12) {
        setIsCriticalPriceDeviation(true);
      }
    } else {
      setIsPriceDeviation(false);
    }
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

      // Limit to three significant digits
      // console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(tValue));
      // Expected output: "1,23,000"

      // const toNumberEdited = formattedToNumber.replace(/[^\d]/g, '');
      const toNumberEdited = formattedToNumber.replace(/,/g, ' '); // replace comme with space
      setToInput(toNumberEdited);
    }
  };

  useEffect(() => {
    if (savedFavoriteTokens) {
      localStorage.setItem('userTokens', JSON.stringify(savedFavoriteTokens));
      setFavoriteTokens(savedFavoriteTokens);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedFavoriteTokens]);

  useEffect(() => {
    if (isAddToFavorite) {
      addToFavorite(selectedToken);
      setIsAddToFavorite(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddToFavorite]);

  useEffect(() => {
    if (isRemoveFromFavorite) {
      removeFromFavorite(selectedToken);
      setIsRemoveFromFavorite(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRemoveFromFavorite]);

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


  function onFromValueChanged(ev) {
    setToValue(0);
    setFromValue(ev.target.value);
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

  

  //=====================================================================================

  function swapTokensPosition() {
    let tmpToken = fToken;
    setFromToken(tToken);
    setToToken(tmpToken);
    setIsFromTokenChange(true);
    setIsToTokenChange(true);
  }

  //======={ To be tested for switching inpute values}=========

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

  //======================================={TRANSACTION ERRORS/SUCCESS PROMPTS}============================================
  //======================================={TRANSACTION ERRORS/SUCCESS PROMPTS}============================================

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

  //======================================={CHAIN CHANGE}============================================
  //======================================={CHAIN CHANGE}============================================
  useEffect(() => {
    fetchChainData();
    if (isChainChange === true) {
      setTimeout(() => {
        fetchChainData();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);


  async function fetchChainData() {
    setIsFromLoading(true);
    let userData = {
      chainId: chainId ? chainId : 1,
    };
    try {
      const response = await axios.get(
        `${BACKEND_URL}/swap/tokenList/${chainId.toString()}`
      );
      if (response.data) {
        setUsdtToken(response.data?.usdtToken);
        setAllTokens(response.data?.allTokens);

        if (fTokenL === null) {
          setUsdtToken(response.data?.usdtToken);

          setAllTokens(response.data?.allTokens);
          setFromToken(response.data?.fToken);
          setToToken(response.data?.tToken);
          setFromPrice(response.data?.fromPrice);
          setToPrice(response.data?.toPrice);
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

  //======================================={USD PRICES}===============================================
  //======================================={USD PRICES}===============================================
  //===={Updates at intervatls}============
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (checkUSDRate !== true) {
        fetchLatestPrices();
      }
    }, 60000); // every minute
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromPrice, toPrice]);

  //===={Temporary changes in values}============
  useEffect(() => {
    setTimeout(() => {
      if (checkUSDRate !== true) {
        fetchLatestPrices();
      }
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken]);

  async function fetchLatestPrices() {
    // setIsFromLoading(true);
    if (rateUSDTUSD === null) {
      return;
    }
    let userData = {
      fToken,
      tToken,
      rateUSDTUSD,
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/swap/tokenPrice`,
        userData
      );
      if (response.data) {
        setFromPrice(response.data?.fromPrice);
        setToPrice(response.data?.toPrice);
        setIsFromTokenChange(true);
        setIsToTokenChange(true);
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

  //======================================={SWAP ESTIMATES}===============================================
  //======================================={SWAP ESTIMATES}===============================================
  //===={Updates at intervatls}============

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeout(() => {
        fetchToPrice();
      }, 4000);
    }, 60000); // every minute
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken, fValue]);

  useEffect(() => {
    setTimeout(() => {
      if (
        fValue === 0 ||
        fValue === '0' ||
        fValue === null ||
        fValue === undefined
      ) {
        return;
      }
      if (chainId === undefined || chainId === null || chainId === '') {
        return;
      }
      fetchToPrice();
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken, tToken, fValue]);

  useEffect(() => {
    if (!check || check === undefined || tValue === 0) {
      setIsToLoading(true);
    } else {
      setIsToLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, tValue]);

  //Based on FValue only

  const fetchToPrice = async () => {
    let userData = {
      chainId,
      fToken,
      tToken,
      slippage,
      fValue,
      isChainChange: isChainChange ? isChainChange : false,
    };
    const response = await updateSwapEstimates(userData);
    if (response) {
      setCheck(response);
      setValidatedValue(response?.validatedValue);
      setToValue(response?.tValueFormatted);
      setToValueFormatted(response?.tValueFormatted);
      setEstimatedGas(response?.estimatedGas);
      setAllProtocols(response?.allProtocols);
      setExchangeRate(response?.exchangeRate);

      let newProtocols = response?.allProtocols;
      let routes = [];
      newProtocols?.[0].forEach((route) => {
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
    }
  };

  //====================================================================================================
  //======================================={CURRENCY CONVERTER}=====================================
  //====================================================================================================
  //==========={Conversion steps}================================
  //1. ETH ---> EUR : Binance
  //2. EUR ---> USD : Google
  //3. ETH ----> USD: function
  //4. USDT ---> ETH: Binance
  //5. USDT ----> USD: Function

  //======={Step 1: ETH ---> EUR : Binance}==================================
  useEffect(() => {
    converterETHEUR();

    if (!rateETHEUR) {
      converterETHEUR();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateETHEUR]);

  //====={PriceAPI from Binance}=============================

  async function converterETHEUR() {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');
    ws.onmessage = (event) => {
      let stockObject = JSON.parse(event?.data);
      console.log(stockObject?.p); // only price data
      setRateETHEUR(stockObject?.p);
    };
  }

  //======={Step 2: EUR ---> USD : Google}==================================
  //======{on component mount}========================
  useEffect(() => {
    googleExchangeRates();
  }, []);
  //===={on 60 sec Intervals}====================
  useEffect(() => {
    const intervalId = setInterval(() => {
      googleExchangeRates();
    }, 60000); // after every 60 seconds
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateEURUSD]);

  async function googleExchangeRates() {
    let sheetId = '1E2TtDlN52STMBMUPMre8zccfBs3OuKKTbzCELKoodyY';

    let sheetTitle = 'ExchangeData';
    let sheetRange = 'A1:B2';

    let full_url =
      'https://docs.google.com/spreadsheets/d/' +
      sheetId +
      '/gviz/tq?sheet=' +
      sheetTitle +
      '&range=' +
      sheetRange;

    fetch(full_url)
      .then((res) => res.text())
      .then((rep) => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        console.log(data);
        setRateEURUSD(data?.table?.rows[0]?.c[1]?.v);
      });
  }

  //======={Step 3: ETH ---> USD : Google}==================================
  // useIntervals for this calculation
  useEffect(() => {
    setTimeout(() => {
      converterETHUSD();
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateEURUSD, rateETHEUR]);

  async function converterETHUSD() {
    let ethRate = Number(rateEURUSD) * rateETHEUR; // convert ethPrice to USD
    setRateETHUSD(ethRate);
  }

  //======={Step 4: USDT ---> ETH : Google}==================================
  useEffect(() => {
    converterETHUSDT();

    if (!rateETHUSDT) {
      converterETHUSDT();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateETHUSDT]);

  //====={PriceAPI from Binance}=============================

  async function converterETHUSDT() {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
    ws.onmessage = (event) => {
      //   console.log(event.data);// all data
      let stockObject = JSON.parse(event?.data);
      console.log(stockObject?.p); // only price data
      //   console.log(event.data);
      // let newValue = 1 / Number(stockObject?.p);

      setRateETHUSDT(stockObject?.p);
      // setRateETHUSDT(newValue);
    };
  }

  useEffect(() => {
    setTimeout(() => {
      converterUSDTUSD();

      if (!rateUSDTUSD) {
        converterUSDTUSD();
      }
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateUSDTUSD, rateETHUSDT]);

  async function sanitiseInput(x) {
    if (isNaN(x)) {
      // return NaN;
      return true;
    }
    // return x;
    return false;
  }

  async function converterUSDTUSD() {
    let newRate = Number(rateETHUSDT) / Number(rateETHUSD); // USDT/USD
    let check = sanitiseInput(newRate);
    if (check === true) {
      return;
    } else {
      setRateUSDTUSD(newRate);
    }
  }

  useEffect(() => {
    sanitiseFrom(fromPrice);
    sanitiseTo(toPrice);
    sanitiseUsdRate(rateUSDTUSD);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkFNaN, checkTNaN]);

  // async function sanitise(x) {
  //   if (isNaN(x)) {
  //     // return NaN;
  //     return true;
  //   }
  //   // return x;
  //   return false;
  // }

  async function sanitiseUsdRate(x) {
    if (isNaN(x)) {
      // return NaN;
      setCheckUSDRate(true);

      return true;
    }
    // return x;
    setCheckUSDRate(false);
    return false;
  }

  async function sanitiseFrom(x) {
    if (isNaN(x)) {
      // return NaN;
      setcheckFNaN(true);
      let newValue = parseFloat(fromPrice);
      setUpdatedFNaN(newValue);
      return true;
    }
    // return x;
    setcheckFNaN(false);
    return false;
  }

  async function sanitiseTo(x) {
    if (isNaN(x)) {
      // return NaN;
      setcheckTNaN(true);
      let newValue = parseFloat(toPrice);
      setUpdatedTNaN(newValue);
      return true;
    }
    // return x;
    setcheckTNaN(false);
    return false;
  }

  

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
    <div
                    className={`text-text-2-d justify-between ${stylesSwap.balance0Parent}`}
                  >
                    {isPriceDeviation ? (
                      <>
                        <div
                          className={`${stylesSwap.documentation} ${
                            isToLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          {isToLoading
                            ? ''
                            : `~$${
                                tValue
                                  ? new Intl.NumberFormat().format(
                                      Number(tValue) * Number(toPrice)
                                    )
                                  : ''
                              } (-${priceDeviation ? priceDeviation : ''}%)`}
                        </div>
                      </>
                    ) : (
                      <div className={stylesSwap.documentation}>
                        {isToLoading
                          ? ''
                          : `~$${
                              tValue
                                ? new Intl.NumberFormat().format(
                                    Number(tValue) * Number(toPrice)
                                  )
                                : ''
                            }`}
                      </div>
                    )}
                    <div
                      className={`${stylesSwap.transactionDetails} ${
                        isToLoading
                          ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                          : ''
                      }`}
                    >
                      {isToLoading
                        ? ''
                        : `Balance: ${toBalance.toString() || ''}`}
                    </div>
                  </div>
    </>
  );
};

export default Deviation;
