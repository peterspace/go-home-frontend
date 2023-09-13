import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  useAccount,
  useSigner,
  useBalance,
} from 'wagmi';
import { erc20ABI } from 'wagmi';

const TokenBalancesComponent = ({
  selectedToken,
  currentItem,
  setSelectedToken,
  chainId,
}) => {
  const [balance, setBalance] = useState('');
  const signer = useSigner();
  const { address, isConnected } = useAccount();
  const walletAddress = address;


  useEffect(() => {
    if (isConnected) {
      tokenBalance();
    }
  }, [balance]);

  async function tokenBalance() {
    let tokenAddress = currentItem?.address;

    if (tokenAddress !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      const ERC20Contract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signer.data
      );

      const tokenbal = await ERC20Contract.balanceOf(walletAddress);
      setBalance(tokenbal);
    } else {
      const { data } = useBalance({
        address: walletAddress,
        chainId: chainId,
        watch: true,
      });

      const tokenbal = Number(data?.formatted).toFixed(3);
      setBalance(tokenbal);
    }
  }
  return (
    <section className="w-fit h-fit flex flex-col text-primaryText/50 mb-8 mt-4 ml-4 mr-4">
      <div className="mt-2 justify-start items-start w-[432px] py-1 rounded-lg border border-secondaryFill hover:border-secondary">
        <div className="flex flex-row justify-between items-center">
          <div
            className="px-3 py-2 w-full flex flex-row gap-4
    			 cursor-pointer hover:text-infoText hover:shadow-md"
            onClick={() => {
              setSelectedToken(currentItem);
            }}
          >
            <img src={currentItem?.logoURI} alt="" className="w-8 h-8" />

            <div className="flex flex-col">
              <span className="text-xs text-primaryText hover:text-infoText">
                {currentItem?.name}
              </span>
              <span className="text-xs text-secondaryText hover:text-infoText">
                {currentItem?.symbol}
              </span>
            </div>
          </div>
          <span className="justify-start items-start gap-2 mr-4">
            <span className="w-6 h-6 stroke-secondaryText hover:stroke-infoText active:fill-infoText">
              {balance}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#9D9DA3" //secondaryText
              className="w-6 h-6 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
};

export default TokenBalancesComponent;
