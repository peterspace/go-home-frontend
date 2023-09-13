import React, {useState, useEffect} from "react";
import {FiCopy} from "react-icons/fi";
import {MdDoubleArrow} from "react-icons/md";
import {BiShowAlt} from "react-icons/bi";
// import { formatUnits } from "ethers/lib/utils.js";
import truncateEthAddress from "../utils/TruncateEthAddress.js";
import copyToClipboard from "../utils/CopyToClipboard";
import {Web3Button} from "@web3modal/react";
// import Account from "../components/Account/Account.jsx";

const CryptoCard = ({
	isBalanceLoading,
	isConnected,
	balance,
	walletAddress,
	chain,
	cardHolder,
	onMessage,
	setIsChainModalVisible,
	setIsBalancesModalVisible,
}) => {
	/*
	 * setMessage format:
	 * {status: string, message: string}
	 */
	const [message, setMessage] = useState();

	function toClipboard(string) {
		let res = copyToClipboard(string);

		if (res.status === "success") {
			setMessage({status: "success", message: "Address copied"});
		} else {
			setMessage({status: "error", message: "Error copying address"});
		}

		setTimeout(() => {
			setMessage(null);
		}, 2000);
	}

	function handleMessage(message) {
		setMessage({status: message.status, message: message.message});
		setTimeout(() => {
			setMessage(null);
		}, 3000);
	}

	useEffect(() => {
		onMessage && handleMessage(onMessage);
	}, [onMessage]);

	return (
		<div className="relative max-w-[400px] max-h-[230px] md:w-[400px] md:h-[230px] rounded-2xl overflow-hidden bg-opacity-20 bg-black border border-t-gray-300/10 border-l-gray-300/10 border-r-transparent border-b-transparent backdrop-filter backdrop-blur-md">
			<div className="absolute top-0 -left-20 w-full h-full skew-y-[45deg] bg-gradient-to-r from-white/10 to-transparent blur-lg z-0" />

			<div className="relative h-full flex flex-col">
				{/* ==================== GOvercity bank ==================== */}
				<div
					className="w-full flex flex-row items-end
                    tracking-wider justify-end text-gray-300
                    font-poppins text-2xl"
				>
					<span className="ml-auto">GoVerBank</span>
					<span
						type="button"
						className={`mr-1 ${
							isConnected ? "text-blue-400" : "text-rose-400"
						}`}
					>
						<MdDoubleArrow />
					</span>
					{/* <span className="font-poppins text-4xl font-[900]">BANK</span> */}
				</div>

				<div className="mx-6 text-sm md:text-lg text-gray-100">
					{message ? (
						<div>
							<div>Message</div>
							<div
								className={`${
									message.status === "success"
										? "px-3 rounded-full success"
										: message.status === "info"
										? "px-3 rounded-full info"
										: "px-3 rounded-full error"
								}`}
							>
								{message.message}
							</div>
						</div>
					) : (
						<>
							<div className="flex flex-row gap-3 items-center">
								<span>Balance</span>
								<span
									className="text-gray-600 hover:text-gray-200 cursor-pointer"
									onClick={() => setIsBalancesModalVisible(true)}
								>
									<BiShowAlt />
								</span>
							</div>
							<div className="font-leaner text-base md:text-xl font-bold">
								{isBalanceLoading &&
									(walletAddress !== undefined || null) &&
									handleMessage({
										status: "info",
										message: "fetching balance",
									})}
								{balance ? balance + " " + chain?.nativeCurrency?.symbol : "-"}
							</div>
						</>
					)}
				</div>
				{/* ==================== Card number (copyable) ==================== */}
				<div className="mx-6 h-full flex flex-col text-base font-light text-gray-100">
					{/* <div className="w-full flex flex-row items-center"> */}
					<div className="my-5 md:my-auto">
						{walletAddress ? (
							<div className="flex flex-row gap-4 md:gap-20 items-center">
                                <div
                                    className="tracking-extra-wide cursor-pointer"
                                    onClick={() => {
											toClipboard(walletAddress);
										}}>
									{truncateEthAddress(walletAddress)}
								</div>
								<div className="w-[30px] h-[30px] bg-slate-300 text-black rounded-md">
									<div
										className="text-center align-middle text-3xl"
										onClick={() => {
											toClipboard(walletAddress);
										}}
									>
										<FiCopy />
									</div>
								</div>
							</div>
						) : (
							<div className="mb-10 flex w-full">
								<span className="mx-auto">
									<Web3Button />
								</span>
							</div>
						)}
					</div>
					{/* ==================== Card Holder Details ==================== */}
					{walletAddress && (
						<div className="my-5 md:my-auto w-full">
							<div className="flex flex-row gap-4">
								<div
									className="font-normal text-sm uppercase cursor-pointer"
									onClick={() =>
										setIsChainModalVisible && setIsChainModalVisible(true)
									}
								>
									<div>chain</div>
									<div className="font-bold font-mono">{chain?.name}</div>
								</div>

								<div className="ml-auto mr-10 font-normal text-sm uppercase">
									<div>card holder</div>
									<div className="font-bold font-mono">{cardHolder}</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CryptoCard;

/*
====================================================================
!    onMessage
    expects a json formatted string with "status" & "message", where
*   "status" is either "success" or "info" or "error"
====================================================================
*/
