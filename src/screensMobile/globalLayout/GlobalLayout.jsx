import './GlobalLayout.css';
const GlobalLayout = () => {
  return (
    <div className="div">
      <div className="child" />
      <div className="item" />
      <div className="inner" />
      <div className="ellipse-div" />
      <div className="documentation-parent">
        <div className="documentation">Documentation</div>
        <div className="documentation">FAQ</div>
        <div className="documentation">Privacy policy</div>
        <div className="documentation">Terms of use</div>
      </div>
      <div className="frame-parent">
        <div className="horiza-parent">
          <b className="horiza">HORIZA</b>
          <div className="swap-parent">
            <div className="swap">Swap</div>
            <div className="documentation">Pool</div>
            <div className="documentation">About</div>
          </div>
        </div>
        <div className="frame-group">
          <div className="protocol-icon-parent">
            <img className="protocol-icon" alt="" src="/protocol-icon.svg" />
            <div className="ethereum">Ethereum</div>
            <img className="chevron-down-icon" alt="" src="/chevrondown.svg" />
          </div>
          <div className="wallet-02-parent">
            <img className="wallet-02-icon" alt="" src="/wallet02.svg" />
            <div className="connect-wallet">Connect Wallet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;
