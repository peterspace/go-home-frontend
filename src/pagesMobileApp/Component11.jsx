// import stylesSwapMobile from './Component11.module.css';
// import stylesSwapMobileDetail from './Component9.module.css';
// import Header from './Header';
// import { updateConnectedNetwork } from '../redux/features/swap/swapSlice';
// import { useDispatch } from 'react-redux';

// const Component11 = (props) => {
//   const dispatch = useDispatch();
//   const {
//     setIsSlippagePage,
//     fLogoURI,
//     fSymbol,
//     isFromLoading,
//     fValue,
//     onFromValueChanged,
//     fromBalance,
//     fromPriceData,
//     fromBalancePercent,
//     setFromValue,
//     setFromBalancePercent,
//     userPricesL,
//     tSymbol,
//     swapTokensPosition,
//     setIsToTokenPage,
//     tLogoURI,
//     isToLoading,
//     tValue,
//     toInput,
//     toBalance,
//     isConnected,
//     isTxValue,
//     setIsTxValue,
//     setIsConnecting,
//     isCaution,
//     validationOwner,
//     swapToken,
//     setIsFromTokenPage,
//     priceDeviation,
//     setIsRouting,
//     isPriceDeviation,
//     info,
//   } = props;
//   return (
//     <div className={stylesSwapMobile.div}>
//       <div className={stylesSwapMobile.child} />
//       <div className={stylesSwapMobile.item} />
//       <div className={stylesSwapMobile.inner} />
//       <div className={stylesSwapMobile.ellipseDiv} />
//       <Header />
//       <div className={stylesSwapMobile.frameGroup}>
//         <div className={stylesSwapMobile.swapParent}>
//           <div className={stylesSwapMobile.swap}>Swap</div>
//           <img
//             className={`cursor-pointer ${stylesSwapMobile.settings04Icon}`}
//             onClick={() => {
//               setIsSlippagePage(true);
//             }}
//             alt=""
//             src="/settings04.svg"
//           />
//         </div>
//         <div className={stylesSwapMobile.frameContainer}>
//           <div className={stylesSwapMobile.frameDiv}>
//             <div className={stylesSwapMobile.frameParent1}>
//               <div className={stylesSwapMobile.frameParent2}>
//                 <div
//                   className={`cursor-pointer ${stylesSwapMobile.protocolIconGroup}`}
//                   onClick={() => setIsFromTokenPage(true)}
//                 >
//                   <img
//                     className={stylesSwapMobile.protocolIcon}
//                     alt=""
//                     src={fLogoURI}
//                   />
//                   <div className={`font-medium ${stylesSwapMobile.horiza}`}>
//                     {fSymbol}
//                   </div>
//                   <img
//                     className={stylesSwapMobile.chevronDownIcon}
//                     alt=""
//                     src="/chevrondown.svg"
//                   />
//                 </div>
//                 {/* <div className={stylesSwapMobile.div1}>3859.042109</div> */}
//                 <input
//                   className={`[border:none] font-satoshi font-medium  text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
//                     isFromLoading
//                       ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
//                       : ''
//                   }`}
//                   type="text"
//                   pattern="[0-9]*.[0-9]*"
//                   placeholder={isFromLoading ? '' : '0.0'}
//                   value={isFromLoading ? '' : `${fValue}`}
//                   onChange={onFromValueChanged}
//                 />
//               </div>

