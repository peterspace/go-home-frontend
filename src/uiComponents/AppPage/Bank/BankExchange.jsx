import React, {useState} from "react";
// import axios from "axios";
// import {useSigner, useSignMessage} from "@web3modal/react";
// import {ethers} from "ethers";
// import Erc20 from "../../engine/erc20.json";
// import {TokenListButton, TransactButton} from "../../Buttons";
// import Modal from "../../Modal";
// import Spinner from "../../Spinner";
import tokensGoerli from "../../../res/tokensGoerli";
import tokensMumbai from "../../../res/tokensMumbai";
import BankPageToCash from "../ExchangeToCash/Bank/BankPageToCash";
import BankPageToCrypto from "../ExchangeToCrypto/Bank/BankPageToCrypto";

const style = {
	withdrawOptions: `px-4 w-full border text-gray-300 text-xl
        hover:border-gray-400 transition-colors duration-300`,
};

// withdraw types
const withdrawTypes = ["getCash", "getCrypto"];

const BankExchange = ({walletAddress, chainId}) => {
	const [withdrawType, setWithdrawType] = useState(withdrawTypes[0]);

	// function contractSwitcher() {
	// 	//e.preventDefault();

	// 	//==================={TEST NETS}===============================
	// 	// GOERLIETH: Chainid = 5 Currency: ETH
	// 	// Mumbai Matic: Chainid = 8001 Currency: MATIC
	// 	// Binance Test Smart Chain: Chainid = 97 Currency: BNB

	// 	//==================={MAIN NETS}===============================
	// 	// ETH: Chainid = 1 Currency: ETH
	// 	// Polygon Matic: Chainid = 137 Currency: MATIC
	// 	// Binance Smart Chain: Chainid = 56 Currency: BNB
	// 	// Arbitrum One: Chain: Chainid = 42161 Currency: ETH
	// 	// Optimism: Chain: Chainid = 10 Currency: ETH

	// 	//let chainId = chain.id;

	// 	//let chainId = chain?.id;

	// 	//=======get Crypto Contract Switcher

	// 	if (withdrawType === "getCrypto") {
	// 		try {
	// 			switch (chainId) {
	// 				case 5:
	// 					//GOERLIETH
	// 					setDexContractAddress(GoExchangeToCryptoGoerliETH.address);
	// 					setDexContractAbi(GoExchangeToCryptoGoerliETH.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 80001:
	// 					//MUMBAIMATIC
	// 					setDexContractAddress(GoExchangeToCryptoMumbaiMATIC.address);
	// 					setDexContractAbi(GoExchangeToCryptoMumbaiMATIC.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 97:
	// 					//TBNB
	// 					setDexContractAddress(GoExchangeToCryptoTBNB.address);
	// 					setDexContractAbi(GoExchangeToCryptoTBNB.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0x4fabb145d64652a948d72533023f6e7a623c7c53");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 1:
	// 					//ETH
	// 					setDexContractAddress(GoExchangeToCryptoETH.address);
	// 					setDexContractAbi(GoExchangeToCryptoETH.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 137:
	// 					//MATIC
	// 					setDexContractAddress(GoExchangeToCryptoMATIC.address);
	// 					setDexContractAbi(GoExchangeToCryptoMATIC.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 56:
	// 					//BNB(BSC)
	// 					setDexContractAddress(GoExchangeToCryptoBSC.address);
	// 					setDexContractAbi(GoExchangeToCryptoBSC.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0x4fabb145d64652a948d72533023f6e7a623c7c53");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 10:
	// 					//OPTIMISM (currency: ETH)
	// 					setDexContractAddress(GoExchangeToCryptoOptimism.address);
	// 					setDexContractAbi(GoExchangeToCryptoOptimism.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 42161:
	// 					//ARBITRUM
	// 					setDexContractAddress(GoExchangeToCryptoArbitrum.address);
	// 					setDexContractAbi(GoExchangeToCryptoArbitrum.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				default:
	// 					console.warn("Please choose a token!");
	// 					break;
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 		//=======get Cash Contract Switcher
	// 	} else if (withdrawType === "getCash") {
	// 		try {
	// 			switch (chainId) {
	// 				case 5:
	// 					//GOERLIETH
	// 					setDexContractAddress(GoExchangeToCashGoerliETH.address);
	// 					setDexContractAbi(GoExchangeToCashGoerliETH.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 80001:
	// 					//MUMBAIMATIC
	// 					setDexContractAddress(GoExchangeToCashMumbaiMATIC.address);
	// 					setDexContractAbi(GoExchangeToCashMumbaiMATIC.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 97:
	// 					//TBNB
	// 					setDexContractAddress(GoExchangeToCashTBNB.address);
	// 					setDexContractAbi(GoExchangeToCashTBNB.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0x4fabb145d64652a948d72533023f6e7a623c7c53");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 1:
	// 					//ETH
	// 					setDexContractAddress(GoExchangeToCashETH.address);
	// 					setDexContractAbi(GoExchangeToCashETH.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 137:
	// 					//MATIC
	// 					setDexContractAddress(GoExchangeToCashMATIC.address);
	// 					setDexContractAbi(GoExchangeToCashMATIC.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 56:
	// 					//BNB(BSC)
	// 					setDexContractAddress(GoExchangeToCashBSC.address);
	// 					setDexContractAbi(GoExchangeToCashBSC.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0x4fabb145d64652a948d72533023f6e7a623c7c53");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 10:
	// 					//OPTIMISM (currency: ETH)
	// 					setDexContractAddress(GoExchangeToCashOptimism.address);
	// 					setDexContractAbi(GoExchangeToCashOptimism.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				case 42161:
	// 					//ARBITRUM
	// 					setDexContractAddress(GoExchangeToCashArbitrum.address);
	// 					setDexContractAbi(GoExchangeToCashArbitrum.abi);
	// 					setActiveChainDecimals(18);
	// 					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
	// 					setDexRoyaltyValue(0.1);
	// 					break;

	// 				default:
	// 					console.warn("Please choose a token!");
	// 					break;
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	} else {
	// 		console.warn("Please choose a withdrawal option");
	// 	}
	// }

	//   return (
	//     <>
	//       <section className="flex flex-col items-center">
	//         <div
	//           className={`px-4 py-3 w-full md:w-[600px] rounded-3xl parentBgColor`}
	//         >
	//           <div className="font-bold text-lg text-gray-200">
	//             <span>Exchange</span>
	//           </div>
	//           <section className="relative mt-4">
	//             <div className="flex flex-col">
	//               <div className="mt-1 flex flex-row w-full h-[50px] justify-center rounded-xl optionSectionColor">
	//                 <button
	//                   id="0"
	//                   className={`rounded-tl-xl rounded-bl-xl ${
	//                     style.withdrawOptions
	//                   }
	//                                         ${
	//                                           withdrawType === withdrawTypes[0] &&
	//                                           'border-gray-400'
	//                                         }`}
	//                   onClick={() => setWithdrawType(withdrawTypes[0])}
	//                 >
	//                   Cash
	//                 </button>
	//                 <button
	//                   id="1"
	//                   className={`rounded-tr-xl rounded-br-xl ${
	//                     style.withdrawOptions
	//                   }
	//                                         ${
	//                                           withdrawType === withdrawTypes[1] &&
	//                                           'border-gray-400'
	//                                         }`}
	//                   onClick={() => setWithdrawType(withdrawTypes[1])}
	//                 >
	//                   Crypto
	//                 </button>
	//               </div>
	//               <section className="mt-6 flex flex-col"></section>

	//               {/* transfer status section */}
	//               {transferStatus.status !== '' && (
	//                 <section
	//                   className={`mt-3 px-3 py-2 w-full h-fit flex flex-row gap-6 justify-center rounded-lg
	//                 ${
	//                   transferStatus.status === '200'
	//                     ? 'success'
	//                     : transferStatus.status === '309'
	//                     ? 'warn'
	//                     : transferStatus.status === 'inprogress'
	//                     ? 'info'
	//                     : 'error'
	//                 }
	//                             `}
	//                   onClick={() => setTransferStatus({ status: '', message: '' })}
	//                 >
	//                   {transferStatus.message}
	//                 </section>
	//               )}

	//               <section className="flex flex-row gap-3">
	//                 <h3 className="text-gray-600">Transaction Type</h3>
	//                 <div
	//                   className="my-3 flex flex-row gap-2 start"
	//                   onChange={(e) => setSelectedTab(e.target.value)}
	//                 >
	//                   {transactions.map((tab) => (
	//                     <label key={tab.value}>
	//                       <input
	//                         type="radio"
	//                         id="tab"
	//                         name="tab"
	//                         value={tab.name}
	//                         className="peer sr-only"
	//                       />
	//                       <span
	//                         className={`px-2 py-1 rounded-md cursor-pointer ${
	//                           tab.name === selectedTab
	//                             ? 'bg-black text-gray-200'
	//                             : 'bg-black/50 text-gray-200/30'
	//                         } border border-transparent peer-hover:border-gray-200/30 peer-checked:bg-black peer-checked:hover:border-transparent peer-checked:text-gray-200`}
	//                       >
	//                         {tab.name}
	//                       </span>
	//                     </label>
	//                   ))}
	//                 </div>
	//               </section>

	//               <div className="mx-auto mt-6 w-fit">
	//                 <TransactButton
	//                   // Not doing type checking for value and walletAddress
	//                   // eslint-disable-next-line eqeqeq
	//                   disabled={
	//                     walletAddress.length <= 5 ||
	//                     Number(amount) <= 0 ||
	//                     !Object.keys(selectedBank).length > 0 ||
	//                     transferStatus.status === 'inprogress'
	//                       ? true
	//                       : false
	//                   }
	//                   onClick={() => proceed()}
	//                 >
	//                   {transferStatus.status !== 'inprogress' ? (
	//                     'Proceed'
	//                   ) : (
	//                     <Spinner />
	//                   )}
	//                 </TransactButton>
	//                 {/* <button
	// 									type="button"
	// 									className="text-white border"
	// 									onClick={() => setIsGetCashModalVisible(true)}
	// 								>
	// 									Check Cash Modal
	// 								</button>
	// 								<button
	// 									type="button"
	// 									className="text-white border"
	// 									onClick={() => setIsGetCryptoModalVisible(true)}
	// 								>
	// 									Check Crypto Modal
	// 								</button> */}
	//               </div>
	//             </div>
	//           </section>
	//         </div>

	//         {/*
	//                 ====================================================================
	//                     Modal
	//                 ====================================================================
	//                 */}
	//         <Modal
	//           visible={isTokenModalVisible}
	//           setVisible={setIsTokenModalVisible}
	//           title="Choose your withdraw token"
	//         >
	//           <div className="w-[500px] h-fit max-h-[400px] overflow-y-scroll">
	//             <div className="flex flex-row flex-wrap gap-8">
	//               {filteredTokens?.map((t, idx) => (
	//                 <div
	//                   key={idx}
	//                   className={`px-3 py-2 bg-black/30 rounded-lg border ${
	//                     t.symbol === selectedToken?.symbol
	//                       ? 'border-gray-100 text-gray-100'
	//                       : 'border-white/10 text-gray-300'
	//                   } cursor-pointer hover:text-gray-100 hover:border-gray-100`}
	//                   onClick={() => {
	//                     setSelectedToken(t);
	//                     setIsTokenModalVisible(false);
	//                   }}
	//                 >
	//                   <img src={t.logoURI} alt="" className="w-6 h-6" />
	//                   <span>{t.symbol}</span>
	//                 </div>
	//               ))}
	//             </div>
	//           </div>
	//         </Modal>
	//         <Modal
	//           visible={isGetCashModalVisible}
	//           setVisible={setIsGetCashModalVisible}
	//           hideTitle={true}
	//         >
	//           {/* // todo pass in the correct transaction Id */}
	//           <GetCash
	//             walletAddress={walletAddress}
	//             chainId={chainId}
	//             txId={'ll'}
	//           />
	//         </Modal>
	//         <Modal
	//           visible={isGetCryptoModalVisible}
	//           setVisible={setIsGetCryptoModalVisible}
	//           hideTitle={true}
	//         >
	//           {/* // todo pass in the correct transaction Id */}
	//           <GetCrypto
	//             walletAddress={walletAddress}
	//             chainId={chainId}
	//             txId={'ll'}
	//           />
	//         </Modal>
	//       </section>
	//     </>
	//   );

	return (
		<>
			<section className="flex flex-col items-center">
				<div className={`px-4 py-3 w-full rounded-3xl parentBgColor`}>
					<div className="font-bold text-lg text-gray-200">
						<span>Exchange</span>
					</div>

					<section className="mt-4">
						<div className="mt-1 flex flex-row w-full h-[50px] justify-center rounded-xl optionSectionColor">
							<button
								id="0"
								className={`rounded-tl-xl rounded-bl-xl ${style.withdrawOptions}
	                                         ${
																							withdrawType === withdrawTypes[0]
																								? "border-gray-400"
																								: "border-transparent"
																						}`}
								onClick={() => setWithdrawType(withdrawTypes[0])}
							>
								Cash Requests
							</button>
							<button
								id="1"
								className={`rounded-tr-xl rounded-br-xl ${style.withdrawOptions}
	                                         ${
																							withdrawType === withdrawTypes[1]
																								? "border-gray-400"
																								: "border-transparent"
																						}`}
								onClick={() => setWithdrawType(withdrawTypes[1])}
							>
								Crypto Requests
							</button>
						</div>
					</section>

					{/*
                    ====================================================================
                        Table section
                    ====================================================================
                    */}
					<section className="mt-5">
						{withdrawType === withdrawTypes[0] && (
							<BankPageToCash walletAddress={walletAddress} chainId={chainId} tokensGoerli={tokensGoerli} tokensMumbai={tokensMumbai} />
							// <BankPageToCash tokensGoerli={tokensGoerli} tokensMumbai={tokensMumbai} />
                        )}
                        {withdrawType === withdrawTypes[1] && (
                            <BankPageToCrypto walletAddress={walletAddress} chainId={chainId} tokensGoerli={tokensGoerli} tokensMumbai={tokensMumbai} />
                        )}
					</section>
				</div>
			</section>
		</>
	);
};

export default BankExchange;
