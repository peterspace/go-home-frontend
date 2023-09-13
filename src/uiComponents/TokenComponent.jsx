import React from "react";

const TokenComponent = ({selectedToken, currentItem, setSelectedToken, setIsTokenModalVisible}) => {
	return (
		<div
			className={`px-3 py-2 w-full flex flex-row gap-3 items-center bg-black/30 rounded-lg border ${
				currentItem.symbol === selectedToken?.symbol
					? "border-gray-100 text-gray-100"
					: "border-white/10 text-gray-300"
			} cursor-pointer hover:text-gray-100 hover:border-gray-100`}
			onClick={() => {
				setSelectedToken(currentItem);
				setIsTokenModalVisible(false);
			}}
		>
			<img src={currentItem.logoURI} alt="" className="w-6 h-6" />
			<span className="mx-auto">{currentItem.symbol}</span>
		</div>
	);
};

export default TokenComponent;
