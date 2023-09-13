import React, {useState, useEffect, Suspense, lazy} from "react";
import {useLocation} from "react-router-dom";
import {BsFillExclamationDiamondFill} from "react-icons/bs";
import Spinner from "./Spinner.js";
import Modal from "./Modal.jsx";
import {motion} from "framer-motion";
// import tokens from "../res/tokens";
import tokensGoerli from "../res/tokens.js";
import tokensMumbai from "../res/tokensMumbai.js";
import tokens from '../res/tokens';


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

// import Header from "./Header";
import CryptoCard from "./CryptoCard";
import truncateEthAddress from "../utils/TruncateEthAddress";
import {ZDateTimeFormatter} from "../utils/DateTimeFormatter";
import TransactionDetails from "./TransactionDetails";
import Transfer from "./AppPage/Transfer";
// import Withdraw from "./AppPage/Withdraw";
import axios from "axios";
import Balances from "./AppPage/Balances";
const Exchange = lazy(() => import("./AppPage/Exchange"));
const MyTokenBalancesCard = lazy(() => import("./MyTokenBalancesCard"));
const ClientExchangeTransactions = lazy(() =>
	import("./ClientExchangeTransactions.jsx")
);
const ClientPageToCash = lazy(() =>
	import("./AppPage/ExchangeToCash/Client/ClientPageToCash")
);
const ClientPageToCrypto = lazy(() =>
	import("./AppPage/ExchangeToCrypto/Client/ClientPageToCrypto")
);
const ModalFullScreen = lazy(() => import("./ModalFullScreen"));

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const spring = {
	type: "spring",
	stiffness: 700,
	damping: 30,
};

const tabs = [
	{id: 1, title: "Exchange"},
	{id: 2, title: "Transfer"},
	{id: 3, title: "Balances"},
	
];

