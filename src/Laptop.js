import styles from "./Laptop.module.css";
const Laptop = () => {
  return (
    <div className={styles.laptop}>
      <div className={styles.frame}>
        <div className={styles.laptopHeader}>
          <div className={styles.govercityLogo}>
            <img
              className={styles.defaultASilhouetteDesignOfIcon}
              alt=""
              src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png"
            />
            <div className={styles.govercity}>Govercity</div>
          </div>
          <div className={styles.swapParent}>
            <div className={styles.swap}>Swap</div>
            <div className={styles.buy}>Buy</div>
            <div className={styles.buy}>Exchange</div>
            <div className={styles.buy}>Documentation</div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.protocolIconParent}>
              <img
                className={styles.protocolIcon}
                alt=""
                src="/protocol-icon1.svg"
              />
              <div className={styles.ethereum}>Ethereum</div>
              <img
                className={styles.chevronDownIcon}
                alt=""
                src="/chevrondown.svg"
              />
            </div>
            <div className={styles.wallet02Parent}>
              <img className={styles.wallet02Icon} alt="" src="/wallet02.svg" />
              <div className={styles.connectWallet}>Connect Wallet</div>
            </div>
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.swapGroup}>
            <div className={styles.swap1}>Swap</div>
            <img
              className={styles.settings04Icon}
              alt=""
              src="/settings04.svg"
            />
          </div>
          <div className={styles.frameContainer}>
            <div className={styles.frameDiv}>
              <div className={styles.frameParent1}>
                <div className={styles.frameParent2}>
                  <div className={styles.protocolIconGroup}>
                    <img
                      className={styles.protocolIcon}
                      alt=""
                      src="/protocol-icon1.svg"
                    />
                    <div className={styles.govercity}>ETH</div>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown.svg"
                    />
                  </div>
                  <div className={styles.div}>3859.042109</div>
                </div>
                <div className={styles.balance0Parent}>
                  <div className={styles.balance0}>Balance: 0</div>
                  <div className={styles.buy}>~$1432.54</div>
                </div>
              </div>
              <div className={styles.frameParent3}>
                <div className={styles.wrapper}>
                  <div className={styles.buy}>25%</div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.buy}>50%</div>
                </div>
                <div className={styles.wrapper1}>
                  <div className={styles.buy}>75%</div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.buy}>100%</div>
                </div>
              </div>
            </div>
            <div className={styles.frameParent4}>
              <div className={styles.parent}>
                <b className={styles.b}>􀅈</b>
                <b className={styles.eth167771}>1 ETH = 1677.71 USDT</b>
              </div>
              <div className={styles.arrowDownWrapper}>
                <img
                  className={styles.wallet02Icon}
                  alt=""
                  src="/arrowdown1.svg"
                />
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameParent1}>
                <div className={styles.frameParent2}>
                  <div className={styles.protocolIconGroup}>
                    <img
                      className={styles.mdImageIcon}
                      alt=""
                      src="/md-image.svg"
                    />
                    <div className={styles.govercity}>USDT</div>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown.svg"
                    />
                  </div>
                  <div className={styles.div}>3859.042109</div>
                </div>
                <div className={styles.balance0Parent}>
                  <div className={styles.balance0}>Balance: 0</div>
                  <div className={styles.buy}>~$1432.54</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.frameParent7}>
            <div className={styles.txCostParent}>
              <div className={styles.buy}>Tx cost</div>
              <div className={styles.div8}>$6.65</div>
            </div>
            <img
              className={styles.chevronDownIcon}
              alt=""
              src="/chevrondown.svg"
            />
          </div>
          <div className={styles.connectWalletWrapper}>
            <div className={styles.connectWallet1}>Connect Wallet</div>
          </div>
        </div>
      </div>
      <div className={styles.defaultASilhouetteDesignOfParent}>
        <img
          className={styles.defaultASilhouetteDesignOfIcon}
          alt=""
          src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png"
        />
        <div className={styles.ethereum}>
          © 2023 Govercity, All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Laptop;
