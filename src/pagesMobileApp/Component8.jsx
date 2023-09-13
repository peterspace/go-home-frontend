import stylesFromToken from './Component8.module.css';
import { updateConnecting } from '../redux/features/swap/swapSlice';

import { useConnect } from 'wagmi';
import { useDispatch } from 'react-redux';
//============={Not in use}============================
const Component8 = (props) => {
  const { setIsConnecting, setActiveConnection, activeConnection } = props;
  const dispatch = useDispatch();

  const {
    connect,
    connectors,
    // error: isErrorConnector,
    // isLoading: isLoadingConnector,
    // pendingConnector,
  } = useConnect();

  return (
    <div className={stylesFromToken.frameParent8Custom}>
        <div className={stylesFromToken.connectWalletParent}>
          <div className={stylesFromToken.connectWallet1}>Connect Wallet</div>
          <div
            className={stylesFromToken.iconButton}
            onClick={() => {
              setIsConnecting(false);
              dispatch(updateConnecting(false));
            }}
          >
            <img
              className={stylesFromToken.arrowDownIcon}
              // onClick={() => {
              //   setIsConnecting(false);
              //   dispatch(updateConnecting(false));
              // }}
              alt=""
              src="/xclose3.svg"
            />
          </div>
        </div>
        <div className={stylesFromToken.frameChild} />
        <div className={stylesFromToken.frameParent9}>
          <div
            className={stylesFromToken.walletIconParent}
            onClick={() => {
              connect({ connector: connectors[0] });
              setActiveConnection(connectors[0]);
            }}
          >
            <img
              className={stylesFromToken.walletLinkIcon}
              alt=""
              src="/wallet-icon1.svg"
            />
            <div className={stylesFromToken.metamask}>MetaMask</div>
            {activeConnection?.name === connectors[0]?.name ? (
              <div className={stylesFromToken.ellipseParent}>
                <div className={stylesFromToken.frameItem} />
                <div className={stylesFromToken.txCost}>Connected</div>
              </div>
            ) : (
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/chevronright1.svg"
              />
            )}
          </div>
          <div
            className={stylesFromToken.walletIconParent}
            onClick={() => {
              connect({ connector: connectors[3] });
              setActiveConnection(connectors[3]);
            }}
          >
            <img
              className={stylesFromToken.walletLinkIcon}
              alt=""
              src="/walletlink.svg"
            />
            <div className={stylesFromToken.metamask}>Coinbase Wallet</div>
            {activeConnection?.name === connectors[3]?.name ? (
              <div className={stylesFromToken.ellipseParent}>
                <div className={stylesFromToken.frameItem} />
                <div className={stylesFromToken.txCost}>Connected</div>
              </div>
            ) : (
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/chevronright1.svg"
              />
            )}
          </div>
          <div
            className={stylesFromToken.walletIconParent}
            onClick={() => {
              connect({ connector: connectors[2] });
              setActiveConnection(connectors[2]);
            }}
          >
            <img
              className={stylesFromToken.walletLinkIcon}
              alt=""
              src="/walletconnect.svg"
            />
            <div className={stylesFromToken.metamask}>Wallet Connect</div>
            {activeConnection?.name === connectors[2]?.name ? (
              <div className={stylesFromToken.ellipseParent}>
                <div className={stylesFromToken.frameItem} />
                <div className={stylesFromToken.txCost}>Connected</div>
              </div>
            ) : (
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/chevronright1.svg"
              />
            )}
          </div>
          <div
            className={stylesFromToken.walletIconParent}
            onClick={() => {
              connect({ connector: connectors[4] });
              setActiveConnection(connectors[4]);
            }}
          >
            <img
              className={stylesFromToken.frameIcon}
              alt=""
              src="/frame-1321314394.svg"
            />
            <div className={stylesFromToken.metamask}>Ledger</div>
            {activeConnection?.name === connectors[4]?.name ? (
              <div className={stylesFromToken.ellipseParent}>
                <div className={stylesFromToken.frameItem} />
                <div className={stylesFromToken.txCost}>Connected</div>
              </div>
            ) : (
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/chevronright1.svg"
              />
            )}
          </div>
          <div
            className={stylesFromToken.walletIconParent}
            onClick={() => {
              connect({ connector: connectors[3] });
              setActiveConnection(connectors[3]);
            }}
          >
            <img
              className={stylesFromToken.braveLogoSansText2Icon}
              alt=""
              src="/bravelogosanstext-2.svg"
            />
            <div className={stylesFromToken.metamask}>Brave</div>
            {activeConnection?.name === connectors[3]?.name ? (
              <div className={stylesFromToken.ellipseParent}>
                <div className={stylesFromToken.frameItem} />
                <div className={stylesFromToken.txCost}>Connected</div>
              </div>
            ) : (
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/chevronright1.svg"
              />
            )}
          </div>
        </div>
        <div className={stylesFromToken.checkboxParent}>
          <div className={stylesFromToken.checkbox}>
            <img
              className={stylesFromToken.checkIcon}
              alt=""
              src="/check.svg"
            />
          </div>
          <div className={stylesFromToken.metamask}>
            <span>{`I have read, understand, and agree to the `}</span>
            <span className={stylesFromToken.termsOfService}>
              Terms of Service
            </span>
          </div>
        </div>
      </div>
  );
};

export default Component8;
