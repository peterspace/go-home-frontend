import AboutMenu from "./AboutMenu";
import styles from "./AboutFormContainer.module.css";
const AboutFormContainer = () => {
  return (
    <div className={styles.aboutformContainer}>
      <div className={styles.aboutForm}>
        <div className={styles.aboutFormChild} />
        <div className={`overflow-auto ${styles.offerBody}`}>
          <div className={styles.whatWeOfferContainer}>
            <p className={styles.whatWeOffer}>**What We Offer**</p>
            <p className={styles.blankLine}>&nbsp;</p>
            <p className={styles.blankLine}>
              <span className={styles.fiatExchangeWith}>
                1. Fiat Exchange with Multiple Payment Options:
              </span>
              <span>{` `}</span>
            </p>
            <p className={styles.blankLine}>
              We understand that mainstream adoption is essential for blockchain
              technology to thrive. To make it accessible to everyone, we offer
              a seamless fiat exchange service that allows users to effortlessly
              convert their traditional currency into various cryptocurrencies.
              With support for major payment options, including Mastercard and
              Visa cards, our exchange ensures a smooth onboarding experience
              for newcomers and seasoned users alike.
            </p>
            <p className={styles.blankLine}>&nbsp;</p>
            <p
              className={styles.whatWeOffer}
            >{`2. OneInch API Integration for Hassle-free Swaps: `}</p>
            <p className={styles.blankLine}>
              Our integration with the OneInch API enables instant and secure
              token swaps across various decentralized exchanges (DEXes).
              Whether you're looking to diversify your portfolio or take
              advantage of favorable market conditions, our swap service ensures
              the best rates and minimal slippage for a seamless trading
              experience.
            </p>
            <p className={styles.blankLine}>&nbsp;</p>
            <p className={styles.whatWeOffer}>{`3. Cross-Chain Swaps: `}</p>
            <p className={styles.blankLine}>
              Embracing the true spirit of decentralization, we empower users to
              perform cross-chain swaps, allowing the seamless transfer of
              assets between different blockchain networks. Our robust
              technology ensures that your transactions are fast, secure, and
              transparent, all while maintaining full custody of your assets.
            </p>
          </div>
        </div>
        <AboutMenu
          aboutMenuPosition="absolute"
          aboutMenuTop="calc(50% - 174px)"
          aboutMenuLeft="58px"
        />
      </div>
    </div>
  );
};

export default AboutFormContainer;
