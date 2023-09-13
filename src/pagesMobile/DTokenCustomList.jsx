import { dTokenCustomList } from "../assets";

const DTokenCustomList = ({ onClose }) => {
  return (
    // <div className="relative bg-surface-1-d w-[1680px] h-[986px] overflow-hidden max-w-full max-h-full text-left text-lg text-text-1-d font-text-16-md">
    //   <img
    //     className="absolute top-[0px] left-[360px] w-[1221px] h-[897px] opacity-[0.6]"
    //     alt=""
    //     src="/ellipse-3.svg"
    //   />
    //   <img
    //     className="absolute top-[104px] left-[354px] w-[1294px] h-[882px] opacity-[0.6]"
    //     alt=""
    //     src="/ellipse-4.svg"
    //   />
    //   <img
    //     className="absolute top-[104px] left-[79px] w-[1221px] h-[882px] opacity-[0.6]"
    //     alt=""
    //     src="/ellipse-3.svg"
    //   />
    //   <img
    //     className="absolute top-[0px] left-[0px] w-[1286px] h-[897px] opacity-[0.6]"
    //     alt=""
    //     src="/ellipse-4.svg"
    //   />
    <div className="relative w-[1680px] h-[986px] overflow-hidden max-w-full max-h-full text-left text-lg text-text-1-d font-text-16-md">
    <img
      className="absolute w-[1680px] h-[986px]"
      alt=""
      src={dTokenCustomList}
    />
      <div className="absolute top-[162px] left-[600px] rounded-13xl bg-surface-1-64-d [backdrop-filter:blur(40px)] w-[480px] flex flex-col pt-4 px-3 pb-3 box-border items-center justify-start gap-[12px]">
        <div className="self-stretch flex flex-row py-0 px-4 items-center justify-start gap-[32px]">
          <div className="flex-1 relative tracking-[0.02em] leading-[24px]">
            Swap
          </div>
          <img
            className="relative w-[24.4px] h-6 shrink-0"
            alt=""
            src="/settings041.svg"
          />
        </div>
        <div className="self-stretch flex flex-col items-end justify-start gap-[12px] text-xl">
          <div className="self-stretch rounded-xl bg-surface-1-64-d overflow-hidden flex flex-col p-4 items-start justify-start gap-[24px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[32px]">
              <div className="rounded-xl bg-surface-tint-d-8 overflow-hidden flex flex-row py-1.5 px-2 items-center justify-start gap-[8px]">
                <img
                  className="relative w-6 h-6 shrink-0"
                  alt=""
                  src="/protocol-icon6.svg"
                />
                <div className="relative tracking-[0.02em] leading-[28px]">
                  ETH
                </div>
                <img
                  className="relative w-4 h-4 shrink-0 overflow-hidden"
                  alt=""
                  src="/chevrondown.svg"
                />
              </div>
              <div className="flex-1 relative text-sm tracking-[0.02em] leading-[20px] font-medium text-surface-tint-64-d text-right">
                Balance: 18.7685
              </div>
            </div>
            <div className="self-stretch flex flex-col py-0 px-2 items-start justify-start gap-[4px] text-13xl">
              <div className="self-stretch relative tracking-[0.02em] leading-[44px]">
                1.567904
              </div>
              <div className="self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-surface-tint-64-d">
                ~$1432.54
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[8px] text-sm text-text-2-d">
              <div className="flex-1 rounded-3xs bg-surface-tint-d-8 overflow-hidden flex flex-row py-1.5 px-4 items-center justify-center">
                <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                  25%
                </div>
              </div>
              <div className="flex-1 rounded-3xs bg-surface-tint-d-8 overflow-hidden flex flex-row py-1.5 px-4 items-center justify-center">
                <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                  50%
                </div>
              </div>
              <div className="flex-1 rounded-3xs bg-surface-tint-16-d overflow-hidden flex flex-row py-1.5 px-4 items-center justify-center text-text-1-d">
                <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                  75%
                </div>
              </div>
              <div className="flex-1 rounded-3xs bg-surface-tint-d-8 overflow-hidden flex flex-row py-1.5 px-4 items-center justify-center">
                <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                  100%
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-lg font-sf-pro-display">
            <div className="flex-1 rounded-xl flex flex-row py-2.5 px-4 items-center justify-center gap-[12px]">
              <b className="relative [background:conic-gradient(from_247.66deg_at_50%_50%,_rgba(255,_255,_255,_0)_0deg,_#fff_0deg,_rgba(255,_255,_255,_0)_360deg,_#fff_360deg)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                􀅈
              </b>
              <b className="flex-1 relative text-sm tracking-[0.02em] leading-[20px] font-text-16-md">
                1 ETH = 1677.71 USDT
              </b>
            </div>
            <div className="rounded-3xl bg-surface-1-64-d flex flex-row p-2.5 items-start justify-start">
              <img
                className="relative w-5 h-5 shrink-0 overflow-hidden"
                alt=""
                src="/arrowdown2.svg"
              />
            </div>
          </div>
          <div className="self-stretch rounded-xl bg-surface-1-64-d overflow-hidden flex flex-col p-4 items-start justify-start gap-[24px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[32px]">
              <div className="rounded-xl bg-surface-tint-d-8 overflow-hidden flex flex-row py-1.5 px-2 items-center justify-start gap-[8px]">
                <img
                  className="relative w-6 h-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/md-image.svg"
                />
                <div className="relative tracking-[0.02em] leading-[28px]">
                  USDT
                </div>
                <img
                  className="relative w-4 h-4 shrink-0 overflow-hidden"
                  alt=""
                  src="/chevrondown.svg"
                />
              </div>
              <div className="flex-1 relative text-sm tracking-[0.02em] leading-[20px] font-medium text-surface-tint-64-d text-right">
                Balance: 0
              </div>
            </div>
            <div className="self-stretch flex flex-col py-0 px-2 items-start justify-start gap-[4px] text-13xl">
              <div className="self-stretch relative tracking-[0.02em] leading-[44px]">
                3859.042109
              </div>
              <div className="self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-surface-tint-64-d">
                ~$1432.54
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-2xl [background:radial-gradient(50%_50%_at_50%_50%,_#5a38a3,_#683fab_31.77%,_#9d52ff_68.23%,_#edbcfc_96.35%)] overflow-hidden flex flex-row py-3 px-10 items-center justify-center text-lg">
            <div className="relative tracking-[0.02em] leading-[24px]">
              Connect Wallet
            </div>
          </div>
          <div className="self-stretch rounded-xl overflow-hidden flex flex-col py-0 px-2 items-start justify-start text-sm text-text-1-48-d">
            <div className="self-stretch flex flex-col p-2 items-start justify-start gap-[8px]">
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
                <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                  Tx cost
                </div>
                <div className="flex-1 relative tracking-[0.02em] leading-[20px] font-medium text-right">
                  $6.65
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
                <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                  Route
                </div>
                <div className="flex-1 flex flex-row items-center justify-end gap-[4px]">
                  <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                    ETH
                  </div>
                  <img
                    className="relative w-3 h-3 shrink-0 overflow-hidden"
                    alt=""
                    src="/chevronright.svg"
                  />
                  <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                    USDT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[0px] left-[0px] bg-gray-200 [backdrop-filter:blur(80px)] w-[1680px] h-[934px] overflow-hidden text-center text-xl">
        <div className="absolute top-[32px] left-[1269px] flex flex-row items-start justify-start gap-[12px]">
          <button
            className="cursor-pointer [border:none] py-2.5 px-4 bg-surface-tint-d-8 rounded-xl flex flex-row items-center justify-start gap-[12px]"
            autoFocus
          >
            <img
              className="relative w-6 h-6 shrink-0"
              alt=""
              src="/protocol-icon7.svg"
            />
            <div className="relative text-base tracking-[0.02em] leading-[22px] font-medium font-text-16-md text-text-1-d text-left">
              Ethereum
            </div>
            <img
              className="relative w-4 h-4 shrink-0 overflow-hidden"
              alt=""
              src="/chevrondown.svg"
            />
          </button>
          <button
            className="cursor-pointer [border:none] py-2.5 px-4 bg-surface-tint-d-8 rounded-xl flex flex-row items-center justify-start gap-[12px]"
            autoFocus
          >
            <img
              className="relative w-6 h-6 shrink-0 overflow-hidden"
              alt=""
              src="/wallet-icon5.svg"
            />
            <div className="relative text-base tracking-[0.02em] leading-[22px] font-medium font-text-16-md text-text-1-d text-left">
              0x54b7...7984
            </div>
          </button>
        </div>
        <div className="absolute top-[162px] left-[600px] rounded-13xl bg-surface-1-64-d shadow-[0px_0px_16px_rgba(0,_0,_0,_0.04),_0px_24px_48px_-12px_rgba(16,_24,_40,_0.08)] box-border w-[480px] flex flex-col p-6 items-start justify-start gap-[24px] border-[1px] border-solid border-surface-tint-16-d">
          <div className="self-stretch flex flex-row items-center justify-center gap-[24px]">
            <button
              className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-9 h-9 shrink-0 flex flex-row box-border items-center justify-center"
              onClick={onClose}
            >
              <img
                className="relative w-5 h-5 shrink-0 overflow-hidden"
                alt=""
                src="/chevronleft.svg"
              />
            </button>
            <div className="flex-1 relative tracking-[0.02em] leading-[28px]">
              Manage
            </div>
            <button
              className="cursor-pointer [border:none] py-4 px-3 bg-surface-tint-d-8 rounded-xl w-9 h-9 shrink-0 flex flex-row box-border items-center justify-center"
              autoFocus
              onClick={onClose}
            >
              <img
                className="relative w-5 h-5 shrink-0 overflow-hidden"
                alt=""
                src="/xclose.svg"
              />
            </button>
          </div>
          <div className="self-stretch relative box-border h-px shrink-0 border-t-[1px] border-solid border-surface-tint-16-d" />
          <input
            className="[border:none] font-medium font-text-16-md text-base bg-surface-tint-d-8 self-stretch rounded-xl overflow-hidden flex flex-row py-[11px] px-4 items-center justify-start"
            type="text"
            placeholder="Address"
          />
          <div className="self-stretch overflow-hidden flex flex-col items-start justify-start gap-[16px] text-left text-base">
            <div className="self-stretch relative tracking-[0.02em] leading-[22px]">
              Custom tokens
            </div>
            <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[8px]">
              <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
                <div className="self-stretch rounded-xl overflow-hidden flex flex-row py-2 px-3 items-center justify-start gap-[12px]">
                  <img
                    className="relative w-10 h-10 shrink-0"
                    alt=""
                    src="/protocol-icon8.svg"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
                    <div className="self-stretch relative tracking-[0.02em] leading-[22px]">
                      Ethereum
                    </div>
                    <div className="self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-text-2-d">
                      ETH
                    </div>
                  </div>
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/star012.svg"
                  />
                </div>
                <div className="self-stretch rounded-xl overflow-hidden flex flex-row py-2 px-3 items-center justify-start gap-[12px]">
                  <img
                    className="relative w-10 h-10 shrink-0 overflow-hidden"
                    alt=""
                    src="/md-image2.svg"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
                    <div className="self-stretch relative tracking-[0.02em] leading-[22px]">
                      Tether USD
                    </div>
                    <div className="self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-text-2-d">
                      USDT
                    </div>
                  </div>
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/star013.svg"
                  />
                </div>
                <div className="self-stretch rounded-xl overflow-hidden flex flex-row py-2 px-3 items-center justify-start gap-[12px]">
                  <div className="relative w-10 h-10 shrink-0">
                    <img
                      className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                      alt=""
                      src="/img-5135-1@2x.png"
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start gap-[2px]">
                    <div className="self-stretch relative tracking-[0.02em] leading-[22px]">
                      Binance Smart Chain
                    </div>
                    <div className="self-stretch relative text-sm tracking-[0.02em] leading-[20px] font-medium text-text-2-d">
                      BNB
                    </div>
                  </div>
                  <img
                    className="relative w-5 h-5 shrink-0 overflow-hidden"
                    alt=""
                    src="/star014.svg"
                  />
                </div>
              </div>
              <div className="self-stretch rounded-4xs bg-surface-tint-d-8 w-2 shrink-0 flex flex-col items-center justify-start">
                <div className="relative rounded-3xs bg-surface-tint-16-d w-2 h-8 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-[934px] left-[0px] bg-gray-100 [backdrop-filter:blur(120px)] w-[1680px] flex flex-row py-4 px-0 box-border items-center justify-center gap-[48px] text-sm text-text-2-d">
        <div className="relative tracking-[0.02em] leading-[20px] font-medium">
          Documentation
        </div>
        <div className="relative tracking-[0.02em] leading-[20px] font-medium">
          FAQ
        </div>
        <div className="relative tracking-[0.02em] leading-[20px] font-medium">
          Privacy policy
        </div>
        <div className="relative tracking-[0.02em] leading-[20px] font-medium">
          Terms of use
        </div>
      </div>
    </div>
  );
};

export default DTokenCustomList;
