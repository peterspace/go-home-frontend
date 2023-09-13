import Navbar from './Navbar';
//import axie from "../tile.jpeg";
import { useLocation, useParams } from 'react-router-dom';
//import MarketplaceJSON from "../Marketplace.json";
import axios from 'axios';
import { ethers } from 'ethers';
import { useState } from 'react';
import Erc20 from '../engine/erc20.json';
//================={wallet connect}===================
import {
  useSignMessage,
  //useProvider,
  useSigner,
} from '@web3modal/react';

//================={Exchange To Crypto Contracts}===================
import GoExchangeToCryptoETH from '../../Contracts/GoExchangeToCryptoETH.json';
import GoExchangeToCryptoMATIC from '../../Contracts/GoExchangeToCryptoMATIC.json';
import GoExchangeToCryptoBSC from '../../Contracts/GoExchangeToCryptoBSC.json';
import GoExchangeToCryptoArbitrum from '../../Contracts/GoExchangeToCryptoArbitrum.json';
import GoExchangeToCryptoOptimism from '../../Contracts/GoExchangeToCryptoOptimism.json';
import GoExchangeToCryptoGoerliETH from '../../Contracts/GoExchangeToCryptoGoerliETH.json';
import GoExchangeToCryptoTBNB from '../../Contracts/GoExchangeToCryptoTBNB.json';
import GoExchangeToCryptoMumbaiMATIC from '../../Contracts/GoExchangeToCryptoMumbaiMATIC.json';

export default function BankTransactPage({ walletAddress, chainId, txId }) {
  //const [data, updateData] = useState({});
  const [message, updateMessage] = useState('');
  const [data, updateData] = useState({});
  const [dataFetched, updateFetched] = useState(false);
  const [currAddress, updateCurrAddress] = useState('');
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
  const params = useParams();
  const txId = params.txId;
  const location = useLocation();

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

  async function bankCompletedTransact(txId) {
    let dexContract = new ethers.Contract(
      dexContractAddress,
      dexContractAbi,
      signer.data // should be just "signer" if using windows.ethereum
    );

    const transact = await dexContract.getOneBanksCompletedTransact(txId);
    console.log(transact);
    //Fetch all the details of every NFT from the contract and display
    //========================{GENERAL STRUCTS}=========================
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
    updateCurrAddress(walletAddress);
  }

  if (!dataFetched)
    //getbanksTransact(txId);

    function handleBankCompletedTransactSubmit(txId) {
      bankCompletedTransact(txId);
      window.location.replace('/get-crypto/bankpage'); // location
    }

  return (
    <div style={{ 'min-height': '100vh' }}>
      <Navbar></Navbar>
      <div className="flex ml-20 mt-20">
        <img src={data.image} alt="" className="w-2/5" />
        <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
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
            {currAddress == data.bank && transactions == 'Completed' ? (
              <button
                className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                onClick={() => handleBankCompletedTransactSubmit(txId)}
              >
                Transaction Detail
              </button>
            ) : (
              <div className="text-emerald-700">You are not the bank</div>
            )}

            <div className="text-green text-center mt-3">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
