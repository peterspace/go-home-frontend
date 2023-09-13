import React from "react";

const TokenBalance = ({token}) => {
	return (
		<div className="py-1 px-3 flex flex-col justify-center text-gray-200 rounded-md border-b border-white/10 cursor-default hover:border-black/40 hover:bg-black/40">
			<div className="flex flex-row gap-3">
				<span className="w-[40px] opacity-80">
					<img src={token?.logoURI} alt="" />
				</span>

				<div className="ml-auto flex flex-row gap-6 items-center mr-6 text-base font-leaner font-bold">
					<span className="text-lg">{token?.balance}</span>
					<span>{token?.symbol}</span>
				</div>
			</div>
			{/* <div className="mt-2 w-full h-[1px] bg-white/10" /> */}
		</div>
	);
};
// const TokenBalanceOriginal = ({token}) => {
// 	return (
// 		<div className="h-[50px] px-3 flex flex-col justify-center bg-black/40 text-white/70 rounded-md">
// 			<div className="flex flex-row gap-3">
// 				<span className="w-[40px] opacity-80">
// 					<img src={token?.logoURI} alt="" />
// 				</span>

// 				<div className="ml-auto flex flex-row gap-6 items-center mr-6 text-xl font-leaner font-bold">
// 					<span className="text-2xl">{token?.balance}</span>
// 					<span>{token?.symbol}</span>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

export default TokenBalance;
