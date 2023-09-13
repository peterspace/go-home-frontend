import stylesSwap from './Component11.module.css';
import stylesSwapDetail from './Component9.module.css';

const Component11 = () => {
  return (
    <div className={stylesSwap.frameGroup}>
      <div className={stylesSwap.swapParent}>
        <div className={stylesSwap.swap}>Swap</div>
        <img
          className={`cursor-pointer ${stylesSwap.settings04Icon}`}
          onClick={() => {
            setIsSlippagePage(true);
          }}
          alt=""
          src="/settings04.svg"
        />
      </div>
      <div className={stylesSwap.frameContainer}>
        <div className={stylesSwap.frameDiv}>
          <div className={stylesSwap.frameParent1}>
            <div className={stylesSwap.frameParent2}>
              <div
                className={`cursor-pointer ${stylesSwap.protocolIconGroup}`}
                onClick={() => setIsFromTokenPage(true)}
              >
                <img
                  className={stylesSwap.protocolIcon}
                  alt=""
                  src={fLogoURI}
                />
                <div className={`font-medium ${stylesSwap.horiza}`}>
                  {fSymbol}
                </div>
                <img
                  className={stylesSwap.chevronDownIcon}
                  alt=""
                  src="/chevrondown.svg"
                />
              </div>
              {/* <div className={stylesSwap.div1}>3859.042109</div> */}
              <input
                className={`[border:none] font-satoshi font-medium  text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
                  isFromLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
                    : ''
                }`}
                type="text"
                pattern="[0-9]*.[0-9]*"
                placeholder={isFromLoading ? '' : '0.0'}
                value={isFromLoading ? '' : `${fValue}`}
                onChange={onFromValueChanged}
              />
            </div>
            {/* <div className={stylesSwap.balance0Parent}>
                <div className={stylesSwap.balance0}>Balance: 0</div>
                <div className={stylesSwap.txCost}>~$1432.54</div>
              </div> */}
            <div className={stylesSwap.balance0Parent}>
              {/* <div className={stylesSwap.transactionDetails}>Balance: 0</div> */}
              <div
                className={`${stylesSwap.balance0} ${
                  isFromLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                    : ''
                }`}
              >
                {isFromLoading
                  ? ''
                  : `Balance: ${fromBalance.toString() || ''}`}
              </div>
              {/* <div className={stylesSwap.txCost}>~$1432.54</div> */}
              <div className={stylesSwap.txCost}>
                {isFromLoading
                  ? ''
                  : `~$${
                      fromPriceData
                        ? new Intl.NumberFormat().format(
                            fromPriceData?.totalFromPrice
                          )
                        : ''
                    }`}
              </div>
            </div>
          </div>
          <div className={stylesSwap.frameParent3}>
            <div
              className={`cursor-pointer ${stylesSwap.wrapper} ${
                fromBalancePercent === 25
                  ? `bg-surface-tint-16-d`
                  : `bg-surface-tint-d-8`
              }`}
            >
              <div
                className={`${stylesSwap.txCost} ${
                  fromBalancePercent === 25 ? `text-text-1-d` : `text-text-2-d`
                }`}
                onClick={() => {
                  let newValue = 0.25 * fromBalance;
                  setFromValue(newValue);
                  setFromBalancePercent(25);
                }}
              >
                25%
              </div>
            </div>
            <div
              className={`cursor-pointer ${stylesSwap.wrapper} ${
                fromBalancePercent === 50
                  ? `bg-surface-tint-16-d`
                  : `bg-surface-tint-d-8`
              }`}
            >
              <div
                className={`${stylesSwap.txCost} ${
                  fromBalancePercent === 50 ? `text-text-1-d` : `text-text-2-d`
                }`}
                onClick={() => {
                  let newValue = 0.5 * fromBalance;
                  setFromValue(newValue);
                  setFromBalancePercent(50);
                }}
              >
                50%
              </div>
            </div>
            <div
              className={`cursor-pointer ${stylesSwap.wrapper} ${
                fromBalancePercent === 75
                  ? `bg-surface-tint-16-d`
                  : `bg-surface-tint-d-8`
              }`}
            >
              <div
                className={`${stylesSwap.txCost} ${
                  fromBalancePercent === 75 ? `text-text-1-d` : `text-text-2-d`
                }`}
                onClick={() => {
                  let newValue = 0.75 * fromBalance;
                  setFromValue(newValue);
                  setFromBalancePercent(75);
                }}
              >
                75%
              </div>
            </div>
            <div
              className={`cursor-pointer ${stylesSwap.wrapper} ${
                fromBalancePercent === 100
                  ? `bg-surface-tint-16-d`
                  : `bg-surface-tint-d-8`
              }`}
            >
              <div
                className={`${stylesSwap.txCost} ${
                  fromBalancePercent === 100 ? `text-text-1-d` : `text-text-2-d`
                }`}
                onClick={() => {
                  let newValue = 1 * fromBalance;
                  setFromValue(newValue);
                  setFromBalancePercent(100);
                }}
              >
                100%
              </div>
            </div>
          </div>
        </div>
        <div className={stylesSwap.frameParent4}>
          <div className={stylesSwap.parent}>
            {/* <b className={stylesSwap.b}>􀅈</b> */}
            <img
              className="relative w-5 h-5 shrink-0 overflow-hidden"
              alt=""
              src="/processBar.svg"
            />
            {/* <b className={stylesSwap.eth167771}>1 ETH = 1677.71 USDT</b> */}
            <b
              className={`${stylesSwap.eth167771} ${
                isToLoading
                  ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                  : ''
              }`}
            >
              {isToLoading
                ? ''
                : `${`1 ${fSymbol} = ${
                    userPricesL ? userPricesL?.exchangeRate : '---'
                  }  ${tSymbol}`}`}
            </b>
          </div>
          <div
            className={`cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-180 ${stylesSwap.arrowDownWrapper}`}
            onClick={swapTokensPosition}
          >
            <img
              className={stylesSwap.arrowDownIcon}
              alt=""
              src="/arrowdown.svg"
            />
          </div>
        </div>
        <div className={stylesSwap.frameWrapper}>
          <div className={stylesSwap.frameParent1}>
            <div className={stylesSwap.frameParent2}>
              <div
                className={`cursor-pointer ${stylesSwap.protocolIconGroup}`}
                onClick={() => setIsToTokenPage(true)}
              >
                <img className={stylesSwap.walletIcon} alt="" src={tLogoURI} />
                <div className={`font-medium ${stylesSwap.horiza}`}>
                  {tSymbol}
                </div>
                <img
                  className={stylesSwap.chevronDownIcon}
                  alt=""
                  src="/chevrondown.svg"
                />
              </div>
              {/* <div className={stylesSwap.div1}>3859.042109</div> */}
              <input
                className={`[border:none] font-satoshi font-medium text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
                  isToLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
                    : ''
                }`}
                type="text"
                pattern="[0-9]*.[0-9]*"
                placeholder={isToLoading ? '' : '0.0'}
                // value={isToLoading ? '' : `${tValue}`}
                // value={
                //   (isToLoading && '') ||
                //   (tValue && `${new Intl.NumberFormat().format(tValue)}`)
                // }
                value={(isToLoading && '') || (tValue && `${toInput}`)}
                disabled={true}
              />
            </div>
            <div className={stylesSwap.balance0Parent}>
              <div
                className={`${stylesSwap.balance0} ${
                  isToLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                    : ''
                }`}
              >
                {isToLoading ? '' : `Balance: ${toBalance.toString() || ''}`}
              </div>
              {/* {isPriceDeviation ? (
                    <div
                      className={`${stylesSwap.txCost} ${
                        isToLoading
                          ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                          : ''
                      }`}
                    >
                      {isToLoading
                        ? ''
                        : `~$${
                            userPricesL
                              ? Number(userPricesL?.toPrice) * Number(tValue)
                              : ''
                          } (${priceDeviation ? priceDeviation : ''}%)`}
                    </div>
                  ) : (
                    <div
                      className={`${stylesSwap.txCost} ${
                        isToLoading
                          ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                          : ''
                      }`}
                    >
                      {isToLoading
                        ? ''
                        : `~$${
                            userPricesL
                              ? Number(userPricesL?.toPrice) * Number(tValue)
                              : ''
                          }`}
                    </div>
                  )} */}
              <div className={stylesSwap.txCost}>
                {isToLoading
                  ? ''
                  : `~$${
                      fromPriceData
                        ? new Intl.NumberFormat().format(
                            fromPriceData?.totalFromPrice
                          )
                        : ''
                    }`}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={stylesSwap.frameParent7}>
        <div className={stylesSwap.txCostParent}>
          <div className={stylesSwap.txCost}>Tx cost</div>
          <div className={stylesSwap.div9}>$6.65</div>
        </div>
        <img
          className={stylesSwap.chevronDownIcon}
          alt=""
          src="/chevrondown.svg"
        />
      </div>
      <div className={stylesSwap.connectWalletWrapper}>
        <div className={stylesSwap.connectWallet}>Connect Wallet</div>
      </div> */}
      {/* //============================================================ */}
      {!isConnected && isTxValue ? (
        <>
          <div className={stylesSwapDetail.frameParent7}>
            <div className={stylesSwapDetail.transactionDetailsParent}>
              <div className={stylesSwapDetail.transactionDetails}>
                Transaction details
              </div>
              <img
                className={stylesSwapDetail.chevronDownIcon}
                onClick={() => {
                  setIsTxValue(false);
                }}
                alt=""
                src="/chevronup.svg"
              />
            </div>
            <div className={stylesSwapDetail.usdtPriceParent}>
              <div className={stylesSwapDetail.usdtPrice}>
                1 {fSymbol} price
              </div>
              <div
                className={`${stylesSwapDetail.div9} ${
                  isFromLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                    : ''
                }`}
              >
                {/* ~${fromPriceData ? fromPriceData?.fromPrice : ''} */}{' '}
                {isFromLoading
                  ? ''
                  : `~$${fromPriceData ? fromPriceData?.fromPrice : ''}`}
              </div>
            </div>
            <div className={stylesSwapDetail.usdtPriceParent}>
              <div className={stylesSwapDetail.usdtPrice}>
                1 {tSymbol} price
              </div>
              <div
                className={`${stylesSwapDetail.div9} ${
                  isToLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                    : ''
                }`}
              >
                {/* ~${userPricesL ? userPricesL?.toPrice : ''} */}{' '}
                {isToLoading
                  ? ''
                  : `~$${userPricesL ? userPricesL?.toPrice : ''}`}
              </div>
            </div>
            <div className={stylesSwapDetail.usdtPriceParent}>
              <div className={stylesSwapDetail.txCost}>Tx cost</div>
              {/* <div className={stylesSwapDetail.div9}>$6.65</div> */}
              <div
                className={`${stylesSwapDetail.div9} ${
                  isToLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                    : ''
                }`}
              >
                {' '}
                {isToLoading
                  ? ''
                  : `${
                      userPricesL?.estimatedGas &&
                      (userPricesL?.estimatedGas / 10 ** 9).toString()
                    } Gwei`}
              </div>
            </div>
          </div>
          <div
            className={`button_gradient cursor-pointer ${stylesSwapDetail.connectWalletWrapper}`}
            onClick={() => {
              setIsConnecting(true);
              dispatch(updateConnectedNetwork(true));
            }}
          >
            <div className={`font-medium ${stylesSwapDetail.connectWallet}`}>
              Connect Wallet
            </div>
          </div>
          {/* <div
                className={`cursor-pointer ${stylesSwapDetail.insufficientBalanceWrapper}`}
                onClick={() => {
                  setIsConnecting(true);
                  dispatch(updateConnectedNetwork(true));
                }}
              >
                <div className={`font-medium ${stylesSwapDetail.insufficientBalance}`}>
                  insufficient balance
                </div>
              </div> */}
        </>
      ) : null}
      {!isConnected && !isTxValue ? (
        <>
          <div
            className={stylesSwapTx.frameParent7}
            onClick={() => {
              setIsTxValue(true);
            }}
          >
            <div className={stylesSwapTx.txCostParent}>
              <div className={stylesSwapTx.txCost}>Tx cost</div>
              {/* <div className={stylesSwapTx.div9}>$6.65</div> */}
              <div
                className={`${stylesSwapTx.div9} ${
                  isToLoading
                    ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                    : ''
                }`}
              >
                {' '}
                {isToLoading
                  ? ''
                  : `${
                      userPricesL?.estimatedGas &&
                      (userPricesL?.estimatedGas / 10 ** 9).toString()
                    } Gwei`}
              </div>
            </div>
            <img
              className={stylesSwapTx.chevronDownIcon}
              alt=""
              src="/chevrondown.svg"
            />
          </div>
          <div
            className={`button_gradient cursor-pointer ${stylesSwapTx.connectWalletWrapper}`}
            onClick={() => {
              setIsConnecting(true);
              dispatch(updateConnectedNetwork(true));
            }}
          >
            <div className={`font-medium ${stylesSwapTx.connectWallet}`}>
              Connect Wallet
            </div>
          </div>
        </>
      ) : null}
      {isConnected && !isCaution ? (
        <>
          {validationOwner === true && (
            // <button
            //   className="cursor-pointer [border:none] py-3 px-10 bg-[transparent] self-stretch rounded-xl overflow-hidden flex flex-row items-center justify-center button_gradient"
            //   disabled={fValue === 0 ? true : false}
            //   onClick={() => swapToken()}
            // >
            //   <div className="relative text-lg tracking-[0.02em] leading-[24px] font-text-16-md text-text-1-d text-left">
            //     Swap
            //   </div>
            // </button>

            <div
              className={`button_gradient cursor-pointer ${stylesSwapDetail.connectWalletWrapper}`}
              disabled={fValue === 0 ? true : false}
              onClick={() => swapToken()}
            >
              <div className={`font-medium ${stylesSwapDetail.connectWallet}`}>
                Swap
              </div>
            </div>
          )}
        </>
      ) : null}
      {isConnected && isCaution ? (
        <>
          <button className={styles.insufficientBalanceWrapper}>
            <div className={styles.insufficientBalance}>{info}</div>
          </button>
        </>
      ) : null}
      {isConnected && isPriceDeviation ? (
        <>
          {/* <div className={styles.connectWalletWrapper}>
      <div className={styles.connectWallet}>Connect Wallet</div>
    </div> */}
          <div
            className={`button_gradient cursor-pointer ${stylesSwapTx.connectWalletWrapper}`}
            onClick={() => {
              setIsConnecting(true);
              dispatch(updateConnectedNetwork(true));
            }}
          >
            <div className={`font-medium ${stylesSwapTx.connectWallet}`}>
              Connect Wallet
            </div>
          </div>
          <div className={styles.priceDeviation1373LargeWrapper}>
            <div className={styles.priceDeviation1373}>{` Price Deviation ${priceDeviationPercentage}%. Large price deviation means that you will
              likely trade at a worse price.`}
            </div>
          </div>
        </>
      ) : null}
      {isConnected ? (
        <div className="self-stretch flex flex-col py-0 px-2 items-start justify-start gap-[8px] text-text-1-48-d">
          <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
            <div className="relative tracking-[0.02em] leading-[20px] font-medium">
              Tx cost
            </div>
            <div
              className={`flex-1 relative tracking-[0.02em] leading-[20px] font-medium text-right ${
                isToLoading
                  ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
                  : ''
              }`}
            >
              {isToLoading
                ? ''
                : `${
                    userPricesL?.estimatedGas &&
                    (userPricesL?.estimatedGas / 10 ** 9).toString()
                  } Gwei`}
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
            <button
              className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-sm tracking-[0.02em] leading-[20px] font-medium font-text-16-md text-text-1-48-d text-left inline-block"
              onClick={() => setIsRouting((prev) => !prev)}
            >
              Route
            </button>
            <div className="flex-1 flex flex-row items-center justify-end gap-[4px]">
              <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                {fSymbol}
              </div>
              <img
                className="relative w-3 h-3 shrink-0 overflow-hidden"
                alt=""
                src="/chevronright.svg"
              />
              <div className="relative tracking-[0.02em] leading-[20px] font-medium">
                {tSymbol}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Component11;
