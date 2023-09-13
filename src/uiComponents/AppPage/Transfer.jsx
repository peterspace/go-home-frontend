import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { TransactButton, TokenListButton } from '../Buttons';
import Erc20 from '../engine/erc20.json';
import { ethers } from 'ethers';
import axios from 'axios';
// import tokens from '../../res/tokens';
import tokensGoerli from '../../res/tokensGoerli';
import tokensMumbai from '../../res/tokensMumbai';
import TokenComponent from '../TokenComponent';
//================={wallet connect}===================
import { useSigner, useSignMessage } from "wagmi";
//import GoTransfer from '../../Contracts/GoTransfer.json';
import Spinner from '../Spinner';
//================={All Deployed Contracts}===================
import GoTransferETH from '../../Contracts/GoTransferETH.json';
import GoTransferMATIC from '../../Contracts/GoTransferMATIC.json';
import GoTransferBSC from '../../Contracts/GoTransferBSC.json';
import GoTransferArbitrum from '../../Contracts/GoTransferArbitrum.json';
import GoTransferOptimism from '../../Contracts/GoTransferOptimism.json';
import GoTransferGoerliETH from '../../Contracts/GoTransferGoerliETH.json';
import GoTransferTBNB from '../../Contracts/GoTransferTBNB.json';
import GoTransferMumbaiMATIC from '../../Contracts/GoTransferMumbaiMATIC.json';

const style = {
  parentBgColor: `bg-sky-900/10`,
  swapBorderColor: `border-4 border-tailwind-blue-dark border-opacity-60`,
  inputSectionColor: `bg-sky-900/30`,
  inputSection: `h-[60px] flex flex-row items-center rounded-2xl transition-all duration-500
        outline-none focus-within:outline-1 focus-within:outline-sky-600`,
  input:
    'pl-4 h-full w-[70%] font-leaner font-bold text-4xl outline-none text-gray-400 bg-transparent',
  addressInputSection: `h-[40px] rounded-xl transition-all duration-500 outline-none focus-within:outline-1 focus-within:outline-sky-600`,
  addressInput: `pl-4 h-full w-full font-mono text-lg outline-none text-gray-400 bg-transparent`,
  transferOptions: `px-4 w-full border text-gray-300 text-xl
        hover:border-gray-400 transition-colors duration-300`,
};

const transfer_options = ['fromWallet', 'fromBalance'];

