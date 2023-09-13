import React, {useState} from "react";
import truncateEthAddress from "../../../utils/TruncateEthAddress";
import copyToClipboard from "../../../utils/CopyToClipboard";
import {BiShowAlt} from "react-icons/bi";

const BankStats = ({
	isBalanceLoading,
	isConnected,
	balance,
    walletAddress,
    bankName,
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

	return (
		<div className="text-gray-600">
			<div className="flex flex-row gap-2 md:gap-4 items-center">
				<div className="font-normal text-sm uppercase">
					<div className="font-bold font-mono">{bankName}</div>
					{/* <div className="font-bold font-mono">{cardHolder}</div> */}
				</div>
				<div className="mx-auto flex flex-row gap-2 items-center">
					<div className="font-leaner text-xl font-bold">
						{isBalanceLoading ?
							(walletAddress !== undefined || null) &&
                            <span>Loading...</span>
                            :
						    balance ? balance + " " + chain?.nativeCurrency?.symbol : "-"
						}
					</div>
					<span
						className="text-gray-600 hover:text-gray-200 cursor-pointer"
						onClick={() => setIsBalancesModalVisible(true)}
					>
						<BiShowAlt />
					</span>
				</div>

				<div
					className="flex flex-row gap-1 font-normal text-sm uppercase cursor-pointer"
					onClick={() => setIsChainModalVisible && setIsChainModalVisible(true)}
				>
					<span>chain:</span>
					<span className="font-bold font-mono">{chain?.name}</span>
				</div>

				<div
					className="ml-auto px-2 py-1 flex flex-row gap-1 bg-transparent border border-white/20 rounded-[5px] transition-colors duration-300 hover:bg-sky-600 hover:text-white hover:border-sky-600 cursor-pointer"
					onClick={() => toClipboard(walletAddress)}
				>
					{truncateEthAddress(walletAddress)}
				</div>
			</div>
		</div>
	);
};

export default BankStats;
