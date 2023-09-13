import styles from "./TabletMini2.module.css";
const TabletMini2 = () => {
  return (
    <div className={styles.tabletMini2}>
      <div className={styles.frame}>
         {/* Header Starts */}
        <div className={styles.headerTablet}>
          <div className={styles.menu01Parent}>
            <img className={styles.menu01Icon} alt="" src="/menu01.svg" />
            <img
              className={styles.defaultASilhouetteDesignOfIcon}
              alt=""
              src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png"
            />
            <div className={styles.govercity}>Govercity</div>
          </div>
          <div className={styles.frameParent}>
            <div className={styles.protocolIconParent}>
              <img
                className={styles.protocolIcon}
                alt=""
                src="/protocol-icon6.svg"
              />
              <img
                className={styles.chevronDownIcon}
                alt=""
                src="/chevrondown.svg"
              />
            </div>
            <div className={styles.walletIconWrapper}>
              <img
                className={styles.walletIcon}
                alt=""
                src="/wallet-icon2.svg"
              />
            </div>
          </div>
        </div>
         {/* Header ends */}
        {/* Component Starts */}
        <div className={styles.frameGroup}>
          <div className={styles.swapParent}>
            <div className={styles.swap}>Swap</div>
            <img
              className={styles.settings04Icon}
              alt=""
              src="/settings042.svg"
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
                      src="/protocol-icon5.svg"
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
                  <div className={styles.txCost}>~$1432.54</div>
                </div>
              </div>
              <div className={styles.frameParent3}>
                <div className={styles.wrapper}>
                  <div className={styles.txCost}>25%</div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.txCost}>50%</div>
                </div>
                <div className={styles.wrapper1}>
                  <div className={styles.txCost}>75%</div>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.txCost}>100%</div>
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
                  className={styles.arrowDownIcon}
                  alt=""
                  src="/arrowdown3.svg"
                />
              </div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.frameParent1}>
                <div className={styles.frameParent2}>
                  <div className={styles.protocolIconGroup}>
                    <img
                      className={styles.walletIcon}
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
                  <div className={styles.txCost}>~$1432.54</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.frameParent7}>
            <div className={styles.txCostParent}>
              <div className={styles.txCost}>Tx cost</div>
              <div className={styles.div8}>$6.65</div>
            </div>
            <img
              className={styles.chevronDownIcon}
              alt=""
              src="/chevrondown.svg"
            />
          </div>
          <div className={styles.connectWalletWrapper}>
            <div className={styles.connectWallet}>Connect Wallet</div>
          </div>
        </div>
         {/* Component Ends */}
      </div>
       {/* Footer Starts */}
      <div className={styles.defaultASilhouetteDesignOfParent}>
        <img
          className={styles.defaultASilhouetteDesignOfIcon}
          alt=""
          src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png"
        />
        <div className={styles.govercityAllRights}>
          © 2023 Govercity, All Rights Reserved.
        </div>
      </div>
      {/* Footer Ends */}
    </div>
  );
};

export default TabletMini2;