//               <div className={stylesSwapMobile.balance0Parent}>
//                 {/* <div className={stylesSwapMobile.transactionDetails}>Balance: 0</div> */}
//                 <div
//                   className={`${stylesSwapMobile.balance0} ${
//                     isFromLoading
//                       ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                       : ''
//                   }`}
//                 >
//                   {isFromLoading
//                     ? ''
//                     : `Balance: ${fromBalance.toString() || ''}`}
//                 </div>
//                 {/* <div className={stylesSwapMobile.txCost}>~$1432.54</div> */}
//                 <div className={stylesSwapMobile.txCost}>
//                   {isFromLoading
//                     ? ''
//                     : `~$${
//                         fromPriceData
//                           ? new Intl.NumberFormat().format(
//                               fromPriceData?.totalFromPrice
//                             )
//                           : ''
//                       }`}
//                 </div>
//               </div>
//             </div>
//             <div className={stylesSwapMobile.frameParent3}>
//               <div
//                 className={`cursor-pointer ${stylesSwapMobile.wrapper} ${
//                   fromBalancePercent === 25
//                     ? `bg-surface-tint-16-d`
//                     : `bg-surface-tint-d-8`
//                 }`}
//               >
//                 <div
//                   className={`${stylesSwapMobile.txCost} ${
//                     fromBalancePercent === 25
//                       ? `text-text-1-d`
//                       : `text-text-2-d`
//                   }`}
//                   onClick={() => {
//                     let newValue = 0.25 * fromBalance;
//                     setFromValue(newValue);
//                     setFromBalancePercent(25);
//                   }}
//                 >
//                   25%
//                 </div>
//               </div>
//               <div
//                 className={`cursor-pointer ${stylesSwapMobile.wrapper} ${
//                   fromBalancePercent === 50
//                     ? `bg-surface-tint-16-d`
//                     : `bg-surface-tint-d-8`
//                 }`}
//               >
//                 <div
//                   className={`${stylesSwapMobile.txCost} ${
//                     fromBalancePercent === 50
//                       ? `text-text-1-d`
//                       : `text-text-2-d`
//                   }`}
//                   onClick={() => {
//                     let newValue = 0.5 * fromBalance;
//                     setFromValue(newValue);
//                     setFromBalancePercent(50);
//                   }}
//                 >
//                   50%
//                 </div>
//               </div>
//               <div
//                 className={`cursor-pointer ${stylesSwapMobile.wrapper} ${
//                   fromBalancePercent === 75
//                     ? `bg-surface-tint-16-d`
//                     : `bg-surface-tint-d-8`
//                 }`}
//               >
//                 <div
//                   className={`${stylesSwapMobile.txCost} ${
//                     fromBalancePercent === 75
//                       ? `text-text-1-d`
//                       : `text-text-2-d`
//                   }`}
//                   onClick={() => {
//                     let newValue = 0.75 * fromBalance;
//                     setFromValue(newValue);
//                     setFromBalancePercent(75);
//                   }}
//                 >
//                   75%
//                 </div>
//               </div>
//               <div
//                 className={`cursor-pointer ${stylesSwapMobile.wrapper} ${
//                   fromBalancePercent === 100
//                     ? `bg-surface-tint-16-d`
//                     : `bg-surface-tint-d-8`
//                 }`}
//               >
//                 <div
//                   className={`${stylesSwapMobile.txCost} ${
//                     fromBalancePercent === 100
//                       ? `text-text-1-d`
//                       : `text-text-2-d`
//                   }`}
//                   onClick={() => {
//                     let newValue = 1 * fromBalance;
//                     setFromValue(newValue);
//                     setFromBalancePercent(100);
//                   }}
//                 >
//                   100%
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={stylesSwapMobile.frameParent4}>
//             <div className={stylesSwapMobile.parent}>
//               {/* <b className={stylesSwapMobile.b}>􀅈</b> */}
//               <img
//                 className="relative w-5 h-5 shrink-0 overflow-hidden"
//                 alt=""
//                 src="/processBar.svg"
//               />
//               {/* <b className={stylesSwapMobile.eth167771}>1 ETH = 1677.71 USDT</b> */}
//               <b
//                 className={`${stylesSwapMobile.eth167771} ${
//                   isToLoading
//                     ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                     : ''
//                 }`}
//               >
//                 {isToLoading
//                   ? ''
//                   : `${`1 ${fSymbol} = ${
//                       userPricesL ? userPricesL?.exchangeRate : '---'
//                     }  ${tSymbol}`}`}
//               </b>
//             </div>
//             <div
//               className={`cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-180 ${stylesSwapMobile.arrowDownWrapper}`}
//               onClick={swapTokensPosition}
//             >
//               <img
//                 className={stylesSwapMobile.arrowDownIcon}
//                 alt=""
//                 src="/arrowdown.svg"
//               />
//             </div>
//           </div>
//           <div className={stylesSwapMobile.frameWrapper}>
//             <div className={stylesSwapMobile.frameParent1}>
//               <div className={stylesSwapMobile.frameParent2}>
//                 <div
//                   className={`cursor-pointer ${stylesSwapMobile.protocolIconGroup}`}
//                   onClick={() => setIsToTokenPage(true)}
//                 >
//                   <img
//                     className={stylesSwapMobile.walletIcon}
//                     alt=""
//                     src={tLogoURI}
//                   />
//                   <div className={`font-medium ${stylesSwapMobile.horiza}`}>
//                     {tSymbol}
//                   </div>
//                   <img
//                     className={stylesSwapMobile.chevronDownIcon}
//                     alt=""
//                     src="/chevrondown.svg"
//                   />
//                 </div>
//                 {/* <div className={stylesSwapMobile.div1}>3859.042109</div> */}
//                 <input
//                   className={`[border:none] font-satoshi font-medium text-5xl bg-[transparent] flex-1 relative tracking-[0.02em] leading-[32px] text-text-1-d text-right ${
//                     isToLoading
//                       ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[24px]'
//                       : ''
//                   }`}
//                   type="text"
//                   pattern="[0-9]*.[0-9]*"
//                   placeholder={isToLoading ? '' : '0.0'}
//                   // value={isToLoading ? '' : `${tValue}`}
//                   // value={
//                   //   (isToLoading && '') ||
//                   //   (tValue && `${new Intl.NumberFormat().format(tValue)}`)
//                   // }
//                   value={(isToLoading && '') || (tValue && `${toInput}`)}
//                   disabled={true}
//                 />
//               </div>
//               <div className={stylesSwapMobile.balance0Parent}>
//                 <div
//                   className={`${stylesSwapMobile.balance0} ${
//                     isToLoading
//                       ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                       : ''
//                   }`}
//                 >
//                   {isToLoading ? '' : `Balance: ${toBalance.toString() || ''}`}
//                 </div>
//                 {/* {isPriceDeviation ? (
//                     <div
//                       className={`${stylesSwapMobile.txCost} ${
//                         isToLoading
//                           ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                           : ''
//                       }`}
//                     >
//                       {isToLoading
//                         ? ''
//                         : `~$${
//                             userPricesL
//                               ? Number(userPricesL?.toPrice) * Number(tValue)
//                               : ''
//                           } (${priceDeviation ? priceDeviation : ''}%)`}
//                     </div>
//                   ) : (
//                     <div
//                       className={`${stylesSwapMobile.txCost} ${
//                         isToLoading
//                           ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                           : ''
//                       }`}
//                     >
//                       {isToLoading
//                         ? ''
//                         : `~$${
//                             userPricesL
//                               ? Number(userPricesL?.toPrice) * Number(tValue)
//                               : ''
//                           }`}
//                     </div>
//                   )} */}
//                 <div className={stylesSwapMobile.txCost}>
//                   {isToLoading
//                     ? ''
//                     : `~$${
//                         fromPriceData
//                           ? new Intl.NumberFormat().format(
//                               fromPriceData?.totalFromPrice
//                             )
//                           : ''
//                       }`}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <div className={stylesSwapMobile.frameParent7}>
//         <div className={stylesSwapMobile.txCostParent}>
//           <div className={stylesSwapMobile.txCost}>Tx cost</div>
//           <div className={stylesSwapMobile.div9}>$6.65</div>
//         </div>
//         <img
//           className={stylesSwapMobile.chevronDownIcon}
//           alt=""
//           src="/chevrondown.svg"
//         />
//       </div>
//       <div className={stylesSwapMobile.connectWalletWrapper}>
//         <div className={stylesSwapMobile.connectWallet}>Connect Wallet</div>
//       </div> */}
//         {/* //============================================================ */}
//         {!isConnected && isTxValue ? (
//           <>
//             <div className={stylesSwapMobileDetail.frameParent7}>
//               <div className={stylesSwapMobileDetail.transactionDetailsParent}>
//                 <div className={stylesSwapMobileDetail.transactionDetails}>
//                   Transaction details
//                 </div>
//                 <img
//                   className={stylesSwapMobileDetail.chevronDownIcon}
//                   onClick={() => {
//                     setIsTxValue(false);
//                   }}
//                   alt=""
//                   src="/chevronup.svg"
//                 />
//               </div>
//               <div className={stylesSwapMobileDetail.usdtPriceParent}>
//                 <div className={stylesSwapMobileDetail.usdtPrice}>
//                   1 {fSymbol} price
//                 </div>
//                 <div
//                   className={`${stylesSwapMobileDetail.div9} ${
//                     isFromLoading
//                       ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                       : ''
//                   }`}
//                 >
//                   {/* ~${fromPriceData ? fromPriceData?.fromPrice : ''} */}{' '}
//                   {isFromLoading
//                     ? ''
//                     : `~$${fromPriceData ? fromPriceData?.fromPrice : ''}`}
//                 </div>
//               </div>
//               <div className={stylesSwapMobileDetail.usdtPriceParent}>
//                 <div className={stylesSwapMobileDetail.usdtPrice}>
//                   1 {tSymbol} price
//                 </div>
//                 <div
//                   className={`${stylesSwapMobileDetail.div9} ${
//                     isToLoading
//                       ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                       : ''
//                   }`}
//                 >
//                   {/* ~${userPricesL ? userPricesL?.toPrice : ''} */}{' '}
//                   {isToLoading
//                     ? ''
//                     : `~$${userPricesL ? userPricesL?.toPrice : ''}`}
//                 </div>
//               </div>
//               <div className={stylesSwapMobileDetail.usdtPriceParent}>
//                 <div className={stylesSwapMobileDetail.txCost}>Tx cost</div>
//                 {/* <div className={stylesSwapMobileDetail.div9}>$6.65</div> */}
//                 <div
//                   className={`${stylesSwapMobileDetail.div9} ${
//                     isToLoading
//                       ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                       : ''
//                   }`}
//                 >
//                   {' '}
//                   {isToLoading
//                     ? ''
//                     : `${
//                         userPricesL?.estimatedGas &&
//                         (userPricesL?.estimatedGas / 10 ** 9).toString()
//                       } Gwei`}
//                 </div>
//               </div>
//             </div>
//             <div
//               className={`button_gradient cursor-pointer ${stylesSwapMobileDetail.connectWalletWrapper}`}
//               onClick={() => {
//                 setIsConnecting(true);
//                 dispatch(updateConnectedNetwork(true));
//               }}
//             >
//               <div
//                 className={`font-medium ${stylesSwapMobileDetail.connectWallet}`}
//               >
//                 Connect Wallet
//               </div>
//             </div>
//             {/* <div
//                 className={`cursor-pointer ${stylesSwapMobileDetail.insufficientBalanceWrapper}`}
//                 onClick={() => {
//                   setIsConnecting(true);
//                   dispatch(updateConnectedNetwork(true));
//                 }}
//               >
//                 <div className={`font-medium ${stylesSwapMobileDetail.insufficientBalance}`}>
//                   insufficient balance
//                 </div>
//               </div> */}
//           </>
//         ) : null}
//         {!isConnected && !isTxValue ? (
//           <>
//             <div
//               className={stylesSwapMobile.frameParent7}
//               onClick={() => {
//                 setIsTxValue(true);
//               }}
//             >
//               <div className={stylesSwapMobile.txCostParent}>
//                 <div className={stylesSwapMobile.txCost}>Tx cost</div>
//                 {/* <div className={stylesSwapMobile.div9}>$6.65</div> */}
//                 <div
//                   className={`${stylesSwapMobile.div9} ${
//                     isToLoading
//                       ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                       : ''
//                   }`}
//                 >
//                   {' '}
//                   {isToLoading
//                     ? ''
//                     : `${
//                         userPricesL?.estimatedGas &&
//                         (userPricesL?.estimatedGas / 10 ** 9).toString()
//                       } Gwei`}
//                 </div>
//               </div>
//               <img
//                 className={stylesSwapMobile.chevronDownIcon}
//                 alt=""
//                 src="/chevrondown.svg"
//               />
//             </div>
//             <div
//               className={`button_gradient cursor-pointer ${stylesSwapMobile.connectWalletWrapper}`}
//               onClick={() => {
//                 setIsConnecting(true);
//                 dispatch(updateConnectedNetwork(true));
//               }}
//             >
//               <div className={`font-medium ${stylesSwapMobile.connectWallet}`}>
//                 Connect Wallet
//               </div>
//             </div>
//           </>
//         ) : null}
//         {isConnected && !isCaution ? (
//           <>
//             {validationOwner === true && (
//               // <button
//               //   className="cursor-pointer [border:none] py-3 px-10 bg-[transparent] self-stretch rounded-xl overflow-hidden flex flex-row items-center justify-center button_gradient"
//               //   disabled={fValue === 0 ? true : false}
//               //   onClick={() => swapToken()}
//               // >
//               //   <div className="relative text-lg tracking-[0.02em] leading-[24px] font-text-16-md text-text-1-d text-left">
//               //     Swap
//               //   </div>
//               // </button>

