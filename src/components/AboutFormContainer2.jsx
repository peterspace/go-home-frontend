import CryptoSelectionContainer from "./CryptoSelectionContainer";
import AboutMenu from "./AboutMenu";
import styles from "./AboutFormContainer2.module.css";
const AboutFormContainer2 = () => {
  return (
    // <div className={styles.aboutformContainer}>
    //   <div className={styles.aboutFormSwap}>
    //     <div className={styles.aboutFormSwapChild} />
    //     <div className={styles.aboutBody}>
    //       <div className={styles.frameParent}>
    //         <div className={styles.instructionWrapper}>
    //           <div className={styles.instruction}>
    //             <CryptoSelectionContainer
    //               prop="1"
    //               chooseCrypto="Choose crypto"
    //               selectYourDesiredCryptoPa="Select your desired crypto pair"
    //             />
    //             <CryptoSelectionContainer
    //               prop="2"
    //               chooseCrypto="Swap"
    //               selectYourDesiredCryptoPa="Connect your web3 wallet and click the swap button"
    //               propWidth="114.33px"
    //             />
    //             <CryptoSelectionContainer
    //               prop="3"
    //               chooseCrypto="Get crypto"
    //               selectYourDesiredCryptoPa="Check your wallet . We hope to see you soon️️!"
    //               propWidth="85.4px"
    //             />
    //           </div>
    //         </div>
    //         <img
    //           className={styles.swapPhone2Icon}
    //           alt=""
    //           src="/swapphone-2@2x.png"
    //         />
    //       </div>
    //     </div>
    //     <AboutMenu
    //       aboutMenuPosition="absolute"
    //       aboutMenuTop="calc(50% - 164px)"
    //       aboutMenuLeft="15px"
    //     />
    //   </div>
    // </div>
    <div className={styles.aboutBody}>
          <div className={styles.frameParent}>
            <div className={styles.instructionWrapper}>
              <div className={styles.instruction}>
                <CryptoSelectionContainer
                  prop="1"
                  chooseCrypto="Choose crypto"
                  selectYourDesiredCryptoPa="Select your desired crypto pair"
                />
                <CryptoSelectionContainer
                  prop="2"
                  chooseCrypto="Swap"
                  selectYourDesiredCryptoPa="Connect your web3 wallet and click the swap button"
                  propWidth="114.33px"
                />
                <CryptoSelectionContainer
                  prop="3"
                  chooseCrypto="Get crypto"
                  selectYourDesiredCryptoPa="Check your wallet . We hope to see you soon️️!"
                  propWidth="85.4px"
                />
              </div>
            </div>
            <img
              className={styles.swapPhone2Icon}
              alt=""
              src="/swapphone-2@2x.png"
            />
          </div>
        </div>
  );
};

export default AboutFormContainer2;
