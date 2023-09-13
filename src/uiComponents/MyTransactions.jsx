import React, {useState, useEffect} from "react";
import TransactionItem from "./TransactionItem";
import Modal from "./Modal";
import {ethers} from "ethers";


import {
	useConnect,
	useDisconnect,
	useSigner,
	useProvider,
	useAccount,
	useNetwork,
	useBalance,
	useSignMessage,
	useSwitchNetwork,
  } from 'wagmi';

//================={Exchange To Cash Contracts}===================
import GoExchangeToCashETH from "../Contracts/GoExchangeToCashETH.json";
import GoExchangeToCashMATIC from "../Contracts/GoExchangeToCashMATIC.json";
import GoExchangeToCashBSC from "../Contracts/GoExchangeToCashBSC.json";
import GoExchangeToCashArbitrum from "../Contracts/GoExchangeToCashArbitrum.json";
import GoExchangeToCashOptimism from "../Contracts/GoExchangeToCashOptimism.json";
import GoExchangeToCashGoerliETH from "../Contracts/GoExchangeToCashGoerliETH.json";
import GoExchangeToCashTBNB from "../Contracts/GoExchangeToCashTBNB.json";
import GoExchangeToCashMumbaiMATIC from "../Contracts/GoExchangeToCashMumbaiMATIC.json";

//================={Exchange To Crypto Contracts}===================
import GoExchangeToCryptoETH from '../Contracts/GoExchangeToCryptoETH.json';
import GoExchangeToCryptoMATIC from '../Contracts/GoExchangeToCryptoMATIC.json';
import GoExchangeToCryptoBSC from '../Contracts/GoExchangeToCryptoBSC.json';
import GoExchangeToCryptoArbitrum from '../Contracts/GoExchangeToCryptoArbitrum.json';
import GoExchangeToCryptoOptimism from '../Contracts/GoExchangeToCryptoOptimism.json';
import GoExchangeToCryptoGoerliETH from '../Contracts/GoExchangeToCryptoGoerliETH.json';
import GoExchangeToCryptoTBNB from '../Contracts/GoExchangeToCryptoTBNB.json';
import GoExchangeToCryptoMumbaiMATIC from '../Contracts/GoExchangeToCryptoMumbaiMATIC.json';

const tabs = [
	{type: "active", name: "Active"},
	{type: "completed", name: "Completed"},
];

