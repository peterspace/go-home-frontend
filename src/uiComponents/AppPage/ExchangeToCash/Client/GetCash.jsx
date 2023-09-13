//import MarketplaceJSON from "../Marketplace.json";
import axios from 'axios';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
//================={wallet connect}===================
import { useSigner, useSignMessage } from "wagmi";

//================={Exchange To Cash Contracts}===================
import GoExchangeToCashETH from '../../../../Contracts/GoExchangeToCashETH.json';
import GoExchangeToCashMATIC from '../../../../Contracts/GoExchangeToCashMATIC.json';
import GoExchangeToCashBSC from '../../../../Contracts/GoExchangeToCashBSC.json';
import GoExchangeToCashArbitrum from '../../../../Contracts/GoExchangeToCashArbitrum.json';
import GoExchangeToCashOptimism from '../../../../Contracts/GoExchangeToCashOptimism.json';
import GoExchangeToCashGoerliETH from '../../../../Contracts/GoExchangeToCashGoerliETH.json';
import GoExchangeToCashTBNB from '../../../../Contracts/GoExchangeToCashTBNB.json';
import GoExchangeToCashMumbaiMATIC from '../../../../Contracts/GoExchangeToCashMumbaiMATIC.json';

const transactions = [
  { name: 'Get Cash', val: 0 },
  { name: 'Get Crypto', val: 1 },
  { name: 'Cancel', val: 2 },
];

export default function GetCash({ walletAddress, chainId, txId }) {
  //const [data, updateData] = useState({});
  const [message, updateMessage] = useState('');
  const [data, updateData] = useState({});
  const [dataFetched, updateFetched] = useState(false);
  const [amount, setAmount] = useState('');
  const [transactToken, setTransactToken] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('');
  //==================={wallet connect}==============================
  const signer = useSigner(); // use signer.data for ethers.Contract
  // let message = `
  //   Govercity Connect >>
  //   Transact: Transfer
  //   Token: ${token?.symbol}
  //   Address: ${walletAddress}
  //   `;
  //const { data, signMessage } = useSignMessage({ message });
  const [dexContractAddress, setDexContractAddress] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [activeChainAddress, setActiveChainAddress] = useState();
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState(0.1);
  //   const params = useParams();
  //   const txId = params.txId;
  //   const location = useLocation();
  const [activeTransaction, setActiveTransaction] = useState(transactions[0]);

  useEffect(() => {
    chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

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

  async function getbanksTransact(txId) {
    let dexContract = new ethers.Contract(
      dexContractAddress,
      dexContractAbi,
      signer.data // should be just "signer" if using windows.ethereum
    );

    let transact = await dexContract.getExchangeVoucherForId(txId);

    // const transact = await dexContract.getExchangeVoucherForId(txId);
    // const transact = await dexContract.getOneClientsCompletedTransact(txId);
    console.log(transact);
    //Fetch all the details of every NFT from the contract and display
    let item = {
      txId: transact.txId,
      token: transact.token,
      client: transact.client,
      bank: transact.bank,
      CryptoPrice: transact.CryptoPrice,
      tokenDecimals: transact.tokenDecimals,
      dexShare: transact.dexShare,
      endBlock: transact.endBlock,
      completed: transact.completed,
      clientPaidCrypto: transact.clientPaidCrypto,
      bankPaidCash: transact.bankPaidCash,
      clientReceivedCash: transact.clientReceivedCash,
      bankReceivedCrypto: transact.bankReceivedCrypto,
      started: transact.started,
    };

    console.log(item);
    updateData(item);
    updateFetched(true);
    setAmount(item.CryptoPrice); // set amount
    setTransactToken(item.token); // set the token
    setTokenDecimals(item.tokenDecimals); // set the decimals
  }

  async function clientGetCash(txId) {
    try {
      let dexContract = new ethers.Contract(
        dexContractAddress,
        dexContractAbi,
        signer.data // should be just "signer" if using windows.ethereum
      );

      updateMessage('Transaction in progress...');
      //run the executeSale function
      let transaction = await dexContract.clientGetCash(txId, {
        gasLimit: 3000000,
      });
      await transaction.wait();

      alert('You have paid, please wait for the bank to confirm!');
      updateMessage('');
    } catch (e) {
      alert('Upload Error' + e);
    }
  }

  async function clientCancel(txId) {
    try {
      let dexContract = new ethers.Contract(
        dexContractAddress,
        dexContractAbi,
        signer.data // should be just "signer" if using windows.ethereum
      );

      updateMessage('Transaction in progress...');
      //run the executeSale function
      let transaction = await dexContract.clientCancel(txId, {
        gasLimit: 3000000,
      });
      await transaction.wait();

      alert('You have cancelled the transaction, please file a dispute!');
      updateMessage('');
    } catch (e) {
      alert('An Error occurred' + e);
    }
  }

  if (!dataFetched) getbanksTransact(txId);

  function handleGetCashSubmit(txId) {
    clientGetCash(txId);
    // window.location.replace('/get-cash/clientpage'); // location
  }

  function handleClientCancelSubmit(txId) {
    clientCancel(txId);
    // window.location.replace('/get-cash/clientpage'); // location
  }

  return (
    <div className="flex flex-col gap-3">
      <select
        onChange={(e) => {
          setActiveTransaction(e.target.value); // converting input to Number
        }}
      >
        {transactions.map((t, i) => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>
      <div className="text-xl space-y-8 text-white rounded-lg p-5">
        <div>TxId: {data.txId}</div>

        <div>
          {/* Price: <span className="">{data.CryptoPrice + " ETH"}</span> */}
          Amount:{' '}
          <span className="">{data.CryptoPrice + `${data.symbol}`}</span>
        </div>
        <div>
          Client: <span className="text-sm">{data.client}</span>
        </div>
        <div>
          Bank: <span className="text-sm">{data.bank}</span>
        </div>
        <div>
          {walletAddress === data.client &&
          activeTransaction.name === 'Get Cash' ? (
            <button
              className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={() => handleGetCashSubmit(txId)}
            >
              Get Cash
            </button>
          ) : (
            <div className="text-emerald-700">You are not the client</div>
          )}

          <div className="text-green text-center mt-3">{message}</div>
        </div>
        <div>
          {walletAddress == data.client &&
          activeTransaction.name == 'Cancel' ? (
            <button
              className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={() => handleClientCancelSubmit(txId)}
            >
              Cancel
            </button>
          ) : (
            <div className="text-emerald-700">You are not the client</div>
          )}

          <div className="text-green text-center mt-3">{message}</div>
        </div>
      </div>
    </div>
  );
}
