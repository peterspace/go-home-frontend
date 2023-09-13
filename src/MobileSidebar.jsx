import styles from "./MobileSidebarFull.module.css";
const MobileSidebarFull = () => {
  return (
    <div className={styles.mobileSidebarFull}>
      <div className={styles.frameParent}>
        <div className={styles.swapParent}>
          <div className={styles.swap}>Swap</div>
          <img className={styles.settings04Icon} alt="" src="/settings04.svg" />
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.frameDiv}>
              <div className={styles.frameParent1}>
                <div className={styles.protocolIconParent}>
                  <img
                    className={styles.protocolIcon}
                    alt=""
                    src="/protocol-icon.svg"
                  />
                  <div className={styles.eth}>ETH</div>
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
            <div className={styles.frameParent2}>
              <div className={styles.wrapper}>
                <div className={styles.txCost}>25%</div>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.txCost}>50%</div>
              </div>
              <div className={styles.frame}>
                <div className={styles.txCost}>75%</div>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.txCost}>100%</div>
              </div>
            </div>
          </div>
          <div className={styles.frameParent3}>
            <div className={styles.parent}>
              <b className={styles.b}>􀅈</b>
              <b className={styles.eth167771}>1 ETH = 1677.71 USDT</b>
            </div>
            <div className={styles.arrowDownWrapper}>
              <img
                className={styles.arrowDownIcon}
                alt=""
                src="/arrowdown.svg"
              />
            </div>
          </div>
          <div className={styles.frameWrapper}>
            <div className={styles.frameDiv}>
              <div className={styles.frameParent1}>
                <div className={styles.protocolIconParent}>
                  <img
                    className={styles.mdImageIcon}
                    alt=""
                    src="/md-image.svg"
                  />
                  <div className={styles.eth}>USDT</div>
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
        <div className={styles.frameParent6}>
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
      <div className={styles.headerTablet}>
        <img className={styles.menu01Icon} alt="" src="/menu01.svg" />
        <div className={styles.govercityLogo}>
          <img
            className={styles.defaultASilhouetteDesignOfIcon}
            alt=""
            src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png"
          />
          <div className={styles.eth}>Govercity</div>
        </div>
        <div className={styles.frameParent7}>
          <div className={styles.protocolIconGroup}>
            <img
              className={styles.protocolIcon}
              alt=""
              src="/protocol-icon.svg"
            />
            <img
              className={styles.chevronDownIcon}
              alt=""
              src="/chevrondown.svg"
            />
          </div>
          <div className={styles.walletIconWrapper}>
            <img className={styles.mdImageIcon} alt="" src="/wallet-icon.svg" />
          </div>
        </div>
      </div>
      <div className={styles.mobileSidebarBlinds}>
        <div className={styles.mobileSidebar}>
          <div className={styles.govercityLogo1}>
            <img
              className={styles.defaultASilhouetteDesignOfIcon}
              alt=""
              src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png"
            />
            <div className={styles.eth}>Govercity</div>
          </div>
          <div className={styles.menuSidebar}>
            <div className={styles.iconButton}>
              <img
                className={styles.swapwhite2Icon}
                alt=""
                src="/swapwhite-2@2x.png"
              />
            </div>
            <div className={styles.iconButton1}>
              <img
                className={styles.swapwhite2Icon}
                alt=""
                src="/paywhite-3@2x.png"
              />
            </div>
            <div className={styles.iconButton2}>
              <img
                className={styles.swapwhite2Icon}
                alt=""
                src="/exchangewhite1-2@2x.png"
              />
            </div>
            <div className={styles.iconButton3}>
              <img
                className={styles.swapwhite2Icon}
                alt=""
                src="/file-2@2x.png"
              />
            </div>
            <div className={styles.swap1}>Swap</div>
            <div className={styles.buy}>Buy</div>
            <div className={styles.exchange}>Exchange</div>
            <div className={styles.documentation}>Documentation</div>
            <div className={styles.options}>
              <div className={styles.iconButton4}>
                <img
                  className={styles.arrowDownIcon}
                  alt=""
                  src="/share04.svg"
                />
              </div>
              <div className={styles.iconButton5}>
                <img
                  className={styles.arrowDownIcon}
                  alt=""
                  src="/copy03.svg"
                />
              </div>
              <div className={styles.iconButton6}>
                <img
                  className={styles.arrowDownIcon}
                  alt=""
                  src="/logout01.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebarFull;
