import React from 'react';

// setFromToken
const TokenComponent = ({
  selectedToken,
  currentItem,
}) => {
  return (
    <>
      <>
        {/* <section className="w-fit h-fit flex flex-col text-primaryText/50 mt-2 ml-4 mr-4">
          <div className="mt-2 justify-start items-start w-[432px] py-1 rounded-lg border border-secondaryFill hover:border-secondary">
            <div className="flex flex-row justify-between items-center">
              <div
                className="px-3 py-2 w-full flex flex-row gap-4
    			 cursor-pointer hover:text-infoText hover:shadow-md"
                onClick={() => {
                  setSelectedToken(currentItem);
                  setIsTokenModalVisible(false);
                }}
              >
                <img src={currentItem?.logoURI} alt="" className="w-8 h-8" />

                <div
                  className={`flex flex-col hover:text-infoText ${
                    currentItem?.symbol === selectedToken?.symbol
                      ? 'text-primaryText'
                      : 'text-secondaryText'
                  }`}
                >
                  <span className="text-xs">{currentItem?.name}</span>
                  <span className="text-xs">{currentItem?.symbol}</span>
                </div>
              </div>
              <span className="justify-start items-start mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#9D9DA3" 
                  className={`w-6 h-6 hover:stroke-infoText active:fill-infoText ${
                    currentItem === selectedToken
                      ? 'stroke-infoText'
                      : 'stroke-secondaryText'
                  } ${currentItem === selectedToken && 'fill-infoText'}`}
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
        </section> */}
      </>
      <>
        <div
          className="self-stretch rounded-xl overflow-hidden flex flex-row py-2 px-3 items-center justify-start gap-[12px]"
          onClick={() => {
            setSelectedToken(currentItem);
            setIsTokenModalVisible(false);
          }}
        >
          <img
            className="relative w-10 h-10 shrink-0 overflow-hidden"
            alt=""
            src={currentItem?.logoURI}
          />
          <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
            <div className="self-stretch relative tracking-[0.02em] leading-[22px] text-white">
              {currentItem?.name}
            </div>
            <div className="self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-text-2-d">
              {currentItem?.symbol}
            </div>
          </div>
          {/* <img
            className="relative w-5 h-5 shrink-0 overflow-hidden"
            alt=""
            src="/star01.svg"
          /> */}
          <span className="justify-start items-start mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#9D9DA3"
              className={`w-5 h-5 hover:stroke-infoText active:fill-infoText ${
                currentItem === selectedToken
                  ? 'stroke-infoText'
                  : 'stroke-secondaryText'
              } ${currentItem === selectedToken && 'fill-infoText'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </span>
        </div>

        {/* <button
          className="cursor-pointer [border:none] py-3 px-10 bg-surface-tint-d-8 self-stretch rounded-xl overflow-hidden flex flex-row items-center justify-center"
          autoFocus
        >
          <div className="relative text-base tracking-[0.02em] leading-[22px] font-medium font-text-16-md text-text-1-d text-left">
            Manage Token List
          </div>
        </button> */}
      </>
    </>
  );
};

export default TokenComponent;
