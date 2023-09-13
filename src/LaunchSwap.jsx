import React, { useState, useEffect } from 'react';
import stylesSwap from './Swap.module.css';

import Swap from './components/Frame/Swap';
import Exchange from './components/Frame/Exchange';

const LaunchSwap = () => {
  const [isSwappingActive, setIsSwappingActive] = useState(false);

  const [isSwapSameChain, setIsSwapSameChain] = useState(false);
  const [isSwapCrossChain, setIsSwapCrossChain] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    if (isSwapSameChain || isSwapCrossChain) {
      setIsLaunching(true);
      setTimeout(() => {
        setIsLaunching(false);
      }, 2000);
    }
  }, [isSwapSameChain, isSwapCrossChain]);

  // useEffect(() => {
  //   setIsLaunching(true);
  //   setTimeout(() => {
  //     setIsLaunching(false);
  //   }, 2000);
  // }, [isSwappingActive]);

  // useEffect(() => {
  //   if (isSwapSameChain || isSwapCrossChain || isSwappingActive) {
  //     setIsLaunching(true);
  //     setTimeout(() => {
  //       setIsLaunching(false);
  //     }, 3000);
  //   }
  // }, [isSwapSameChain, isSwapCrossChain, isSwappingActive]);

  return (
    <>
      <>
        {isSwappingActive ? (
          <section className="relative">
            {isSwappingActive && isSwapSameChain ? (
              <Swap setIsSwappingActive={setIsSwappingActive} />
            ) : null}
            {isSwappingActive && isSwapCrossChain ? <Exchange /> : null}
          </section>
        ) : (
          <div
            className={`outline outline-outlineSwap bg-white ${stylesSwap.frameGroupCustom}`}
          >
            <div className={`mb-6 ${stylesSwap.swapGroup}`}>
              <div className={`cursor-pointer font-medium ${stylesSwap.swap1}`}>
                Crypto Exchanges
              </div>
              <div className="cursor-pointer flex flex-row justify-center items-center p-1 rounded-full transition-transform duration-300 hover:scale-125">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#130D1A"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col  justify-center items-center gap-10 h-[684px] w-[440px] bg-white">
              <div
                className="mb-6 mt-4 cursor-pointer transition-transform duration-300 hover:scale-125 shadow-lg outline-none border gap-2 [border:none] w-[300px] py-6 px-3 rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill"
                onClick={() => {
                  setIsSwapSameChain(true);
                  setIsSwapCrossChain(false);
                  setIsSwappingActive(true);
                }}
              >
                <img className="h-6 w-6" src="/connect-wallet-90.png" />
                <div className={`font-bold text-2xl relative`}>Same Chain</div>
              </div>
              <div
                className="mb-6 mt-4 cursor-pointer transition-transform duration-300 hover:scale-125 shadow-lg outline-none border gap-2 [border:none] w-[300px] py-6 px-3 rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill"
                onClick={() => {
                  setIsSwapSameChain(false);
                  setIsSwapCrossChain(true);
                  setIsSwappingActive(true);
                }}
              >
                <img className="h-6 w-6" src="/connect-wallet-90.png" />
                <div className={`font-bold text-2xl relative`}>Cross-Chain</div>
              </div>
            </div>
          </div>
        )}
      </>

      <>
        {isLaunching ? (
          <div
            className={`absolute z-20 mt-12 ${stylesSwap.frameGroupCustomLoader}`}
          >
            <div className="mt-[100px] flex flex-row justify-center items-center">
              <svg
                aria-hidden="true"
                className="w-[100px] h-[100px] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blueviolet"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        ) : null}
      </>
    </>
  );
};

export default LaunchSwap;
