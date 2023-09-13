import { useState, useEffect, Suspense } from 'react';

import { toast } from 'react-toastify';
// import { useSendTransaction, useWaitForTransaction } from 'wagmi';

//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================

//========={importing Page}======================================

//=========={Styles}======================
import stylesSlippage from './Slippage.module.css';
import stylesFromToken from './FromTokenList.module.css';
import stylesSwap from './Swap.module.css';
import stylesSwapTx from './SwapTransact.module.css';

//======{new}========================

// import Modal from '../Modal';
import Spinner from '../Spinner';

import { updateTransactionById } from '../../redux/api/api';
import StatusCompleted from './status/StatusCompleted';
import StatusInprogress from './status/StatusInprogress';
import StatusDeposited from './status/StatusDeposited';

//============{Styles}=======================
const ActiveTransaction = (props) => {
  const {
    isHome,
    setIsExchangingActive,
    blockchainTransactionData,
    isActiveBlockchain,
    setIsProfile,
    setIsGroupChat,
    setIsHome,
    setIsActiveBlockchain,
    setIsAllChats,
  } = props;
  // const { setIsExchangingActive, managerId, managerWalletAddress } = props;

  // let managerId = '64df7191b6e27468d515e929';
  // let managerWalletAddress = '0x05301d500C789bd59aC307Bef714d10EbF22C1e3';
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const chats = localStorage.getItem('chats')
    ? JSON.parse(localStorage.getItem('chats'))
    : null;

  const transactionData = blockchainTransactionData;

  console.log({ transactionData: transactionData });

  const [transferStatus, setTransferStatus] = useState({
    status: '',
    message: '',
  });

  //==={User updates status to inProgress}
  const updateTransaction = async () => {
    if (transactionData) {
      const userData = {
        id: transactionData?._id,
        status: 'InProgress',
      };
      const data = await updateTransactionById(userData);
      if (data) {
        console.log({ userTransactionInfo: data });
        // setTransactionData(data);
      }
    }
  };

  //==={User updates status to completed}
  const updateTransactionCompleted = async () => {
    if (transactionData) {
      const userData = {
        id: transactionData?._id,
        status: 'Completed',
      };
      const data = await updateTransactionById(userData);
      if (data) {
        console.log({ userTransactionInfo: data });
        // setTransactionData(data);
      }
    }
  };

  //=================={Create Transaction in database}=====================

  /****************************************************************************************************
   * **************************************************************************************************
   *  *  * *******************************                      ***************************************
   *  * ***********************************{Confirmations Block}***************************************
   *  *  * *******************************                      ***************************************
   *  * **************************************************************************************************
   */

  const activeTransactionData = (
    <div
      className={`outline outline-[var(--color-slateblue)] bg-[var(--color-gray-400-z)] rounded-lg ${stylesSwap.frameGroupCustom}`}
    >
      <div className={stylesFromToken.selectATokenParent}>
        <div className={stylesFromToken.selectAToken}>Transaction Summary</div>
        <div className={`text-[14px] ${stylesFromToken.selectAToken}`}>
          Please click completed if the transaction has ended sucessfully
        </div>
        <div className="transition-transform duration-300 hover:scale-125 cursor-pointer flex flex-row justify-center items-center p-1 rounded-lg bg-gray-300 hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#130D1A"
            className="w-5 h-5"
            // onClick={() => {
            //   setIsActiveBlockchain(false); // set as false
            // }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className={stylesFromToken.frameChild} />
      <div className="">
        <p className="">{`progress Bar`}</p>
      </div>
      <div className="mt-2 flex flex-col gap-2 px-1 p-y-1 outline outline-[var(--color-slateblue)] rounded-lg">
        <p className="">{`orderNo: ${transactionData?.orderNo}`}</p>
        {/* <p className="">{`fromToken: ${transactionData?.fromSymbol}`}</p>
        <p className="">{`toToken: ${transactionData?.toSymbol}`}</p> */}
        <p className="">{`you send: ${Number(
          transactionData?.fromValue
        ).toFixed(2)} ${transactionData?.fromSymbol}`}</p>
        <p className="">{`you get: ${Number(transactionData?.toValue).toFixed(
          2
        )} ${transactionData?.toSymbol}`}</p>
      </div>
      <>
        {!transferStatus.status && (
          <>
            <div className="flex flex-row gap-2">
              <div
                className="mb-6 mt-4 cursor-pointer shadow-lg outline-none border gap-2 [border:none] py-6 px-10 self-stretch rounded overflow-hidden flex flex-row items-center justify-center bg-infoFill text-text-2-d"
                disabled={
                  !transferStatus.status === 'inprogress' ? true : false
                }
                onClick={() => {
                  updateTransactionCompleted();
                  setIsActiveBlockchain(false);
                  setIsAllChats(false);
                  setIsProfile(false);
                  setIsGroupChat(false);
                  setIsHome(true);
                }}
              >
                <div
                  className={`font-medium text-text-2-d ${stylesSwapTx.connectWallet}`}
                >
                  {transferStatus.status !== 'inprogress' ? (
                    'Complete'
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );

  /****************************************************************************************************
   * **************************************************************************************************
   *  *  * *******************************                      ***************************************
   *  * ***********************************{Confirmations Block}***************************************
   *  *  * *******************************                      ***************************************
   *  * **************************************************************************************************
   */

  //==={Incase the user fails to click okay}
  // useEffect(() => {
  //   if (isActiveBlockchain && transactionData?.status === 'Active') {
  //     setTimeout(() => {
  //       updateTransaction();
  //     }, 60000);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isActiveBlockchain]);

  return (
    <>
      {/* ==============================={Desktop View}====================================== */}
      {/* ================================{FIRST ADMIN's MESSAGE: That crypto payment by user has been confirmed for buy crypto option only! add that confirmation could take about 20 mins max}===================================== */}
      {/* ================================{MATCHING WITH DELIVERY GUY}===================================== */}
      {isActiveBlockchain ? (
        <>
          {/* ================================{Here client will confirm transaction as inProgress}===================================== */}

          {transactionData && transactionData?.status === 'Active' ? (
            // <div
            //   className={`outline outline-outlineSwap ${stylesSwap.frameGroupCustom}`}
            // >
            //  <StatusDeposited />
            // </div>
            <StatusDeposited
              orderNo={transactionData?.orderNo}
              updateTransaction={updateTransaction}
            />
          ) : null}
          {/* ================================{Here client will confirm transaction completed}===================================== */}

          {/* {transactionData && transactionData?.status === 'InProgress' ? (
            <>{activeTransactionData}</>
          ) : null} */}
          {transactionData && transactionData?.status === 'InProgress' ? (
            <>
              <StatusInprogress
                orderNo={transactionData?.orderNo}
                updateTransactionCompleted={updateTransactionCompleted}
                setIsActiveBlockchain={setIsActiveBlockchain}
                setIsAllChats={setIsAllChats}
                setIsProfile={setIsProfile}
                setIsGroupChat={setIsGroupChat}
                setIsHome={setIsHome}
              />
            </>
          ) : null}

          {transactionData && transactionData?.status === 'Completed' ? (
            <>
              <StatusCompleted
                orderNo={transactionData?.orderNo}
                setIsActiveBlockchain={setIsActiveBlockchain}
                setIsAllChats={setIsAllChats}
                setIsProfile={setIsProfile}
                setIsGroupChat={setIsGroupChat}
                setIsHome={setIsHome}
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default ActiveTransaction;
