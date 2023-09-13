import React from 'react';

const ActiveChainComponent = ({ currentItem }) => {
  return (
    <div className="px-4 py-1 flex flex-col gap-2 cursor-pointer hover:text-infoText hover:shadow-md rounded-lg  justify-center items-center border border-infoText/20 hover:border-secondary bg-secondaryFill  ">
      {/* <img src={currentItem?.name} alt="" className="w-6 h-6" /> */}
      <span className="rounded-full bg-gray-800 px-2 py-2">
        <img src={currentItem?.logoURI} alt="" className="w-8 h-8" />
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#9D9DA3" //secondaryText
          className="w-6 h-6 hover:stroke-infoText stroke-infoText fill-infoText"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg> */}
      </span>
      <span className="text-xs font-semibold text-primaryText hover:text-infoText">
        {currentItem?.chainSymbol}
      </span>

      {/* <span className="text-xs text-secondaryText hover:text-infoText">
        {currentItem?.nativeCurrency?.symbol}
      </span> */}
    </div>
  );
};

export default ActiveChainComponent;