//               <div
//                 className={`button_gradient cursor-pointer ${stylesSwapMobileDetail.connectWalletWrapper}`}
//                 disabled={fValue === 0 ? true : false}
//                 onClick={() => swapToken()}
//               >
//                 <div
//                   className={`font-medium ${stylesSwapMobileDetail.connectWallet}`}
//                 >
//                   Swap
//                 </div>
//               </div>
//             )}
//           </>
//         ) : null}
//         {isConnected && isCaution ? (
//           <>
//             <button
//               className={stylesSwapMobileDetail.insufficientBalanceWrapper}
//             >
//               <div className={stylesSwapMobileDetail.insufficientBalance}>
//                 {info}
//               </div>
//             </button>
//           </>
//         ) : null}
//         {isConnected && isPriceDeviation ? (
//           <>
//             {/* <div className={styles.connectWalletWrapper}>
//       <div className={styles.connectWallet}>Connect Wallet</div>
//     </div> */}
//             <div
//               className={`button_gradient cursor-pointer ${stylesSwapMobile.connectWalletWrapper}`}
//               onClick={() => {
//                 setIsConnecting(true);
//                 dispatch(updateConnectedNetwork(true));
//               }}
//             >
//               <div className={`font-medium ${stylesSwapMobile.connectWallet}`}>
//                 Connect Wallet
//               </div>
//             </div>
//             <div
//               className={stylesSwapMobileDetail.priceDeviation1373LargeWrapper}
//             >
//               <div className={stylesSwapMobileDetail.priceDeviation1373}>
//                 {` Price Deviation ${priceDeviation}%. Large price deviation means that you will
//               likely trade at a worse price.`}
//               </div>
//             </div>
//           </>
//         ) : null}
//         {isConnected ? (
//           <div className="self-stretch flex flex-col py-0 px-2 items-start justify-start gap-[8px] text-text-1-48-d">
//             <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
//               <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                 Tx cost
//               </div>
//               <div
//                 className={`flex-1 relative tracking-[0.02em] leading-[20px] font-medium text-right ${
//                   isToLoading
//                     ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
//                     : ''
//                 }`}
//               >
//                 {isToLoading
//                   ? ''
//                   : `${
//                       userPricesL?.estimatedGas &&
//                       (userPricesL?.estimatedGas / 10 ** 9).toString()
//                     } Gwei`}
//               </div>
//             </div>
//             <div className="self-stretch flex flex-row items-start justify-start gap-[24px]">
//               <button
//                 className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-sm tracking-[0.02em] leading-[20px] font-medium font-text-16-md text-text-1-48-d text-left inline-block"
//                 onClick={() => setIsRouting((prev) => !prev)}
//               >
//                 Route
//               </button>
//               <div className="flex-1 flex flex-row items-center justify-end gap-[4px]">
//                 <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                   {fSymbol}
//                 </div>
//                 <img
//                   className="relative w-3 h-3 shrink-0 overflow-hidden"
//                   alt=""
//                   src="/chevronright.svg"
//                 />
//                 <div className="relative tracking-[0.02em] leading-[20px] font-medium">
//                   {tSymbol}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default Component11;
