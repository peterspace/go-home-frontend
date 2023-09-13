import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
//================={wallet connect}===================
import { useSigner, useSignMessage } from "wagmi";

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
  { name: 'Get Cash', val: 0 },
  { name: 'Get Crypto', val: 1 },
  { name: 'Cancel', val: 2 },
];

export default function GetCrypto({ walletAddress, chainId, txId }) {
  //const [data, updateData] = useState({});
  const [message, updateMessage] = useState('');
  const [data, updateData] = useState({});
  const [dataFetched, updateFetched] = useState(false);
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
  const [activeTransaction, setActiveTransaction] = useState(transactions[0]);
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [activeChainAddress, setActiveChainAddress] = useState();
  const [dexRoyaltyValue, setDexRoyaltyValue] = useState(0.1);

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
          break;

        case 80001:
          //MUMBAIMATIC
          setDexContractAddress(GoExchangeToCryptoMumbaiMATIC.address);
          setDexContractAbi(GoExchangeToCryptoMumbaiMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          break;

        case 97:
          //TBNB
          setDexContractAddress(GoExchangeToCryptoTBNB.address);
          setDexContractAbi(GoExchangeToCryptoTBNB.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          break;

        case 1:
          //ETH
          setDexContractAddress(GoExchangeToCryptoETH.address);
          setDexContractAbi(GoExchangeToCryptoETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          break;

        case 137:
          //MATIC
          setDexContractAddress(GoExchangeToCryptoMATIC.address);
          setDexContractAbi(GoExchangeToCryptoMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexRoyaltyValue(0.1);
          break;

        case 56:
          //BNB(BSC)
          setDexContractAddress(GoExchangeToCryptoBSC.address);
          setDexContractAbi(GoExchangeToCryptoBSC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexRoyaltyValue(0.1);
          break;

        case 10:
          //OPTIMISM (currency: ETH)
          setDexContractAddress(GoExchangeToCryptoOptimism.address);
          setDexContractAbi(GoExchangeToCryptoOptimism.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexRoyaltyValue(0.1);
          break;

        case 42161:
          //ARBITRUM
          setDexContractAddress(GoExchangeToCryptoArbitrum.address);
          setDexContractAbi(GoExchangeToCryptoArbitrum.abi);
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

  async function getClientsTransact(txId) {
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
      clientPaidCash: transact.clientPaidCash,
      bankReceivedCash: transact.bankReceivedCash,
      bankPaidCrypto: transact.bankPaidCrypto,
      clientReceivedCrypto: transact.clientReceivedCrypto,
      started: transact.started,
    };

    console.log(item);
    updateData(item);
    updateFetched(true);
    console.log('address', walletAddress);
  }

  async function clientGetCrypto(txId) {
    try {
      let dexContract = new ethers.Contract(
        dexContractAddress,
        dexContractAbi,
        signer.data // should be just "signer" if using windows.ethereum
      );

      updateMessage('Confirmation in progress...');
      //run the executeSale function
      let transaction = await dexContract.clientReceiveCrypto(txId, {
        gasLimit: 3000000,
      });
      await transaction.wait();

      alert('Transaction completed. You have Received the Crypto!');
      updateMessage('');
    } catch (e) {
      alert('Upload Error' + e);
    }
  }

  if (!dataFetched) getClientsTransact(txId);

  function handleGetCryptoSubmit(txId) {
    clientGetCrypto(txId);
    window.location.replace('/get-crypto/clientpage'); // location
  }

  useEffect(() => {
    chainId && contractSwitcher(); // contract Switcher
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <div className="flex">
      <div className="text-xl space-y-8 text-white shadow-2xl rounded-lg">
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
          {walletAddress == data.client &&
          activeTransaction.name == 'Get Crypto' ? (
            <button
              className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={() => handleGetCryptoSubmit(txId)}
            >
              Get Crypto
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
