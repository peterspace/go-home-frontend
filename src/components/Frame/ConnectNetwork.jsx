import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateConnectedNetwork, updateIsChangeChainId, updateConnecting} from '../../redux/features/swap/swapSlice';
import { networksOptions } from '../../constants';
import { useAccount, useSwitchNetwork } from 'wagmi';
import stylesFromToken from './FromTokenList.module.css';

// SWITCH NETWORK 
export const ConnectNetwork = (props) => {

    // const isChainChange = localStorage.getItem('chainSwitch')
    // ? JSON.parse(localStorage.getItem('chainSwitch'))
    // : false;


    const dispatch = useDispatch();
    const { switchNetwork } = useSwitchNetwork();
    const { isConnected } = useAccount();
    //======{Manage Tokens}===========================
  
    const { isChainModalVisible, setIsChainModalVisible, setChain, chain } =
      props;

  
  return (
    <div>
        {isChainModalVisible ? (
            <>
              <div className={stylesFromToken.frameContainer}>
                <div className={stylesFromToken.selectATokenParent}>
                  <div className={stylesFromToken.selectAToken}>
                    Select a Network
                  </div>
                  <div
                    className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
                  >
                    <img
                      className={stylesFromToken.xCloseIcon}
                      onClick={() => {
                        setIsChainModalVisible(false);
                        dispatch(updateConnectedNetwork(false));
                      }}
                      alt=""
                      src="/xclose.svg"
                    />
                  </div>
                </div>
                <div className={stylesFromToken.frameChild} />
                <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[8px] overflow-y-auto">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
                    {isConnected ? (
                      <div className="self-stretch">
                        {networksOptions?.map((c, idx) => (
                          <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
                            <div
                              className="px-3 py-2 w-full flex flex-row gap-4"
                              key={idx}
                              onClick={() => {
                                switchNetwork(c.id);
                                setChain(c);
                                setIsChainModalVisible(false);
                                localStorage.setItem('chain', JSON.stringify(c)); // new
                                localStorage.setItem(
                                  'chainSwitch',
                                  JSON.stringify(true)
                                );

                                // localStorage.setItem('chain', JSON.stringify(c));
                                dispatch(updateIsChangeChainId(true));
                                dispatch(updateConnectedNetwork(false));
                              }}
                            >
                              <img
                                src={c.logoURI}
                                alt="logo"
                                className="w-8 h-8"
                              />

                              <div className="flex flex-col">
                                <span className="text-xs text-primaryText">
                                  {c?.name}
                                </span>
                                <span className="text-xs text-secondaryText">
                                  {c?.chainSymbol}
                                </span>
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
                                  c === chain
                                    ? 'stroke-infoText fill-infoText'
                                    : 'stroke-secondaryText'
                                }`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="self-stretch">
                        {networksOptions?.map((c, idx) => (
                          <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
                            <div
                              className="px-3 py-2 w-full flex flex-row gap-4"
                              key={idx}
                              onClick={() => {
                                setChain(c);
                                setIsChainModalVisible(false);

                                localStorage.setItem(
                                  'chainSwitch',
                                  JSON.stringify(true)
                                );
                                dispatch(updateIsChangeChainId(true));
                                dispatch(updateConnectedNetwork(false));
                              }}
                            >
                              <img
                                src={c.logoURI}
                                alt="logo"
                                className="w-8 h-8"
                              />

                              <div className="flex flex-col">
                                <span className="text-xs text-primaryText">
                                  {c?.name}
                                </span>
                                <span className="text-xs text-secondaryText">
                                  {c?.chainSymbol}
                                </span>
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
                                  c === chain
                                    ? 'stroke-infoText fill-infoText'
                                    : 'stroke-secondaryText'
                                }`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : null}
    </div>
  )
}
