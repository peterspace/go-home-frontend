import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  TableExchange,
  TableExchangeBody,
  TableExchangeHead,
} from '../../../TableExchange';
import { MdDone, MdDoneAll } from 'react-icons/md';

//================={wallet connect}===================
import { useAccount, useSigner } from 'wagmi';

//================={Exchange To Crypto Contracts}===================
import GoExchangeToCryptoETH from '../../../../Contracts/GoExchangeToCryptoETH.json';
import GoExchangeToCryptoMATIC from '../../../../Contracts/GoExchangeToCryptoMATIC.json';
import GoExchangeToCryptoBSC from '../../../../Contracts/GoExchangeToCryptoBSC.json';
import GoExchangeToCryptoArbitrum from '../../../../Contracts/GoExchangeToCryptoArbitrum.json';
import GoExchangeToCryptoOptimism from '../../../../Contracts/GoExchangeToCryptoOptimism.json';
import GoExchangeToCryptoGoerliETH from '../../../../Contracts/GoExchangeToCryptoGoerliETH.json';
import GoExchangeToCryptoTBNB from '../../../../Contracts/GoExchangeToCryptoTBNB.json';
import GoExchangeToCryptoMumbaiMATIC from '../../../../Contracts/GoExchangeToCryptoMumbaiMATIC.json';

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

