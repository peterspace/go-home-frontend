import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { FaDotCircle } from 'react-icons/fa';
import Modal from './Modal';
import { ethers } from 'ethers';
import { networksOptionsExchange } from '../../constants';

import { formatUnits, parseUnits } from '@ethersproject/units';
import { useNavigate } from 'react-router-dom';
//=============={Using wallet Connect}======================

import {
  useConnect,
  useAccount,
  useSwitchNetwork,
  useSigner,
  useBalance,
  useDisconnect,
  useSignMessage,
} from 'wagmi';

import erc20ABI from '../engine/erc20.json';
import Erc20 from '../engine/erc20.json';
import { toast } from 'react-toastify';
// import { useSendTransaction, useWaitForTransaction } from 'wagmi';

//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================

//========={importing Page}======================================

//=========={Styles}======================
import stylesSlippage from './Slippage.module.css';
import stylesFromToken from './FromTokenList.module.css';
import stylesSwap from './Swap.module.css';
import stylesSwapTx from './SwapTransact.module.css';

//======{new}========================
import tokens from '../../res/tokens';
import tokensGoerli from '../../res/tokens.js';
import tokensMumbai from '../../res/tokensMumbai.js';
import fiat from '../../res/fiat';
import { TokenListButton, TransactButton } from '../Buttons';
// import Modal from '../Modal';
import Spinner from '../Spinner';
import banks from '../../Contracts/allBanks';
import TokenComponent from '../TokenComponent';
import GetCash from './ExchangeToCash/Client/GetCash';

//================={Exchange To Cash Contracts}===================
import GoExchangeToCashETH from '../../Contracts/GoExchangeToCashETH.json';
import GoExchangeToCashMATIC from '../../Contracts/GoExchangeToCashMATIC.json';
import GoExchangeToCashBSC from '../../Contracts/GoExchangeToCashBSC.json';
import GoExchangeToCashArbitrum from '../../Contracts/GoExchangeToCashArbitrum.json';
import GoExchangeToCashOptimism from '../../Contracts/GoExchangeToCashOptimism.json';
import GoExchangeToCashGoerliETH from '../../Contracts/GoExchangeToCashGoerliETH.json';
import GoExchangeToCashTBNB from '../../Contracts/GoExchangeToCashTBNB.json';
import GoExchangeToCashMumbaiMATIC from '../../Contracts/GoExchangeToCashMumbaiMATIC.json';

import ClientExchangeTransactions from '../ClientExchangeTransactions';
import ModalFullScreen from '../ModalFullScreen';
import ClientPageToCash from './ExchangeToCash/Client/ClientPageToCash';
import ClientPageToCrypto from './ExchangeToCrypto/Client/ClientPageToCrypto';
import { createTransaction } from '../../redux/api/api';
import { getTransactionByTxId } from '../../redux/api/api';
import { updateTransactionById } from '../../redux/api/api';

const cities = [
  {
    name: 'Moscow',
  },
  {
    name: 'Saint petersburg',
  },
];

