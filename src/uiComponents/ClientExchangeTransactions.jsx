import React, {useState, useEffect} from "react";

const tabs = ["Cash", "Crypto"];

const ClientExchangeTransactions = ({
	newTransaction,
	setIsCashTxModalVisible,
	setIsCryptoTxModalVisible,
}) => {
	// async function getClientsTransacts() {
	// 	let dexContract = new ethers.Contract(
	// 		dexContractAddress,
	// 		dexContractAbi,
	// 		provider // should be just "signer" if using windows.ethereum
	// 	);

	// 	let transact;
	// 	switch (selectedTab) {
	// 		case "active":
	// 			transact = await dexContract.getClientsHasNotReceivedCash();
	// 			break;

	// 		case "completed":
	// 			transact = await dexContract.getClientsCompletedTransacts();
	// 			break;

	// 		default:
	// 			console.warn("Please choose a transaction type!");
	// 	}

	// 	// const transact = await dexContract.getExchangeVoucherForId(txId);
	// 	// const transact = await dexContract.getOneClientsCompletedTransact(txId);
	// 	console.log("MyTransactions--- transact", transact);

	// 	//Fetch all the details of every NFT from the contract and display
	// 	const items2 = await Promise.all(
	// 		transact.map(async (i) => {
	// 			let CryptoPrice = ethers.utils.formatUnits(
	// 				i.CryptoPrice.toString(),
	// 				"ether"
	// 			);
	// 			let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), "ether");
	// 			let item2 =  {
	//                 txId: i.txId.toNumber(),
	//                 token: i.token,
	//                 client: i.client,
	//                 bank: i.bank,
	//                 CryptoPrice,
	//                 clientPaidCash: i.clientPaidCash,
	//                 bankReceivedCash: i.bankReceivedCash,
	//                 bankPaidCrypto: i.bankPaidCrypto,
	//                 completed: i.completed,
	//                 tokenDecimals: i.tokenDecimals,
	//                 clientReceivedCrypto: i.clientReceivedCrypto,
	//                 clientCreatedOrder: i.clientCreatedOrder,
	//                 dexShare,

	//             };
	// 			//sumCryptoPrice += Number(CryptoPrice);
	// 			// sumDexShare += Number(dexShare);
	// 			return item2;
	// 		})
	// 	);

	// 	setActiveTransactions(items2);

	// 	//Fetch all the details of every NFT from the contract and display
	// 	const items3 = await Promise.all(
	// 		transact.map(async (i) => {
	// 			let CryptoPrice = ethers.utils.formatUnits(
	// 				i.CryptoPrice.toString(),
	// 				"ether"
	// 			);
	// 			let dexShare = ethers.utils.formatUnits(i.dexShare.toString(), "ether");
	// 			let item3 =  {
	//                 txId: i.txId.toNumber(),
	//                 token: i.token,
	//                 client: i.client,
	//                 bank: i.bank,
	//                 CryptoPrice,
	//                 clientPaidCash: i.clientPaidCash,
	//                 bankReceivedCash: i.bankReceivedCash,
	//                 bankPaidCrypto: i.bankPaidCrypto,
	//                 completed: i.completed,
	//                 tokenDecimals: i.tokenDecimals,
	//                 clientReceivedCrypto: i.clientReceivedCrypto,
	//                 clientCreatedOrder: i.clientCreatedOrder,
	//                 dexShare,

	//             };
	// 			//sumCryptoPrice += Number(CryptoPrice);
	// 			// sumDexShare += Number(dexShare);
	// 			return item3;
	// 		})
	// 	);

	// 	setCompletedTransactions(items3);
	// }

	return (
		<section className="mt-4 flex flex-col items-center">
			<div className={`px-4 py-3 w-[400px] rounded-lg parentBgColor`}>
				<div className={`flex flex-row gap-4 items-center text-gray-400`}>
					<span>View</span>
					{tabs.map((tab) => (
						<button
							key={tab}
							type="button"
                            className={`px-2 py-1 rounded-md cursor-pointer border-none
                            text-gray-600 font-bold hover:underline hover:text-gray-200`}
                            onClick={() => {
                                tab === tabs[0] && setIsCashTxModalVisible(true);
                                tab === tabs[1] && setIsCryptoTxModalVisible(true);
                            }}
						>
							{tab}
						</button>
					))}
					<span>Transactions</span>
				</div>
			</div>
		</section>
	);
};

export default ClientExchangeTransactions;