const MyTransactions = ({chainId, newTransaction}) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0].type);
	const [dexContractAddress, setDexContractAddress] = useState("");
	const [activeChainAddress, setActiveChainAddress] = useState("");
	const [activeChainDecimals, setActiveChainDecimals] = useState();
	const [dexRoyaltyValue, setDexRoyaltyValue] = useState("");
	const [dexContractAbi, setDexContractAbi] = useState([]);
	const [activeTransactions, setActiveTransactions] = useState([]);
	const [completedTransactions, setCompletedTransactions] = useState([]);
	const [cancelledTransactions, setCancelledTransactions] = useState([]);

	//==================={wallet connect}==============================
	//const signer = useSigner(); // use signer.data for ethers.Contract
	const provider = useProvider();

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
					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
					setDexRoyaltyValue(0.1);
					break;

				case 80001:
					//MUMBAIMATIC
					setDexContractAddress(GoExchangeToCashMumbaiMATIC.address);
					setDexContractAbi(GoExchangeToCashMumbaiMATIC.abi);
					setActiveChainDecimals(18);
					setActiveChainAddress("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0");
					setDexRoyaltyValue(0.1);
					break;

				case 97:
					//TBNB
					setDexContractAddress(GoExchangeToCashTBNB.address);
					setDexContractAbi(GoExchangeToCashTBNB.abi);
					setActiveChainDecimals(18);
					setActiveChainAddress("0x4fabb145d64652a948d72533023f6e7a623c7c53");
					setDexRoyaltyValue(0.1);
					break;

				case 1:
					//ETH
					setDexContractAddress(GoExchangeToCashETH.address);
					setDexContractAbi(GoExchangeToCashETH.abi);
					setActiveChainDecimals(18);
					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
					setDexRoyaltyValue(0.1);
					break;

				case 137:
					//MATIC
					setDexContractAddress(GoExchangeToCashMATIC.address);
					setDexContractAbi(GoExchangeToCashMATIC.abi);
					setActiveChainDecimals(18);
					setActiveChainAddress("0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0");
					setDexRoyaltyValue(0.1);
					break;

				case 56:
					//BNB(BSC)
					setDexContractAddress(GoExchangeToCashBSC.address);
					setDexContractAbi(GoExchangeToCashBSC.abi);
					setActiveChainDecimals(18);
					setActiveChainAddress("0x4fabb145d64652a948d72533023f6e7a623c7c53");
					setDexRoyaltyValue(0.1);
					break;

				case 10:
					//OPTIMISM (currency: ETH)
					setDexContractAddress(GoExchangeToCashOptimism.address);
					setDexContractAbi(GoExchangeToCashOptimism.abi);
					setActiveChainDecimals(18);
					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
					setDexRoyaltyValue(0.1);
					break;

				case 42161:
					//ARBITRUM
					setDexContractAddress(GoExchangeToCashArbitrum.address);
					setDexContractAbi(GoExchangeToCashArbitrum.abi);
					setActiveChainDecimals(18);
					setActiveChainAddress("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc");
					setDexRoyaltyValue(0.1);
					break;

				default:
					console.warn("Please choose a token!");
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
			provider // should be just "signer" if using windows.ethereum
		);

		let transact;
		switch (selectedTab) {
			case "active":
				transact = await dexContract.getClientsHasNotReceivedCash();
				break;

			case "completed":
				transact = await dexContract.getClientsCompletedTransacts();
				break;

			default:
				console.warn("Please choose a transaction type!");
		}

		// const transact = await dexContract.getExchangeVoucherForId(txId);
		// const transact = await dexContract.getOneClientsCompletedTransact(txId);
		console.log("MyTransactions--- transact", transact);

		//Fetch all the details of every NFT from the contract and display
		const items2 = await Promise.all(
			transact.map(async (i) => {
				let CryptoPrice = ethers.utils.formatUnits(
					i.CryptoPrice.toString(),
					"ether"
				);
				let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), "ether");
				let item2 =  {
                    txId: i.txId.toNumber(),
                    token: i.token,
                    client: i.client,
                    bank: i.bank,
                    CryptoPrice,
                    clientPaidCash: i.clientPaidCash,
                    bankReceivedCash: i.bankReceivedCash,
                    bankPaidCrypto: i.bankPaidCrypto,
                    completed: i.completed,
                    tokenDecimals: i.tokenDecimals,
                    clientReceivedCrypto: i.clientReceivedCrypto, 
                    clientCreatedOrder: i.clientCreatedOrder,
                    dexShare,
                 
                };
				//sumCryptoPrice += Number(CryptoPrice);
				// sumDexShare += Number(dexShare);
				return item2;
			})
		);

		setActiveTransactions(items2);

		//Fetch all the details of every NFT from the contract and display
		const items3 = await Promise.all(
			transact.map(async (i) => {
				let CryptoPrice = ethers.utils.formatUnits(
					i.CryptoPrice.toString(),
					"ether"
				);
				let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), "ether");
				let item3 =  {
                    txId: i.txId.toNumber(),
                    token: i.token,
                    client: i.client,
                    bank: i.bank,
                    CryptoPrice,
                    clientPaidCash: i.clientPaidCash,
                    bankReceivedCash: i.bankReceivedCash,
                    bankPaidCrypto: i.bankPaidCrypto,
                    completed: i.completed,
                    tokenDecimals: i.tokenDecimals,
                    clientReceivedCrypto: i.clientReceivedCrypto, 
                    clientCreatedOrder: i.clientCreatedOrder,
                    dexShare,
                 
                };
				//sumCryptoPrice += Number(CryptoPrice);
				// sumDexShare += Number(dexShare);
				return item3;
			})
		);

		setCompletedTransactions(items3);
	}

	useEffect(() => {
		// refetch all transactions active and completed
		getClientsTransacts();
	}, [selectedTab, newTransaction]);

	

	return (
		<section className="mt-4 flex flex-col items-center">
			<div className={`px-4 py-3 w-[400px] rounded-lg parentBgColor`}>
				<div className="font-bold text-lg text-gray-300">
					<span>Transactions</span>
				</div>
				<div
					className="my-3 flex flex-row gap-2 justify-center"
					onChange={(e) => setSelectedTab(e.target.value)}
				>
					{tabs.map((tab) => (
						<label key={tab.type}>
							<input
								type="radio"
								id="tab"
								name="tab"
								value={tab.type}
								className="peer sr-only"
							/>
							<span
								className={`px-2 py-1 rounded-md cursor-pointer ${
									tab.type === selectedTab
										? "bg-black text-gray-200"
										: "bg-black/50 text-gray-200/30"
								} border border-transparent peer-hover:border-gray-200/30 peer-checked:bg-black peer-checked:hover:border-transparent peer-checked:text-gray-200`}
							>
								{tab.name}
							</span>
						</label>
					))}
				</div>
				{newTransaction === undefined && activeTransactions.length <= 0 ? (
					<span className="text-gray-600">
						You don't have any active transactions
					</span>
				) : (
					<section className="relative mt-4">
						{/* <TransactionItem txInfo={newTransaction} /> */}
                            {selectedTab === 'active' && (
                                activeTransactions.map((tx, idx) => (
                                    <TransactionItem key={idx} txInfo={tx} />
                                ))
                        )}
					</section>
				)}
			</div>
		</section>
	);
};

export default MyTransactions;