export default function ClientPageToCrypto({
  walletAddress,
  chainId,
  tokensGoerli,
  tokensMumbai,
}) {
  const { address, connector, isConnected } = useAccount();
  //const [data, updateData] = useState(sampleData);
  const [tokens, setTokens] = useState();
  const [dataClientGetCrypto, updateDataClientGetCrypto] = useState([]);
  const [dataClientPayCash, updateDataClientPayCash] = useState([]);
  const [dataClientCompletedTransacts, updateDataClientCompletedTransacts] =
    useState([]);

  console.log({ dataClientGetCrypto: dataClientGetCrypto });
  console.log({ dataClientPayCash: dataClientPayCash });
  console.log({ dataClientCompletedTransacts: dataClientCompletedTransacts });

  const [hasDataFetched, updateHasDataFetched] = useState(false);
  //==================={wallet connect}==============================
  const signer = useSigner(); // use signer.data for ethers.Contract

  // const {data, signMessage} = useSignMessage({message});
  const [dexContractAddress, setDexContractAddress] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState(0.1);
  const [activeTransaction, setActiveTransaction] = useState();
  const [activeChainDecimals, setActiveChainDecimals] = useState(0);
  const [activeChainAddress, setActiveChainAddress] = useState();
  const [activeTrade, setActiveTrade] = useState(null);
  console.log({ activeTrade: activeTrade });
  const [isGetCrypto, setIsGetCrypto] = useState(false);
  const [isPayCash, setIsPayCash] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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
          //GOERLIETH (currency: ETH)
          setDexContractAddress(GoExchangeToCryptoGoerliETH.address);
          setDexContractAbi(GoExchangeToCryptoGoerliETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 80001:
          //MUMBAIMATIC (currency: MATIC)
          setDexContractAddress(GoExchangeToCryptoMumbaiMATIC.address);
          setDexContractAbi(GoExchangeToCryptoMumbaiMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          setTokens(tokensMumbai);
          break;

        case 97:
          //TBNB (currency: BNB)
          setDexContractAddress(GoExchangeToCryptoTBNB.address);
          setDexContractAbi(GoExchangeToCryptoTBNB.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 1:
          //ETH (currency: ETH)
          setDexContractAddress(GoExchangeToCryptoETH.address);
          setDexContractAbi(GoExchangeToCryptoETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 137:
          //MATIC (currency: MATIC)
          setDexContractAddress(GoExchangeToCryptoMATIC.address);
          setDexContractAbi(GoExchangeToCryptoMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          setTokens(tokensMumbai);
          break;

        case 56:
          //BNB(BSC) (currency: BNB)
          setDexContractAddress(GoExchangeToCryptoBSC.address);
          setDexContractAbi(GoExchangeToCryptoBSC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 10:
          //OPTIMISM (currency: ETH)
          setDexContractAddress(GoExchangeToCryptoOptimism.address);
          setDexContractAbi(GoExchangeToCryptoOptimism.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 42161:
          //ARBITRUM (currency: ETH)
          setDexContractAddress(GoExchangeToCryptoArbitrum.address);
          setDexContractAbi(GoExchangeToCryptoArbitrum.abi);
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
    if (isPayCash) {
      setIsGetCrypto(false);
      setIsCompleted(false);
    }
    if (isGetCrypto) {
      setIsPayCash(false);
      setIsCompleted(false);
    }
    if (isCompleted) {
      setIsCompleted(false);
    }
  }, [isPayCash, isGetCrypto, isCompleted]);

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
        transaction = await dexContract.getClientsHasNotPaidCash();
        items = await Promise.all(
          transaction.map(async (i) => {
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
              clientPaidCash: i.clientPaidCash,
              bankReceivedCash: i.bankReceivedCash,
              bankPaidCrypto: i.bankPaidCrypto,
              clientReceivedCrypto: i.clientReceivedCrypto,
              started: i.started,
            };

            return item;
          })
        );
        const clientDidNotPayCashANDbankDidNotPayCrypto = items.filter(
          (item) =>
            item.clientPaidCash === false && item.bankPaidCrypto === false
        );
        updateDataClientPayCash(clientDidNotPayCashANDbankDidNotPayCrypto);
        setIsPayCash(true);
        break;

      case 'Get Crypto':
        console.info('fetching Get Crypto transactions');
        transaction = await dexContract.getClientsHasNotReceivedCrypto();
        items = await Promise.all(
          transaction.map(async (i) => {
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
              clientPaidCash: i.clientPaidCash,
              bankReceivedCash: i.bankReceivedCash,
              bankPaidCrypto: i.bankPaidCrypto,
              clientReceivedCrypto: i.clientReceivedCrypto,
              started: i.started,
            };

            return item;
          })
        );
        const clientDidNotReceiveCrypto = items.filter(
          (item) =>
            item.clientPaidCash === true && item.bankPaidCrypto === false
        );
        updateDataClientGetCrypto(clientDidNotReceiveCrypto);
        setIsGetCrypto(true);
        break;

      case 'Completed':
        console.info('fetching Completed transactions');
        transaction = await dexContract.getClientsCompletedTransacts();
        items = await Promise.all(
          transaction.map(async (i) => {
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
              clientPaidCash: i.clientPaidCash,
              bankReceivedCash: i.bankReceivedCash,
              bankPaidCrypto: i.bankPaidCrypto,
              clientReceivedCrypto: i.clientReceivedCrypto,
              started: i.started,
            };

            return item;
          })
        );
        const completedTransaction = items.filter(
          (item) =>
            // item.bankPaidCrypto === true && item.clientReceivedCrypto === true
            item.completed === true
        );
        updateDataClientCompletedTransacts(completedTransaction);
        setIsCompleted(true);
        break;

      default:
        console.warn('Please choose a minting type!');
    }

    // Client Pay Cash
  }

  useEffect(() => {
    chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  useEffect(() => {
    chainId && activeTransaction !== undefined && getClientsTransacts();
    console.log('activeTransaction type', activeTransaction);
    !chainId && console.warn('Connect The Wallet');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTransaction]);

  async function clientPayCash() {
    if (activeTrade?.txId > 0) {
      try {
        let dexContract = new ethers.Contract(
          dexContractAddress,
          dexContractAbi,
          signer.data // should be just "signer" if using windows.ethereum
        );

        let transaction = await dexContract.clientPayCash(activeTrade?.txId);
        await transaction.wait();

        alert('Transaction completed. You have Paid for the Order in Cash!');
      } catch (e) {
        console.error('Upload Error' + e);
        alert('Upload Error' + e);
      }
    }
  }

  // Optional
  async function clientReceiveCrypto() {
    if (activeTrade?.txId > 0) {
      try {
        let dexContract = new ethers.Contract(
          dexContractAddress,
          dexContractAbi,
          signer.data // should be just "signer" if using windows.ethereum
        );

        let transaction = await dexContract.clientReceiveCrypto(
          activeTrade?.txId
        );
        await transaction.wait();

        alert('Transaction completed. You have Received Crypto!');
      } catch (e) {
        console.error('Upload Error' + e);
        alert('Upload Error' + e);
      }
    }
  }

  return (
    <>
      {isConnected ? (
        <>
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
            {/* Pay Cash */}
            {activeTransaction === transactions[0].name && (
              <TableExchange>
                <TableExchangeHead headArray={['Tx Id', 'amount', 'action']} />
                <TableExchangeBody>
                  {dataClientPayCash.length > 0 ? (
                    dataClientPayCash.map((row, idx) => (
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
                                      (token) =>
                                        row?.token === token.testAddress
                                    )?.symbol
                                  }
                                </span>
                              </td>
                              <td>
                                {row?.clientPaidCash === true ? (
                                  <button type="button">Paid</button>
                                ) : (
                                  <button
                                    type="button"
                                    className="bg-red-600 text-white cursor-pointer px-2 py-1"
                                    onClick={() => {
                                      clientPayCash();
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
                      <td className="text-estimateText">Fetching data</td>
                      <td></td>
                    </tr>
                  ) : (
                    dataClientPayCash.length <= 0 && (
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

            {/* Get Crypto */}
            {activeTransaction === transactions[1].name && (
              <TableExchange>
                <TableExchangeHead headArray={['Tx Id', 'amount', 'action']} />
                <TableExchangeBody>
                  {dataClientGetCrypto.length > 0 ? (
                    dataClientGetCrypto.map((row, idx) => (
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
                                      (token) =>
                                        row?.token === token.testAddress
                                    )?.symbol
                                  }
                                </span>
                              </td>

                              {/* <td>
                                <button
                                  type="button"
                                  onClick={() => {
                                    clientReceiveCrypto();
                                  }}
                                >
                                  Mark as crypto received
                                </button>
                              </td> */}
                              <td className="">
                                <span className="flex flex-row justify-center items-center text-text-2-d">
                                  {row.bankPaidCrypto ? (
                                    <MdDoneAll />
                                  ) : (
                                    <MdDone />
                                  )}
                                </span>
                              </td>
                            </>
                          ) : null}
                        </>
                      </tr>
                    ))
                  ) : !isGetCrypto ? (
                    <tr>
                      <td></td>
                      <td className="text-estimateText">Fetching data</td>
                      <td></td>
                    </tr>
                  ) : (
                    dataClientGetCrypto.length <= 0 && (
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

            {/* Completed */}
            {activeTransaction === transactions[2].name && (
              <TableExchange>
                <TableExchangeHead headArray={['Tx Id', 'amount', 'action']} />
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
                                      (token) =>
                                        row?.token === token.testAddress
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
        </>
      ) : null}
    </>
  );
}