const Layout = ({activeUrl}) => {
	const location = useLocation();

	const [activeTab, setActiveTab] = useState(1);
	const [walletModalVisible, setWalletModalVisible] = useState(false);
	const [chainModalVisible, setChainModalVisible] = useState(false);
	const [isBalancesModalVisible, setIsBalancesModalVisible] = useState(false);
	const [transactionModalVisible, setTransactionModalVisible] = useState(false);
	const [isCashTxModalVisible, setIsCashTxModalVisible] = useState(false);
	const [isCryptoTxModalVisible, setIsCryptoTxModalVisible] = useState(false);
	const [fetchingTransactionsStatus, setFetchingTransactionsStatus] =
		useState(false);
	const [selectedTransaction, setSelectedTransction] = useState();

	const [walletMessage, setWalletMessage] = useState({
		status: "info",
		message: "Initializing...",
	});
	// const [walletAddress, setWalletAddress] = useState();
	// const [chain, setChain] = useState();
	const {address, isConnected} = useAccount();

	const { chain, chains } = useNetwork();

  const chainId = chain ? chain?.id : null;
	const {switchNetwork} = useSwitchNetwork(); // has "error", "isLoading" properties & "switchNetwork" function
	const {data, error, isLoading} = useBalance({
        address: address,
        chainId: chain?.id,
        watch:true
	});
	const [isChainModalVisible, setIsChainModalVisible] = useState(false);

	const [username, setUsername] = useState('User');
	const [transactionHistory, setTransactionHistory] = useState();
	// const [tokens, setTokens] = useState({});
	const [swapRoutes, setSwapRoutes] = useState([]);

	// active transactions
	const [newTransaction, setNewTransaction] = useState();

	async function getTransactionHistory(address) {
		// todo implement fetching transaction history
	}

	function init() {
		// This only works when coming through a link or when the page is refreshed
		try {
			const matchingTab = tabs.find(
				(tab) => location.hash.split("#")[1] === tab.title.toLowerCase()
			);
			if (Object.keys(matchingTab).length > 0) {
				setActiveTab(matchingTab.id);
			} else {
				setActiveTab(1);
			}
		} catch (e) {}
		// isAuthenticated && setWalletAddres(account);
		// isAuthenticated && getNativeBalance();
		// If authenticated set the Username <--should come from the backend
		//geTransactionHisory<Swap
	}

	useEffect(() => {
		init();
		//refetch balance
		// if (address !== null && chain !== null) {
		// 	refetch({addressOrName: address, chainId: chain?.id});
		// }
		// console.info("chain", chain);
		// console.info("balance", data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, chain]);

	//============{Get tokens from 1inch}======================
	// useEffect(() => {
	// 	axios.get("https://api.1inch.io/v4.0/1/tokens").then((response) => {
	// 		// let allTokens = response.data.tokens;
	// 		let allTokenKeys = Object.keys(response.data.tokens);
	// 		let allTokens = allTokenKeys.map((key) => response.data.tokens[key]);

	// 		// console.info('allTokens',allTokens[0])
	// 		//let allTokens = response.data.address;
	// 		setTokens(allTokens);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	console.log(tokens[0]);
	// }, [tokens]);

	return (
		// <Router>
		<div className="relative">
			{/* <ConnectButton /> */}
			{/* ==================== Gradients on Background ==================== */}
			<div className="fixed bg-no-repeat bg-cover w-screen min-h-screen bg-tailwind-blue-dark z-0">
				<section className="opacity-10">
					<div className="absolute right-96 top-0 w-[30%] h-[10%] skew-y-[40deg] transform-gpu filter blur-md bg-gradient-to-br from-white via-blue-500 to-transparent"></div>
					{/* <div className="absolute -right-40 top-0 w-[80%] h-[30%] skew-y-[40deg] transform-gpu filter blur-3xl bg-gradient-to-br from-transparent via-white to-red-500"></div> */}
					<div className="absolute top-0 w-[80%] h-[50%] skew-y-[40deg] transform-gpu filter blur-lg rounded-full bg-gradient-to-t from-transparent via-blue-500 to-purple-500"></div>
					<div className="absolute right-0 bottom-0 w-[30%] h-[10%] skew-y-[40deg] transform-gpu filter blur-md bg-gradient-to-br from-white via-blue-500 to-red-900"></div>
				</section>
			</div>

			{/* <Header /> */}
			<section className="relative px-[1.2rem] py-[0.5rem]">
				<div className="flex flex-row justify-center">
					<div className="mt-8 px-[3px] py-[3px] flex flex-row gap-4 rounded-full overflow-x-scroll md:overflow-clip bg-sky-900/30 border border-sky-800/30">
						{tabs.map((tab) => (
							<div
								key={tab.id}
								className={`px-3 py-2 rounded-full text-white ${
									tab.id === activeTab
										? "bg-sky-600 cursor-default font-bold"
										: "bg-transparent cursor-pointer border border-transparent transition-colors duration-200 hover:border hover:border-sky-600 hover:text-sky-400"
								}`}
								onClick={() => setActiveTab(tab.id)}
							>
								<span className="px-3 py-2">{tab.title}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="relative mt-10 md:mt-20">
				{/* ==================== The ticker styled section ==================== */}
				{/* Hides on medium sized displays onwards */}
				{/* <div className="block md:hidden">
					<div className="px-3 py-2 info">
						<span>Balance:</span>
						&nbsp; &nbsp;
						<span>$100000</span>
					</div>
				</div> */}

				<div className="relative mx-5 lg:mx-32">
					<section className="flex flex-col-reverse gap-5 md:flex-row justify-between ">
						<div className="relative w-fit max-w-[600px]">
						{activeTab === 1 && (
								<Suspense fallback={<div>Loading...</div>}>
									<Exchange
										walletAddress={address}
										chainId={chain?.id}
										tokens={tokens}
										setNewTransaction={setNewTransaction}
									/>
								</Suspense>
							)}
							
							{activeTab === 2 && (
								<Transfer walletAddress={address} chainId={chain?.id} />
							)}
							{activeTab === 3 && (
								<Balances walletAddress={address} chainId={chain?.id} />
							)}
							
						</div>

						<section>
							{/* <div className="hidden md:block"> */}
							<div className="block">
								<CryptoCard
									isBalanceLoading={isLoading}
									isConnected={isConnected}
									walletAddress={address}
									balance={data?.formatted}
									chain={chain}
									setIsChainModalVisible={setIsChainModalVisible}
									setIsBalancesModalVisible={setIsBalancesModalVisible}
									cardHolder={username}
									onMessage={walletMessage}
								/>
							</div>

							{activeTab === 3 && address && (
								<div className="block mt-6">
									<Suspense
										fallback={
											<div className="text-gray-200/20">Loading Tokens...</div>
										}
									>
										<MyTokenBalancesCard
											walletAddress={address}
											chainId={chain?.id}
										/>
									</Suspense>
								</div>
							)}
							{activeTab === 1 && address && (
								<div className="block mt-6">
									<Suspense
										fallback={
											<div className="text-gray-200/20">
												Loading component...
											</div>
										}
									>
										<ClientExchangeTransactions
											chainId={chain?.id}
											newTransaction={newTransaction}
											setIsCashTxModalVisible={setIsCashTxModalVisible}
											setIsCryptoTxModalVisible={setIsCryptoTxModalVisible}
										/>
										{/* <ClientPageToCash walletAddress={address} token /> */}
									</Suspense>
								</div>
							)}
							{/* {activeTab === 4 && address && (
								<section className="mt-4 flex flex-col items-center">
									<div
										className={`px-4 py-3 w-[400px] md:w-[600px] rounded-3xl parentBgColor`}
									>
										<div className="font-bold text-lg text-gray-200">
											<span>Transaction</span>
										</div>
                                        <section className="relative mt-4">
                                            
                                        </section>
									</div>
								</section>
							)} */}
						</section>
					</section>
				</div>
			</section>

			{/*
            ====================================================================
                Transaction history table
            ====================================================================
            */}

			<section className="relative mt-10">
				{/* <div className="mx-6 text-gray-300">
					<h3 className="text-lg">Transaction History</h3>
					<h3 className="px-4 py-1 text-base info">
						<div className="flex flex-row gap-6">
							<div className="flex flex-row gap-2">
								<span>Total results:</span>
								<span>{transactionHistory?.total}</span>
							</div>
							<div className="flex flex-row gap-2">
								<span>Chain:</span>
							</div>
							<div className="flex flex-row gap-2">
								<span>Currency:</span>
							</div>
						</div>
                    </h3> */}

				<section className="relative mt-2 flex flex-col overflow-x-scroll">
					<table className="table-auto">
						{/* <thead className="">
								<tr className="h-10 info">
									<th className="pl-3 text-left">#</th>
									<th className="tracking-widest">From</th>
									<th className="tracking-widest">To</th>
									<th>
										<BiTransfer className="-rotate-45" />
									</th>
									<th className="tracking-widest text-right">Amount</th>
									<th className="tracking-widest text-right">Gas price</th>
									<th className="pr-3 tracking-widest text-right">
										Date & Time
									</th>
								</tr>
							</thead> */}
						<tbody>
							{/* ============================= Grab data and generate the rows ========================== */}
							{/* {fetchingTransactionsStatus ? (
									<tr className="absolute bottom-0 left-[45%]">
										<th>Fetching Data...</th>
									</tr>
								) : (
									transactionHistory?.result?.map((row, index) => (
										<tr
											key={index}
											className="py-2 border-b border-b-gray-300/20 hover:bg-gray-300/10"
											onClick={() => {
												setSelectedTransction(row);
												setTransactionModalVisible(true);
											}}
										>
											<td className="py-3">{row.nonce}</td>
											<td className="py-3">
												{truncateEthAddress(row.from_address)}
											</td>
											<td className="py-3">
												{truncateEthAddress(row.to_address)}
											</td>
											<td className="py-3">
												{row.from_address !== address ? (
													<span className="px-2 py-1 rounded-full success">
														Inbound
													</span>
												) : (
													<span className="px-2 py-1 rounded-full error">
														Outbound
													</span>
												)}
											</td>
											<td className="py-3 text-right">
											</td>
											<td className="py-3 text-right">
												{formatUnits(row.gas_price)}
											</td>
											<td className="py-3 text-right">
												{ZDateTimeFormatter(row.block_timestamp)}
											</td>
										</tr>
									))
								)}

								{(transactionHistory === undefined ||
									transactionHistory.total === 0) &&
									fetchingTransactionsStatus === false && (
										<tr className="absolute bottom-0 left-[45%]">
											<td>No Data</td>
										</tr>
									)} */}

							{/* The invisible row is to align fetchingTransactionStatus and No Data section */}
							{/* <tr>
									<td className="invisible">------</td>
								</tr> */}
						</tbody>
					</table>
				</section>
				{/* </div> */}
			</section>
			<Modal
				visible={isChainModalVisible}
				setVisible={setIsChainModalVisible}
				title="Select chain"
			>
				<div className="flex flex-col gap-3">
					{chains?.map((c) => (
						<div
							key={c.id}
							className={`px-3 py-2 flex flex-row gap-3 items-center border rounded-md hover:cursor-pointer
                            ${
															chain?.id === c.id
																? "info border-sky-400/20"
																: "text-gray-300/50 border-gray-300/10"
														}`}
							onClick={() => {
								switchNetwork(c.id);
								setIsChainModalVisible(false);
							}}
						>
							<span>{c.name}</span>
							{c.testnet && (
								<span className="ml-auto text-warn">
									<BsFillExclamationDiamondFill />
								</span>
							)}
						</div>
					))}
				</div>
			</Modal>
			<Modal
				visible={isBalancesModalVisible}
				setVisible={setIsBalancesModalVisible}
				hideTitle={true}
				hideBackground={true}
			>
				<Suspense
					fallback={
						<div className="text-gray-200/20">
							Loading component... <Spinner />{" "}
						</div>
					}
				>
					<MyTokenBalancesCard walletAddress={address} chainId={chain?.id} />
				</Suspense>
			</Modal>

			<Suspense
				fallback={
					<div className="text-gray-200/20">
						Loading component... <Spinner />{" "}
					</div>
				}
			>
				<ModalFullScreen
					visible={isCashTxModalVisible}
					setVisible={setIsCashTxModalVisible}
					hideTitle={false}
					hideBackground={true}
				>
					<ClientPageToCash
						walletAddress={address}
						chainId={chain?.id}
						tokensGoerli={tokensGoerli}
						tokensMumbai={tokensMumbai}
					/>
				</ModalFullScreen>

				<ModalFullScreen
					visible={isCryptoTxModalVisible}
					setVisible={setIsCryptoTxModalVisible}
					hideTitle={false}
					hideBackground={true}
                >
                    <ClientPageToCrypto
                        walletAddress={address}
                        chainId={chain?.id}
                        tokensGoerli={tokensGoerli}
                        tokensMumbai={tokensMumbai}
                    />
                </ModalFullScreen>
			</Suspense>
		</div>
	);
};

export default Layout;
