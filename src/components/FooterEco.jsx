import { useMemo, useState, useEffect } from 'react';
import styles from './FooterEco.module.css';
import ModalServices from './Frame/ModalServices';
import ModalContact from './Frame/ModalContact';
import ContactForm from './ContactForm';
import AboutFormContainer from './AboutFormContainer';

const FooterEco = ({
  imageDimensions,
  imageDimensionsText,
  productDimensionsText,
  footerEcoPosition,
  footerEcoBottom,
  footerEcoLeft,
}) => {
  // const footerEcoStyle = useMemo(() => {
  //   return {
  //     position: footerEcoPosition,
  //     bottom: footerEcoBottom,
  //     left: footerEcoLeft,
  //   };
  // }, [footerEcoPosition, footerEcoBottom, footerEcoLeft]);

  // const [swapInfo, setSwapInfo] = useState(false);
  const [swapInfo, setSwapInfo] = useState(false);
  const [swapCrossChainInfo, setCrossChainSwapInfo] = useState(false);
  const [buyInfo, setBuyInfo] = useState(false);
  const [sellInfo, setSellInfo] = useState(false);
  const [exchangeInfo, setExchangeInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState(false);
  const [aboutInfo, setAboutInfo] = useState(false);
  const footerEcoStyle = useMemo(() => {
    return {
      position: footerEcoPosition,
      bottom: footerEcoBottom,
      left: 0,
    };
  }, [footerEcoPosition, footerEcoBottom]);

  // useEffect(()=>{

  // })

  return (
    <div className={styles.footerEco} style={footerEcoStyle}>
      <div className={styles.footer}>
        <div
          className={`cursor-pointer hover:text-white ${styles.aboutUs}`}
          onClick={() => setAboutInfo(true)}
        >
          About us
        </div>
        <div
          className={`cursor-pointer hover:text-white ${styles.swap}`}
          onClick={() => setSwapInfo(true)}
        >
          Swap
        </div>
        <div className={`cursor-pointer hover:text-white ${styles.faq}`}>
          FAQ
        </div>
        <div
          className={`cursor-pointer hover:text-white ${styles.blogNews}`}
        >{`Blog & News`}</div>
        <div
          className={`cursor-pointer hover:text-white ${styles.buy}`}
          onClick={() => setBuyInfo(true)}
        >
          Buy
        </div>
        <div className={`cursor-pointer hover:text-white ${styles.termsOfUse}`}>
          Terms of use
        </div>
        <div
          className={`cursor-pointer hover:text-white ${styles.sell}`}
          onClick={() => setSellInfo(true)}
        >
          Sell
        </div>
        {/* <div
          className={`cursor-pointer hover:text-white ${styles.contactUs}`}
          onClick={() => {
            setIsHome(false);
            setIsAbout(false);
            setIsLaunch(false);
            setIsContact(true);
          }}
        >
          Contact us
        </div> */}
        <div
          className={`cursor-pointer hover:text-white ${styles.contactUs}`}
          onClick={() => setContactInfo(true)}
        >
          Contact us
        </div>
        <div
          className={`cursor-pointer hover:text-white ${styles.privacyPolicy}`}
        >
          Privacy policy
        </div>
        <div
          className={`cursor-pointer hover:text-white ${styles.exchange}`}
          onClick={() => setExchangeInfo(true)}
        >
          Exchange
        </div>
        <div className={`cursor-pointer hover:text-white ${styles.helpCenter}`}>
          Help center
        </div>
        <div
          className={`cursor-pointer hover:text-white ${styles.riskDisclosureStatement}`}
        >
          Risk disclosure statement
        </div>
        {/* <div className={styles.telegramBot}>Telegram Bot</div> */}
        <div
          className={`cursor-pointer hover:text-white ${styles.aboutUs1}`}
          onClick={() => setAboutInfo(true)}
        >
          About us
        </div>
        <div
          className={`cursor-pointer hover:text-white ${styles.company}`}
          onClick={() => setAboutInfo(true)}
        >
          Company
        </div>
        <div
          className={`cursor-pointer hover:text-white ${styles.govercitycom}`}
        >
          Govercity.com
        </div>
        <div className={`cursor-pointer hover:text-white ${styles.services}`}>
          Services
        </div>
        <div className={`cursor-pointer hover:text-white ${styles.support}`}>
          Support
        </div>
        <div className={`cursor-pointer hover:text-white ${styles.legal}`}>
          Legal
        </div>
        <div className={`cursor-pointer hover:text-white ${styles.followUs}`}>
          Follow us
        </div>
        <img className={styles.youtube2Icon} alt="" src="/youtube-2.svg" />
        <img className={styles.twitter2Icon} alt="" src="/twitter-2.svg" />
        <img className={styles.telegram2Icon} alt="" src="/telegram-2.svg" />
        <img className={styles.instagram2Icon} alt="" src={imageDimensions} />
        <img className={styles.discord2Icon} alt="" src="/discord-2.svg" />
        <div className={styles.inchAllRights}>
          © 2023 Govercity, All Rights Reserved.
        </div>
        <img className={styles.footerChild} alt="" src={imageDimensionsText} />
        <div className={styles.logoFrame} />
        <img className={styles.footerItem} alt="" src={productDimensionsText} />
      </div>

      {swapInfo ? (
        <ModalServices visible={swapInfo} setVisible={setSwapInfo}>
          <img src="/Slider-2.png" alt="" className="h-[668.95px] w-[1000px]" />
        </ModalServices>
      ) : null}
      {buyInfo ? (
        <ModalServices visible={buyInfo} setVisible={setBuyInfo}>
          <img src="/Slider-3.png" alt="" className="h-[668.95px] w-[1000px]" />
        </ModalServices>
      ) : null}
      {sellInfo ? (
        <ModalServices visible={sellInfo} setVisible={setSellInfo}>
          <img src="/Slider-4.png" alt="" className="h-[668.95px] w-[1000px]" />
        </ModalServices>
      ) : null}
      {exchangeInfo ? (
        <ModalServices visible={exchangeInfo} setVisible={setExchangeInfo}>
          <img src="/Slider-6.png" alt="" className="h-[668.95px] w-[1000px]" />
        </ModalServices>
      ) : null}
      {contactInfo ? (
        <ModalContact visible={contactInfo} setVisible={setContactInfo}>
          <>
            <div
              className="relative z-10 mt-10 ml-6 flex justify-end items-end bg-gray-100 rounded-full transition-transform duration-300 hover:scale-125 cursor-pointer"
              onClick={() => setContactInfo(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <ContactForm />
          </>
        </ModalContact>
      ) : null}
      {aboutInfo ? (
        <ModalContact visible={aboutInfo} setVisible={setAboutInfo}>
          <>
            <div
              className="relative z-10 mt-10 ml-6 flex justify-end items-end bg-gray-100 rounded-full transition-transform duration-300 hover:scale-125 cursor-pointer"
              onClick={() => setAboutInfo(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <AboutFormContainer />
          </>
        </ModalContact>
      ) : null}
    </div>
  );
};

export default FooterEco;
