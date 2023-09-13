import { useState, useEffect, useRef } from 'react';

import AboutMenu from './AboutMenu';
import styles from './AboutFormContainer.module.css';
import VisionContainer from './VisionContainer';
import AboutFormContainer2 from './AboutFormContainer2';
import ContactFormContainer from './ContactFormContainer';
const AboutFormContainer = () => {
  // const [isAbout, setIsAbout] = useState(false);
  const [isAbout, setIsAbout] = useState(true);
  const [isVision, setIsVision] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [isChooseUs, setIsChooseUs] = useState(false);
  const [isWorks, setIsWorks] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  return (
    <div className={styles.aboutformContainer}>
      <div className={styles.aboutForm}>
        <div className={styles.aboutFormChild} />
        {/* ======================={About us}=========================== */}
        {isAbout &&
        !isVision &&
        !isOffer &&
        !isChooseUs &&
        !isWorks &&
        !isContact &&
        !isJoin ? (
          <VisionContainer
            visionText="**About us**"
            visionStatement="At Govercity, we are committed to revolutionizing the blockchain
                  ecosystem and ushering in a new era of Web 3.0 services. Our
                  platform is built on the principles of decentralization,
                  security, and innovation, providing a wide range of services
                  that empower users to explore the limitless potential of
                  blockchain technology."
            contentTop="calc(50% - 164px)"
            contentLeft="15px"
          />
        ) : null}

        {/* =======================our vision}=========================== */}
        {!isAbout &&
        isVision &&
        !isOffer &&
        !isChooseUs &&
        !isWorks &&
        !isContact &&
        !isJoin ? (
          <VisionContainer
            visionText="**Our Vision**"
            visionStatement="Our vision is to create an inclusive and seamless blockchain ecosystem that bridges the gap between traditional finance and the decentralized world. We believe in a future where everyone has the freedom to participate in the digital economy, regardless of geographical or financial barriers. Through our user-friendly and efficient platform, we aim to redefine the way people interact with blockchain technology and unlock its true potential."
          />
        ) : null}

        {/* ======================={What we offer}=========================== */}
        {!isAbout &&
        !isVision &&
        isOffer &&
        !isChooseUs &&
        !isWorks &&
        !isContact &&
        !isJoin ? (
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
                We understand that mainstream adoption is essential for
                blockchain technology to thrive. To make it accessible to
                everyone, we offer a seamless fiat exchange service that allows
                users to effortlessly convert their traditional currency into
                various cryptocurrencies. With support for major payment
                options, including Mastercard and Visa cards, our exchange
                ensures a smooth onboarding experience for newcomers and
                seasoned users alike.
              </p>
              <p className={styles.blankLine}>&nbsp;</p>
              <p
                className={styles.whatWeOffer}
              >{`2. OneInch API Integration for Hassle-free Swaps: `}</p>
              <p className={styles.blankLine}>
                Our integration with the OneInch API enables instant and secure
                token swaps across various decentralized exchanges (DEXes).
                Whether you're looking to diversify your portfolio or take
                advantage of favorable market conditions, our swap service
                ensures the best rates and minimal slippage for a seamless
                trading experience.
              </p>
              <p className={styles.blankLine}>&nbsp;</p>
              <p className={styles.whatWeOffer}>{`3. Cross-Chain Swaps: `}</p>
              <p className={styles.blankLine}>
                Embracing the true spirit of decentralization, we empower users
                to perform cross-chain swaps, allowing the seamless transfer of
                assets between different blockchain networks. Our robust
                technology ensures that your transactions are fast, secure, and
                transparent, all while maintaining full custody of your assets.
              </p>
            </div>
          </div>
        ) : null}

        {/* ======================={Why Choose Us}=========================== */}
        {!isAbout &&
        !isVision &&
        !isOffer &&
        isChooseUs &&
        !isWorks &&
        !isContact &&
        !isJoin ? (
          <VisionContainer
            visionText="**Why choose us**"
            visionStatement="At Govercity, we are committed to revolutionizing the blockchain
                ecosystem and ushering in a new era of Web 3.0 services. Our
                platform is built on the principles of decentralization,
                security, and innovation, providing a wide range of services
                that empower users to explore the limitless potential of
                blockchain technology."
            contentTop="calc(50% - 164px)"
            contentLeft="15px"
          />
        ) : null}

        {/* ======================={How it works}}=========================== */}
        {/*  */}
        {!isAbout &&
        !isVision &&
        !isOffer &&
        !isChooseUs &&
        isWorks &&
        !isContact &&
        !isJoin ? (
          <AboutFormContainer2 />
        ) : null}
        {/* ======================={Contact us}=========================== */}
        {!isAbout &&
        !isVision &&
        !isOffer &&
        !isChooseUs &&
        !isWorks &&
        isContact &&
        !isJoin ? (
          <ContactFormContainer />
        ) : null}

        {/* ======================={join us}=========================== */}
        {!isAbout &&
        !isVision &&
        !isOffer &&
        !isChooseUs &&
        !isWorks &&
        !isContact &&
        isJoin ? (
          <VisionContainer
            visionText="**Join Us in Building the Future**"
            visionStatement="We invite you to join us on this exciting journey as we shape the future of Web 3.0 and unlock the immense potential of blockchain technology. Whether you're a blockchain enthusiast, a trader, or a newcomer seeking financial inclusion, Govercity is here to support your aspirations in the decentralized world."
            contentTop="calc(50% - 164px)"
            contentLeft="15px"
          />
        ) : null}

        <AboutMenu
          aboutMenuPosition="absolute"
          aboutMenuTop="calc(50% - 174px)"
          aboutMenuLeft="58px"
          setIsAbout={setIsAbout}
          setIsVision={setIsVision}
          setIsOffer={setIsOffer}
          setIsChooseUs={setIsChooseUs}
          setIsWorks={setIsWorks}
          setIsContact={setIsContact}
          setIsJoin={setIsJoin}
        />
      </div>
    </div>
  );
};

export default AboutFormContainer;
