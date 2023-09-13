import React from 'react'

const TransactionItem = ({ txInfo }) => {
    // *txInfo has
    // txId,token,client,bank,CryptoPrice,completed<--(boolean)

  return (
      <div className={`h-[50px] px-3 flex flex-col justify-center bg-black/40 text-white/70 rounded-md
        cursor-pointer hover:bg-black/80`}>
			<div className="flex flex-row gap-3 items-center">
				<span className="w-[40px] opacity-80">
					<img src={txInfo?.token?.logoURI} alt="" />
				</span>

				<div className="ml-auto flex flex-row gap-6 items-center mr-6 text-base font-leaner font-bold">
					<span className="font-mono font-extralight text-sm">{txInfo?.selectedBank?.name}</span>
					{/* <span>{txInfo?.amount}</span>
					<span>{txInfo?.token?.symbol}</span> */}
					<span>{txInfo?.CryptoPrice}</span>
					<span>{txInfo?.token?.symbol}</span>
				</div>
			</div>
		</div>
  )
}

export default TransactionItem