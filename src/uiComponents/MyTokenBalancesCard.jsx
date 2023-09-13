import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
// import tokens from "../res/tokens";
import tokensGoerli from '../res/tokensGoerli';
import tokensMumbai from '../res/tokensMumbai';
import Erc20 from './engine/erc20.json';
import TokenBalance from './TokenBalance';
import Spinner from './Spinner';

//================={All Deployed Contracts}===================
import GoTransferETH from '../Contracts/GoTransferETH.json';
import GoTransferMATIC from '../Contracts/GoTransferMATIC.json';
import GoTransferBSC from '../Contracts/GoTransferBSC.json';
import GoTransferArbitrum from '../Contracts/GoTransferArbitrum.json';
import GoTransferOptimism from '../Contracts/GoTransferOptimism.json';
import GoTransferGoerliETH from '../Contracts/GoTransferGoerliETH.json';
import GoTransferTBNB from '../Contracts/GoTransferTBNB.json';
import GoTransferMumbaiMATIC from '../Contracts/GoTransferMumbaiMATIC.json';

const tabs = ['deposited', 'wallet'];

const MyTokenBalancesCard = ({ walletAddress, chainId }) => {
  const { address, isConnected } = useAccount();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isDepositedBalanceLoading, setIsDepositedBalanceLoading] =
    useState(false);
  const [isWalletBalanceLoading, setIsWalletBalanceLoading] = useState(false);
  const [dexAddress, setDexAddress] = useState(0.0);
  const [dexContractAddress, setDexContractAddress] = useState('');
  const [dexContractAbi, setDexContractAbi] = useState([]);
  const [activeChainDecimals, setActiveChainDecimals] = useState();
  const [activeChainAddress, setActiveChainAddress] = useState();
  const [activeChainTokens, setActiveChainTokens] = useState([]);
  const [depositedBalances, setDepositedBalances] = useState([]);
  const [walletBalances, setWalletBalances] = useState([]);

  const isDeposited = localStorage.getItem('isDeposited')
    ? JSON.parse(localStorage.getItem('isDeposited'))
    : false;

  const signer = useSigner();

  function contractSwitcher() {
    try {
      switch (chainId) {
        case 5:
          //GOERLIETH
          setDexContractAddress(GoTransferGoerliETH.address);
          setDexContractAbi(GoTransferGoerliETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
          setActiveChainTokens(tokensGoerli); // Goerli Test net
          break;

        case 80001:
          //MUMBAIMATIC
          setDexContractAddress(GoTransferMumbaiMATIC.address);
          setDexContractAbi(GoTransferMumbaiMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
          setActiveChainTokens(tokensMumbai); // Mumbai Test net
          break;

        case 97:
          //TBNB
          setDexContractAddress(GoTransferTBNB.address);
          setDexContractAbi(GoTransferTBNB.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
          setActiveChainTokens(tokensGoerli);
          break;

        case 1:
          //ETH
          setDexContractAddress(GoTransferETH.address);
          setDexContractAbi(GoTransferETH.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
          setActiveChainTokens(tokensGoerli);
          break;

        case 137:
          //MATIC
          setDexContractAddress(GoTransferMATIC.address);
          setDexContractAbi(GoTransferMATIC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0');
          setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
          setActiveChainTokens(tokensMumbai);
          break;

        case 56:
          //BNB(BSC)
          setDexContractAddress(GoTransferBSC.address);
          setDexContractAbi(GoTransferBSC.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0x4fabb145d64652a948d72533023f6e7a623c7c53');
          setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
          setActiveChainTokens(tokensGoerli);
          break;

        case 10:
          //OPTIMISM (currency: ETH)
          setDexContractAddress(GoTransferOptimism.address);
          setDexContractAbi(GoTransferOptimism.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
          setActiveChainTokens(tokensGoerli);
          break;

        case 42161:
          //ARBITRUM
          setDexContractAddress(GoTransferArbitrum.address);
          setDexContractAbi(GoTransferArbitrum.abi);
          setActiveChainDecimals(18);
          setActiveChainAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc');
          setDexAddress('0xc830181708e768f264534B9AE8B0B9A24c1F477b');
          setActiveChainTokens(tokensGoerli);
          break;

        default:
          console.warn('Invalid chain selected');
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //   useEffect(() => {
  //     localStorage.setItem('isDeposited', JSON.stringify(isDepositedL));

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isDepositedL]);

  //   useEffect(() => {
  //     if (isDeposited === true) {
  //       getTokenBalances();
  //       setIsDepositedL(false);
  //     }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isDeposited]);

  //======================{START: Get Deposited balances}===================================
  // async function getTokenBalanceUSDC() {
  // 	try {
  // 		let dexContract = new ethers.Contract(
  // 			dexContractAddress,
  // 			dexContractAbi,
  // 			signer.data // should be just "signer" if using windows.ethereum
  // 		);

  // 		const token = tokens.find((t) => t.symbol.toLowerCase() === "usdc");
  // 		const balance = await dexContract.getBalanceByClient(
  // 			// "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // Miannet
  // 			// "0x35241FD7824991CA9DD9ffd1930b8FbE4fc5c04C" // Testnet
  // 			token.testAddress
  // 		);
  // 		// console.log('Balance USDC: ' + ethers.utils.formatEther(balanceUSDC));
  // 		return {
  // 			symbol: token.symbol.toUpperCase(),
  // 			balance: ethers.utils.formatEther(balance),
  // 			logoURI: token?.logoURI,
  // 		};
  // 	} catch (e) {}
  // }

  // async function getTokenBalanceUSDT() {
  // 	try {
  // 		let dexContract = new ethers.Contract(
  // 			dexContractAddress,
  // 			dexContractAbi,
  // 			signer.data // should be just "signer" if using windows.ethereum
  // 		);

  // 		const token = tokens.find((t) => t.symbol.toLowerCase() === "usdt");
  // 		const balance = await dexContract.getBalanceByClient(
  // 			//"0xdac17f958d2ee523a2206206994597c13d831ec7", // Miannet
  // 			// "0x12196abC0A66a46484039297d7cB4cE0aaec4C98" // Testnet
  // 			token.testAddress
  // 		);
  // 		// console.log('Balance USDT: ' + ethers.utils.formatEther(balanceUSDT));
  // 		// const token = tokens.filter(
  // 		// 	(token) => token.symbol.toLowerCase() === "usdt"
  // 		// );
  // 		return {
  // 			symbol: token.symbol.toUpperCase(),
  // 			balance: ethers.utils.formatEther(balance),
  // 			logoURI: token?.logoURI,
  // 		};
  // 	} catch (e) {}
  // }

  // async function getTokenBalanceTUSD() {
  // 	try {
  // 		let dexContract = new ethers.Contract(
  // 			dexContractAddress,
  // 			dexContractAbi,
  // 			signer.data // should be just "signer" if using windows.ethereum
  // 		);

  // 		const token = tokens.find((t) => t.symbol.toLowerCase() === "tusd");
  // 		const balance = await dexContract.getBalanceByClient(
  // 			//"0x0000000000085d4780b73119b644ae5ecd22b376", // Mainnet
  // 			// "0x39f73a34969EE25e654fc78Fd67ab0DbC9cDc76f" // Testnet
  // 			token.testAddress
  // 		);
  // 		// console.log('Balance TUSD: ' + ethers.utils.formatEther(balanceTUSD));

  // 		return {
  // 			symbol: token.symbol.toUpperCase(),
  // 			balance: ethers.utils.formatEther(balance),
  // 			logoURI: token?.logoURI,
  // 		};
  // 	} catch (e) {}
  // }

  // async function getTokenBalanceBUSD() {
  // 	try {
  // 		let dexContract = new ethers.Contract(
  // 			dexContractAddress,
  // 			dexContractAbi,
  // 			signer.data // should be just "signer" if using windows.ethereum
  // 		);

  // 		const token = tokens.find((t) => t.symbol.toLowerCase() === "busd");
  // 		const balance = await dexContract.getBalanceByClient(
  // 			//"0x4fabb145d64652a948d72533023f6e7a623c7c53", // Mainnet
  // 			// "0x826167F6dF0DD515CAc0762a6181bCa472F937Fc" // Testnet
  // 			token.testAddress
  // 		);
  // 		// console.log('Balance BUSD: ' + ethers.utils.formatEther(balanceBUSD));
  // 		return {
  // 			symbol: token.symbol.toUpperCase(),
  // 			balance: ethers.utils.formatEther(balance),
  // 			logoURI: token?.logoURI,
  // 		};
  // 	} catch (e) {}
  // }

  // async function getTokenBalanceDAI() {
  // 	try {
  // 		let dexContract = new ethers.Contract(
  // 			dexContractAddress,
  // 			dexContractAbi,
  // 			signer.data // should be just "signer" if using windows.ethereum
  // 		);

  // 		// const dai_address = tokens.find(t => t.symbol.toLowerCase() === 'dai').testAddress;

  // 		const token = tokens.find((t) => t.symbol.toLowerCase() === "dai");
  // 		const balance = await dexContract.getBalanceByClient(
  // 			//"0x6b175474e89094c44da98b954eedeac495271d0f", // main
  // 			// "0x9744148D643E2CE62F452430593935Ec55002433" // test
  // 			token.testAddress
  // 		);
  // 		// console.log('Balance DAI: ' + ethers.utils.formatEther(balanceDAI));

  // 		return {
  // 			symbol: token.symbol.toUpperCase(),
  // 			balance: ethers.utils.formatEther(balance),
  // 			logoURI: token?.logoURI,
  // 		};
  // 	} catch (e) {}
  // }
  //======================{END: Get balances}===================================

  //======================{START: Get Deposited balances}===================================

  //======================{END: Get Deposited balances}===================================

  async function getTokenBalances() {
    setIsDepositedBalanceLoading(true);
    let depositedTokenBalances = [];

    //======================{START: Get Deposited balances}===================================
    // ! Array.prototype.forEach() doesn't work, so
    // * the good old for loop
    for (let i = 0; i < activeChainTokens.length; i++) {
      try {
        let dexContract = new ethers.Contract(
          dexContractAddress,
          dexContractAbi,
          signer.data // should be just "signer" if using windows.ethereum
        );

        // const dai_address = tokens.find(t => t.symbol.toLowerCase() === 'dai').testAddress;

        const balance = await dexContract.getBalanceByClient(
          //"0x6b175474e89094c44da98b954eedeac495271d0f", // main
          // "0x9744148D643E2CE62F452430593935Ec55002433" // test
          activeChainTokens[i].testAddress
        );
        // console.log('Balance DAI: ' + ethers.utils.formatEther(balanceDAI));
        depositedTokenBalances.push({
          symbol: activeChainTokens[i].symbol.toUpperCase(),
          balance: ethers.utils.formatEther(balance),
          logoURI: activeChainTokens[i]?.logoURI,
        });
      } catch (e) {}
    }
    //======================{END: Get Deposited balances}===================================
    if (depositedTokenBalances.length > 0)
      setDepositedBalances(depositedTokenBalances);
    setIsDepositedBalanceLoading(false);

    //=================== {START: Get Wallet Token balances}
    setIsWalletBalanceLoading(true);
    let walletTokenBalances = [];
    for (let i = 0; i < activeChainTokens.length; i++) {
      try {
        const ERC20Contract = new ethers.Contract(
          activeChainTokens[i].testAddress,
          Erc20,
          signer.data
        );

        const balance = await ERC20Contract.balanceOf(walletAddress);
        walletTokenBalances.push({
          symbol: activeChainTokens[i].symbol.toUpperCase(),
          balance: ethers.utils.formatEther(balance),
          logoURI: activeChainTokens[i]?.logoURI,
        });
      } catch (e) {}
    }
    if (walletTokenBalances.length > 0) setWalletBalances(walletTokenBalances);
    setIsWalletBalanceLoading(false);
    console.info('wallet balance', walletTokenBalances);
  }

  useEffect(() => {
    chainId && contractSwitcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  //======={Initial step}============================
  useEffect(() => {
    signer && getTokenBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dexContractAddress, signer?.data?._address]); //* signer keeps changing but signer.data._address won't

  //====={Update balances due to changes in new deposits}===========
  useEffect(() => {
    if (isConnected && isDeposited === true) {
      setTimeout(() => {
        getTokenBalances();
        localStorage.setItem('isDeposited', JSON.stringify(false)); // New update
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeposited]); //* signer keeps changing but signer.data._address won't

  // ====={Update balances due to changes in wallet balances due to transfers received}===========
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isConnected) {
        getTokenBalances();
      }
    }, 30000); // updates every 30 sec
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  
  return (
    <div className="relative w-[400px] h-[230px] flex flex-col bg-black border border-t-gray-300/10 border-l-gray-300/10 border-r-transparent border-b-transparent rounded-2xl bg-opacity-20 backdrop-filter backdrop-blur-md overflow-clip">
      <div className="absolute top-0 -left-20 w-full h-full skew-y-[45deg] bg-gradient-to-r from-white/10 to-transparent blur-lg z-0" />
      <div className="relative mt-2 ml-auto mr-8 flex flex-row gap-3 items-center text-gray-300 font-poppins text-2xl">
        <span
          className="flex flex-row gap-3 justify-center text-xs"
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <label key={tab} className="text-xs">
              <input
                type="radio"
                id="tab"
                name="tab"
                value={tab}
                className="peer sr-only"
              />
              <span
                className={`px-2 py-1 rounded-md cursor-pointer ${
                  tab === selectedTab
                    ? 'bg-black text-gray-200'
                    : 'bg-black/50 text-gray-200/30'
                } border border-transparent peer-hover:border-gray-200/30 peer-checked:bg-black peer-checked:hover:border-transparent peer-checked:text-gray-200`}
              >
                <span className="capitalize">{tab}</span>
              </span>
            </label>
          ))}
        </span>
        <span>Token balances</span>
      </div>
      <section className="relative mt-3 mb-6 px-6 h-fit w-full overflow-scroll scrollbar-hide">
        {/* selectedTab is 'Deposited' */}
        {selectedTab === tabs[0] && (
          <div className="flex flex-col gap-3 ">
            {isDepositedBalanceLoading ? (
              <div className="flex flex-row gap-3 items-center text-gray-300/50">
                <span>Loading...</span>
                <span>
                  <Spinner />
                </span>
              </div>
            ) : depositedBalances[0]?.symbol !== undefined ? (
              //filtering out zero balances
              depositedBalances
                .filter((currency) => currency.balance > 0)
                .map((token) => (
                  <TokenBalance key={token?.symbol} token={token} />
                ))
            ) : (
              <span className="mx-auto text-gray-300/50">
                You don't seem to have any other tokens on this network
              </span>
            )}
          </div>
        )}
        {selectedTab === tabs[1] && (
          <div className="flex flex-col gap-3 ">
            {isWalletBalanceLoading ? (
              <div className="flex flex-row gap-3 items-center text-gray-300/50">
                <span>Loading...</span>
                <span>
                  <Spinner />
                </span>
              </div>
            ) : walletBalances[0]?.symbol !== undefined ? (
              //filtering out zero balances
              walletBalances
                .filter((currency) => currency.balance > 0)
                .map((token) => (
                  <TokenBalance key={token?.symbol} token={token} />
                ))
            ) : (
              <span className="mx-auto text-gray-300/50">
                You don't seem to have any other tokens on this network
              </span>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyTokenBalancesCard;
