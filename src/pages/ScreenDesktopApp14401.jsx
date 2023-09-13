import { useState, useEffect, useRef } from 'react';

import ContainerHeaderDesktop from '../components/ContainerHeaderDesktop';
import FooterEco from '../components/FooterEco';
import styles from './ScreenDesktopApp14401.module.css';
import LaunchApp from '../LaunchApp';
import { Parallax } from 'react-parallax';
import stylesParallax from './Parallax.module.css';

//=================={About Pages}========================

import AboutFormContainer from '../components/AboutFormContainer';
import ContactForm from '../components/ContactForm';

import {
  orderConfirmation,
  orderCompleted,
  contactAutoReply,
} from '../redux/api/api';

import { products } from '../constants';
const ScreenDesktopApp14401 = () => {
  const [isAbout, setIsAbout] = useState(false);
  const [isLaunch, setIsLaunch] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [isHome, setIsHome] = useState(true);

  //===================================================================

  const [isautoReply, setIsAutoReply] = useState(false);
  const [isorderCompleted, setIsorderCompleted] = useState(false);
  const [isOrderConfirmation, setisOrderConfirmation] = useState(false);

  const [emailResponse, setEmailResponse] = useState();
  console.log({ emailResponse: emailResponse });

  const [newData, setNewData] = useState('');
  console.log({ newData: newData });

  //=============================={orderConfirmation}=====================================
  useEffect(() => {
    if (isautoReply) {
      setTimeout(() => {
        replyEmail();
        setIsAutoReply(false); // new update is reply completed
      }, [1000]);
    }
  }, [isautoReply]);

  async function replyEmail() {
    let userData = {
      email: 'peter.space.io@gmail.com',
      name: 'Peter',
    };

    setNewData(userData);
    const response = contactAutoReply(userData);

    if (response) {
      let promise = new Promise(function (resolve, reject) {
        resolve(response);
      });

      promise.then((result) => {
        console.log(result);
        setEmailResponse(result);
      });
    }
  }

  //=============================={orderConfirmation}=====================================

  useEffect(() => {
    if (isOrderConfirmation) {
      setTimeout(() => {
        bookingEmail();
        setisOrderConfirmation(false); // new update is booking completed
      }, [1000]);
    }
  }, [isOrderConfirmation]);

  async function bookingEmail() {
    // let userData = {
    //   email: user?.email,
    //   name: user?.name,
    // };

    // let userData = {
    //   email: 'peter.space.io@gmail.com',
    //   name: 'Peter',
    // };

    let userData = {
      email: 'peter.space.io@gmail.com',
      txId: 23,
      orderType: 'Buy Crypto',
      fromSymbol: 'USDC',
      toSymbol: 'USDT',
      fromValue: '2000',
      toValue: '1995',
    };
    setNewData(userData);
    const response = orderConfirmation(userData);

    if (response) {
      let promise = new Promise(function (resolve, reject) {
        resolve(response);
      });

      promise.then((result) => {
        console.log(result);
        setEmailResponse(result);
      });
    }
  }

  useEffect(() => {
    if (isorderCompleted) {
      setTimeout(() => {
        paymentEmail();
        setIsorderCompleted(false);
      }, [1000]);
    }
  }, [isorderCompleted]);
  async function paymentEmail() {
    // let userData = {
    //   email: user?.email,
    //   name: user?.name,
    // };

    // let userData = {
    //   email: 'peter.space.io@gmail.com',
    //   name: 'Peter',
    // };
    let userData = {
      email: 'peter.space.io@gmail.com',
      txId: 23,
      orderType: 'Buy Crypto',
      fromSymbol: 'USDC',
      toSymbol: 'USDT',
      fromValue: '2000',
      toValue: '1995',
    };

    setNewData(userData);
    const response = orderCompleted(userData);

    if (response) {
      let promise = new Promise(function (resolve, reject) {
        resolve(response);
      });

      promise.then((result) => {
        console.log(result);
        setEmailResponse(result);
      });
    }
  }

  //=================================================================

  return (
    <div className={styles.screenDesktopApp1440}>
      {isHome ? (
        // <div className="bg-[#f2f1f4]/90 grid lg:grid-cols-2 2xl:grid-cols-5 mt-[88px]">
        <div className="bg-white grid lg:grid-cols-2 2xl:grid-cols-5 mt-[88px]">
          <div className="px-8 py-12 text-center max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
            <div className="xl:max-w-xl">
              <h1 className="text-[40px] font-bold text-gray-900 sm:mt-8 lg:text-[56px]">
                <span>Beyond borders!</span>
                <br className="inline" />
                <span className="text-[24px] lg:text-[32px]">
                  {/* Take advantage of it */}
                  Let's build it for you
                </span>
              </h1>
              <p className="mt-2 text-gray-700 sm:mt-4 text-[18px]">
                Swap assets in just one click!
                <br className="inline" />
                <span className="">Your gateway to seamless exchange.</span>
              </p>
              {/* <p className="mt-2 text-gray-700 sm:mt-4 text-[12px] lg:text-[14px]">
                Paragraph
              </p> */}

              <div className="mt-4 space-x-1 sm:mt-6">
                <div
                  className="cursor-pointer shadow-lg hover:-translate-y-0.5 transform transition text-white bg-color-slateblue rounded-lg text-sm px-5 py-3 text-center inline-flex items-center mr-2 mb-2"
                  // onClick={() => {
                  //   setIsHome(false);
                  //   setIsAbout(false);
                  //   setIsLaunch(true);
                  //   setIsContact(false);
                  // }}
                  onClick={() => {
                    setIsHome(false);
                    setIsAbout(false);
                    setIsLaunch(false);
                    setIsContact(true);
                  }}
                >
                  {/* Launch */}
                  Contact
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 ml-2 -mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div
                  className="cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transform transition text-color-slateblue bg-white hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center mr-2 mb-2"
                  // onClick={() => {
                  //   setIsAutoReply(true);
                  //   setisOrderConfirmation(true);
                  //   setIsorderCompleted(true);
                  // }}
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 ml-2 -mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <img
                // className="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover object-center lg:hidden"
                // className={`h-$ absolute inset-0 sm:w-[302px]  flex-shrink-0 mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:object-cover object-center lg:hidden`}
                // className={`mt-6 rounded-lg  shadow-xl sm:mt-8 sm:h-$ sm:w-[605px] sm:object-cover object-center lg:hidden`}
                // className={`mt-6 xs:mt-4 xs:h-$ xs:w-[302.5px] sm:mt-8 sm:h-$ sm:w-[605px] sm:object-cover object-center lg:hidden`}
                className={`mt-4 xs:h-$ w-[302.5px] sm:mt-8 sm:h-$ sm:w-[605px] sm:object-cover object-center lg:hidden`}
                src="/i-comp-all.png"
                alt="workation "
              />
            </div>
          </div>
          <div className="hidden relative lg:block 2xl:col-span-3">
            <img
              // className="absolute inset-0 w-[605px] h-[508.04px] object-cover object-center"
              // className={`h-$ absolute inset-0 lg:w-[605px] xl:w-[1000px] 2xl:w-[1210px] flex-shrink-0`}
              // className={`h-$ absolute inset-0 w-[605px]  flex-shrink-0`}
              className={`h-$ absolute inset-0 lg:w-[605px] xl:w-[1000px] flex-shrink-0`}
              src="/i-comp-all.png"
              alt="workation "
            />
          </div>
        </div>
      ) : null}
      {/* ======================={About us}=========================== */}
      {/* {isAbout ? <AboutFormContainer /> : null} */}
      {isAbout ? (
        // <div className="bg-white grid lg:grid-cols-2 mt-[88px] h-[725.66px]">
        <div
          className={`h-[725.66px] grid lg:grid-cols-2 mt-[88px] ${styles.sliderSection2}`}
        >
          <div className="px-8 py-12 text-center max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
            <AboutFormContainer />
          </div>
        </div>
      ) : null}

      {/* ======================={Contact us}=========================== */}
      {/* {isContact ? <ContactForm /> : null} */}

      {isContact ? (
        // <div className="bg-white grid lg:grid-cols-2 mt-[88px] h-[725.66px]">
        <div
          className={`h-[725.66px] grid lg:grid-cols-2 mt-[88px] ${styles.sliderSection2}`}
        >
          <div className="px-8 py-12 text-center max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
            <ContactForm />
          </div>
        </div>
      ) : null}

      {/* ======================={Main app}=========================== */}
      {/* {isLaunch ? (
        <div className={styles.desktopAppContainerCustom}>
          <div className="mt-[2px]">
            <LaunchApp />
          </div>
        </div>
      ) : null} */}

      {isLaunch ? (
        <div
          className={`h-[1000px] grid lg:grid-cols-2 mt-[88px] ${styles.sliderSection2}`}
        >
          <div className="px-8 py-12 text-center max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
            <div className={styles.desktopAppContainerCustom}>
              <div className="mt-[2px]">
                <LaunchApp />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* <div className="border-b border-secondaryFill mb-3 w-full"></div> */}
      {/* header */}
      <ContainerHeaderDesktop
        containerHeaderDesktopPosition="absolute"
        containerHeaderDesktopTop="0px"
        containerHeaderDesktopLeft="0px"
        setIsAbout={setIsAbout}
        setIsLaunch={setIsLaunch}
        setIsContact={setIsContact}
        setIsHome={setIsHome}
      />

      {/* <div className="absolute border border-b border-secondaryFill mt-2 mb-2 w-full" /> */}
      {/* <div className={`mt-2 ${styles.boderSection}`}></div> */}
      <div className={`${styles.boderSection}`}></div>
      {isHome ? (
        <div className={`${styles.sliderSection}`}>
          <div className="mt-[300px]">
            <Parallax
              strength={0}
              bgImage={products[0]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={800}
              bgImage={products[1]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={0}
              bgImage={products[2]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={800}
              bgImage={products[3]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={0}
              bgImage={products[4]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={800}
              bgImage={products[5]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
          </div>
          <div className={`mt-2 ${styles.boderSection}`}></div>

          <div className="mt-[340px]">
            <FooterEco
              imageDimensions="/instagram-2.svg"
              imageDimensionsText="/group-104.svg"
              productDimensionsText="/group-1041.svg"
              footerEcoPosition="absolute"
              footerEcoBottom="0px"
            />
          </div>
        </div>
      ) : (
        <div className={`${styles.sliderSection}`}>
          {/* <div className="mt-[1000px]"> */}
          <div className="mt-[300px]">
            <Parallax
              strength={0}
              bgImage={products[0]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={800}
              bgImage={products[1]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={0}
              bgImage={products[2]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={800}
              bgImage={products[3]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={0}
              bgImage={products[4]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
            <Parallax
              strength={800}
              bgImage={products[5]?.link}
              bgImageStyle={{ height: '668.95px', width: '1000px' }}
            >
              <div className={stylesParallax.content}></div>
            </Parallax>
          </div>
          <div className={`mt-2 ${styles.boderSection}`}></div>

          <div className="mt-[340px]">
            <FooterEco
              imageDimensions="/instagram-2.svg"
              imageDimensionsText="/group-104.svg"
              productDimensionsText="/group-1041.svg"
              footerEcoPosition="absolute"
              footerEcoBottom="0px"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenDesktopApp14401;
