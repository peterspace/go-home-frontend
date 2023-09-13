import React from 'react';

const TokenListButton = ({
  selectedTokenName,
  selectedTokenIcon,
  // modalVisible,
  // toggleModal,
}) => {
  return (
    <button
      className="cursor-pointer [border:none] py-1.5 px-0 bg-[transparent] rounded-xl overflow-hidden flex flex-row items-center justify-start gap-[8px]"
      // onClick={() => toggleModal(!modalVisible)}
    >
      <img
        src={selectedTokenIcon}
        alt=""
        className="relative w-6 h-6 shrink-0"
      />
      <div className="relative text-xl tracking-[0.02em] leading-[28px] font-text-16-md text-text-1-d text-left">
        {selectedTokenName}
      </div>
      <img
        className="relative w-4 h-4 shrink-0 overflow-hidden"
        alt=""
        src="/chevrondown.svg"
      />
    </button>
  );
};

export default TokenListButton;
