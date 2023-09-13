import stylesManageToken from './Component4.module.css';
import stylesFromToken from './Component6.module.css';

import {
  updateConnectedNetwork,
  updateIsChangeChainId,
} from '../redux/features/swap/swapSlice';
import { useAccount, useSwitchNetwork } from 'wagmi';
import { networksOptions } from '../constants';
import { useDispatch } from 'react-redux';

// SWITCH NETWORK 
const Component4Network = (props) => {
  const dispatch = useDispatch();
  const { switchNetwork } = useSwitchNetwork();
  const { isConnected } = useAccount();
  //======{Manage Tokens}===========================

  const { setIsChainModalVisible, setChain, chain } =
    props;

  return (
  
        <div className={stylesManageToken.frameParent7Custom}>
          <div className={stylesManageToken.iconButtonParent}>
            <div
              className={`cursor-pointer hover:bg-secondaryFillLight ${stylesManageToken.iconButton} `}
              onClick={() => {
                setIsChainModalVisible(false);
                dispatch(updateConnectedNetwork(false));
              }}
            >
              <img
                className={stylesManageToken.arrowDownIcon}
                alt=""
                src="/chevronleft.svg"
              />
            </div>
            <div className={stylesManageToken.manage}>Select Network</div>
            <div
              className={`cursor-pointer hover:bg-secondaryFillLight ${stylesManageToken.iconButton} `}
              onClick={() => {
                setIsChainModalVisible(false);
                dispatch(updateConnectedNetwork(false));
              }}
            >
              <img
                className={stylesManageToken.arrowDownIcon}
                alt=""
                src="/xclose1.svg"
              />
            </div>
          </div>
          <div className={stylesManageToken.frameChild} />

          <div
                className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent9}`}
              >
                {isConnected ? (
                  <div className={stylesFromToken.frameParent10}>
                    {networksOptions?.map((c, idx) => (
                      <div
                        key={idx}
                        className={`cursor-pointer ${stylesFromToken.mdImageContainer} hover:bg-secondaryFill`}
                        onClick={() => {
                          switchNetwork(c.id);
                          setChain(c);
                          setIsChainModalVisible(false);
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
                          className={stylesFromToken.protocolIcon3}
                          alt=""
                          src={c?.logoURI}
                        />
                        <div className={stylesFromToken.ethereumParent}>
                          <div className={stylesFromToken.ethereum}>
                            {c?.name}
                          </div>
                          <div className={stylesFromToken.eth3}>
                            {c?.chainSymbol}
                          </div>
                        </div>
                        <span className="justify-start items-start mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#9D9DA3"
                            className={`w-5 h-5 hover:stroke-infoText active:fill-infoText ${
                              c?.name === chain?.name
                                ? 'stroke-infoText'
                                : 'stroke-secondaryText'
                            } ${c?.name === chain?.name && 'fill-infoText'}`}
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
                  <div className={stylesFromToken.frameParent10}>
                    {networksOptions?.map((c, idx) => (
                      <div
                        key={idx}
                        className={`cursor-pointer ${stylesFromToken.mdImageContainer} hover:bg-secondaryFill`}
                        onClick={() => {
                          setChain(c);
                          setIsChainModalVisible(false);
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
                          className={stylesFromToken.protocolIcon3}
                          alt=""
                          src={c?.logoURI}
                        />
                        <div className={stylesFromToken.ethereumParent}>
                          <div className={stylesFromToken.ethereum}>
                            {c?.name}
                          </div>
                          <div className={stylesFromToken.eth3}>
                            {c?.chainSymbol}
                          </div>
                        </div>
                        <span className="justify-start items-start mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#9D9DA3"
                            className={`w-5 h-5 hover:stroke-infoText active:fill-infoText ${
                              c?.name === chain?.name
                                ? 'stroke-infoText'
                                : 'stroke-secondaryText'
                            } ${c?.name === chain?.name && 'fill-infoText'}`}
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
    
  );
};

export default Component4Network;
