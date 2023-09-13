import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Spinner } from '../../components/index';
import stylesSwap from './Swap.module.css';
import stylesFromToken from './FromTokenList.module.css';
// const ExchangeGetCash = lazy(() => import("./Exchange_getCash"));
// const ExchangeGetCrypto = lazy(() => import("./Exchange_getCrypto"));

import ExchangeGetCash from './Exchange_getCash';
import ExchangeGetCrypto from './Exchange_getCrypto';

const style = {
  withdrawOptions: `px-4 w-full border text-gray-300 text-xl
        hover:border-gray-400 transition-colors duration-300`,
};

// withdraw types
const withdrawTypes = ['getCash', 'getCrypto'];

const Exchange = ({ walletAddress, chainId, setNewTransaction }) => {
  const [withdrawType, setWithdrawType] = useState(withdrawTypes[0]);

  const [isExchangingActive, setIsExchangingActive] = useState(false);
  const [isExchangeGetCash, setIsExchangeGetCash] = useState(false);
  const [isExchangeGetCrypto, setIsExchangeGetCrypto] = useState(false);

  return (
    <section className="flex flex-col items-center">
      {/* <div className={`${stylesSwap.frameGroupCustom}`}></div> */}
      {/* <div
				className={`px-4 py-3 w-[440px] rounded-3xl parentBgColor`}
			> */}
      <div className={`${stylesSwap.frameGroupCustom}`}>
        <div className={`mb-6 ${stylesSwap.swapGroup}`}>
          <div
            className={`cursor-pointer font-medium ${stylesSwap.swap1}`}
            onClick={() => setIsExchangingActive(false)}
          >
            Exchanges
          </div>
          <div className="cursor-pointer flex flex-row justify-center items-center p-1 rounded-full bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#130D1A"
              className="w-5 h-5"
              onClick={() => {
                // setIsSlippagePage(true);
                // setIsSettings(true);
              }}
            >
              <path
                fillRule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="font-bold text-lg text-balck">
          {isExchangingActive && isExchangeGetCash && !isExchangeGetCrypto ? (
            <span>Get Cash</span>
          ) : null}
          {isExchangingActive && !isExchangeGetCash && isExchangeGetCrypto ? (
            <span>Get Crypto</span>
          ) : null}
        </div>
        <>
          <>
            {isExchangingActive && isExchangeGetCash && !isExchangeGetCrypto ? (
              <ExchangeGetCash
                chainId={chainId}
                walletAddress={walletAddress}
                setNewTransaction={setNewTransaction}
              />
            ) : null}
            {isExchangingActive && !isExchangeGetCash && isExchangeGetCrypto ? (
              <ExchangeGetCrypto
                chainId={chainId}
                walletAddress={walletAddress}
                setNewTransaction={setNewTransaction}
              />
            ) : null}

            {!isExchangingActive ? (
              <div
                className={`outline outline-outlineSwap ${stylesSwap.frameGroupCustom}`}
              >
                <div className="flex flex-col  justify-center items-center gap-10 h-[684px] w-[440px] bg-white">
                  <div
                    className="mb-6 mt-4 cursor-pointer transition-transform duration-300 hover:scale-125 shadow-lg outline-none border gap-2 [border:none] w-[300px] py-6 px-3 rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill"
                    onClick={() => {
                      setIsExchangeGetCash(true);
                      setIsExchangingActive(true);
                    }}
                  >
                    <img className="h-6 w-6" src="/connect-wallet-90.png" />
                    <div className={`font-bold text-2xl relative`}>
                      Get Cash
                    </div>
                  </div>

                  <div
                    className="mb-6 mt-4 cursor-pointer transition-transform duration-300 hover:scale-125 shadow-lg outline-none border gap-2 [border:none] w-[300px] py-6 px-3 rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill"
                    onClick={() => {
                      setIsExchangeGetCrypto(true);
                      setIsExchangingActive(true);
                    }}
                  >
                    <img className="h-6 w-6" src="/connect-wallet-90.png" />
                    <div className={`font-bold text-2xl relative`}>
                      Get Crypto
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        </>
        <section className="relative mt-4">
          <div className="flex flex-col">
            <h3 className="text-gray-600">I want to:</h3>
            <div className="mt-1 flex flex-row w-full h-[50px] justify-center rounded-xl optionSectionColor">
              <button
                type="button"
                id="0"
                className={`rounded-tl-xl rounded-bl-xl ${style.withdrawOptions}
                                        ${
                                          withdrawType === withdrawTypes[0]
                                            ? 'border-gray-400'
                                            : 'border-transparent'
                                        }`}
                onClick={() => setWithdrawType(withdrawTypes[0])}
              >
                Get Cash
              </button>
              <button
                type="button"
                id="1"
                className={`rounded-tr-xl rounded-br-xl ${style.withdrawOptions}
                                        ${
                                          withdrawType === withdrawTypes[1]
                                            ? 'border-gray-400'
                                            : 'border-transparent'
                                        }`}
                onClick={() => setWithdrawType(withdrawTypes[1])}
              >
                Get Crypto
              </button>
            </div>
          </div>
          <Suspense fallback={<Spinner size="xl" />}>
            {withdrawType === withdrawTypes[0] && (
              <ExchangeGetCash
                chainId={chainId}
                walletAddress={walletAddress}
                setNewTransaction={setNewTransaction}
              />
            )}
            {withdrawType === withdrawTypes[1] && (
              <ExchangeGetCrypto
                chainId={chainId}
                walletAddress={walletAddress}
                setNewTransaction={setNewTransaction}
              />
            )}
          </Suspense>
        </section>
      </div>
    </section>
  );
};

export default Exchange;
