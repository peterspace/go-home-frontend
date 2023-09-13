import stylesNetworkBalance from './Component7.module.css';
import { Link } from 'react-router-dom';
import { useDisconnect } from 'wagmi';
//======{DBalance Network}===============================

const Component7 = (props) => {
  const { disconnect } = useDisconnect();

  const { isBalanceLoading, balance, chainSymbol, chainUsdBalance, address } =
    props;
  return (
    <div className={`mt-[243px] ${stylesNetworkBalance.frameParent7}`}>
    <div className={stylesNetworkBalance.frameParent8}>
      <div className={stylesNetworkBalance.walletIconParent}>
        <img
          className={stylesNetworkBalance.mdImageIcon}
          alt=""
          src="/wallet-icon.svg"
        />
        <div className={stylesNetworkBalance.connectedWithMetamask}>
          Connected with MetaMask
        </div>
      </div>
      <Link
        className={`cursor-pointer hover:bg-secondaryFillLight ${stylesNetworkBalance.iconButton}`}
        to="/"
      >
        <img
          className={stylesNetworkBalance.arrowDownIcon}
          alt=""
          src="/xclose3.svg"
        />
      </Link>
    </div>
    <div className={stylesNetworkBalance.ethGroup}>
      {/* <div className={stylesNetworkBalance.eth2}>1.56 ETH</div>
      <div className={stylesNetworkBalance.div10}>~$1432.54</div> */}

      <div
        className={`${stylesNetworkBalance.eth2} ${
          isBalanceLoading
            ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[44px]'
            : ''
        }`}
      >
        {isBalanceLoading ? '' : `${balance} ${chainSymbol}`}
      </div>
      <div
        className={`${stylesNetworkBalance.div10} ${
          isBalanceLoading
            ? 'rounded-lg bg-secondaryFillLight animate-pulse h-[20px]'
            : ''
        }`}
      >
        {isBalanceLoading ? '' : `~$ ${chainUsdBalance}`}
      </div>
    </div>
    <div className={stylesNetworkBalance.avatarParent}>
      <div className={stylesNetworkBalance.avatar}>
        <div className={stylesNetworkBalance.avatar1}>
          <div className={stylesNetworkBalance.base} />
        </div>
      </div>
      <div className={stylesNetworkBalance.x54b77984}>
        {/* 0x54b7...7984 */}
        {address ? address?.substring(0, 6) + '...' + address?.substring(10, 14) : ""}
      </div>
      <div
        className={`cursor-pointer ${stylesNetworkBalance.iconButton1}`}
        onClick={''}
      >
        <img
          className={stylesNetworkBalance.arrowDownIcon}
          alt=""
          src="/share04.svg"
        />
      </div>
      <div
        className={`cursor-pointer ${stylesNetworkBalance.iconButton1}`}
        onClick={''}
      >
        <img
          className={stylesNetworkBalance.arrowDownIcon}
          alt=""
          src="/copy03.svg"
        />
      </div>
      <Link
        className={`cursor-pointer hover:bg-secondaryFillLight ${stylesNetworkBalance.iconButton1}`}
        to="/"
        onClick={() => {
          disconnect();
        }}
      >
        <img
          className={stylesNetworkBalance.arrowDownIcon}
          alt=""
          src="/logout01.svg"
        />
      </Link>
    </div>
  </div>
  );
};

export default Component7;
