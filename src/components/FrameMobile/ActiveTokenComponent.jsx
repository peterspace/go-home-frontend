import React from 'react';

const ActiveTokenComponent = ({ currentItem }) => {
  return (
    <div className="rounded-xl overflow-hidden flex flex-row py-2 pr-4 pl-2 items-center justify-start gap-[8px] border-[2px] border-solid border-surface-tint-d-8 text-white">
      <img
        className="relative w-6 h-6 shrink-0"
        alt=""
        src={currentItem?.logoURI}
      />
      <div className="relative tracking-[0.02em] leading-[22px] font-medium">
        {currentItem?.symbol}
      </div>
    </div>
  );
};

export default ActiveTokenComponent;
