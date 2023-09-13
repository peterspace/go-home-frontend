import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  TableExchange,
  TableExchangeBody,
  TableExchangeHead,
} from '../../../TableExchange';

import { MdDone, MdDoneAll } from 'react-icons/md';

//================={wallet connect}===================
import { useSigner, useAccount } from 'wagmi';

//================={Exchange To Cash Contracts}===================
import GoExchangeToCashETH from '../../../../Contracts/GoExchangeToCashETH.json';
import GoExchangeToCashMATIC from '../../../../Contracts/GoExchangeToCashMATIC.json';
import GoExchangeToCashBSC from '../../../../Contracts/GoExchangeToCashBSC.json';
import GoExchangeToCashArbitrum from '../../../../Contracts/GoExchangeToCashArbitrum.json';
import GoExchangeToCashOptimism from '../../../../Contracts/GoExchangeToCashOptimism.json';
import GoExchangeToCashGoerliETH from '../../../../Contracts/GoExchangeToCashGoerliETH.json';
import GoExchangeToCashTBNB from '../../../../Contracts/GoExchangeToCashTBNB.json';
import GoExchangeToCashMumbaiMATIC from '../../../../Contracts/GoExchangeToCashMumbaiMATIC.json';

// Drop down menu
const transactions = [
  {
    name: 'Get Cash',
    value: 1,
  },
  {
    name: 'Completed',
    value: 2,
  },
];
export default function ClientPageToCash({
  walletAddress,
  chainId,
  tokensGoerli,
  tokensMumbai,
}) {
  const { address, isConnected } = useAccount();
  //const [data, updateData] = useState(sampleData);
  const [dataClientGetCash, updateDataClientGetCash] = useState([]);
  const [dataClientCompletedTransacts, updateDataClientCompletedTransacts] =
    useState([]);
  const [hasDataFetched, setHasDataFetched] = useState(false);
  const [tokens, setTokens] = useState();

  //==================={wallet connect}==============================
  const signer = useSigner(); // use signer.data for ethers.Contract

  const [dexContractAddress, setDexContractAddress] = useState('');
  const [activeChainAddress, setActiveChainAddress] = useState('');
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);
  const [activeTransaction, setActiveTransaction] = useState();
  const [isGetCash, setIsGetCash] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [activeTrade, setActiveTrade] = useState(null);
  console.log({ activeTrade: activeTrade });

  const [activeFee, setActiveFee] = useState(null);
  console.log({ activeFee: activeFee });

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

  useEffect(() => {
    if (isGetCash) {
      setIsCompleted(false);
    }
    if (isCompleted) {
      setIsGetCash(false);
    }
  }, [isGetCash, isCompleted]);

  async function getClientsTransacts() {
    let dexContract = new ethers.Contract(
      dexContractAddress,
      dexContractAbi,
      signer.data // should be just "signer" if using windows.ethereum
    );

    let transact;
    let items;
    switch (activeTransaction) {
      case 'Get Cash':
        console.info('fetching Client Get Cash transactions');
        transact = await dexContract.getClientsHasNotReceivedCash();
        items = await Promise.all(
          transact.map(async (i) => {
            let CryptoPrice = ethers.utils.formatUnits(
              i.CryptoPrice.toString(),
              'ether'
            );
            let dexShare = ethers.utils.formatUnits(
              i.dexShare.toString(),
              'ether'
            );
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

        const bankDidNotPayCash = items.filter(
          (item) => item.clientReceivedCash === false
        );
        updateDataClientGetCash(bankDidNotPayCash);
        setIsGetCash(true);
        break;

      case 'Completed':
        console.info('fetching Client Completed transactions');
        transact = await dexContract.getClientsCompletedTransacts();
        items = await Promise.all(
          transact.map(async (i) => {
            let CryptoPrice = ethers.utils.formatUnits(
              i.CryptoPrice.toString(),
              'ether'
            );
            let dexShare = ethers.utils.formatUnits(
              i.dexShare.toString(),
              'ether'
            );
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

        const bankPaidCash = items.filter(
          (item) =>
            item.bankPaidCash === true && item.clientReceivedCash === true
        );
        updateDataClientCompletedTransacts(bankPaidCash);
        setIsCompleted(true);
        break;

      default:
        console.warn('Please choose a transaction!');
    }

    console.log('client transact', transact);
    // setHasDataFetched(true);
  }

  useEffect(() => {
    chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  useEffect(() => {
    chainId && activeTransaction !== undefined && getClientsTransacts();
    console.log('activeTransaction type', activeTransaction);
    !chainId && console.warn('Connect the wallet');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTransaction]);

  useEffect(() => {
    if (activeTrade) {
      setActiveFee(activeTrade?.dexShare);
    }
  }, [activeTrade]);

  async function clientGetCash() {
    try {
      let dexContract = new ethers.Contract(
        dexContractAddress,
        dexContractAbi,
        signer.data // should be just "signer" if using windows.ethereum
      );

      let transaction = await dexContract.clientGetCash(activeTrade?.txId);
      await transaction.wait();

      alert('Transaction completed. You have Received the Cash!');
    } catch (e) {
      console.error('Upload Error' + e);
      alert('Upload Error' + e);
    }
  }

  return (
    <>
      {/* <div className="w-[440px]"> */}
      <div className="flex flex-row gap-3 items-center">
        <h5 className="text-text-2-d">
          {activeTransaction === undefined ? 'Select' : 'Type:'}
        </h5>
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
                    ? 'bg-text-2-d/60 text-white'
                    : 'bg-text-2-d text-white'
                } border border-transparent`}
              >
                {tab.name}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto relative">
        {activeTransaction === transactions[0].name && (
          <TableExchange>
            <TableExchangeHead headArray={['Tx Id', 'amount', 'action']} />
            <TableExchangeBody>
              {dataClientGetCash.length > 0 ? (
                dataClientGetCash.map((row, idx) => (
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
                            className="py-4 px-6 font-medium whitespace-nowrap text-text-2-d"
                          >
                            {row?.txId} {/* txId */}
                          </th>
                          <td className="py-4 px-6 font-medium whitespace-nowrap text-text-2-d">
                            <span>{row?.CryptoPrice}</span>{' '}
                            <span>
                              {
                                tokens.find(
                                  (token) => row?.token === token.testAddress
                                )?.symbol
                              }
                            </span>
                          </td>

                          <td>
                            {row?.clientReceivedCash === true ? (
                              <button type="button">Received</button>
                            ) : (
                              <button
                                type="button"
                                className="bg-red-600 cursor-pointer px-2 py-1"
                                onClick={() => {
                                  clientGetCash();
                                }}
                              >
                                Mark as completed
                              </button>
                            )}
                          </td>
                        </>
                      ) : null}
                    </>
                  </tr>
                ))
              ) : !isGetCash ? (
                <tr>
                  <td></td>
                  <td className="text-estimateText">Fetching data</td>
                  <td></td>
                </tr>
              ) : (
                dataClientGetCash.length <= 0 && (
                  <tr>
                    <td></td>
                    <td className="text-estimateText">No transactions</td>
                    <td></td>
                  </tr>
                )
              )}
            </TableExchangeBody>
          </TableExchange>
        )}
        {activeTransaction === transactions[1].name && (
          <TableExchange>
            <TableExchangeHead headArray={['Tx Id', 'amount', 'completed']} />
            <TableExchangeBody>
              {dataClientCompletedTransacts.length > 0 ? (
                dataClientCompletedTransacts.map((row, idx) => (
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
                            className="py-4 px-6 font-medium whitespace-nowrap text-text-2-d"
                          >
                            {row?.txId} {/* txId */}
                          </th>
                          <td className="py-4 px-6 font-medium whitespace-nowrap text-text-2-d">
                            <span>{row?.CryptoPrice}</span>{' '}
                            <span>
                              {
                                tokens.find(
                                  (token) => row?.token === token.testAddress
                                )?.symbol
                              }
                            </span>
                          </td>
                          <td className="">
                            <span className="flex flex-row justify-center items-center text-text-2-d">
                              {row.completed ? <MdDoneAll /> : <MdDone />}
                            </span>
                          </td>
                        </>
                      ) : null}
                    </>
                  </tr>
                ))
              ) : !isCompleted ? (
                <tr>
                  <td></td>
                  <td className="text-estimateText">Fetching data</td>
                  <td></td>
                </tr>
              ) : (
                dataClientCompletedTransacts.length <= 0 && (
                  <tr>
                    <td></td>
                    <td className="text-estimateText">No transactions</td>
                    <td></td>
                  </tr>
                )
              )}
            </TableExchangeBody>
          </TableExchange>
        )}
      </div>
      {/* </div> */}
    </>
  );
}
