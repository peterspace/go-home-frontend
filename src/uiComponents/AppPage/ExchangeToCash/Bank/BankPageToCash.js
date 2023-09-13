import React, { useState, useEffect } from 'react';
// import BankGetCryptoTile from "./BankGetCryptoTile";
// import BankPayCashTile from "./BankPayCashTile";
// import BankCompletedTransactTile from "./BankCompletedTransactTile";
// import axios from "axios";
import { ethers } from 'ethers';
import { MdDone, MdDoneAll } from 'react-icons/md';
import {
  TableExchange,
  TableExchangeHead,
  TableExchangeBody,
} from '../../../TableExchange';

//================={wallet connect}===================
import { useAccount, useSigner } from 'wagmi';

//================={Exchange To Cash Contracts}===================
import GoExchangeToCashETH from '../../../../Contracts/GoExchangeToCashETH.json';
import GoExchangeToCashMATIC from '../../../../Contracts/GoExchangeToCashMATIC.json';
import GoExchangeToCashBSC from '../../../../Contracts/GoExchangeToCashBSC.json';
import GoExchangeToCashArbitrum from '../../../../Contracts/GoExchangeToCashArbitrum.json';
import GoExchangeToCashOptimism from '../../../../Contracts/GoExchangeToCashOptimism.json';
import GoExchangeToCashGoerliETH from '../../../../Contracts/GoExchangeToCashGoerliETH.json';
import GoExchangeToCashTBNB from '../../../../Contracts/GoExchangeToCashTBNB.json';
import GoExchangeToCashMumbaiMATIC from '../../../../Contracts/GoExchangeToCashMumbaiMATIC.json';
import truncateEthAddress from '../../../../utils/TruncateEthAddress';

// Drop down menu
const transactions = [
  {
    name: 'Pay Cash',
    value: 1,
  },
  {
    name: 'Get Crypto',
    value: 2,
  },
  {
    name: 'Completed',
    value: 3,
  },
];