const Transfer = ({ walletAddress, chainId }) => {

  const isDeposited = localStorage.getItem('isDeposited')
    ? JSON.parse(localStorage.getItem('isDeposited'))
    : false;

  const isNotDeposited = localStorage.getItem('isNotDeposited')
    ? JSON.parse(localStorage.getItem('isNotDeposited'))
    : false;

  const [amount, setAmount] = useState("");
  // const [isCalculating, setIsCalculating] = useState(false);
  const [token, setToken] = useState();
  const [allTokens, setAllTokens] = useState();

  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [receiver, setReceiver] = useState('');
  const [transferOption, setTransferOption] = useState(transfer_options[0]); // 0 is wallet, 1 is balances
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState(0.1);
  const [dexAddress, setDexAddress] = useState(0.0);
  const [dexContractAddress, setDexContractAddress] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);
  const [signature, setSignature] = useState('');
  const [quote, setQuote] = useState();

  const [transferStatus, setTransferStatus] = useState({
    status: '',
    message: '',
  });

  //const [activeContract, setActiveContract] = useState(chain);
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [activeChainAddress, setActiveChainAddress] = useState();
  const [activeChainTokens, setActiveChainTokens] = useState(tokensGoerli);

  //==================={wallet connect}==============================
  const signer = useSigner(); // use signer.data for ethers.Contract
  let message = `
	Govercity Connect >>
	Transact: Transfer
	Token: ${token?.symbol}
	Address: ${walletAddress}
	`;
  const { data, signMessage } = useSignMessage({ message });
  //const { chain, chains } = useNetwork()
  //==================={Filter Tokens}==============================
  const [filteredTokens, setFilteredTokens] = useState();

  function filterTokens() {
    let filteredTokens = allTokens.filter((filter) => {
      return filter.symbol.toLowerCase() !== token.symbol.toLowerCase();
    });
    setFilteredTokens(filteredTokens);
  }

  function onValueChanged(e) {
    setAmount(e.target.value);
    // setIsCalculating(true);
  }

  function resetTransferStatus() {
    setTransferStatus({ status: '', message: '' });
  }

  useEffect(() => {
    // axios.get('https://api.1inch.io/v4.0/1/tokens').then((response) => {
    //   // let allTokens = response.data.tokens;
    //   let allTokenKeys = Object.keys(response.data.tokens);
    //   let allTs = allTokenKeys.map((key) => response.data.tokens[key]);

      // todo Change this back to allTs
      // setAllTokens(allTs);
      setAllTokens(activeChainTokens);
    // });
  }, [activeChainTokens]);

  useEffect(() => {
    if (allTokens !== undefined) {
      setToken(allTokens[0]);
    }
  }, [allTokens]);

  useEffect(() => {
    token !== undefined && filterTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

    useEffect(() => {
      chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  //=========================={Contract Switcher}===========================================

    function contractSwitcher() {
        //e.preventDefault();

        //==================={TEST NETS}===============================
        // GOERLIETH: Chainid = 5 Currency: ETH
        // Mumbai Matic: Chainid = 8001 Currency: MATIC
        // Binance Test Smart Chain: Chainid = 97 Currency: BNB

        //==================={MAIN NETS}===============================
        // ETH: Chainid = 1 Currency: ETH
        // Polygon Matic: Chainid = 137 Currency: MATIC
        // Binance Smart Chain: Chainid = 56 Currency: BNB
        // Arbitrum One: Chain: Chainid = 42161 Currency: ETH
        // Optimism: Chain: Chainid = 10 Currency: ETH

        //let chainId = chain.id;
    
        //let chainId = chain?.id;
    

        try {
            switch (chainId) {
                case 5:
                    //GOERLIETH
                    setDexContractAddress(GoTransferGoerliETH.address);
                    setDexContractAbi(GoTransferGoerliETH.abi);
                    setActiveChainDecimals(18);
                    setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
                    setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
                    setDexRoyaltyValue(0.1);
                    setActiveChainTokens(tokensGoerli); // Goerli Test net
                    break;
        
                case 80001:
                    //MUMBAIMATIC
                    setDexContractAddress(GoTransferMumbaiMATIC.address);
                    setDexContractAbi(GoTransferMumbaiMATIC.abi);
                    setActiveChainDecimals(18);
                    setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
                    setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
                    setDexRoyaltyValue(0.1);
                    setActiveChainTokens(tokensMumbai); // Mumbai Test net
                    break;
        
                case 97:
                    //TBNB
                    setDexContractAddress(GoTransferTBNB.address);
                    setDexContractAbi(GoTransferTBNB.abi);
                    setActiveChainDecimals(18);
                    setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
                    setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
                    setDexRoyaltyValue(0.1);
                    setActiveChainTokens(tokensGoerli);
                    break;
       
                case 1:
                    //ETH
                    setDexContractAddress(GoTransferETH.address);
                    setDexContractAbi(GoTransferETH.abi);
                    setActiveChainDecimals(18);
                    setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
                    setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
                    setDexRoyaltyValue(0.1);
                    setActiveChainTokens(tokensGoerli);
                    break;

                case 137:
                    //MATIC
                    setDexContractAddress(GoTransferMATIC.address);
                    setDexContractAbi(GoTransferMATIC.abi);
                    setActiveChainDecimals(18);
                    setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
                    setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
                    setDexRoyaltyValue(0.1);
                    setActiveChainTokens(tokensMumbai);
                    break;
      
                case 56:
                    //BNB(BSC)
                    setDexContractAddress(GoTransferBSC.address);
                    setDexContractAbi(GoTransferBSC.abi);
                    setActiveChainDecimals(18);
                    setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
                    setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
                    setDexRoyaltyValue(0.1);
                    setActiveChainTokens(tokensGoerli);
                    break;
        
                case 10:
                    //OPTIMISM (currency: ETH)
                    setDexContractAddress(GoTransferOptimism.address);
                    setDexContractAbi(GoTransferOptimism.abi);
                    setActiveChainDecimals(18);
                    setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
                    setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
                    setDexRoyaltyValue(0.1);
                    setActiveChainTokens(tokensGoerli);
                    break;
        
                case 42161:
                    //ARBITRUM
                    setDexContractAddress(GoTransferArbitrum.address);
                    setDexContractAbi(GoTransferArbitrum.abi);
                    setActiveChainDecimals(18);
                    setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
                    setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
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

    useEffect(() => {
      if (isDeposited === true) {
        setTimeout(() => {
          resetTransferStatus();
        }, 2000);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeposited]); //* signer keeps changing but signer.data._address won't
  
    useEffect(() => {
      if (isNotDeposited === true) {
        setTimeout(() => {
          resetTransferStatus();
          localStorage.setItem('isNotDeposited', JSON.stringify(false)); // New update
        }, 4000);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNotDeposited]); //*

    //=================={(Approach1)}=====================
    // * Get approval, then deposit and send (all in one) by calling sendToken_depositAndSend
    async function getApproval() {
      if (!walletAddress) {
        console.warn('Wallet address not specified');
        setTransferStatus({ status: '309', message: 'Wallet not connected' });
        return;
      }
      if (!receiver) {
        console.warn('Receiver address not specified');
        setTransferStatus({
          status: '309',
          message: 'Receiver address not specified',
        });
        return;
      }
      if (Number(amount) <= 0) {
        console.warn('Value should not be less than 0');
        setTransferStatus({
          status: '309',
          message: 'Value should not be less than 0',
        });
        return;
      }
      if (!token) {
        console.warn('No token selected');
        return;
      }
        
    // return if there is an ongoing transaction
    if (transferStatus.status === 'inprogress') return;

      //======= setting transaction status
      setTransferStatus({
        status: 'inprogress',
        message: 'Transaction in progress...',
      });

        try {
            let approval = await sendToken_approval();
            if (approval.hash) {
                setTransferStatus({
                    status: 'inprogress',
                    message: 'Approval granted.',
                });
                let depositAndSend = await sendToken_depositAndSend();
                // console.info('depositAndSed', depositAndSend);
                if (depositAndSend.hash) {
                    setTransferStatus({
                        status: '200',
                        message: 'Transfer Successful',
                    });
                    localStorage.setItem('isDeposited', JSON.stringify(true)); // New
                } else {
                    setTransferStatus({
                        status: 'error',
                        message: 'Transfer error',
                    });
                    console.warn('depositAndSend', depositAndSend)
                    localStorage.setItem('isNotDeposited', JSON.stringify(true)); // New
                }
            } else {
                setTransferStatus({
                    status: 'error',
                    message: 'Approval declined',
                });
                console.error('approvalErr', approval);
                localStorage.setItem('isNotDeposited', JSON.stringify(true)); // New
            }
        } catch (e) {
            if (e.code === 'ACTION_REJECTED') {
                setTransferStatus({
                    status: 'error',
                    message: 'User rejected transaction',
                });
                localStorage.setItem('isNotDeposited', JSON.stringify(true)); // New
            } else if (e.code === "UNPREDICTABLE_GAS_LIMIT") {
                setTransferStatus({
					status: "error",
					message: "Error due to unpredictable gas limit",
				});
        localStorage.setItem('isNotDeposited', JSON.stringify(true)); // New
            } else {
                setTransferStatus({
                    status: 'error',
                    message: 'An error occured',
                });
                console.error('transactionErr',e.code);
                localStorage.setItem('isNotDeposited', JSON.stringify(true)); // New
            }
        }
        // console.info('calling send')
    }

    //==============================={sendToken_approval}===============================================

    async function sendToken_approval() {
      if (!walletAddress || !receiver || Number(amount) <= 0 || !token) {
        //if (!walletAddress || fToken <= 0 || !tToken) {
        console.warn('One or more required fields are empty');
        return;
      }
      //========={signature}=====================
      signMessage();
      setSignature(data);

      // let amount = value;

      //const amountStr = ethers.utils.formatUnits(amount, token.decimal);
      //  const amountStr = (amount * 10 ** token.decimal).toString();
      let parsed = ethers.utils.parseUnits(
        amount,
        token.decimals.toString()
      ).toString();
      //eslint-disable-next-line no-undef
      let amountStr = BigInt(parsed).toString();
      // const amountStr = (Number(amount) * Number(token.decimals)).toString();
      // const amountStr = (amount* token.decimals).toString();
    //   console.info('amountStr', amountStr);
    //   console.info('token', token);


      //======{Get Token Approval}=============================
      const ERC20Contract = new ethers.Contract(
        token.testAddress,
        Erc20,
        //signer
        signer.data
      );
      //const approval = await ERC20Contract.approve(proxy, amountStr);
      //const activeContractAddr =(activeContract.address).toString();
      const approval = await ERC20Contract.approve(
        dexContractAddress.toString(),
        amountStr
      );
      //const approval = await ERC20Contract.functions.approve(GoTransferGoerliETH.address, amountStr);
        await approval.wait();
        return approval;
    //   console.info('approval', approval);
    }

    //==============================={sendToken_send}===============================================
    // * Send token from the deposited balance
    async function sendToken_send() {
        // return if there is an ongoing transaction
        if (transferStatus.status === 'inprogress') return;

        setTransferStatus({
            status: 'inprogress',
            message: 'Transaction in progress...'
        });

      let dexContract = new ethers.Contract(
        dexContractAddress,
        dexContractAbi,
        signer.data // should be just "signer" if using windows.ethereum
      );
      //=============={Get Qoute/ exchange rate of between ERC20 token and Native token }================================
      let parsed = ethers.utils.parseUnits(
        amount.toString(),
        token.decimals.toString()
      );
      //eslint-disable-next-line no-undef
      let amountStr = BigInt(parsed).toString();
      //const swapRate = (token.address, activeChainAddress) // from , to
      // const dexPercent = (dexRoyaltyValue * 100) / 10000; // 200 will mean 2 percent max of 3% should be assigned
      //const dexPercent = 0.01; // 200 will mean 2 percent max of 3% should be assigned
      // eslint-disable-next-line no-undef
      //      const dexShareAmount = amount * dexPercent;

      // const swapRate = 0.00082;

      // const dexShareRate = dexShareAmount * swapRate; // rate of token value to the connected chain token value
      // const dexShare = dexShareRate * Number(activeContractDecimals); // decimals of connected wallet chains
      // const dexShareStr =  dexShare.toString();
      const dexShareStr = '10000000000000000';
      // const amountStr = (amount *(token.decimals)).toString();
      // let parsedDex = ethers.utils.parseUnits(dexShareRate.toString(), "18");
      // // eslint-disable-next-line no-undef
      // let dexShareStr = BigInt(parsedDex).toString();
    //   console.info('dexShareStr', dexShareStr);
      const dexAddressStr = dexAddress.toString();

      //========={Main contract function}=====================
      //const tx2 = await contractGoerliETH.dexDepositAndSendTokens(
        try {
            const tx2 = await dexContract.dexSendToken(
                token.testAddress,
                amountStr,
                receiver,
                dexShareStr,
                dexAddressStr,
                {
                    value: dexShareStr,
                    gasLimit: 3000000,
                }
            );

            let sendTransaction = await tx2.wait();
            if (sendTransaction.status === 1) {
                setTransferStatus({
                    status: '200',
                    message: 'Transfer Successful',
                });
                localStorage.setItem('isDeposited', JSON.stringify(true)); // New
            }
            // console.log(tx2);
        
        } catch (e) {
            if (e.code === 'CALL_EXCEPTION') {
                setTransferStatus({
                    status: 'error',
                    message: 'An Error occurred. Please check if you have sufficient balance'
                });
                localStorage.setItem('isNotDeposited', JSON.stringify(true)); // New
            } else if (e.code === 'ACTION_REJECTED') {
                setTransferStatus({
                    status: 'error',
                    message: 'User rejected transaction',
                });
                localStorage.setItem('isNotDeposited', JSON.stringify(true)); // New
            } else {
                setTransferStatus({
                    status: 'error',
                    message: 'An Error occurred.'
                });
                
                
            }
            console.error('dexSendToken', e);
            localStorage.setItem('isNotDeposited', JSON.stringify(true)); // New
        }
    }

    async function sendToken_depositAndSend() {
      let dexContract = new ethers.Contract(
        dexContractAddress,
        dexContractAbi,
        signer.data // should be just "signer" if using windows.ethereum
      );

      //=============={Get Qoute/ exchange rate of between ERC20 token and Native token }================================
      let parsed = ethers.utils.parseUnits(
        amount.toString(),
        token.decimals.toString()
      );
      //eslint-disable-next-line no-undef
      let amountStr = BigInt(parsed).toString();
      //const swapRate = (token.address, activeChainAddress) // from , to
      // const dexPercent = (dexRoyaltyValue * 100) / 10000; // 200 will mean 2 percent max of 3% should be assigned
      //const dexPercent = 0.01; // 200 will mean 2 percent max of 3% should be assigned
      // eslint-disable-next-line no-undef
      //      const dexShareAmount = amount * dexPercent;

      // const swapRate = 0.00082;

      // const dexShareRate = dexShareAmount * swapRate; // rate of token value to the connected chain token value
      // const dexShare = dexShareRate * Number(activeContractDecimals); // decimals of connected wallet chains
      // const dexShareStr =  dexShare.toString();
      const dexShareStr = '10000000000000000';
      // const amountStr = (amount *(token.decimals)).toString();
      // let parsedDex = ethers.utils.parseUnits(dexShareRate.toString(), "18");
      // // eslint-disable-next-line no-undef
      // let dexShareStr = BigInt(parsedDex).toString();
    //   console.info('dexShareStr', dexShareStr);
    //   console.info('amountStr', amountStr);
      const dexAddressStr = dexAddress.toString();

      //========={Main contract function}=====================
      const tx2 = await dexContract.dexDepositAndSendTokens(
        token.testAddress,
        amountStr,
        receiver,
        dexShareStr,
        dexAddressStr,
        {
          value: dexShareStr,
          gasLimit: 3000000,
        }
      );

      await tx2.wait();
        // console.log('fn depositAndSend',tx2);
        return tx2;
    }

    /****************************
     * RENDER
     ***************************/
      
    return (
      <>
        <section className="flex flex-col items-center">
          <div className={`px-4 py-3 rounded-3xl ${style.parentBgColor}`}>
            <div className="font-bold text-lg text-gray-200">
              <span>Transfer</span>
            </div>

            <section className="relative mt-4">
              <div className="flex flex-col gap-3">
                <div className="mt-1 h-[50px] w-full flex flex-row justify-center rounded-xl optionSectionColor">
                  <button
                    id="0"
                    className={`rounded-tl-xl rounded-bl-xl ${
                      style.transferOptions
                    }
                                        ${
                                          transferOption ===
                                            transfer_options[0] ?
                                          'border-gray-400' : 'border-transparent'
                                        }`}
                    onClick={() => setTransferOption(transfer_options[0])}
                  >
                    from wallet
                  </button>
                  <button
                    id="1"
                    className={`rounded-tr-xl rounded-br-xl ${
                      style.transferOptions
                    }
                                        ${
                                          transferOption ===
                                            transfer_options[1] ?
                                          'border-gray-400' : 'border-transparent'
                                        }`}
                    onClick={() => setTransferOption(transfer_options[1])}
                  >
                    from balance
                  </button>
                </div>
                <div
                  className={`${style.inputSection} ${style.inputSectionColor}`}
                >
                  <input
                    type="text"
                    className={style.input}
                    pattern="[0-9]*.[0-9]*"
                    placeholder="0.0"
                    value={amount}
                    onChange={onValueChanged}
                  />
                  <div className="ml-auto mr-2">
                    <TokenListButton
                      selectedTokenName={token?.symbol}
                      modalVisible={isTokenModalVisible}
                      toggleModal={setIsTokenModalVisible}
                      selectedTokenIcon={token?.logoURI}
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* {value > 0 && (
						<section className="mt-2 flex">
							<div className="ml-auto text-sm text-gray-400">
								{isCalculating
									? `Calculating transfer fee for ${value} ${token?.symbol}`
									: "fee: "}
							</div>
						</section>
					)} */}
            <section className="mt-6">
              <div>
                <div
                  className={`${style.addressInputSection} ${style.inputSectionColor}`}
                >
                  <input
                    type="text"
                    className={style.addressInput}
                    placeholder="Recipient address"
                    minLength={26}
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* transfer status section */}
            {transferStatus.status !== '' && (
              <section
                className={`mt-3 px-3 py-2 w-full h-fit flex flex-row gap-6 justify-center rounded-lg
                ${transferStatus.status === '200' ?'success'
                            : transferStatus.status === '309' ? 'warn'
                            : transferStatus.status === 'inprogress' ? 'info'
                            : 'error'}
                            `}
                onClick={() => setTransferStatus({ status: '', message: '' })}
              >
                {transferStatus.message}
              </section>
            )}

                    <section className="mt-4 flex justify-center">
                {
                    transferOption === transfer_options[0] ? 
                        <TransactButton
                            disabled={((walletAddress?.length <= 5) || (Number(amount) <= 0)) || (receiver <= 5) || transferStatus.status === 'inprogress' ? true : false}
                            onClick={() => getApproval()}
                        >
                            {transferStatus.status === 'inprogress' ? (
                                <Spinner />
                                ) : (
                                    'Deposit & Send'
                                )}
                        </TransactButton>
                                :
                        <TransactButton
                            //disabled={((walletAddress.length <= 5) || (value <= 0)) || (receiver <= 5 && phoneNumber <=10) ? true : false}
                            disabled={((walletAddress?.length <= 5) || (Number(amount) <= 0)) || (receiver <= 5) || transferStatus.status === 'inprogress' ? true : false}
                            onClick={() => sendToken_send()}
                        >
                        {transferStatus.status === 'inprogress' ? (
                            <Spinner />
                            ) : (
                            'Send'
                            )}
                    </TransactButton>
                }
              {/* <TransactButton
                //disabled={((walletAddress.length <= 5) || (value <= 0)) || (receiver <= 5 && phoneNumber <=10) ? true : false}
                disabled={
                  receiver <= 5 || transferStatus.status === 'inprogress'
                }
                onClick={() => sendToken_deposit()}
              >
                {transferStatus.status === 'inprogress' ? (
                  <Spinner />
                ) : (
                  'Deposit'
                )}
              </TransactButton> */}
              {/* <TransactButton
                //disabled={((walletAddress.length <= 5) || (value <= 0)) || (receiver <= 5 && phoneNumber <=10) ? true : false}
                disabled={
                  receiver <= 5 || transferStatus.status === 'inprogress'
                }
                onClick={() => sendToken_send()}
              >
                {transferStatus.status === 'inprogress' ? <Spinner /> : 'Send'}
              </TransactButton>
              <TransactButton
                //disabled={((walletAddress.length <= 5) || (value <= 0)) || (receiver <= 5 && phoneNumber <=10) ? true : false}
                disabled={
                  receiver <= 5 || transferStatus.status === 'inprogress'
                }
                onClick={() => sendToken_depositAndSend()}
              >
                {transferStatus.status === 'inprogress' ? (
                  <Spinner />
                ) : (
                  'One Way Send'
                )}
              </TransactButton>
              <TransactButton
                //disabled={((walletAddress.length <= 5) || (value <= 0)) || (receiver <= 5 && phoneNumber <=10) ? true : false}
                disabled={
                  receiver <= 5 || transferStatus.status === 'inprogress'
                }
                onClick={() => sendToken_withdrawToken()}
              >
                {transferStatus.status === 'inprogress' ? (
                  <Spinner />
                ) : (
                  'Withdraw'
                )}
              </TransactButton> */}
            </section>
          </div>
        </section>
        <Modal
          visible={isTokenModalVisible}
          setVisible={setIsTokenModalVisible}
          title="Select Token"
        >
          <div className="mb-6 input-section">
            <input
              type="text"
              className="input-1"
              placeholder="search token"
              onChange={(e) => {
                if (e.target.value === '') {
                  setFilteredTokens(allTokens);
                  return;
                }

                let ffToken = allTokens.filter(({symbol}) => {
                    return symbol.toLowerCase().includes(e.target.value.toLowerCase())
                });
                if (ffToken !== null) {
                  setFilteredTokens(ffToken);
                }
                // console.info(ffToken);
              }}
            />
          </div>
          <div className="w-[500px] h-fit max-h-[400px] overflow-y-scroll">
            <div className="grid grid-cols-3 grid-flow-row gap-8">
              {filteredTokens?.map((t, idx) => (
                <TokenComponent key={idx} currentItem={t}
                selectedToken={token} setSelectedToken={setToken} setIsTokenModalVisible={setIsTokenModalVisible} />
              ))}
            </div>
          </div>
        </Modal>
      </>
    );

};

export default Transfer;
