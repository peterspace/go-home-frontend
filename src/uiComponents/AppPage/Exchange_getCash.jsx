import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useSigner, useSignMessage } from "wagmi";
import { ethers } from 'ethers';
import Erc20 from '../engine/erc20.json';
import { TokenListButton, TransactButton } from '../Buttons';
import Modal from '../Modal';
import Spinner from '../Spinner';
import banks from '../../Contracts/allBanks';
import tokens from '../../res/tokens';
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
import { createTransaction } from '../../redux/api/api';

// tokens allowed to withdraw from
const filterTokens = ['usdc', 'usdt', 'dai', 'busd', 'tusd'];

const ExchangeGetCash = ({ walletAddress, chainId, setNewTransaction }) => {
  const [amount, setAmount] = useState(0.0); // Amount to withdraw
  const [filteredTokens, setFilteredfTokens] = useState([]);

  //============={Modals}================//
  const [isTokenModalVisible, setIsTokenModalVisible] = useState(false);
  const [isGetCashModalVisible, setIsGetCashModalVisible] = useState(false);
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);

  //============={Contract Params}============//
  const [selectedToken, setSelectedToken] = useState({});
  const [selectedBank, setSelectedBank] = useState({});
  const [filteredBanks, setFilteredBanks] = useState(banks);
  const [bankAddress, setBankAddress] = useState(''); // chosen bank
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState(0.1);
  const [dexContractAddress, setDexContractAddress] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);
  const [signature, setSignature] = useState('');
  const [quote, setQuote] = useState();
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [activeChainAddress, setActiveChainAddress] = useState();


  const [transferStatus, setTransferStatus] = useState({
    status: '',
    message: '',
  });

  /* ==================== walletConnect ==================== */
  const signer = useSigner(); // use signer.data for ethers.Contract
  let message = `
		Govercity Connect >>
		Transact: Transfer
		Token: ${selectedToken?.symbol}
		Address: ${walletAddress}
		`;
  const { data, signMessage } = useSignMessage({ message });

  function onValueChanged(e) {
    setAmount((existingValue) =>
      e.target.validity.valid ? e.target.value : existingValue
    );
    // setIsCalculating(true);
  }

  function contractSwitcher() {
    try {
      switch (chainId) {
        case 5:
          //GOERLIETH
          setDexContractAddress(GoExchangeToCashGoerliETH.address);
          setDexContractAbi(GoExchangeToCashGoerliETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          break;

        case 80001:
          //MUMBAIMATIC
          setDexContractAddress(GoExchangeToCashMumbaiMATIC.address);
          setDexContractAbi(GoExchangeToCashMumbaiMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          break;

        case 97:
          //TBNB
          setDexContractAddress(GoExchangeToCashTBNB.address);
          setDexContractAbi(GoExchangeToCashTBNB.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          break;

        case 1:
          //ETH
          setDexContractAddress(GoExchangeToCashETH.address);
          setDexContractAbi(GoExchangeToCashETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          break;

        case 137:
          //MATIC
          setDexContractAddress(GoExchangeToCashMATIC.address);
          setDexContractAbi(GoExchangeToCashMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          break;

        case 56:
          //BNB(BSC)
          setDexContractAddress(GoExchangeToCashBSC.address);
          setDexContractAbi(GoExchangeToCashBSC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          break;

        case 10:
          //OPTIMISM (currency: ETH)
          setDexContractAddress(GoExchangeToCashOptimism.address);
          setDexContractAbi(GoExchangeToCashOptimism.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          break;

        case 42161:
          //ARBITRUM
          setDexContractAddress(GoExchangeToCashArbitrum.address);
          setDexContractAbi(GoExchangeToCashArbitrum.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
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

    let parsed = ethers.utils
      .parseUnits(amount, selectedToken.decimals.toString())
      .toString();
    //eslint-disable-next-line no-undef
    let amountStr = BigInt(parsed).toString();
    console.info('amountStr', amountStr);
    console.info('selectedToken', selectedToken);

    //======{Get Token Approval}=============================
    const ERC20Contract = new ethers.Contract(
      selectedToken.testAddress,
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
      amount.toString(),
      selectedToken.decimals.toString()
    );
    //eslint-disable-next-line no-undef
    let amountStr = BigInt(parsed).toString();
    const dexShareStr = '10000000000000000';
    console.info('dexShareStr', dexShareStr);
    let cryptoPriceStr = amountStr;
    // Note: Always assign  service fee in string qouted value
    let serviceFeeStr = '10000000000000000';
    // let serviceFeeStr = dexShareStr;
    let currentbank = (selectedBank?.address).toString();
    // console.log('getCashOrder() --- currentbank', currentbank);
    setBankAddress(currentbank);
    let tokenDecimalsStr = selectedToken.decimals.toString();

    //====={2nd contract call: begin transaction}================================
    //========={Main contract function}=====================

    console.log('getCash');

    try {
      const tx2 = await dexContract.getCash(
        // txId,
        //token.address, // for mainnnet
        selectedToken.testAddress,
        currentbank,
        cryptoPriceStr,
        serviceFeeStr,
        tokenDecimalsStr,
        dexShareStr,
        {
          value: serviceFeeStr,
          gasLimit: 3000000,
        }
      );
      // console.log("tx2", tx2);

      let sendTransaction = await tx2.wait();
      if (sendTransaction.status === 1) {
        setTransferStatus({
          status: '200',
          message: 'Transfer Successful',
        });
        // todo get transaction return value and pass it to <Transactions> component in Layout
        setNewTransaction({
          amount: amount,
          selectedBank: selectedBank,
          token: selectedToken,
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
      console.error('dexSendToken', e);
    }
  }

  // //==============================={getCashOrder: 2}===============================================
  // // * Send service Fee and Crypto , so ERC20 token approval is required


  async function proceed() {
    if (
      walletAddress?.length <= 5 ||
      Number(amount) < 0 ||
      Object.keys(selectedBank).length <= 0
    ) {
      setTransferStatus({
        status: '309',
        message: 'One or more required fields are empty',
      });
      return;
    }
    /* ==================== Getting approval for getting cash ==================== */
    await getApproval();
  }

  useEffect(() => {
  
    setFilteredfTokens(tokens);
      setSelectedToken(tokens[0]);
  }, []);

  useEffect(() => {
    // if token is not empty
    if (Object.keys(selectedToken).length !== 0) {
      //get the list of banks which transacts with the selected token
      let banksWithToken = banks.filter((bank) => {
        return bank.tokens.find((tokens) => {
          return tokens
            .toLowerCase()
            .includes(selectedToken.symbol.toLowerCase());
        });
      });
      setFilteredBanks(banksWithToken);
    }

    // clear selected bank when the token is changed
    if (Object.keys(selectedBank).length !== 0) {
      setSelectedBank({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedToken]);

  useEffect(() => {
    chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <>
      <section className="flex flex-col items-center">
        <section className="relative mt-4">
          <div className="flex flex-col">
            <section className="mt-6 flex flex-col">
              <span className="mb-1 text-gray-600">
                {'Trading ' + selectedToken?.symbol + ' for Cash'}
              </span>
              <div className="w-fit flex flex-row inputSection inputSectionColor">
                <input
                  type="text"
                  className="input"
                  pattern="[0-9]*.[0-9]*"
                  placeholder="0.0"
                  value={amount}
                  onChange={onValueChanged}
                />
                <div className="ml-auto mr-2">
                  <TokenListButton
                    selectedTokenName={selectedToken?.symbol}
                    modalVisible={isTokenModalVisible}
                    toggleModal={setIsTokenModalVisible}
                    selectedTokenIcon={selectedToken?.logoURI}
                  />
                </div>
              </div>

              <div className="mt-6 text-gray-600">
                <div className="flex flex-row gap-3 items-center">
                  <span>{filteredBanks?.length}</span>
                  <span>Banks available</span>
                </div>
                <button
                  type="button"
                  className={`mt-2 px-6 py-3 w-full border rounded-md
                                                flex flex-row gap-3 cursor-pointer text-gray-400
                                                hover:border-gray-200/50 hover:text-gray-200
                                                `}
                  onClick={() => setIsBankModalVisible(true)}
                >
                  {Object.keys(selectedBank).length !== 0 ? (
                    <>
                      <img
                        src={selectedBank?.logoURI}
                        alt="bank logo"
                        className="w-[25px] h-[25px]"
                      />
                      <span>{selectedBank?.name}</span>
                      <span className="ml-auto text-xl text-success">
                        <IoMdCheckmarkCircle />
                      </span>
                    </>
                  ) : (
                    <span className="text-center w-full">Select a bank</span>
                  )}
                </button>

                {/* <ul className="mt-3 max-h-[200px] h-fit flex flex-col gap-2 border border-gray-200/10 rounded-md overflow-scroll scrollbar-hide">
										{filteredBanks.map((bank) => (
											<li
												key={bank.address}
												className={`px-6 py-3 border rounded-md
                                                flex flex-row gap-3 cursor-pointer hover:border-gray-200/50 hover:text-gray-200
                                                ${
																									selectedBank?.address ===
																									bank.address
																										? "border-gray-200/50 text-gray-200 info"
																										: "border-gray-200/10 bg-black/30"
																								}`}
												onClick={() => setSelectedBank(bank)}
											>
												<img
													src={bank.logoURI}
													alt="bank"
													className="w-[25px] h-[25px]"
												/>
												<span>{bank.name}</span>
												{selectedBank?.address === bank.address && (
													<span className="ml-auto text-xl text-success">
														<IoMdCheckmarkCircle />
													</span>
												)}
											</li>
										))}
									</ul> */}
              </div>
            </section>

            {/* transfer status section */}
            {transferStatus.status !== '' && (
              <section
                className={`mt-3 px-3 py-2 w-full h-fit flex flex-row gap-6 justify-center rounded-lg
                ${
                  transferStatus.status === '200'
                    ? 'success'
                    : transferStatus.status === '309'
                    ? 'warn'
                    : transferStatus.status === 'inprogress'
                    ? 'info'
                    : 'error'
                }
                            `}
                onClick={() => setTransferStatus({ status: '', message: '' })}
              >
                {transferStatus.message}
              </section>
            )}

            <div className="mx-auto mt-6 w-fit">
              <TransactButton
                // Not doing type checking for value and walletAddress
                disabled={
                  walletAddress?.length <= 5 ||
                  Number(amount) <= 0 ||
                  !Object.keys(selectedBank).length > 0 ||
                  transferStatus.status === 'inprogress'
                    ? true
                    : false
                }
                onClick={() => proceed()}
              >
                {transferStatus.status !== 'inprogress' ? (
                  'Proceed'
                ) : (
                  <Spinner />
                )}
              </TransactButton>
            </div>
          </div>
        </section>

        {/*
                ====================================================================
                    Modals
                ====================================================================
                */}
        <Modal
          visible={isTokenModalVisible}
          setVisible={setIsTokenModalVisible}
          title="Choose your withdraw token"
        >
          <div className="w-[500px] h-fit max-h-[400px] overflow-y-scroll">
            <div className="grid grid-cols-3 grid-flow-row gap-8">
              {filteredTokens?.map((t, idx) => (
                <TokenComponent
                  key={idx}
                  currentItem={t}
                  selectedToken={selectedToken}
                  setSelectedToken={setSelectedToken}
                  setIsTokenModalVisible={setIsTokenModalVisible}
                />
              ))}
            </div>
          </div>
        </Modal>
        <Modal
          visible={isBankModalVisible}
          setVisible={setIsBankModalVisible}
          title="Select Bank"
        >
          <ul className="mt-3 px-2 py-2 max-h-[600px] h-fit flex flex-col gap-2 border border-gray-200/10 rounded-md overflow-scroll scrollbar-hide">
            {filteredBanks.map((bank) => (
              <li
                key={bank.address}
                className={`px-6 py-3 border rounded-md
                                                flex flex-row gap-3 cursor-pointer text-gray-400
                                                hover:border-gray-200/50 hover:text-gray-200
                                                ${
                                                  selectedBank?.address ===
                                                  bank.address
                                                    ? 'border-gray-200/50 text-gray-200 info'
                                                    : 'border-gray-200/10 bg-black/30'
                                                }`}
                onClick={() => setSelectedBank(bank)}
              >
                <img
                  src={bank.logoURI}
                  alt="bank"
                  className="w-[25px] h-[25px]"
                />
                <span>{bank.name}</span>
                <span
                  className={`ml-auto text-xl text-success
                                    ${
                                      selectedBank?.address === bank.address
                                        ? 'visible'
                                        : 'invisible'
                                    }`}
                >
                  <IoMdCheckmarkCircle />
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-3 ml-auto text-white"
            onClick={() => setIsBankModalVisible(false)}
          >
            Done
          </button>
        </Modal>
        <Modal
          visible={isGetCashModalVisible}
          setVisible={setIsGetCashModalVisible}
          hideTitle={true}
        >
          {/* // todo pass in the correct transaction Id */}
          <GetCash
            walletAddress={walletAddress}
            chainId={chainId}
            txId={'ll'}
          />
        </Modal>
      </section>
    </>
  );
};

export default ExchangeGetCash;