export default function BankPageToCash({
  walletAddress,
  chainId,
  tokensGoerli,
  tokensMumbai,
}) {
  const { address, connector, isConnected } = useAccount();
  const [tokens, setTokens] = useState([]);
  const [dataBankGetCrypto, updateDataBankGetCrypto] = useState([]);
  const [dataBankPayCash, updateDataBankPayCash] = useState([]);
  // const [selectedTransaction, setSelectedTransaction] = useState();
  const [dataBankCompletedTransacts, updateDataBankCompletedTransacts] =
    useState([]);
    console.log({ checkData: dataBankCompletedTransacts });
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState(0.1);
  const [dexContractAddress, setDexContractAddress] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);
  const [quote, setQuote] = useState();
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [activeChainAddress, setActiveChainAddress] = useState();
  const [activeTransaction, setActiveTransaction] = useState();
  const [hasDataFetched, setHasDataFetched] = useState(false);

  const [isPayCash, setIsPayCash] = useState(false);
  const [isGetCrypto, setIsGetCrypto] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTrade, setActiveTrade] = useState(null);
  console.log({ activeTrade: activeTrade });

  

  // const [activeFee, setActiveFee] = useState(null);
  // console.log({ activeFee: activeFee ? activeFee : "" });

  //==================={wallet connect}==============================
  const signer = useSigner(); // use signer.data for ethers.Contract
  // 	let message = `
  //   Govercity Connect >>
  //   Transact: Transfer
  //   Token: ${token?.symbol}
  //   Address: ${walletAddress}
  //   `;
  // 	const {data, signMessage} = useSignMessage({message});

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

    //=======get Crypto Contract Switcher
    try {
      switch (chainId) {
        case 5:
          //GOERLIETH
          setDexContractAddress(GoExchangeToCashGoerliETH.address);
          setDexContractAbi(GoExchangeToCashGoerliETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 80001:
          //MUMBAIMATIC
          setDexContractAddress(GoExchangeToCashMumbaiMATIC.address);
          setDexContractAbi(GoExchangeToCashMumbaiMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          setTokens(tokensMumbai);
          break;

        case 97:
          //TBNB
          setDexContractAddress(GoExchangeToCashTBNB.address);
          setDexContractAbi(GoExchangeToCashTBNB.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 1:
          //ETH
          setDexContractAddress(GoExchangeToCashETH.address);
          setDexContractAbi(GoExchangeToCashETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 137:
          //MATIC
          setDexContractAddress(GoExchangeToCashMATIC.address);
          setDexContractAbi(GoExchangeToCashMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          setTokens(tokensMumbai);
          break;

        case 56:
          //BNB(BSC)
          setDexContractAddress(GoExchangeToCashBSC.address);
          setDexContractAbi(GoExchangeToCashBSC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 10:
          //OPTIMISM (currency: ETH)
          setDexContractAddress(GoExchangeToCashOptimism.address);
          setDexContractAbi(GoExchangeToCashOptimism.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 42161:
          //ARBITRUM
          setDexContractAddress(GoExchangeToCashArbitrum.address);
          setDexContractAbi(GoExchangeToCashArbitrum.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        default:
          console.warn('Please choose a token!');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }



  // useEffect(() => {
  //   if (activeTransaction === transactions[0]?.name && !isPayCash) {
  //     getClientsTransacts()
  //   }
  //   if (activeTransaction === transactions[1]?.name && !isGetCrypto) {
  //     getClientsTransacts()
  //   }
  //   if (activeTransaction === transactions[2]?.name && !isCompleted) {
  //     getClientsTransacts()
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeTransaction, isPayCash, isGetCrypto, isCompleted]);

  async function getClientsTransacts() {
    let dexContract = new ethers.Contract(
      dexContractAddress,
      dexContractAbi,
      signer.data // should be just "signer" if using windows.ethereum
    );

    let items;

    let transaction;
    switch (activeTransaction) {
      case 'Pay Cash':
        console.info('fetching Pay Cash transactions');
        transaction = await dexContract.getBanksHasNotPaidCash();
        items = await Promise.all(
          transaction.map(async (i) => {
            let CryptoPrice = ethers.utils.formatUnits(
              i.CryptoPrice.toString(),
              'ether'
            );
            let dexShare = i.dexShare.toString();
            // let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), 'ether');
            let item1 = {
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

            return item1;
            //sumCryptoPrice += Number(CryptoPrice);
            // sumDexShare += Number(dexShare);
          })
        );

        const bankDidNotPayCash = items.filter(
          (item) => item.bankPaidCash === false
        );
        updateDataBankPayCash(bankDidNotPayCash);
        // setHasDataFetched(true);
        setIsPayCash(true);
        break;

      case 'Get Crypto':
        console.info('fetching Get Crypto transactions');
        transaction = await dexContract.getBanksHasNotReceivedCrypto();
        items = await Promise.all(
          transaction.map(async (i) => {
            let CryptoPrice = ethers.utils.formatUnits(
              i.CryptoPrice.toString(),
              'ether'
            );
            let dexShare = i.dexShare.toString();
            // let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), 'ether');
            let item1 = {
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

            return item1;
            //sumCryptoPrice += Number(CryptoPrice);
            // sumDexShare += Number(dexShare);
          })
        );

        const bankDidNotReceiveCrypto = items.filter(
          (item) => item.bankReceivedCrypto === false
        );
        updateDataBankGetCrypto(bankDidNotReceiveCrypto);
        // setHasDataFetched(true);
        setIsGetCrypto(true);
        break;

      case 'Completed':
        console.info('fetching Completed transactions');
        transaction = await dexContract.getBanksCompletedTransacts();
        items = await Promise.all(
          transaction.map(async (i) => {
            let CryptoPrice = ethers.utils.formatUnits(
              i.CryptoPrice.toString(),
              'ether'
            );
            let dexShare = i.dexShare.toString();
            // let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), 'ether');
            let item1 = {
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

            return item1;
            //sumCryptoPrice += Number(CryptoPrice);
            // sumDexShare += Number(dexShare);
          })
        );
        const bankCompletedTransaction = items.filter(
          (item) => item.completed === true
        );
        updateDataBankCompletedTransacts(bankCompletedTransaction);
        // setHasDataFetched(true);
        setIsCompleted(true);
        break;

      default:
        console.log('getClientsTransacts', 'in default');
        transaction = ['Please choose a transaction!'];
    }
  }

  // useEffect(() => {
  //   if (activeTrade) {
  //     setActiveFee(activeTrade?.dexShare);
  //   }
  // }, [activeTrade]);

  async function bankPayCash() {
    if (activeTrade?.txId > 0) {
      try {
        let dexContract = new ethers.Contract(
          dexContractAddress,
          dexContractAbi,
          signer.data // should be just "signer" if using windows.ethereum
        );

        let transaction = await dexContract.bankPayCash(activeTrade?.txId);
        await transaction.wait();

        alert('Transaction completed. You have Paid the Client in Cash!');
      } catch (e) {
        console.error('Upload Error' + e);
        alert('Upload Error' + e);
      }
    }
  }

  async function bankGetCrypto() {
    if (activeTrade?.txId > 0) {
      try {
        let dexContract = new ethers.Contract(
          dexContractAddress,
          dexContractAbi,
          signer.data // should be just "signer" if using windows.ethereum
        );

        let transaction = await dexContract.bankGetCrypto(
          activeTrade?.txId,
          activeTrade?.dexShare,
          {
            value: activeTrade?.dexShare, // receive dexshare
            gasLimit: 3000000,
          }
        );
        await transaction.wait();

        alert('Transaction completed. You have Received the Crypto!');
      } catch (e) {
        console.error('Upload Error' + e);
        alert('Upload Error' + e);
      }
    }
  }

  // DexCreateOrder => DexMarketplace => NFTTile => DexNfTpage=> act

  useEffect(() => {
    chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  useEffect(() => {
    chainId && activeTransaction !== undefined && getClientsTransacts();
    console.log('activeTransaction type', activeTransaction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTransaction, activeChainAddress]);

  return (
    <>
      {isConnected ? (
        <div>
          <div className="flex flex-row gap-3 items-center">
            <h5 className="text-gray-500">Transaction Type:</h5>
            <div
              className="my-3 flex flex-row gap-2 start"
              onChange={(e) => setActiveTransaction(e.target.value)}
            >
              {transactions.map((tab) => (
                <label key={tab.value}>
                  <input
                    type="radio"
                    id="tab"
                    name="tab"
                    value={tab.name}
                    className="peer sr-only"
                  />
                  <span
                    className={`px-2 py-1 rounded-md cursor-pointer ${
                      tab.name === activeTransaction
                        ? 'bg-sky-600 text-gray-200'
                        : 'bg-black/50 text-gray-200/30'
                    } border border-transparent peer-hover:border-gray-200/30 peer-checked:bg-sky-600 peer-checked:hover:border-transparent peer-checked:text-gray-200`}
                  >
                    {tab.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto relative">
            {/* Pay Cash */}
            {activeTransaction === transactions[0].name && (
              <TableExchange>
                <TableExchangeHead
                  headArray={['Tx Id', 'client', 'amount', '', 'action']}
                />
                <TableExchangeBody>
                  {dataBankPayCash.length > 0 ? (
                    dataBankPayCash.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-700 bg-transparent even:bg-gray-700/30 hover:bg-gray-400/20"
                        onClick={() => {
                          setActiveTrade(row);
                        }}
                      >
                        <>
                          {row?.txId > 0 ? (
                            <>
                              <th
                                scope="row"
                                className="py-4 px-6 font-medium whitespace-nowrap text-white"
                              >
                                {row?.txId} {/* txId */}
                              </th>
                              {console.info(row)}
                              <td>{truncateEthAddress(row?.client)}</td>
                              <td>
                                <span>{row?.CryptoPrice}</span>{' '}
                                <span>
                                  {
                                    tokens.find(
                                      (token) =>
                                        row?.token === token.testAddress
                                    )?.symbol
                                  }
                                </span>
                              </td>
                              <td>
                                <img
                                  src={
                                    tokens.find(
                                      (token) =>
                                        row?.token === token.testAddress
                                    )?.logoURI
                                  }
                                  alt=""
                                  className="w-[25px] h-[25px]"
                                />
                              </td>
                              <td>
                                {row?.bankPaidCash === true ? (
                                  <button type="button">
                                    Paid
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="bg-red-600 text-white cursor-pointer px-2 py-1"
                                    onClick={() => {
                                      bankPayCash();
                                    }}
                                  >
                                    Mark as cash paid
                                  </button>
                                )}
                              </td>
                            </>
                          ) : null}
                        </>
                      </tr>
                    ))
                  ) : !isPayCash ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Fetching transaction data</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    dataBankPayCash.length <= 0 && (
                      <tr>
                        <td></td>
                        <td></td>
                        <td>No active transactions</td>
                        <td></td>
                        <td></td>
                      </tr>
                    )
                  )}
                </TableExchangeBody>
              </TableExchange>
            )}
            {/* Get Crypto */}
            {activeTransaction === transactions[1].name && (
              <TableExchange>
                <TableExchangeHead
                  headArray={['Tx Id', 'client', 'amount', '', 'action']}
                />
                <TableExchangeBody>
                  {dataBankGetCrypto.length > 0 ? (
                    dataBankGetCrypto.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-700 bg-transparent even:bg-gray-700/30 hover:bg-gray-400/20"
                        onClick={() => {
                          setActiveTrade(row);
                        }}
                      >
                        <>
                          {row?.txId > 0 ? (
                            <>
                              <th
                                scope="row"
                                className="py-4 px-6 font-medium whitespace-nowrap text-white"
                              >
                                {row?.txId} {/* txId */}
                              </th>
                              {console.info(row)}
                              <td>{truncateEthAddress(row?.client)}</td>
                              <td>
                                <span>{row?.CryptoPrice}</span>{' '}
                                <span>
                                  {
                                    tokens.find(
                                      (token) =>
                                        row?.token === token.testAddress
                                    )?.symbol
                                  }
                                </span>
                              </td>
                              <td>
                                <img
                                  src={
                                    tokens.find(
                                      (token) =>
                                        row?.token === token.testAddress
                                    )?.logoURI
                                  }
                                  alt=""
                                  className="w-[25px] h-[25px]"
                                />
                              </td>
                              <td>
                                {row?.bankReceivedCrypto === true ? (
                                  <button type="button">Received</button>
                                ) : (
                                  <button
                                    type="button"
                                    className="bg-red-600 text-white cursor-pointer px-2 py-1"
                                    onClick={() => {
                                      bankGetCrypto();
                                    }}
                                  >
                                    Get Crypto
                                  </button>
                                )}
                              </td>
                            </>
                          ) : null}
                        </>
                      </tr>
                    ))
                  ) : !isGetCrypto ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Fetching transaction data</td>
                      <td></td>
                    </tr>
                  ) : (
                    dataBankPayCash.length <= 0 && (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>No active transactions</td>
                        <td></td>
                      </tr>
                    )
                  )}
                </TableExchangeBody>
              </TableExchange>
            )}

            {/* Completed */}
            {activeTransaction === transactions[2].name && (
              <TableExchange>
                <TableExchangeHead
                  headArray={['Tx Id', 'client', 'amount', '', 'completed']}
                />
                <TableExchangeBody>
                  {dataBankCompletedTransacts.length > 0 ? (
                    dataBankCompletedTransacts.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-700 bg-transparent even:bg-gray-700/30 hover:bg-gray-400/20"
                        onClick={() => {
                          setActiveTrade(row);
                        }}
                      >
                        <>
                          {row?.txId > 0 ? (
                            <>
                              <th
                                scope="row"
                                className="py-4 px-6 font-medium whitespace-nowrap text-white"
                              >
                                {row?.txId} {/* txId */}
                              </th>
                              {console.info(row)}
                              <td>{truncateEthAddress(row?.client)}</td>
                              <td>
                                <span>{row?.CryptoPrice}</span>{' '}
                                <span>
                                  {
                                    tokens.find(
                                      (token) =>
                                        row?.token === token.testAddress
                                    )?.symbol
                                  }
                                </span>
                              </td>
                              <td>
                                <img
                                  src={
                                    tokens.find(
                                      (token) =>
                                        row?.token === token.testAddress
                                    )?.logoURI
                                  }
                                  alt=""
                                  className="w-[25px] h-[25px]"
                                />
                              </td>
                              <td>
                                {row.completed ? (
                                  <MdDoneAll />
                                ) : (
                                  <MdDone />
                                )}
                              </td>
                            </>
                          ) : null}
                        </>
                      </tr>
                    ))
                  ) : !isCompleted ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Fetching transaction data</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    dataBankCompletedTransacts.length <= 0 && (
                      <tr>
                        <td></td>
                        <td></td>
                        <td>No transaction data</td>
                        <td></td>
                        <td></td>
                      </tr>
                    )
                  )}
                </TableExchangeBody>
              </TableExchange>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