//============{Styles}=======================
const SwapCash = (props) => {
  const {
    setIsExchangingActive,
    isBlockchain,
    setIsBlockchain,
    blockchainTransactionData,
    setIsActiveBlockchain,
    isActiveBlockchain,
  } = props;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const chats = localStorage.getItem('chats')
    ? JSON.parse(localStorage.getItem('chats'))
    : null;

  // const country = localStorage.getItem('country')
  // ? JSON.parse(localStorage.getItem('country'))
  // : null;

  // const state = localStorage.getItem('state')
  // ? JSON.parse(localStorage.getItem('state'))
  // : null;

  // const city = localStorage.getItem('city')
  // ? JSON.parse(localStorage.getItem('city'))
  // : null;

  const country = localStorage.getItem('country')
    ? JSON.parse(localStorage.getItem('country'))
    : 'Russia';

  const state = localStorage.getItem('state')
    ? JSON.parse(localStorage.getItem('state'))
    : '';

  const cityL = localStorage.getItem('city')
    ? JSON.parse(localStorage.getItem('city'))
    : cities[0]?.name;

  const [city, setCity] = useState(cityL);

  console.log({ city: city });

  const rateBuy = 1.02;
  const rateSell = 0.98;
  const navigate = useNavigate();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  //====={New}======================================

  const newTxL = localStorage.getItem('newTx')
    ? JSON.parse(localStorage.getItem('newTx'))
    : '';
  const [tx, setTx] = useState();
  // const [tx, setTx] = useState(newTxL);
  console.log({ tx: tx });

  const [txId, setTxId] = useState();

  console.log({ txId: txId });
  const [newTx, setNewTx] = useState();
  console.log({ newTx: newTx });

  const [cryptoOrderComplete, setCryptoOrderComplete] = useState(false);

  const [clientsTransacts, setClientsTransacts] = useState(false);
  const [clientPayCashComplete, setClientPayCashComplete] = useState(false);
  const [getExchangeVoucherForIdComplete, setGetExchangeVoucherForIdComplete] =
    useState(false);

  const transactionData = blockchainTransactionData;
  const transactionDataL = localStorage.getItem('transactionData')
    ? JSON.parse(localStorage.getItem('transactionData'))
    : '';

  //====={New}======================================

  const [allActiveBanks, setAllActiveBanks] = useState(0);
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

  const isChainChange = localStorage.getItem('chainSwitchE')
    ? JSON.parse(localStorage.getItem('chainSwitchE'))
    : false;

  //=============={To be Removed New}===============================
  const chainL = localStorage.getItem('chainE')
    ? JSON.parse(localStorage.getItem('chainE'))
    : networksOptionsExchange[0];
  const [chain, setChain] = useState(chainL);
  const chainId = chain ? chain.id : 1;
  const chainSymbol = chain ? chain.chainSymbol : 'ETH';

  const fTokenL = localStorage.getItem('fTokenE')
    ? JSON.parse(localStorage.getItem('fTokenE'))
    : null;

  const tTokenL = localStorage.getItem('tTokenE')
    ? JSON.parse(localStorage.getItem('tTokenE'))
    : null;

  const fValueL = localStorage.getItem('fValueE')
    ? JSON.parse(localStorage.getItem('fValueE'))
    : 1;

  const tValueL = localStorage.getItem('tValueE')
    ? JSON.parse(localStorage.getItem('tValueE'))
    : 1;

  const usdtTokenL = localStorage.getItem('usdtTokenE')
    ? JSON.parse(localStorage.getItem('usdtTokenE'))
    : null;

  //==============={Secondary Data}=========================
  // const tValueL = userPricesL?.tValueFormatted && userPricesL?.tValueFormatted;
  const [usdtToken, setUsdtToken] = useState(usdtTokenL);
  const [fToken, setFromToken] = useState(fTokenL);
  console.log({ fToken: fToken });

  const [tToken, setToToken] = useState(tTokenL);

  const [fromPrice, setFromPrice] = useState('');
  console.log({ fromPrice: fromPrice });
  const [toPrice, setToPrice] = useState('');
  console.log({ toPrice: toPrice });

  const [fValue, setFromValue] = useState(fValueL);

  const fSymbol = fToken && fToken?.symbol;
  const fLogoURI = fToken && fToken?.logoURI;
  const tSymbol = tToken && tToken?.symbol;
  const tLogoURI = tToken && tToken?.logoURI;

  //====={New Active fromPriceData}==============================

  //======================================={ISCHANGE CONDITIONS}===============================================

  //======================================={OLD BLOCK BEGINS}===============================================
  //======================================={OLD BLOCK BEGINS}===============================================
  //======================================={OLD BLOCK BEGINS}===============================================

  const signer = useSigner();
  const { address, isConnected } = useAccount();
  const walletAddress = address;
  const { switchNetwork } = useSwitchNetwork();

  const [validationOwner, setValidationOwner] = useState(false);
  console.log({ validationOwner: validationOwner });
  //========={Tokens}===============================
  const [isFromValueChange, setIsFromValueChange] = useState(false);
  const [tValue, setToValue] = useState(0.0);

  const [filteredtTokens, setFilteredtTokens] = useState();
  const [validatedValue, setValidatedValue] = useState(0.0);
  const [estimatedGas, setEstimatedGas] = useState(0.0);
  const [exchangeRate, setExchangeRate] = useState(0.0);

  // console.log({ validatedValue: typeof validatedValue });
  //====================={Prices}===============================

  const [isChainModalVisible, setIsChainModalVisible] = useState(false);

  //==========={Connection}=============
  // const [isConnected, setIsConnected] = useState(true);
  const [isCaution, setIsCaution] = useState(false);
  //==========={Connection}=============
  //==========={Favorite List}=============

  const [info, setInfo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [isTransactionMessage, setIsTransactionMessage] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');

  console.log({ transactionMessage: transactionMessage });

  //===========================================================================

  const [isFromTokenChange, setIsFromTokenChange] = useState(false);
  const [isToTokenChange, setIsToTokenChange] = useState(false);

  const [filteredfTokens, setFilteredfTokens] = useState();

  //==========={Connection}=============

  const [isConnecting, setIsConnecting] = useState(false);
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

  const [fromBalance, setFromBalance] = useState(0.0);
  const [fromBalancePercent, setFromBalancePercent] = useState(75);

  const [toBalance, setToBalance] = useState(0.0);

  console.log({ fValueFormatted: new Intl.NumberFormat().format(fValue) });
  console.log({ tValueFormatted: new Intl.NumberFormat().format(tValue) });

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================

  //====================================================================================================
  //======================================={Format Number Function}=====================================
  //====================================================================================================

  const [toInput, setToInput] = useState('');

  console.log({ toInput: toInput });

  const [isSwapSuccess, setIsSwapSuccess] = useState(false);
  const [isSwapError, setIsSwapError] = useState(false);
  const [isApproveSuccess, setIsApproveSuccess] = useState(false);
  const [isApproveError, setIsApproveError] = useState(false);

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

  const usdExchangeRate = localStorage.getItem('rateUSDTUSDE')
    ? JSON.parse(localStorage.getItem('rateUSDTUSDE'))
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

  const [isRedirect, setIsRedirect] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  //====={New}=========================================

  let message = `
		Govercity Connect >>
		Transact: Transfer
		Token: ${fToken?.symbol}
		Address: ${walletAddress}
		`;
  const { data, signMessage } = useSignMessage({ message });

  //====={PriceAPI from Google:  To Rates}=============================
  const [rateUSDEUR, setRateUSDEUR] = useState('');
  console.log({ rateUSDEUR: rateUSDEUR });
  const [rateUSDGBP, setRateUSDGBP] = useState('');
  console.log({ rateUSDGBP: rateUSDGBP });
  const [rateUSDAED, setRateUSDAED] = useState('');
  console.log({ rateUSDAED: rateUSDAED });
  const [rateUSDRUB, setRateUSDRUB] = useState('');
  console.log({ rateUSDRUB: rateUSDRUB });

  const [rateUSDAUD, setRateUSDAUD] = useState('');
  console.log({ rateUSDAUD: rateUSDAUD });
  const [rateUSDCAD, setRateUSDCAD] = useState('');
  console.log({ rateUSDCAD: rateUSDCAD });

  //=========================================================
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [filteredBanks, setFilteredBanks] = useState(banks);
  const [bankAddress, setBankAddress] = useState(''); // chosen bank
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState(0.1);
  const [dexContractAddress, setDexContractAddress] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);

  const [transferStatus, setTransferStatus] = useState({
    status: '',
    message: '',
  });
  const [newTransaction, setNewTransaction] = useState();
  console.log({ newTransaction: newTransaction });
  const [signature, setSignature] = useState('');
  const [isCashTxModalVisible, setIsCashTxModalVisible] = useState(false);
  const [isCryptoTxModalVisible, setIsCryptoTxModalVisible] = useState(false);
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [activeChainAddress, setActiveChainAddress] = useState();
  const [isWalletBalanceLoading, setIsWalletBalanceLoading] = useState(false);
  const [activeChainTokens, setActiveChainTokens] = useState([]);
  const [walletBalances, setWalletBalances] = useState([]);
  const [isTxStatus, setIsTxStatus] = useState(false);

  const [telegram, setTelegram] = useState();
  const [comment, setComment] = useState();
  const [phone, setPhone] = useState();

  const [nextPage, setNextPage] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const [isDelivery, setIsDelivery] = useState(false);

  console.log({ telegram: telegram });
  console.log({ comment: comment });
  console.log({ phone: phone });
  console.log({ nextPage: nextPage });

  //=========================================================

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
      localStorage.setItem('rateUSDTUSDE', JSON.stringify(rateUSDTUSD));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateUSDTUSD]);

  //=========================={TOKEN BALANCES}=================================
  //=========================={TOKEN BALANCES}=================================

  useEffect(() => {
    if (isConnected) {
      getChainBalance();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  //============{on primary changes}========================
  useEffect(() => {
    getChainBalance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, balance, fToken, tToken, fromBalance]);

  //============{on conditional changes}========================
  useEffect(() => {
    if (isConnected === true && isFromTokenChange === true) {
      setFromBalance(0.0);
      setTimeout(() => {
        getChainBalance();
        setIsFromTokenChange(false);
      }, 2000); // production 2000
    }

    if (isConnected === true && isChainChange === true) {
      setFromBalance(0.0);
      setToBalance(0.0);
      setTimeout(() => {
        getChainBalance();
      }, 2000); // production 2000
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isFromTokenChange, isChainChange]);

  async function getChainBalance() {
    if (isConnected) {
      const tokenbal = Number(dataBal?.formatted).toFixed(3);
      if (isNaN(tokenbal)) {
        setBalance(0);
        localStorage.setItem('chainBalanceE', JSON.stringify(0));
      } else {
        setBalance(tokenbal);
        localStorage.setItem('chainBalanceE', JSON.stringify(tokenbal));
      }
      walletBalances.map(async (b) => {
        if (b?.symbol === fToken?.symbol) {
          setFromBalance(b?.balance);
        }
      });
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

  //======={Initial step}============================
  // replace signer with isConnected
  useEffect(() => {
    signer && getTokenBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dexContractAddress, signer?.data?._address]); //* signer keeps changing but signer.data._address won't

  async function getTokenBalances() {
    //=================== {START: Get Wallet Token balances}
    setIsWalletBalanceLoading(true);
    let walletTokenBalances = [];
    for (let i = 0; i < tokens.length; i++) {
      try {
        const ERC20Contract = new ethers.Contract(
          // tokens[i].address,
          tokens[i].testAddress,
          Erc20,
          signer.data
        );

        const balance = await ERC20Contract.balanceOf(walletAddress);
        walletTokenBalances.push({
          symbol: activeChainTokens[i].symbol.toUpperCase(),
          balance: ethers.utils.formatEther(balance),
          logoURI: activeChainTokens[i]?.logoURI,
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (walletTokenBalances.length > 0) setWalletBalances(walletTokenBalances);
    setIsWalletBalanceLoading(false);
    console.info('wallet balance', walletTokenBalances);
  }

  //====================================================================================================
  //======================================={MAIN TRANSACTION CALLS}=====================================
  //====================================================================================================

  useEffect(() => {
    localStorage.setItem('chainE', JSON.stringify(chain));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  useEffect(() => {
    if (isConnected === true) {
      setIsConnecting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    localStorage.setItem('usdtTokenE', JSON.stringify(usdtToken));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usdtToken]);

  useEffect(() => {
    localStorage.setItem('fTokenE', JSON.stringify(fToken));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  useEffect(() => {
    localStorage.setItem('tTokenE', JSON.stringify(tToken));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  useEffect(() => {
    localStorage.setItem('fValueE', JSON.stringify(fValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue]);

  useEffect(() => {
    localStorage.setItem('tValueE', JSON.stringify(tValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tValue]);

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

      const toNumberEdited = formattedToNumber.replace(/,/g, ' '); // replace comme with space
      setToInput(toNumberEdited);
    }
  };

  //==========================================================================

  useEffect(() => {
    if (fToken !== undefined || tToken !== undefined) {
      filterFTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fToken]);

  function filterFTokens() {
    // let filteredFTokens = tokens?.filter((filter) => {
    //   return filter?.symbol?.toLowerCase() !== tToken?.symbol.toLowerCase();
    // });
    setFilteredfTokens(tokens);
  }

  useEffect(() => {
    if (fToken !== undefined || tToken !== undefined) {
      filterTTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tToken]);

  function filterTTokens() {
    // let filteredTTokens = fiat?.filter((filter) => {
    //   return filter?.symbol.toLowerCase() !== fiat?.symbol.toLowerCase();
    // });
    setFilteredtTokens(fiat);
  }

  //=======================================================================
  //=======================================================================

  //===================================================================================================

  useEffect(() => {
    if (isProcessing === true) {
      setTimeout(() => {
        setIsProcessing(false);
      }, 10000); // reduce time
    }
  });

  //==============={useEffect Blocks}=================================
  //======================================={OLD BLOCK BEGINS}===============================================

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
    setTimeout(() => {
      validateSwapOwner();
      if (fromBalance <= fValue) {
        setValidationOwner(false);
        setInfo('Insufficient balance');
        setIsCaution(true);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fValue, fToken, tToken, chainId, fromBalance]);

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

  //=====================================================================================

  function swapTokensPosition() {
    let tmpToken = fToken;
    setFromToken(tToken);
    setToToken(tmpToken);
    setIsFromTokenChange(true);
    setIsToTokenChange(true);
  }

  //======={ To be tested for switching inpute values}=========

  //======================================={USD Value Converter}===============================================
  //======================================={USD Value Converter}===============================================

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
      if (fTokenL === null) {
        tokens?.map(async (b) => {
          if (b?.symbol === 'USDT') {
            setUsdtToken(b);
          }
        });
        setFromToken(tokens[0]);
        setToToken(fiat[0]);
        getFromTokenPrice();
        getChainPrice(userData?.chainId);

        setIsFromTokenChange(true);
        setIsToTokenChange(true);
      }

      if (isChainChange === true && chainId !== null) {
        tokens?.map(async (b) => {
          if (b?.symbol === 'USDT') {
            setUsdtToken(b);
          }
        });
        setFromToken(tokens[0]);
        setToToken(fiat[0]);
        getFromTokenPrice();
        getChainPrice(userData?.chainId);
        localStorage.setItem('chainSwitchE', JSON.stringify(false));
        setIsFromTokenChange(true);
        setIsToTokenChange(true);
      }

      localStorage.setItem('chainIdE', JSON.stringify(userData?.chainId));
      networksOptionsExchange?.map(async (b) => {
        if (b.id === userData?.chainId) {
          localStorage.setItem('chainE', JSON.stringify(b));
        }
      });
      setIsFromLoading(false);
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

    getFromTokenPrice();
    // setFromPrice(response.data?.fromPrice);
    //     setToPrice(response.data?.toPrice);
    setIsFromTokenChange(true);
    setIsToTokenChange(true);
  }

  //======================================={SWAP ESTIMATES}===============================================
  //======================================={SWAP ESTIMATES}===============================================
  //===={Updates at intervatls}============

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTimeout(() => {
  //       fetchToPrice();
  //     }, 4000);
  //   }, 60000); // every minute
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fToken, tToken, fValue]);

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
    }, 3000);
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

  // https://docs.google.com/spreadsheets/d/1E2TtDlN52STMBMUPMre8zccfBs3OuKKTbzCELKoodyY/edit#gid=1996491027

  useEffect(() => {
    allExchangeRates();
  }, []);
  //===={on 60 sec Intervals}====================
  useEffect(() => {
    const intervalId = setInterval(() => {
      allExchangeRates();
    }, 60000); // after every 60 seconds
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateUSDEUR, rateUSDGBP, rateUSDAED, rateUSDRUB, rateUSDAUD, rateUSDCAD]);

  async function allExchangeRates() {
    let sheetId = '1E2TtDlN52STMBMUPMre8zccfBs3OuKKTbzCELKoodyY';

    let sheetTitle = 'ExchangeFiatData';
    // let sheetRange = 'A1:B2';
    let sheetRange = 'A1:G2';

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
        setRateUSDEUR(data?.table?.rows[0]?.c[1]?.v);
        setRateUSDGBP(data?.table?.rows[0]?.c[2]?.v);
        setRateUSDRUB(data?.table?.rows[0]?.c[3]?.v);
        setRateUSDAUD(data?.table?.rows[0]?.c[4]?.v);
        setRateUSDAED(data?.table?.rows[0]?.c[5]?.v);
        setRateUSDCAD(data?.table?.rows[0]?.c[6]?.v);
      });
  }

  async function fetchToPrice() {
    if (tToken?.symbol === 'USD') {
      setCheck(1); // check to confirm that data is received
      setToPrice(1);

      setToValue(Number(fValue) * Number(fromPrice) * 1);
      // setExchangeRate(Number(fValue) * Number(tToken?.rateSell));
      setExchangeRate(parseFloat(fValue) * rateSell);
    }
    if (tToken?.symbol === 'EUR') {
      setCheck(rateUSDEUR); // check to confirm that data is received
      setToPrice(rateUSDEUR);

      setToValue(Number(fValue) * Number(fromPrice) * Number(rateUSDEUR));
      setExchangeRate(parseFloat(fValue) * rateSell);
    }
    if (tToken?.symbol === 'GBP') {
      setCheck(rateUSDGBP); // check to confirm that data is received
      setToPrice(rateUSDGBP);

      setToValue(Number(fValue) * Number(fromPrice) * Number(rateUSDGBP));
      setExchangeRate(parseFloat(fValue) * rateSell);
    }
    if (tToken?.symbol === 'RUB') {
      setCheck(rateUSDRUB); // check to confirm that data is received
      setToPrice(rateUSDRUB);
      setToValue(Number(fValue) * Number(fromPrice) * Number(rateUSDRUB));
      setExchangeRate(parseFloat(fValue) * rateSell);
    }
    if (tToken?.symbol === 'AUD') {
      setCheck(rateUSDAUD); // check to confirm that data is received
      setToPrice(rateUSDAUD);
      setToValue(Number(fValue) * Number(fromPrice) * Number(rateUSDAUD));
      setExchangeRate(parseFloat(fValue) * rateSell);
    }
    if (tToken?.symbol === 'AED') {
      setCheck(rateUSDAED); // check to confirm that data is received
      setToPrice(rateUSDAED);
      setToValue(Number(fValue) * Number(fromPrice) * Number(rateUSDAED));
      setExchangeRate(parseFloat(fValue) * rateSell);
    }
    if (tToken?.symbol === 'CAD') {
      setCheck(rateUSDCAD); // check to confirm that data is received
      setToPrice(rateUSDCAD);
      setToValue(Number(fValue) * Number(fromPrice) * Number(rateUSDCAD));
      setExchangeRate(parseFloat(fValue) * rateSell);
    }
    // setEstimatedGas(response?.estimatedGas);
  }

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
    localStorage.setItem('chainBalanceE', JSON.stringify(balance));

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
    getChainPrice(chainId);
    setIsBalanceLoading(false);
  }

  //==========={Rates}=================================

  async function getFromTokenPrice() {
    let rateUSDTUSDFormatted = Number(rateUSDTUSD).toFixed(8);
    let rateUSDTUSDString = rateUSDTUSDFormatted.toString();

    let fromPriceL;
    // let toPrice;

    //======={rateUSDTUSD from FrontEnd}=============
    if (fToken?.symbol === 'USDT') {
      fromPriceL = rateUSDTUSDString;
    } else {
      let response = await axios.get(
        `https://www.binance.com/api/v3/ticker/price?symbol=${fToken?.symbol}USDT`
      );
      if (response?.data) {
        fromPriceL = response.data?.price;
      }
    }
    setFromPrice(fromPriceL);
    // fetchToPrice()
  }

  async function getChainPrice(chainId) {
    let price;

    let symbol;
    let response;

    // switch (chainIdFormmated) {
    switch (Number(chainId)) {
      //MAINNETS
      //Arbitrum
      case 42161:
        symbol = 'ETH';
        response = await axios.get(
          `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (response?.data) {
          price = response.data?.price;
        }

        break;

      //Aurora
      case 1313161554:
        symbol = 'ETH';
        response = await axios.get(
          `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (response?.data) {
          price = response.data?.price;
        }
        break;

      //Avalanche
      case 43114:
        symbol = 'AVAX';
        response = await axios.get(
          `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (response?.data) {
          price = response.data?.price;
        }

        break;

      //Binance
      case 56:
        symbol = 'BNB';
        response = await axios.get(
          `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (response?.data) {
          price = response.data?.price;
        }

        break;

      //ETH
      case 1:
        symbol = 'ETH';
        response = await axios.get(
          `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (response?.data) {
          price = response.data?.price;
        }
        break;

      //Optimism
      case 10:
        symbol = 'ETH';
        response = await axios.get(
          `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (response?.data) {
          price = response.data?.price;
        }
        break;
      //gorliEth
      case 5:
        symbol = 'ETH';
        response = await axios.get(
          `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (response?.data) {
          price = response.data?.price;
        }

        break;

      //Polygon
      case 137:
        symbol = 'MATIC';
        response = await axios.get(
          `https://www.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (response?.data) {
          price = response.data?.price;
        }

        break;

      default:
        console.warn('Please choose a token!');
        break;
    }

    // console.log({ chainSymbol: symbol, chainPrice: price });

    let result = {
      chainPrice: price,
      chainSymbol: symbol,
    };

    setChainPrice(result?.chainPrice);

    // res.status(200).json(result);
  }

  useEffect(() => {
    chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);
  //===================================================
  async function contractSwitcher() {
    try {
      switch (chainId) {
        case 5:
          //GOERLIETH
          setDexContractAddress(GoExchangeToCashGoerliETH.address);
          setDexContractAbi(GoExchangeToCashGoerliETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setActiveChainTokens(tokensGoerli); // Goerli Test net
          break;

        case 80001:
          //MUMBAIMATIC
          setDexContractAddress(GoExchangeToCashMumbaiMATIC.address);
          setDexContractAbi(GoExchangeToCashMumbaiMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          setActiveChainTokens(tokensMumbai); // Mumbai Test net
          break;

        case 97:
          //TBNB
          setDexContractAddress(GoExchangeToCashTBNB.address);
          setDexContractAbi(GoExchangeToCashTBNB.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          setActiveChainTokens(tokensGoerli);
          break;

        case 1:
          //ETH
          setDexContractAddress(GoExchangeToCashETH.address);
          setDexContractAbi(GoExchangeToCashETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setActiveChainTokens(tokens);
          break;

        case 137:
          //MATIC
          setDexContractAddress(GoExchangeToCashMATIC.address);
          setDexContractAbi(GoExchangeToCashMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          setActiveChainTokens(tokensMumbai);
          break;

        case 56:
          //BNB(BSC)
          setDexContractAddress(GoExchangeToCashBSC.address);
          setDexContractAbi(GoExchangeToCashBSC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          setActiveChainTokens(tokensGoerli);
          break;

        case 10:
          //OPTIMISM (currency: ETH)
          setDexContractAddress(GoExchangeToCashOptimism.address);
          setDexContractAbi(GoExchangeToCashOptimism.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setActiveChainTokens(tokensGoerli);
          break;

        case 42161:
          //ARBITRUM
          setDexContractAddress(GoExchangeToCashArbitrum.address);
          setDexContractAbi(GoExchangeToCashArbitrum.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setActiveChainTokens(tokensGoerli);
          break;

        default:
          console.warn('Please choose a token!');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getApproval() {
    // return if there is an ongoing transaction
    if (transferStatus.status === 'inprogress') return;

    //======= setting transaction status
    setTransferStatus({
      status: 'inprogress',
      message: 'Transaction in progress...',
    });

    try {
      let approval = await sendToken_approval();
      // console.log("approval", approval);
      if (approval.hash) {
        setTransferStatus({
          status: 'inprogress',
          message: 'Approval granted.',
        });
        let cashOrder = await getCashOrder();
        console.log('cashOrder Status', cashOrder);
      } else {
        setTransferStatus({
          status: 'error',
          message: 'Approval declined',
        });
        console.error('approvalErr', approval);
      }
    } catch (e) {
      if (e.code === 'ACTION_REJECTED') {
        setTransferStatus({
          status: 'error',
          message: 'User rejected transaction',
        });
      } else if (e.code === 'UNPREDICTABLE_GAS_LIMIT') {
        setTransferStatus({
          status: 'error',
          message: 'Error due to unpredictable gas limit',
        });
      } else {
        setTransferStatus({
          status: 'error',
          message: 'An error occured',
        });
        console.error('transactionErr', e);
      }
    }
  }

  //==============================={sendToken_approval}===============================================
  async function sendToken_approval() {
    //========={signature}=====================
    signMessage();
    setSignature(data);

    let parsed = ethers.utils.parseUnits(
      transactionData?.fromValue.toString(),
      transactionData?.fromDecimals.toString()
    );
    //eslint-disable-next-line no-undef
    let amountStr = BigInt(parsed).toString();
    console.info('amountStr', amountStr);
    console.info('selectedToken', fToken);

    //======{Get Token Approval}=============================
    const ERC20Contract = new ethers.Contract(
      transactionData?.fromAddress,
      Erc20,
      signer.data
    );
    const approval = await ERC20Contract.approve(
      dexContractAddress.toString(),
      amountStr
    );

    await approval.wait();
    // console.info('approval', approval);
    return approval;
  }

  //==============================={getCashOrder: 1}===============================================
  // * Send service Fee and Crypto , so ERC20 token approval is required
  async function getCashOrder() {
    // return if there is an ongoing transaction
    if (transferStatus.status === 'inprogress') return;

    setTransferStatus({
      status: 'inprogress',
      message: 'Transferring...',
    });

    let dexContract = new ethers.Contract(
      dexContractAddress,
      dexContractAbi,
      signer.data // should be just "signer" if using windows.ethereum
    );

    let parsed = ethers.utils.parseUnits(
      transactionData?.fromValue.toString(),
      transactionData?.fromDecimals.toString()
    );
    //eslint-disable-next-line no-undef
    let amountStr = BigInt(parsed).toString();
    const dexShareStr = '10000000000000000';
    console.info('dexShareStr', dexShareStr);
    let cryptoPriceStr = amountStr;
    // Note: Always assign  service fee in string qouted value

    // let serviceFeeStr = dexShareStr;
    let currentbank = transactionData?.managerWalletAddress;
    // console.log('getCashOrder() --- currentbank', currentbank);
    setBankAddress(currentbank);
    let tokenDecimalsStr = transactionData?.fromDecimals.toString();
    let tokenAddressStr = transactionData?.fromAddress.toString();

    //====={2nd contract call: begin transaction}================================
    //========={Main contract function}=====================

    console.log('getCash');

    try {
      // const tx2 = await dexContract.getCash(
      //   // txId,
      //   //token.address, // for mainnnet
      //   fToken.testAddress,
      //   currentbank,
      //   cryptoPriceStr,
      //   serviceFeeStr,
      //   tokenDecimalsStr,
      //   dexShareStr,
      //   {
      //     value: serviceFeeStr,
      //     gasLimit: 3000000,
      //   }
      // );
      // const tx2 = await dexContract.getCash(
      //   // txId,
      //   //token.address, // for mainnnet
      //   tokenAddressStr,
      //   currentbank,
      //   cryptoPriceStr,
      //   tokenDecimalsStr,
      //   dexShareStr,
      //   {
      //     gasLimit: 3000000,
      //   }
      // );

      const tx2 = await dexContract.getCash(
        tokenAddressStr,
        currentbank,
        cryptoPriceStr,
        dexShareStr,
        tokenDecimalsStr,
        {
          gasLimit: 3000000,
        }
      );
      // console.log("tx2", tx2);

      let sendTransaction = await tx2.wait();
      //============={New}=============================================
      if (sendTransaction.status === 1) {
        localStorage.setItem(
          'transactionData',
          JSON.stringify(transactionData)
        ); // just for backup
        setCryptoOrderComplete(true);
        setTransferStatus({
          status: '200',
          message: 'Transfer Successful',
        });
        //==={New}=========================
        setNewTransaction({
          amount: transactionData?.fromValue,
          selectedBank: transactionData?.managerWalletAddress,
          token: transactionData?.fromAddress,
        });
      }
      console.log('sendTransaction', sendTransaction);
      return sendTransaction;
    } catch (e) {
      if (e.code === 'CALL_EXCEPTION') {
        setTransferStatus({
          status: 'error',
          message:
            'An Error occurred. Please check if you have sufficient balance',
        });
      } else if (e.code === 'ACTION_REJECTED') {
        setTransferStatus({
          status: 'error',
          message: 'User rejected transaction',
        });
      } else {
        setTransferStatus({
          status: 'error',
          message: 'An Error occurred.',
        });
      }
      console.error('swapCash', e);
    }
  }

  // //==============================={getCashOrder: 2}===============================================
  // // * Send service Fee and Crypto , so ERC20 token approval is required

  async function proceed() {
    if (!transactionData) {
      setTransferStatus({
        status: '309',
        message: 'One or more required fields are empty',
      });
      return;
    }
    /* ==================== Getting approval for getting cash ==================== */
    await getApproval();
  }

  //==============={fetch new Transaction  data from the blockchain}=========================

  useEffect(() => {
    if (cryptoOrderComplete) {
      setTimeout(() => {
        getClientsTransacts();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoOrderComplete]);

  async function getClientsTransacts() {
    let dexContract = new ethers.Contract(
      dexContractAddress,
      dexContractAbi,
      signer.data // should be just "signer" if using windows.ethereum
    );

    // const transact = await dexContract.getClientsHasNotReceivedCash();
    const transact = await dexContract.getClientsTransacts();
    const items = await Promise.all(
      transact.map(async (i) => {
        let CryptoPrice = ethers.utils.formatUnits(
          i.CryptoPrice.toString(),
          'ether'
        );
        let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), 'ether');
        let item = {
          txId: i.txId.toNumber(),
          token: i.token,
          client: i.client,
          bank: i.bank,
          CryptoPrice,
          tokenDecimals: i.tokenDecimals,
          dexShare,
          endBlock: i.endBlock,
          completed: i.completed,
          clientPaidCrypto: i.clientPaidCrypto,
          bankPaidCash: i.bankPaidCash,
          clientReceivedCash: i.clientReceivedCash,
          bankReceivedCrypto: i.bankReceivedCrypto,
          started: i.started,
        };
        //sumCryptoPrice += Number(CryptoPrice);
        // sumDexShare += Number(dexShare);
        return item;
      })
    );

    let latestTransactionIndex = items.length - 1;
    setTx(items[latestTransactionIndex]);
    setTxId(items[latestTransactionIndex]?.txId);
    setCryptoOrderComplete(false);
    setClientsTransacts(true);
  }

  useEffect(() => {
    if (clientsTransacts) {
      setTimeout(() => {
        updateTransactionStatus();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsTransacts]);

  useEffect(() => {
    if (getExchangeVoucherForIdComplete) {
      setTimeout(() => {
        updateTransaction();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getExchangeVoucherForIdComplete]);

  const updateTransactionStatus = async () => {
    // if (!txId) {
    //   return;
    // }

    if (transactionDataL) {
      // const userData = {
      //   id: transactionDataL?._id,
      //   txId: tx?.txId,
      //   status: 'Active',
      // };

      const userData = {
        id: transactionDataL?._id,
        txId: tx?.txId,
        status: 'Active',
        completed: tx?.completed,
        clientPaidCrypto: tx?.clientPaidCrypto,
        bankPaidCash: tx?.bankPaidCash,
        clientReceivedCash: tx?.clientReceivedCash,
        bankReceivedCrypto: tx?.bankReceivedCrypto,
      };

      const data = await updateTransactionById(userData);
      setClientsTransacts(false);
      if (data) {
        console.log({ userTransactionInfo: data });
        // setTransactionData(data);
      }
    }
  };

  const updateTransaction = async () => {
    if (!txId) {
      return;
    }

    if (transactionData && getExchangeVoucherForIdComplete) {
      const userData = {
        id: transactionData?._id,
        // txId: tx?.txId,
        txId: transactionData?.txId,
        status: 'Active',
        completed: newTx?.completed,
        clientPaidCrypto: newTx?.clientPaidCrypto,
        bankPaidCash: newTx?.bankPaidCash,
        clientReceivedCash: newTx?.clientReceivedCash,
        bankReceivedCrypto: newTx?.bankReceivedCrypto,
      };
      const data = await updateTransactionById(userData);
      setGetExchangeVoucherForIdComplete(false);
      if (data) {
        console.log({ userTransactionInfo: data });
        // setTransactionData(data);
      }
    }
  };

  useEffect(() => {
    if (isActiveBlockchain && transactionData) {
      getExchangeVoucherForId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveBlockchain, transactionData]);

  useEffect(() => {
    if (clientPayCashComplete) {
      setTimeout(() => {
        getExchangeVoucherForId();
      }, [1000]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientPayCashComplete]);

  // only used when transactionData?.status === "Active"
  async function getExchangeVoucherForId() {
    if (!transactionData.txId) {
      return;
    }
    let dexContract = new ethers.Contract(
      dexContractAddress,
      dexContractAbi,
      signer.data // should be just "signer" if using windows.ethereum
    );

    console.info('fetching Pay Cash transactions');
    const i = await dexContract.getExchangeVoucherForId(
      transactionData?.txId.toString()
    );
    // const i = await dexContract.getExchangeVoucherForId(tx?.txId);
    // const i = await dexContract.getExchangeVoucherForId('3');
    // setNewTx(i);
    // localStorage.setItem('newTx', JSON.stringify(i));

    let CryptoPrice = ethers.utils.formatUnits(
      i.CryptoPrice.toString(),
      'ether'
    );
    let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), 'ether');
    let item = {
      txId: i.txId.toNumber(),
      token: i.token,
      client: i.client,
      bank: i.bank,
      CryptoPrice,
      tokenDecimals: i.tokenDecimals,
      dexShare,
      endBlock: i.endBlock,
      completed: i.completed,
      clientPaidCrypto: i.clientPaidCrypto,
      bankPaidCash: i.bankPaidCash,
      clientReceivedCash: i.clientReceivedCash,
      bankReceivedCrypto: i.bankReceivedCrypto,
      started: i.started,
    };
    //======{For Progress bar update}==================
    setNewTx(item);
    localStorage.setItem('newTx', JSON.stringify(item));
    setClientPayCashComplete(false);
    setGetExchangeVoucherForIdComplete(true);

    console.log('client transact', i);
  }

  //=================={Create Transaction in database}=====================

  const startTransaction = async () => {
    if (!walletAddress || Number(fValue) < 0) {
      setTransferStatus({
        status: '309',
        message: 'One or more required fields are empty',
      });
      return;
    }

    setNextPage(true);
  };

  const submitTransaction = async () => {
    if (!walletAddress || Number(fValue) < 0) {
      setTransferStatus({
        status: '309',
        message: 'One or more required fields are empty',
      });
      return;
    }

    setTransferStatus({
      status: 'inprogress',
      message: 'Transaction in progress...',
    });

    const userData = {
      userId: user?._id ? user?._id : user?.userId,
      country: 'Russia',
      state: city,
      city: city,
      walletAddress,
      chainId,
      fromAddress: fToken.testAddress, // test net
      fromDecimals: fToken?.decimals,
      fromSymbol: fToken?.symbol,
      fromValue: fValue,
      toSymbol: tToken?.symbol,
      toValue: tValue,
      service: 'buy',
      telegram,
      phone,
      comment,
    };

    const data = await createTransaction(userData);

    setTransferStatus({
      status: '200',
      message: 'Request Submitted',
    });

    setTimeout(() => {
      setTransferStatus({
        status: '',
        message: '',
      });
    }, 3000);
    setNextPage(false);
    setIsProcessingOrder(true);
  };

  //==============={Update bank information}=========================
  useEffect(() => {
    if (!allActiveBanks) {
      updateBanks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allActiveBanks]);

  const updateBanks = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/user/adminUsers`);
      console.log(data);

      let newBanks = [];

      if (data) {
        data?.map(async (b) => {
          if (b?.isAdmin === true) newBanks.push(b);
        });
      }
      setAllActiveBanks(newBanks);
      localStorage.setItem('adminId', JSON.stringify(newBanks[0]?.id)); // just for backup

      // localStorage.setItem('groupSearchResult', JSON.stringify(data));
      // setGroupSearchResult(data); // to be updated
    } catch (error) {
      toast.error('Error Occured!');
    }
  };

  const mainTransactionData = (
    <div
      className={`outline outline-[var(--color-slateblue)] bg-[var(--color-gray-400-z)] rounded-lg ${stylesSwap.frameGroupCustom}`}
    >
      <div className={stylesFromToken.selectATokenParent}>
        <div className={stylesFromToken.selectAToken}>Transaction Summary</div>
        <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-1 rounded-lg bg-gray-300 hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#130D1A"
            className="w-5 h-5"
            onClick={() => {
              updateTransactionStatus();
              setIsBlockchain(false);
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className={stylesFromToken.frameChild} />
      <div className="">
        <p className="">{`progress Bar`}</p>
      </div>
      <div className="mt-2 flex flex-col gap-2 px-1 p-y-1 outline outline-[var(--color-slateblue)] rounded-lg">
        <p className="">{`orderNo: ${transactionData?.orderNo}`}</p>
        {/* <p className="">{`fromToken: ${transactionData?.fromSymbol}`}</p>
        <p className="">{`toToken: ${transactionData?.toSymbol}`}</p> */}
        <p className="">{`you send: ${Number(
          transactionData?.fromValue
        ).toFixed(2)} ${transactionData?.fromSymbol}`}</p>
        <p className="">{`you get: ${Number(transactionData?.toValue).toFixed(
          2
        )} ${transactionData?.toSymbol}`}</p>
      </div>
      <>
        {isConnected && !transferStatus.status && (
          <>
            <div
              className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
              disabled={
                !isConnected || transferStatus.status === 'inprogress'
                  ? true
                  : false
              }
              onClick={() => {
                proceed();
                localStorage.setItem('isBlockchain', JSON.stringify(false));
              }}
            >
              <div
                className={`font-medium text-text-2-d ${stylesSwapTx.connectWallet}`}
              >
                {transferStatus.status !== 'inprogress' ? (
                  'Proceed'
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </>
        )}
        {isConnected && transferStatus.status !== '' && (
          <div
            className={`mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill ${
              transferStatus.status === '200'
                ? 'success'
                : transferStatus.status === '309'
                ? 'warn'
                : transferStatus.status === 'inprogress'
                ? 'info'
                : 'error'
            }`}
            onClick={() => {
              setTransferStatus({ status: '', message: '' });
              updateTransactionStatus();
              setIsBlockchain(false);
            }}
          >
            <div className={`font-medium ${stylesSwapTx.connectWallet}`}>
              {transferStatus.message}
            </div>
          </div>
        )}
        {!isConnected && (
          <div
            className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
            onClick={() => {
              setIsConnecting(true);
              setIsChainModalVisible(true);
            }}
          >
            <img className="h-6 w-6" src="/connect-wallet-90.png" alt="" />
            <div className={`font-medium ${stylesSwapTx.connectWallet}`}>
              Connect
            </div>
          </div>
        )}
      </>
    </div>
  );

  const activeTransactionData = (
    <div
      className={`outline outline-[var(--color-slateblue)] bg-[var(--color-gray-400-z)] rounded-lg ${stylesSwap.frameGroupCustom}`}
    >
      <div className={stylesFromToken.selectATokenParent}>
        <div className={stylesFromToken.selectAToken}>Transaction Summary</div>
        <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-1 rounded-lg bg-gray-300 hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#130D1A"
            className="w-5 h-5"
            onClick={() => {
              updateTransaction(); // update
              setIsActiveBlockchain(false); // set as false
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className={stylesFromToken.frameChild} />
      <div className="">
        <p className="">{`progress Bar`}</p>
      </div>
      <div className="mt-2 flex flex-col gap-2 px-1 p-y-1 outline outline-[var(--color-slateblue)] rounded-lg">
        <p className="">{`orderNo: ${transactionData?.orderNo}`}</p>
        <p className="">{`blockchain Id: ${transactionData?.txId}`}</p>
        {/* <p className="">{`fromToken: ${transactionData?.fromSymbol}`}</p>
        <p className="">{`toToken: ${transactionData?.toSymbol}`}</p> */}
        <p className="">{`you send: ${Number(
          transactionData?.fromValue
        ).toFixed(2)} ${transactionData?.fromSymbol}`}</p>
        <p className="">{`you get: ${Number(transactionData?.toValue).toFixed(
          2
        )} ${transactionData?.toSymbol}`}</p>
      </div>
      <>
        {isConnected && !transferStatus.status && (
          <>
            <div className="flex flex-row gap-2">
              <div
                className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
                disabled={
                  !isConnected || transferStatus.status === 'inprogress'
                    ? true
                    : false
                }
                onClick={() => {
                  proceedClientGetCash();
                  localStorage.setItem(
                    'isActiveBlockchain',
                    JSON.stringify(false)
                  );
                }}
              >
                <div
                  className={`font-medium text-text-2-d ${stylesSwapTx.connectWallet}`}
                >
                  {transferStatus.status !== 'inprogress' ? 'Yes' : <Spinner />}
                </div>
              </div>
              <div
                className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
                disabled={
                  !isConnected || transferStatus.status === 'inprogress'
                    ? true
                    : false
                }
                // onClick={() => {
                //   localStorage.setItem(
                //     'isActiveBlockchain',
                //     JSON.stringify(false)
                //   );
                // }}
              >
                <div
                  className={`font-medium text-text-2-d ${stylesSwapTx.connectWallet}`}
                >
                  {transferStatus.status !== 'inprogress' ? 'No' : <Spinner />}
                </div>
              </div>
            </div>
          </>
        )}
        {isConnected && transferStatus.status !== '' && (
          <div
            className={`mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill ${
              transferStatus.status === '200'
                ? 'success'
                : transferStatus.status === '309'
                ? 'warn'
                : transferStatus.status === 'inprogress'
                ? 'info'
                : 'error'
            }`}
            onClick={() => {
              setTransferStatus({ status: '', message: '' });
              updateTransaction();
              setIsActiveBlockchain(false);
            }}
          >
            <div className={`font-medium ${stylesSwapTx.connectWallet}`}>
              {transferStatus.message}
            </div>
          </div>
        )}
        {!isConnected && (
          <div
            className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
            onClick={() => {
              setIsConnecting(true);
              setIsChainModalVisible(true);
            }}
          >
            <img className="h-6 w-6" src="/connect-wallet-90.png" alt="" />
            <div className={`font-medium ${stylesSwapTx.connectWallet}`}>
              Connect
            </div>
          </div>
        )}
      </>
    </div>
  );

  /****************************************************************************************************
   * **************************************************************************************************
   *  *  * *******************************                      ***************************************
   *  * ***********************************{Confirmations Block}***************************************
   *  *  * *******************************                      ***************************************
   *  * **************************************************************************************************
   */

  async function proceedClientGetCash() {
    if (!transactionData) {
      setTransferStatus({
        status: '309',
        message: 'One or more required fields are empty',
      });
      return;
    }
    await clientGetCash();
  }

  async function clientGetCash() {
    if (transferStatus.status === 'inprogress') return;

    if (transactionData?.txId > 0) {
      setTransferStatus({
        status: 'inprogress',
        message: 'Transaction in progress...',
      });

      try {
        let dexContract = new ethers.Contract(
          dexContractAddress,
          dexContractAbi,
          signer.data // should be just "signer" if using windows.ethereum
        );

        let transaction = await dexContract.clientGetCash(
          transactionData?.txId.toString()
        );

        let sendTransaction = await transaction.wait();

        if (sendTransaction.status === 1) {
          setClientPayCashComplete(true); // refetch latest transaction for progress Bar update
          setTransferStatus({
            status: '200',
            message: 'Request sent',
          });
          setNewTransaction({
            amount: transactionData?.fValue,
            // selectedBank: managerWalletAddress,
            selectedBank: transactionData?.managerWalletAddress,

            // token: fToken,
            token: transactionData?.fromAddress,
          });
        }
        console.log(transaction);

        alert('Transaction completed. You have received the cash!');
      } catch (e) {
        if (e.code === 'CALL_EXCEPTION') {
          setTransferStatus({
            status: 'error',
            message:
              'An Error occurred. Please check if you have sufficient balance',
          });
        } else if (e.code === 'ACTION_REJECTED') {
          setTransferStatus({
            status: 'error',
            message: 'User rejected transaction',
          });
        } else {
          setTransferStatus({
            status: 'error',
            message: 'An Error occurred.',
          });
        }
        console.error('swapCash', e);
      }
    }
  }

  /****************************************************************************************************
   * **************************************************************************************************
   *  *  * *******************************                      ***************************************
   *  * ***********************************{Confirmations Block}***************************************
   *  *  * *******************************                      ***************************************
   *  * **************************************************************************************************
   */

  return (
    <>
      <>
        {/* ==============================={Desktop View}====================================== */}
        {/* Connect Wallet */}
        {isConnected === false && isConnecting === true ? (
          // <div className={stylesFromToken.frameContainer}>
          <div className={`${stylesSwap.frameGroupCustom}`}>
            <div className={stylesFromToken.selectATokenParent}>
              <div className={stylesFromToken.selectAToken}>Connect Wallet</div>
              <div
                className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
              >
                <img
                  className={stylesFromToken.xCloseIcon}
                  onClick={() => {
                    setIsConnecting(false);
                  }}
                  alt=""
                  src="/xclose.svg"
                />
              </div>
            </div>
            <div className={stylesFromToken.frameChild} />
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                // onClick={() => open()}
                onClick={() => {
                  connect({ connector: connectors[0] });
                  setActiveConnection(connectors[0]);
                }}
              >
                <img
                  className="relative w-10 h-10 shrink-0 overflow-hidden"
                  alt=""
                  src="/wallet-icon8.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  MetaMask
                </div>

                {activeConnection?.name === connectors[0]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>

              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                onClick={() => {
                  connect({ connector: connectors[3] });
                  setActiveConnection(connectors[3]);
                }}
              >
                <img
                  className="relative w-10 h-10 shrink-0 overflow-hidden"
                  alt=""
                  src="/walletlink.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Coinbase Wallet
                </div>
                {activeConnection?.name === connectors[3]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                onClick={() => {
                  connect({ connector: connectors[2] });
                  setActiveConnection(connectors[2]);
                }}
              >
                <img
                  className="relative w-10 h-10 shrink-0 overflow-hidden"
                  alt=""
                  src="/walletconnect.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Wallet Connect
                </div>
                {activeConnection?.name === connectors[2]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                // onClick={() => open()}
                onClick={() => {
                  connect({ connector: connectors[4] });
                  setActiveConnection(connectors[4]);
                }}
              >
                <img
                  className="relative rounded-xl w-10 h-10 shrink-0"
                  alt=""
                  src="/frame-1321314394.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Ledger
                </div>
                {activeConnection?.name === connectors[4]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
              <div
                className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-4 items-center justify-start gap-[16px] cursor-pointer hover:bg-secondaryFill"
                // onClick={() => open()}
                onClick={() => {
                  connect({ connector: connectors[3] });
                  setActiveConnection(connectors[3]);
                }}
              >
                <img
                  className="relative w-[34.29px] h-10 shrink-0"
                  alt=""
                  src="/bravelogosanstext-21.svg"
                />
                <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                  Brave
                </div>
                {activeConnection?.name === connectors[3]?.name ? (
                  <div className="rounded-9xl bg-surface-success-d flex flex-row py-1 pr-3 pl-2 items-center justify-start gap-[8px] text-sm text-text-success-d">
                    <img
                      className="relative w-2 h-2 shrink-0"
                      alt=""
                      src="/ellipse-1.svg"
                    />
                    <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                      Connected
                    </div>
                  </div>
                ) : (
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright1.svg"
                  />
                )}
              </div>
            </div>
            <div className="self-stretch rounded-xl bg-surface-tint-d-8 flex flex-row p-4 items-center justify-start gap-[16px] text-surface-tint-64-d">
              <input
                className="cursor-pointer rounded-md [background:radial-gradient(50%_50%_at_50%_50%,_#5a38a3,_#683fab_31.77%,_#9d52ff_68.23%,_#edbcfc_96.35%)] w-5 h-5 shrink-0 overflow-hidden flex flex-row p-1 box-border items-center justify-center"
                // className="cursor-pointer rounded-md [background:radial-gradient(59.21% 78.44% at 50% 50%, #5A38A3 0%, #683FAB 31.77%, #9D52FF 68.23%, #EDBCFC 96.35%)] w-5 h-5 shrink-0 overflow-hidden flex flex-row p-1 box-border items-center justify-center"
                type="checkbox"
                required
                autoFocus
                defaultChecked={true}
              />
              <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
                <p className="m-0">I have read, understand, and agree to the</p>
                <p className="m-0 text-mediumslateblue">Terms of Service</p>
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
            {/* <div className={stylesFromToken.frameContainer}> */}
            <div className={`${stylesSwap.frameGroupCustom}`}>
              <div className={stylesFromToken.selectATokenParent}>
                <div className={stylesFromToken.selectAToken}>
                  Select a Network
                </div>

                <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-1 rounded-lg bg-gray-300 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#130D1A"
                    className="w-5 h-5"
                    onClick={() => {
                      setIsChainModalVisible(false);
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className={stylesFromToken.frameChild} />
              <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[8px] overflow-y-auto">
                <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
                  {isConnected ? (
                    <div className="self-stretch">
                      {networksOptionsExchange?.map((c, idx) => (
                        <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
                          <div
                            className="px-3 py-2 w-full flex flex-row gap-4"
                            key={idx}
                            onClick={() => {
                              switchNetwork(c.id);
                              setChain(c);
                              setIsChainModalVisible(false);
                              localStorage.setItem(
                                'chainSwitchE',
                                JSON.stringify(true)
                              );
                            }}
                          >
                            <img
                              src={c.logoURI}
                              alt="logo"
                              className="w-8 h-8"
                            />

                            <div className="flex flex-col">
                              <span className="text-xs text-primary">
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
                      {networksOptionsExchange?.map((c, idx) => (
                        <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
                          <div
                            className="px-3 py-2 w-full flex flex-row gap-4"
                            key={idx}
                            onClick={() => {
                              setChain(c);
                              setIsChainModalVisible(false);

                              localStorage.setItem(
                                'chainSwitchE',
                                JSON.stringify(true)
                              );
                            }}
                          >
                            <img
                              src={c.logoURI}
                              alt="logo"
                              className="w-8 h-8"
                            />

                            <div className="flex flex-col">
                              <span className="text-xs text-primary">
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

        {/* ================================{SWAP MAIN ACTIVE STATE}===================================== */}

        {isChainModalVisible === false &&
        isFromTokenPage === false &&
        isToTokenPage === false &&
        isSlippagePage === false &&
        isSettings === false &&
        isConnecting === false ? (
          <>
            {isBlockchain && !isActiveBlockchain ? (
              <>{mainTransactionData}</>
            ) : null}
            {!isBlockchain && isActiveBlockchain ? (
              <>{activeTransactionData}</>
            ) : null}
            {!isBlockchain && !isActiveBlockchain ? (
              <>
                {/* ================================{STEP 1: CREATE ORDER}===================================== */}
                {!nextPage && !isProcessing && !isDelivery ? (
                  <div
                    className={`outline outline-outlineSwap ${stylesSwap.frameGroupCustom}`}
                  >
                    <div className={`mb-2 ${stylesSwap.swapGroup}`}>
                      <div
                        className={`cursor-pointer font-medium hover:text-gray-600 justify-center ${stylesSwap.swap1}`}
                        onClick={() => setIsExchangingActive(false)}
                      >
                        <div className="flex flex-row justify-between w-[60px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                          <span className="flex">Sell</span>
                        </div>
                      </div>
                      <div className="cursor-pointer flex flex-row justify-center items-center p-1 rounded-full bg-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#130D1A"
                          className="w-5 h-5"
                          onClick={() => {
                            setIsSettings(true);
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className={`${stylesSwap.swapGroup}`}>
                      <div
                        className={`cursor-pointer font-medium text-[16px] ${stylesSwap.swap1}`}
                        // onClick={submitTransaction}
                        onClick={getExchangeVoucherForId}
                        // getExchangeVoucherForId
                        // onClick={getTx}
                        // onClick={getClientsTransacts}
                        // onClick={updateTransactionStatus}
                        //
                      >
                        {/* From */}
                        You spend
                      </div>
                      {isConnected ? (
                        <>
                          {isDisconnecting ? (
                            <div
                              className="cursor-pointer flex flex-row justify-center items-center p-1 rounded-full bg-gray-300"
                              onClick={() => {
                                disconnect();
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#130D1A"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          ) : (
                            <button
                              className="cursor-pointer shadow-lg border-none flex flex-row justify-center items-center px-2 rounded-md bg-cardBg text-primary font-medium text-[16px]"
                              onClick={() => {
                                setIsDisconnecting(true);
                              }}
                            >
                              <div className={stylesSwap.ethereum}>
                                {address.substring(0, 6) +
                                  '...' +
                                  address.substring(10, 14)}
                              </div>
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          className="cursor-pointer border-none flex flex-row justify-center items-center px-2 rounded-md bg-connectButton text-connectText font-[14px]"
                          onClick={() => {
                            setIsConnecting(true);
                            setIsChainModalVisible(true);
                          }}
                        >
                          {' '}
                          connect wallet
                        </button>
                      )}
                    </div>
                    <div className={stylesSwap.frameDiv}>
                      <div
                        className={`shadow-lg border ${stylesSwap.frameParent1}`}
                      >
                        <div className={stylesSwap.frameParent2}>
                          <div
                            className={`justify-between ${stylesSwap.frameParent3}`}
                          >
                            <div
                              className={`flex flex-row rounded-md cursor-pointer justify-between bg-surface-tint-d-8 shadow-lg ${stylesSwap.tokenButton}`}
                              onClick={() => setIsFromTokenPage(true)}
                            >
                              <div className="flex flex-row gap-2">
                                <img
                                  className={stylesSwap.protocolIcon}
                                  alt=""
                                  src={
                                    fSymbol === 'BNB' ? '/bnb.png' : fLogoURI
                                  }
                                />
                                <div className={`mr-4 ${stylesSwap.eth}`}>
                                  {fSymbol}
                                </div>
                              </div>
                              <div className="flex flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="#130D1A"
                                  className={`justify-end ${stylesSwap.chevronDownIcon}`}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div
                              className={`flex flex-row rounded-md cursor-pointer justify-between bg-surface-tint-d-8 shadow-lg ${stylesSwap.tokenButton}`}
                              onClick={() => {
                                setIsChainModalVisible(true);
                              }}
                            >
                              <div className="flex flex-row gap-2">
                                <img
                                  className={stylesSwap.protocolIcon}
                                  alt=""
                                  src={chain?.logoURI}
                                />
                                <div className={`mr-4 ${stylesSwap.eth}`}>
                                  {chain?.name}
                                </div>
                              </div>
                              <div className="flex flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="#130D1A"
                                  className={`justify-end ${stylesSwap.chevronDownIcon}`}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <input
                            className={`focus:outline-0 [border:none] font-satoshi font-medium  text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-left`}
                            type="text"
                            pattern="[0-9]*.[0-9]*"
                            placeholder={'0.0'}
                            value={fValue}
                            onChange={onFromValueChanged}
                          />

                          <div
                            className={`text-text-2-d justify-between ${stylesSwap.balance0Parent}`}
                          >
                            <div className={`${stylesSwap.documentation}`}>
                              {isFromLoading
                                ? ''
                                : `~$${
                                    fValue
                                      ? new Intl.NumberFormat().format(
                                          Number(fValue) * Number(fromPrice)
                                        )
                                      : ''
                                  }`}
                            </div>
                            <div
                              className={`${stylesSwap.transactionDetails} ${
                                isFromLoading
                                  ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                                  : ''
                              }`}
                            >
                              {isFromLoading
                                ? ''
                                : `Balance: ${fromBalance.toString() || ''}`}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`mt-6 ${stylesSwap.swapGroup}`}>
                        <div
                          className={`cursor-pointer font-medium text-[16px] ${stylesSwap.swap1}`}
                        >
                          {/* To */}
                          You get
                        </div>
                        <div
                          className="cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-180 flex flex-row justify-center items-center  h-[26px] w-[26px] rounded bg-connectButton"
                          onClick={swapTokensPosition}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#CFADFF"
                            className="w-4 h-4"
                            onClick={() => {
                              setIsSlippagePage(true);
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className={`shadow-lg border ${stylesSwap.frameWrapper}`}
                      >
                        <div className={stylesSwap.frameParent2}>
                          <div className={stylesSwap.frameParent3}>
                            <div
                              className={`flex flex-row rounded-md cursor-pointer justify-between bg-surface-tint-d-8 shadow-lg ${stylesSwap.tokenButton}`}
                              onClick={() => setIsToTokenPage(true)}
                            >
                              <div className="flex flex-row gap-2">
                                <img
                                  className={stylesSwap.protocolIcon}
                                  alt=""
                                  src={
                                    tSymbol === 'BNB' ? '/bnb.png' : tLogoURI
                                  }
                                />
                                <div className={`mr-4 ${stylesSwap.eth}`}>
                                  {tSymbol}
                                </div>
                              </div>
                              <div className="flex flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="#130D1A"
                                  className={`justify-end ${stylesSwap.chevronDownIcon}`}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div
                              className={`flex flex-row bg-estimateBg rounded-lg border shadow-lg ${stylesSwap.estimateButton}`}
                            >
                              <b
                                className={`text-estimateText font-medium px-2 py-2 text-[12px]`}
                              >
                                {/* {isToLoading
                    ? 'Fetching price...'
                    : `${`1 ${fSymbol} = ${exchangeRate.toFixed(
                        3
                      )}  ${tSymbol}`}`} */}
                                {isToLoading
                                  ? 'Fetching price...'
                                  : `${`1 ${fSymbol} = ${Number(
                                      fromPrice
                                    ).toFixed(3)}  ${tSymbol}`}`}
                              </b>
                            </div>
                          </div>
                          <input
                            className={`[border:none] font-satoshi font-medium text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-left ${
                              isToLoading
                                ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
                                : ''
                            }`}
                            type="text"
                            pattern="[0-9]*.[0-9]*"
                            placeholder={isToLoading ? '' : '0.0'}
                            // value={
                            //   isToLoading
                            //     ? ''
                            //     : tValue &&
                            //       (Number(tValue) * Number(toPrice)).toFixed(4)
                            // }
                            value={
                              isToLoading
                                ? ''
                                : tValue && exchangeRate.toFixed(4)
                            }
                            disabled={true}
                          />
                          <div
                            className={`text-text-2-d justify-between ${stylesSwap.balance0Parent}`}
                          >
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
                        </div>
                      </div>
                    </div>

                    {!isConnected && (
                      <div
                        className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
                        onClick={() => {
                          setIsConnecting(true);
                          setIsChainModalVisible(true);
                        }}
                      >
                        <img
                          className="h-6 w-6"
                          src="/connect-wallet-90.png"
                          alt=""
                        />
                        <div
                          className={`font-medium ${stylesSwapTx.connectWallet}`}
                        >
                          Connect
                        </div>
                      </div>
                    )}

                    {isConnected && !transferStatus.status && (
                      <>
                        <div
                          className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
                          disabled={!isConnected || Number(fValue) <= 0}
                          onClick={startTransaction}
                        >
                          <div
                            className={`font-medium text-text-2-d ${stylesSwapTx.connectWallet}`}
                          >
                            {transferStatus.status !== 'inprogress' ? (
                              'Send'
                            ) : (
                              <Spinner />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {isConnected && transferStatus.status !== '' && (
                      <div
                        className={`mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill ${
                          transferStatus.status === '200'
                            ? 'success'
                            : transferStatus.status === '309'
                            ? 'warn'
                            : transferStatus.status === 'inprogress'
                            ? 'info'
                            : 'error'
                        }`}
                        onClick={() =>
                          setTransferStatus({ status: '', message: '' })
                        }
                      >
                        <div
                          className={`font-medium ${stylesSwapTx.connectWallet}`}
                        >
                          {transferStatus.message}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
                {/* ================================{STEP 2: ENTER DELIVERY INFO}===================================== */}
                {nextPage && !isProcessing && !isDelivery ? (
                  <div
                    className={`outline outline-outlineSwap ${stylesSwap.frameGroupCustom}`}
                  >
                    <div className={`mb-2 ${stylesSwap.swapGroup}`}>
                      <div
                        className={`cursor-pointer w-full font-medium hover:text-gray-600 justify-center ${stylesSwap.swap1}`}
                        onClick={() => setNextPage(false)}
                      >
                        <div className="flex flex-row justify-between w-[100px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                          <span className="flex">Delivery</span>
                        </div>
                      </div>
                      <div className="cursor-pointer flex flex-row justify-center items-center p-1 rounded-full bg-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#130D1A"
                          className="w-5 h-5"
                          onClick={() => {
                            setIsSettings(true);
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className={stylesSwap.frameDiv}>
                      <div className={`mt-6 ${stylesSwap.swapGroup}`}>
                        <div
                          className={`cursor-pointer font-medium text-[16px] ${stylesSwap.swap1}`}
                        >
                          <div className="flex flex-row justify-start items-center gap-1">
                            <img
                              className="h-4 w-5"
                              src="/location-icon.svg"
                              alt=""
                            />

                            <span className="h-5">City</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`shadow-lg border ${stylesSwap.frameWrapper}`}
                      >
                        <select
                          name="city"
                          className={`[border:none] outline-none w-full font-satoshi font-medium text-[14px] bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-2-d text-left`}
                          value={city}
                          onChange={(ev) => setCity(ev.target.value)}
                        >
                          <option value="">Choose city</option>
                          {cities &&
                            cities.map((city, index) => (
                              <option key={index} value={city?.name}>
                                {city?.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className={`mt-6 ${stylesSwap.swapGroup}`}>
                        <div
                          className={`cursor-pointer font-medium text-[16px] ${stylesSwap.swap1}`}
                        >
                          <div className="flex flex-row justify-start items-center gap-1">
                            <img
                              className="h-4 w-5"
                              src="/telegram-icon.svg"
                              alt=""
                            />

                            <span className="h-5"> Telegram</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`shadow-lg border ${stylesSwap.frameWrapper}`}
                      >
                        <input
                          type="text"
                          className={`[border:none] outline-none w-full font-satoshi font-medium text-[14px] bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-2-d text-left`}
                          placeholder={'@grayjones'}
                          value={telegram}
                          onChange={(ev) => setTelegram(ev.target.value)}
                        />
                      </div>

                      <div className={`mt-6 ${stylesSwap.swapGroup}`}>
                        <div
                          className={`cursor-pointer font-medium text-[16px] ${stylesSwap.swap1}`}
                        >
                          <div className="flex flex-row justify-start items-center gap-1">
                            <img
                              className="h-4 w-5"
                              src="/phone-icon.svg"
                              alt=""
                            />

                            <span className="h-5"> Phone</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`shadow-lg border ${stylesSwap.frameWrapper}`}
                      >
                        <input
                          type="text"
                          className={`[border:none] outline-none w-full font-satoshi font-medium text-[14px] bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-2-d text-left`}
                          placeholder="+7 980 000 000?"
                          value={phone}
                          onChange={(ev) => setPhone(ev.target.value)}
                        />
                      </div>

                      <div className={`mt-6 ${stylesSwap.swapGroup}`}>
                        <div
                          className={`cursor-pointer font-medium text-[16px] ${stylesSwap.swap1}`}
                        >
                          <div className="flex flex-row justify-start items-center gap-1">
                            <img
                              className="h-4 w-5"
                              src="/comment-icon.svg"
                              alt=""
                            />

                            <span className="h-5"> Comment</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`shadow-lg border ${stylesSwap.frameWrapper}`}
                      >
                        <textarea
                          className={`[border:none] outline-none w-full font-satoshi font-medium text-[14px] bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-2-d text-left`}
                          placeholder="Please phone me when nearby?"
                          value={comment}
                          onChange={(ev) => setComment(ev.target.value)}
                        />
                      </div>
                    </div>

                    {isConnected && !transferStatus.status && (
                      <>
                        <div
                          className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
                          disabled={!isConnected || Number(fValue) <= 0}
                          onClick={submitTransaction}
                        >
                          <div
                            className={`font-medium text-text-2-d ${stylesSwapTx.connectWallet}`}
                          >
                            {transferStatus.status !== 'inprogress' ? (
                              'Submit'
                            ) : (
                              <Spinner />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {isConnected && transferStatus.status !== '' && (
                      <div
                        className={`mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill ${
                          transferStatus.status === '200'
                            ? 'success'
                            : transferStatus.status === '309'
                            ? 'warn'
                            : transferStatus.status === 'inprogress'
                            ? 'info'
                            : 'error'
                        }`}
                        onClick={() =>
                          setTransferStatus({ status: '', message: '' })
                        }
                      >
                        <div
                          className={`font-medium ${stylesSwapTx.connectWallet}`}
                        >
                          {transferStatus.message}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
                {/* ================================{STEP 3: ORDER PROCESSING STATUS}===================================== */}
                {!nextPage && isProcessingOrder && !isDelivery ? (
                  <div
                    className={`outline outline-outlineSwap ${stylesSwap.frameGroupCustom}`}
                  >
                    <div className={`mb-2 ${stylesSwap.swapGroup}`}>
                      <div
                        className={`cursor-pointer w-full font-medium hover:text-gray-600 justify-center ${stylesSwap.swap1}`}
                        onClick={() => setIsProcessingOrder(false)}
                      >
                        <div className="flex flex-row justify-between w-[100px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                          <span className="flex">Process</span>
                        </div>
                      </div>
                      <div className="cursor-pointer flex flex-row justify-center items-center p-1 rounded-full bg-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#130D1A"
                          className="w-5 h-5"
                          onClick={() => {
                            setIsSettings(true);
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className={stylesSwap.frameDiv}>
                      <div className={`mt-6 ${stylesSwap.swapGroup}`}>
                        <div
                          className={`cursor-pointer font-medium text-[16px] ${stylesSwap.swap1}`}
                        >
                          <div
                            className={`shadow-lg border ${stylesSwap.frameWrapper}`}
                          >
                            <div className="flex flex-col justify-start items-center gap-1">
                              <div className="mt-12 mb-12 flex flex-col justify-center items-center gap-10">
                                <svg
                                  aria-hidden="true"
                                  className="w-[50px] h-[50px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              </div>

                              <span className="h-5">
                                {' '}
                                Please hold while we process your request..
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isConnected && !transferStatus.status && (
                      <>
                        <div
                          className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
                          onClick={() => setIsProcessingOrder(false)}
                        >
                          <div
                            className={`font-medium text-text-2-d ${stylesSwapTx.connectWallet}`}
                          >
                            {transferStatus.status !== 'inprogress' ? (
                              'Back'
                            ) : (
                              <Spinner />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {isConnected && transferStatus.status !== '' && (
                      <div
                        className={`mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill ${
                          transferStatus.status === '200'
                            ? 'success'
                            : transferStatus.status === '309'
                            ? 'warn'
                            : transferStatus.status === 'inprogress'
                            ? 'info'
                            : 'error'
                        }`}
                        onClick={() =>
                          setTransferStatus({ status: '', message: '' })
                        }
                      >
                        <div
                          className={`font-medium ${stylesSwapTx.connectWallet}`}
                        >
                          {transferStatus.message}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
                {/* ================================{STEP 4: MATCHING WITH DELIVERY GUY}===================================== */}
                {!nextPage && !isProcessingOrder && isDelivery ? (
                  <div
                    className={`outline outline-outlineSwap ${stylesSwap.frameGroupCustom}`}
                  >
                    <div className={`mb-2 ${stylesSwap.swapGroup}`}>
                      <div
                        className={`cursor-pointer w-full font-medium hover:text-gray-600 justify-center ${stylesSwap.swap1}`}
                        onClick={() => setIsDelivery(false)}
                      >
                        <div className="flex flex-row justify-between w-[100px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                          <span className="flex">Process</span>
                        </div>
                      </div>
                      <div className="cursor-pointer flex flex-row justify-center items-center p-1 rounded-full bg-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#130D1A"
                          className="w-5 h-5"
                          onClick={() => {
                            setIsSettings(true);
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className={stylesSwap.frameDiv}>
                      <div className={`mt-6 ${stylesSwap.swapGroup}`}>
                        <div
                          className={`cursor-pointer font-medium text-[16px] ${stylesSwap.swap1}`}
                        >
                          <div className="flex flex-col justify-center items-center bg-infoFill rounded-lg p-4">
                            <div className="mt-12 mb-12 flex flex-col gap-6">
                              <img
                                src="/delivery-icon.svg"
                                className="w-[70px] h-[70px]"
                              />
                            </div>

                            <span className="h-5"> Delivery on the way</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[12px]">
                      {' '}
                      Please click okay to return to messages and continue with
                      your order
                    </span>

                    {isConnected && !transferStatus.status && (
                      <>
                        <div
                          className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
                          onClick={() => setIsDelivery(false)}
                        >
                          <div
                            className={`font-medium text-text-2-d ${stylesSwapTx.connectWallet}`}
                          >
                            {transferStatus.status !== 'inprogress' ? (
                              'Okay'
                            ) : (
                              <Spinner />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {isConnected && transferStatus.status !== '' && (
                      <div
                        className={`mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill ${
                          transferStatus.status === '200'
                            ? 'success'
                            : transferStatus.status === '309'
                            ? 'warn'
                            : transferStatus.status === 'inprogress'
                            ? 'info'
                            : 'error'
                        }`}
                        onClick={() =>
                          setTransferStatus({ status: '', message: '' })
                        }
                      >
                        <div
                          className={`font-medium ${stylesSwapTx.connectWallet}`}
                        >
                          {transferStatus.message}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}

        {/* FROM TOKEN COMPONENT: PART THREE */}
        {isChainModalVisible === false &&
        isFromTokenPage === true &&
        isToTokenPage === false &&
        isSlippagePage === false &&
        isConnecting === false ? (
          <div className={stylesSwap.frameGroupCustom}>
            <div className={stylesFromToken.selectATokenParent}>
              <div className={stylesFromToken.selectAToken}>Select a token</div>
              <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-1 rounded-lg bg-gray-300 hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#130D1A"
                  className="w-5 h-5"
                  onClick={() => setIsFromTokenPage(false)}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className={stylesFromToken.frameChild} />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img
                  className={stylesFromToken.xCloseIcon}
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
                    setFilteredfTokens(tokens);
                    return;
                  }
                  let ffToken = tokens.filter(({ symbol }) => {
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

            <div
              className={`grid grid-cols-4 ${stylesFromToken.customIconGroupDiv}`}
            ></div>
            <div className={stylesFromToken.frameChild} />
            <div
              className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent1}`}
            >
              <div className={stylesFromToken.frameParent2}>
                {filteredfTokens?.map((token, idx) => (
                  <div
                    key={idx}
                    className={`cursor-pointer hover:shadow-md hover:bg-secondaryFill ${stylesFromToken.mdImageGroup}`}
                  >
                    <img
                      className={stylesFromToken.protocolIcon4}
                      alt=""
                      src={token?.logoURI}
                      onClick={() => {
                        setFromToken(token);
                        setIsFromTokenChange(true);
                        setIsFromTokenPage(false);
                      }}
                    />
                    <div
                      className={stylesFromToken.ethereumParent}
                      onClick={() => {
                        setFromToken(token);
                        setIsFromTokenChange(true);
                        setIsFromTokenPage(false);
                      }}
                    >
                      <div className={stylesFromToken.tetherUsd}>
                        {token?.name}
                      </div>

                      <div className={stylesFromToken.eth1}>
                        {token?.symbol}
                      </div>
                    </div>
                    <span className="justify-start items-start mr-4">
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#9D9DA3"
                          className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-secondaryText`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      </>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* To TOKEN COMPONENT: PART THREE */}
        {isChainModalVisible === false &&
        isFromTokenPage === false &&
        isToTokenPage === true &&
        isSlippagePage === false &&
        isConnecting === false ? (
          // <div className={stylesFromToken.frameContainer}>
          <div className={`${stylesSwap.frameGroupCustom}`}>
            <div className={stylesFromToken.selectATokenParent}>
              <div className={stylesFromToken.selectAToken}>
                Select a currency
              </div>
              <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-1 rounded-lg bg-gray-300 hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#130D1A"
                  className="w-5 h-5"
                  onClick={() => setIsToTokenPage(false)}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className={stylesFromToken.frameChild} />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img
                  className={stylesFromToken.xCloseIcon}
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
                    setFilteredtTokens(fiat);
                    return;
                  }
                  let ttToken = fiat.filter(({ symbol }) => {
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
            <div
              className={`grid grid-cols-4 ${stylesFromToken.customIconGroupDiv}`}
            ></div>
            <div className={stylesFromToken.frameChild} />
            <div
              className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent1}`}
            >
              <div className={stylesFromToken.frameParent2}>
                {filteredtTokens?.map((token, idx) => (
                  <div
                    key={idx}
                    className={`cursor-pointer hover:shadow-md hover:bg-secondaryFill ${stylesFromToken.mdImageGroup}`}
                  >
                    <img
                      className={stylesFromToken.protocolIcon4}
                      alt=""
                      src={token?.logoURI}
                      onClick={() => {
                        setToToken(token);
                        setIsToTokenChange(true);
                        setIsToTokenPage(false);
                      }}
                    />
                    <div
                      className={stylesFromToken.ethereumParent}
                      onClick={() => {
                        setToToken(token);
                        setIsToTokenChange(true);
                        setIsToTokenPage(false);
                      }}
                    >
                      <div className={stylesFromToken.tetherUsd}>
                        {token?.name}
                      </div>
                      <div className={stylesFromToken.eth1}>
                        {token?.symbol}
                      </div>
                    </div>
                    <span className="justify-start items-start mr-4">
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#9D9DA3"
                          className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-secondaryText`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      </>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* ============================{Desktop: Slipppage Frame}=============================== */}

        {isChainModalVisible === false &&
        isFromTokenPage === false &&
        isToTokenPage === false &&
        isSlippagePage === false &&
        isSettings === true &&
        isConnecting === false ? (
          <>
            <div className={`${stylesSwap.frameGroupCustom}`}>
              <div className={`mb-6 ${stylesSwap.swapGroup}`}>
                <div
                  className={`cursor-pointer font-medium ${stylesSwap.swap1}`}
                >
                  Settings
                </div>
                <div className="cursor-pointer flex flex-row justify-center items-center p-1 rounded-full bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#130D1A"
                    className="w-5 h-5"
                    onClick={() => {
                      setIsSettings(false);
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {/* {isTxValue ? (
                <>
                  <div className={`text-text-2-d ${stylesSwap.frameParent8}`}>
                    <div
                      className={`justify-between ${stylesSwap.transactionDetailsParent}`}
                    >
                      <div className={stylesSwap.transactionDetails}>
                        Transaction details
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={stylesSwap.chevronDownIcon}
                        onClick={() => {
                          setIsTxValue(false);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    </div>
                    <div className={stylesSwap.usdtPriceParent}>
                      <div className={stylesSwap.documentation}>
                        1 {fSymbol} price
                      </div>
                      <div
                        className={`text-tintGreen ${stylesSwap.div9} ${
                          isFromLoading
                            ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                            : ''
                        }`}
                      >
                        {isFromLoading ? '' : `~$${fromPrice}`}
                      </div>
                    </div>
                    <div className={stylesSwap.usdtPriceParent}>
                      <div className={stylesSwap.documentation}>
                        1 {tSymbol} price
                      </div>
                      <div
                        className={`text-tintGreen ${stylesSwap.div9} ${
                          isToLoading
                            ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                            : ''
                        }`}
                      >
                        {isToLoading ? '' : `~$${toPrice}`}
                      </div>
                    </div>
                    <div className={`${stylesSwap.usdtPriceParent}`}>
                      <div className={stylesSwap.documentation}>Tx cost</div>

                      <div
                        className={`text-tintGreen ${stylesSwap.div9} ${
                          isToLoading
                            ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                            : ''
                        }`}
                      >
                        {' '}
                        {isToLoading
                          ? ''
                          : `${
                              estimatedGas &&
                              (estimatedGas / 10 ** 9).toString()
                            } Gwei`}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              {!isTxValue ? (
                <>
                  <div
                    className={`text-text-2-d ${stylesSwapTx.frameParent6}`}
                    onClick={() => {
                      setIsTxValue(true);
                    }}
                  >
                    <div className={stylesSwapTx.txCostParent}>
                      <div className={stylesSwapTx.documentation}>Tx cost</div>

                      <div
                        className={`${stylesSwapTx.div9} ${
                          isToLoading
                            ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                            : ''
                        }`}
                      >
                        {isToLoading
                          ? ''
                          : `${
                              estimatedGas &&
                              (estimatedGas / 10 ** 9).toString()
                            } Gwei`}
                      </div>
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#130D1A"
                      className={stylesSwap.chevronDownIcon}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </>
              ) : null} */}
              <>
                {isTxStatus ? (
                  <>
                    <div className={`text-text-2-d ${stylesSwap.frameParent8}`}>
                      <div
                        className={`justify-between ${stylesSwap.transactionDetailsParent}`}
                      >
                        <div className={stylesSwap.transactionDetails}>
                          Transaction Status
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={stylesSwap.chevronDownIcon}
                          onClick={() => {
                            setIsTxStatus(false);
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                          />
                        </svg>
                      </div>
                      <div className={stylesSwap.usdtPriceParent}>
                        <div className={stylesSwap.documentation}>TxId</div>
                        <div
                          className={`text-text-2-d ${stylesSwap.div9} ${
                            isFromLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          012
                        </div>
                      </div>
                      <div className={stylesSwap.usdtPriceParent}>
                        <div className={stylesSwap.documentation}>Started</div>
                        <div
                          className={`text-green-600 ${stylesSwap.div9} ${
                            isFromLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          Approved
                        </div>
                      </div>
                      <div className={stylesSwap.usdtPriceParent}>
                        <div className={stylesSwap.documentation}>
                          Sent crypto
                        </div>
                        <div
                          className={`text-tintGreen ${stylesSwap.div9} ${
                            isFromLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          Approve
                        </div>
                      </div>
                      <div className={stylesSwap.usdtPriceParent}>
                        <div className={stylesSwap.documentation}>
                          Sent cash(Buyer)
                        </div>
                        <div
                          className={`text-blue-700 ${stylesSwap.div9} ${
                            isToLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          Approve
                        </div>
                      </div>
                      <div className={stylesSwap.usdtPriceParent}>
                        <div className={stylesSwap.documentation}>
                          Received cash
                        </div>
                        <div
                          className={`text-tintGreen ${stylesSwap.div9} ${
                            isToLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          Approve
                        </div>
                      </div>
                      <div className={stylesSwap.usdtPriceParent}>
                        <div className={stylesSwap.documentation}>
                          Received crypto(Buyer)
                        </div>
                        <div
                          className={`text-blue-700 ${stylesSwap.div9} ${
                            isToLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          Approve
                        </div>
                      </div>
                      <div className={`${stylesSwap.usdtPriceParent}`}>
                        <div className={stylesSwap.documentation}>Cancel</div>

                        <div
                          className={`text-tintGreen ${stylesSwap.div9} ${
                            isToLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          Approve
                        </div>
                      </div>
                      <div className={`${stylesSwap.usdtPriceParent}`}>
                        <div className={stylesSwap.documentation}>Complete</div>

                        <div
                          className={`text-tintGreen ${stylesSwap.div9} ${
                            isToLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          Approve
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
                {!isTxStatus ? (
                  <>
                    <div
                      className={`text-text-2-d ${stylesSwapTx.frameParent6}`}
                      onClick={() => {
                        setIsTxStatus(true);
                      }}
                    >
                      <div className={stylesSwapTx.txCostParent}>
                        <div className={stylesSwapTx.documentation}>
                          Transaction Status
                        </div>

                        <div
                          className={`${stylesSwapTx.div9} ${
                            isToLoading
                              ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                              : ''
                          }`}
                        >
                          Approve
                        </div>
                      </div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#130D1A"
                        className={stylesSwap.chevronDownIcon}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </>
              <>
                <div className="h-[300px] overflow-y-auto">
                  <ClientPageToCash
                    walletAddress={address}
                    chainId={chain?.id}
                    tokensGoerli={tokensGoerli}
                    tokensMumbai={tokensMumbai}
                  />
                </div>
              </>
              <>
                <div className="self-stretch rounded-2xl bg-surface-tint-d-8 overflow-hidden flex flex-col py-4 px-4 items-center justify-start gap-[8px] text-center text-13xl">
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
                    className={`self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-black ${
                      isBalanceLoading
                        ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                        : ''
                    }`}
                  >
                    {isBalanceLoading ? '' : `~$ ${chainUsdBalance}`}
                  </div>
                </div>
              </>
              <>
                <div className="self-stretch rounded-2xl overflow-hidden flex flex-row py-2 px-0 items-center justify-start gap-[12px]">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-8 h-8 shrink-0">
                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl [background:linear-gradient(89.96deg,_#74ff63,_#7c90fe_30.21%,_#f05dfd_70.31%,_#fff73f)]" />
                    </div>
                  </div>
                  <div className="flex-1 relative tracking-[0.02em] leading-[22px] font-medium">
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
                  <button
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
                  </button>
                </div>
              </>
            </div>
          </>
        ) : null}

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
                  <div className="flex justify-center items-center">
                    Granted
                  </div>
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
      </>
    </>
  );
};

export default SwapCash;
