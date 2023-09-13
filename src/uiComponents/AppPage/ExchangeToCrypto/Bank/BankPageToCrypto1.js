import React, { useState, useEffect } from 'react';
// import BankGetCashTile from './BankGetCashTile';
// import BankPayCryptoTile from './BankPayCryptoTile';
// import BankCompletedTransactTile from './BankCompletedTransactTile';
// import axios from "axios";
import { ethers } from 'ethers';
import truncateEthAddress from '../../../../utils/TruncateEthAddress';
import {
  TableExchange,
  TableExchangeHead,
  TableExchangeBody,
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
    name: 'Get Cash',
    value: 1,
  },
  {
    name: 'Pay Crypto',
    value: 2,
  },
  {
    name: 'Completed',
    value: 3,
  },
];

export default function BankPageToCrypto({
  walletAddress,
  chainId,
  tokensGoerli,
  tokensMumbai,
}) {
  const { address, connector, isConnected } = useAccount();
  const [tokens, setTokens] = useState([]);
  const [dataBankGetCash, updateDataBankGetCash] = useState([]);
  const [dataBankPayCrypto, updateDataBankPayCrypto] = useState([]);
  const [dataBankCompletedTransacts, updateDataBankCompletedTransacts] =
    useState([]);
  const [activeTransaction, setActiveTransaction] = useState();
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState(0.1);
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [activeChainAddress, setActiveChainAddress] = useState();
  const [dexContractAddress, setDexContractAddress] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);
  const [hasDataFetched, setHasDataFetched] = useState(false);
  const [activeTrade, setActiveTrade] = useState(null);
  console.log({ activeTrade: activeTrade });
  //==================={wallet connect}==============================
  const signer = useSigner(); // use signer.data for ethers.Contract
  //   let message = `
  //   Govercity Connect >>
  //   Transact: Transfer
  //   Token: ${token?.symbol}
  //   Address: ${walletAddress}
  //   `;
  //   const { data, signMessage } = useSignMessage({ message });
  //const [activeTransaction, setactiveTransaction] = useState(transactions[0]);

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
          setDexContractAddress(GoExchangeToCryptoGoerliETH.address);
          setDexContractAbi(GoExchangeToCryptoGoerliETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 80001:
          //MUMBAIMATIC
          setDexContractAddress(GoExchangeToCryptoMumbaiMATIC.address);
          setDexContractAbi(GoExchangeToCryptoMumbaiMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          setTokens(tokensMumbai);
          break;

        case 97:
          //TBNB
          setDexContractAddress(GoExchangeToCryptoTBNB.address);
          setDexContractAbi(GoExchangeToCryptoTBNB.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 1:
          //ETH
          setDexContractAddress(GoExchangeToCryptoETH.address);
          setDexContractAbi(GoExchangeToCryptoETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          setTokens(tokensGoerli);
          break;

        case 137:
          //MATIC
          setDexContractAddress(GoExchangeToCryptoMATIC.address);
          setDexContractAbi(GoExchangeToCryptoMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          setTokens(tokensMumbai);
          break;

        case 56:
          //BNB(BSC)
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
          //ARBITRUM
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

  async function getClientsTransacts() {
    let dexContract = new ethers.Contract(
      dexContractAddress,
      dexContractAbi,
      signer.data // should be just "signer" if using windows.ethereum
    );
    let items;

    let transaction;

    switch (activeTransaction) {
      case 'Get Cash':
        console.info('Fetching Get Cash transactions');
        transaction = await dexContract.getBanksHasNotReceivedCash();
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
            //========================{GENERAL STRUCTS}=========================

            //sumCryptoPrice += Number(CryptoPrice);
            // sumDexShare += Number(dexShare);
            return item;
          })
        );
        const bankDidNotReceiveCash = items.filter(
          (item) => item.bankReceivedCash === false
        );
        updateDataBankGetCash(bankDidNotReceiveCash);
        setHasDataFetched(true);
        break;

      case 'Pay Crypto':
        console.info('Fetching Pay Crypto transactions');
        transaction = await dexContract.getBanksHasNotPaidCrypto();
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
            //========================{GENERAL STRUCTS}=========================

            //sumCryptoPrice += Number(CryptoPrice);
            // sumDexShare += Number(dexShare);
            return item;
          })
        );
        const bankDidNotPayCrypto = items.filter(
          (item) =>
            item.bankReceivedCash === true && item.bankPaidCrypto === false
        );
        updateDataBankPayCrypto(bankDidNotPayCrypto);
        setHasDataFetched(true);
        break;

      case 'Completed':
        console.info('Fetching Completed transactions');
        transaction = await dexContract.getBanksCompletedTransacts();
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
            //========================{GENERAL STRUCTS}=========================

            //sumCryptoPrice += Number(CryptoPrice);
            // sumDexShare += Number(dexShare);
            return item;
          })
        );
        const bankCompletedTransaction = items.filter(
          (item) => item.bankPaidCrypto === true
        );
        updateDataBankCompletedTransacts(bankCompletedTransaction);
        setHasDataFetched(true);
        break;

      default:
        console.warn('Please choose a transaction!');
    }

    console.log(transaction);

    //Fetch all the details of every NFT from the contract and display
  }

  // DexCreateOrder => DexMarketplace => NFTTile => DexNfTpage=> act
  useEffect(() => {
    chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  useEffect(() => {
    chainId && activeTransaction !== undefined && getClientsTransacts();
    chainId && console.log('activeTransaction type', activeTransaction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTransaction, activeChainAddress]);

  async function bankReceiveCash() {
    if (activeTrade?.txId > 0) {
      try {
        let dexContract = new ethers.Contract(
          dexContractAddress,
          dexContractAbi,
          signer.data // should be just "signer" if using windows.ethereum
        );

         // let transaction = await dexContract.bankReceiveCash(
        //   activeTrade?.txId,
        //   activeTrade?.dexShare,
        //   {
        //     value: activeTrade?.dexShare, // receive dexshare
        //     gasLimit: 3000000,
        //   }
        // );

        let transaction = await dexContract.bankReceiveCash(
          activeTrade?.txId,
          // activeTrade?.CryptoPrice,
          activeTrade?.CryptoPriceRaw,
          activeTrade?.dexShare,
          {
            // value: activeTrade?.dexShare, // receive dexshare modified
            gasLimit: 3000000,
          }
        );
        await transaction.wait();

        alert('Transaction completed. You have received Cash!');
      } catch (e) {
        console.error('Upload Error' + e);
        alert('Upload Error' + e);
      }
    }
  }

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
            {/* Get Cash */}
            {activeTransaction === transactions[0].name && (
              <TableExchange>
                <TableExchangeHead
                  headArray={['Tx Id', 'client', 'amount', '', 'action']}
                />
                <TableExchangeBody>
                  {hasDataFetched && dataBankGetCash.length > 0 ? (
                    dataBankGetCash.map((row, idx) => (
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
                                <button
                                  type="button"
                                  onClick={() => {
                                    bankReceiveCash();
                                  }}
                                >
                                  Mark as Cash Received
                                </button>
                              </td>
                            </>
                          ) : null}
                        </>
                      </tr>
                    ))
                  ) : !hasDataFetched ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Fetching transaction data</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    dataBankGetCash.length <= 0 && (
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
            {/* Pay Crypto */}
            {activeTransaction === transactions[1].name && (
              <TableExchange>
                <TableExchangeHead
                  headArray={['Tx Id', 'client', 'amount', '', 'action']}
                />
                <TableExchangeBody>
                  {hasDataFetched && dataBankPayCrypto.length > 0 ? (
                    dataBankPayCrypto.map((row, idx) => (
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
                              {/* <td>
                                <button
                                  type="button"
                                >
                                  Pay Crypto
                                </button>
                              </td> */}
                              <td>
                                {row.bankPaidCrypto ? (
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
                  ) : !hasDataFetched ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Fetching transaction data</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    dataBankPayCrypto.length <= 0 && (
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
            {/* Completed */}
            {activeTransaction === transactions[2].name && (
              <TableExchange>
                <TableExchangeHead
                  headArray={['Tx Id', 'client', 'amount', '', 'completed']}
                />
                <TableExchangeBody>
                  {hasDataFetched && dataBankCompletedTransacts.length > 0 ? (
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
                                {row.clientReceivedCash ? (
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
                  ) : !hasDataFetched ? (
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
