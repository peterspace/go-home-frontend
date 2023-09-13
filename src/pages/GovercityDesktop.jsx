import React, { useState, useEffect } from 'react';
import styles from './GovercityDesktop.module.css';
import LaunchApp from '../LaunchApp';

const GovercityDesktop = (props) => {
  const { setIsSwapping, setIsExchange, setIsBuy, setIsHome, setIsContactUs } =
    props;

  return (
    <div className={`font-satoshi overflow-auto ${styles.govercityDesktop}`}>
      <div className={styles.goDesktopHome2}>
        {/* Header starts */}
        <div className={styles.govercityLogoParent}>
          <div className={styles.govercityLogo} onClick={() => setIsHome(true)}>
            <img
              className={styles.defaultASilhouetteDesignOfIcon}
              alt=""
              src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png"
            />
            <div className={styles.govercity}>Blendery</div>
          </div>
          <div className={styles.frameWrapper}>
            <div className={styles.servicesParent}>
              <div
                className={`cursor-pointer transition-transform duration-300 hover:scale-125 hover:text-white ${styles.contact}`}
                // onClick={() => setIsServices(true)}
              >
                Services
              </div>
              <div
                className={`cursor-pointer transition-transform duration-300 hover:scale-125 hover:text-white ${styles.contact}`}
                onClick={() => setIsContactUs(true)}
              >
                Contact
              </div>
              <div
                className={`cursor-pointer transition-transform duration-300 hover:scale-125 hover:text-white ${styles.contact}`}
                // onClick={() => setIsAbout(true)}
              >
                About
              </div>
            </div>
          </div>
        </div>
        {/* Header ends */}
        {/* Vision starts */}
        <div className={styles.sectionContainer}>
          <div className={styles.partnersCard}>
            <img
              className={styles.partnersCardChild}
              alt=""
              src="/frame-132131473112@2x.png"
            />
            <div className={styles.onramper}>Exchange</div>
            <div className={styles.partnersCardItem} />
            <div className={styles.partnersCardInner} />
            <div className={styles.div4} />
          </div>
          <div className={styles.partnersCard1}>
            <img
              className={styles.partnersCardChild}
              alt=""
              src="/frame-132131473112@2x.png"
            />
            <div className={styles.onramper}>Exchange</div>
            <div className={styles.partnersCardItem} />
            <div className={styles.partnersCardInner} />
            <div className={styles.div4}>1</div>
          </div>
          <div className={styles.onesVisionIsContainer}>
            <p className={styles.onesVision}>{`One’s Vision `}</p>
            <p className={styles.onesVision}>
              is not a road map but a compass.
            </p>
            <p className={styles.onesVision}>Reset your compass</p>
            <p className={styles.onesVision}>&nbsp;</p>
          </div>
        </div>
        {/* Vision Ends */}
        {/* Networks starts */}
        {/* <div className={styles.convenientlyMakeTransactionsParent}>
          <div className={styles.convenientlyMakeTransactions}>
            Conveniently make transactions across multiple networks
          </div>
          <div className={styles.networks}>Networks</div>
          <div className={styles.networksParent}>
            <div className={styles.networks1}>
              <div className={styles.title}>
                <b className={styles.art}>Arbitrum</b>
              </div>
            </div>
            <div className={styles.networks2}>
              <div className={styles.title}>
                <b className={styles.art1}>Avalanche</b>
              </div>
            </div>
            <div className={styles.networks3}>
              <div className={styles.title}>
                <b className={styles.art2}>Optimism</b>
              </div>
            </div>
            <div className={styles.networks4}>
              <div className={styles.title}>
                <b className={styles.art3}>Polygon</b>
              </div>
            </div>
            <div className={styles.networks5}>
              <div className={styles.title}>
                <b className={styles.art3}>Binance</b>
              </div>
            </div>
            <div className={styles.networks6}>
              <div className={styles.title}>
                <b className={styles.art2}>Ethereum</b>
              </div>
            </div>
          </div>
        </div> */}
        {/* Networks starts */}
        <div className={styles.sectionHeaderParent}>
          <div className={styles.sectionHeader}>
            <div className={styles.services1}>Services</div>
            <div className={styles.exploreOurVariety}>
              Explore our variety of services for your needs
            </div>
          </div>
          <div className={styles.servicesCard}>
            <img
              className={styles.servicesCardChild}
              alt=""
              src="/service-swap.png"
            />
            <div className={styles.liquidityAggregationFrom}>
              Swap crypto assets across multiple DEXes at the best swap rates.
            </div>
            <div className={styles.swap}>Swap</div>
            <div
              className={`cursor-pointer transition-transform duration-300 hover:scale-125 ${styles.launchParent}`}
              onClick={() => setIsSwapping(true)}
            >
              <div className={styles.launch}>More</div>
              <img
                className={styles.chevronRightIcon}
                alt=""
                src="/chevronright.svg"
              />
            </div>
          </div>
          <div className={styles.servicesCard}>
            <img
              className={styles.servicesCardChild}
              alt=""
              src="/service-exchange.png"
            />
            <div className={styles.liquidityAggregationFrom}>
              Exchange your crypto assets on different chains simultaneously on
              our cross-chain platform
            </div>
            <div className={styles.swap}>Exchange</div>
            <div
              className={`cursor-pointer transition-transform duration-300 hover:scale-125 ${styles.launchParent}`}
              onClick={() => setIsExchange(true)}
            >
              <div className={styles.launch}>More</div>
              <img
                className={styles.chevronRightIcon}
                alt=""
                src="/chevronright.svg"
              />
            </div>
          </div>
          <div className={styles.servicesCard}>
            <img
              className={styles.servicesCardChild}
              alt=""
              src="/service-buy.png"
            />
            <div className={styles.liquidityAggregationFrom}>
              Buy Crypto from over 20 providers with flexible payment options
            </div>
            <div className={styles.swap}>Buy</div>
            <div
              className={`cursor-pointer transition-transform duration-300 hover:scale-125 ${styles.launchParent}`}
              onClick={() => setIsBuy(true)}
            >
              <div className={styles.launch}>More</div>
              <img
                className={styles.chevronRightIcon}
                alt=""
                src="/chevronright.svg"
              />
            </div>
          </div>
          <div className={styles.servicesCard}>
            <img
              className={styles.servicesCardChild}
              alt=""
              src="/service-sell.png"
            />
            <div className={styles.liquidityAggregationFrom}>
              Sell your crypto assets and receive payment in just a few clicks
            </div>
            <div className={styles.swap}>Sell</div>
            <div
              className={`cursor-pointer transition-transform duration-300 hover:scale-125 ${styles.launchParent}`}
              onClick={() => setIsBuy(true)}
            >
              <div className={styles.launch}>More</div>
              <img
                className={styles.chevronRightIcon}
                alt=""
                src="/chevronright.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.sectionContainer1}>
          <div className={styles.sectionHeader1}>
            <div className={styles.startYourFirst}>
              Start your first crypto swap with these easy steps.
            </div>
            <div className={styles.swapCryptoWith}>
              Swap Crypto with Govercity
            </div>
          </div>
          <div className={styles.instructionWrapper}>
            <div className={styles.instruction}>
              <div className={styles.frameGroup}>
                <div className={styles.wrapper}>
                  <div className={styles.div6}>1</div>
                </div>
                <div className={styles.chooseCryptoParent}>
                  <div className={styles.chooseCrypto}>Choose crypto</div>
                  <div className={styles.selectYourDesired}>
                    Select your desired crypto pair
                  </div>
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.wrapper}>
                  <div className={styles.div7}>2</div>
                </div>
                <div className={styles.chooseCryptoParent}>
                  <div className={styles.chooseCrypto}>Swap</div>
                  <div className={styles.selectYourDesired}>
                    Connect your web3 wallet and click the swap button
                  </div>
                </div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.wrapper}>
                  <div className={styles.div6}>3</div>
                </div>
                <div className={styles.chooseCryptoParent}>
                  <div className={styles.getCrypto}>Get crypto</div>
                  <div className={styles.selectYourDesired}>
                    Check your wallet . We hope to see you soon️️!
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className={styles.goswap52Icon} alt="" src="/goswap5-2@2x.png" />
          <div className={styles.launchAppParent}>
            <div className={styles.launch}>Launch App</div>
            <img
              className={styles.chevronRightIcon}
              alt=""
              src="/chevronright1.svg"
            />
          </div>
        </div>
        <div className={styles.advertGroup}>
          <div className={styles.advert1}>
            <div className={styles.onboardDiverseAudiences}>
              Buy or sell crypto assets in just a few clicks
            </div>
            <div
              className={styles.globalCoverage}
            >{`Buy & Sell Crypto with Govercity`}</div>
          </div>
          <div className={styles.partnersCard2}>
            <img
              className={styles.partnersCardChild3}
              alt=""
              src="/frame-132131473113@2x.png"
            />
            <div className={styles.onramper2}>Choose</div>
            <div className={styles.partnersCardChild4} />
            <div className={styles.partnersCardChild5} />
            <div className={styles.div9}>1</div>
          </div>
          <div className={styles.partnersCard3}>
            <img
              className={styles.partnersCardChild3}
              alt=""
              src="/frame-132131473114@2x.png"
            />
            <div className={styles.onramper2}>Exchange</div>
            <div className={styles.partnersCardChild4} />
            <div className={styles.partnersCardChild5} />
            <div className={styles.div9}>2</div>
          </div>
          <div className={styles.partnersCard4}>
            <img
              className={styles.partnersCardChild3}
              alt=""
              src="/frame-132131473115@2x.png"
            />
            <div className={styles.onramper2}>Receive</div>
            <div className={styles.partnersCardChild4} />
            <div className={styles.partnersCardChild5} />
            <div className={styles.div9}>3</div>
          </div>
          <div className={styles.partnersCard5}>
            <img
              className={styles.partnersCardChild3}
              alt=""
              src="/frame-132131473116@2x.png"
            />
            <div className={styles.onramper2}>Spend</div>
            <div className={styles.partnersCardChild4} />
            <div className={styles.partnersCardChild5} />
            <div className={styles.div9}>4</div>
          </div>
        </div>

        <div className={styles.advertWrapper}>
          <div className={styles.advert2}>
            <div className={styles.liquidityAggregationFrom4}>
              Coming soon ...
            </div>
            <div className={styles.services2}>Earn</div>
          </div>
        </div>
        {/* Eagle Ends */}
        {/* ======================================{Required component Here}=========================================================== */}
        <div className="flex flex-row justify-between w-full absolute top-[100px]">
          <div className={styles.goDesktopHome2InnerCustom}>
            <div className={styles.advertParentCustom}>
              <div className={styles.advertCustom}>
                <div className={styles.onboardDiverseAudiences}>
                  Onboard diverse audiences worldwide with our great coverage
                  and currencies offered
                </div>
                <div className={styles.globalCoverage}>Global coverage</div>
              </div>
              <div className="flex flex-row gap-2 w-[680px] py-1 absolute top-[220px]">
                <div
                  className={`bg-gray-100 ${styles.supportedCountriesParentCustom}`}
                >
                  <div className={styles.supportedCountries}>Countries</div>
                  <img
                    className={styles.frameChild}
                    alt=""
                    src="/coverage-170.png"
                  />
                  <div className={styles.div}>170+</div>
                </div>
                <div className={`bg-gray-100 ${styles.frameParentCustom}`}>
                  <img
                    className={styles.frameItem}
                    alt=""
                    src="/coverage-350.png"
                  />
                  <div className={styles.supportedCountries}>Crypto assets</div>
                  <div className={styles.div1}>350+</div>
                </div>
                <div
                  className={`bg-gray-100 ${styles.supportedFiatCurrenciesParentCustom}`}
                >
                  <div className={styles.supportedCountries}>
                    Fiat currencies
                  </div>
                  <img
                    className={styles.frameInner}
                    alt=""
                    src="/coverage-40.png"
                  />
                  <div className={styles.div2}>40+</div>
                </div>
              </div>
            </div>
            <div className={styles.payOptions}>
              <div className={styles.payInThe}>
                Pay in the most convenient way for you
              </div>
              <img
                className={styles.unionPay1Icon}
                alt=""
                src="/unionpay-1.svg"
              />
              <img className={styles.visa1Icon} alt="" src="/visa-1.svg" />
              <img
                className={styles.masterCard1Icon}
                alt=""
                src="/mastercard-1.svg"
              />
              <img className={styles.sepa1Icon} alt="" src="/sepa-1.svg" />
              <img
                className={styles.applePay1Icon}
                alt=""
                src="/applepay-1.svg"
              />
              <div className={styles.payment}>Payment</div>
            </div>
          </div>
          <LaunchApp />
        </div>
      </div>
      {/* Footer starts */}
      <div className={styles.footerWrapper}>
        <div className={styles.footer}>
          <div className={styles.aboutUs}>About us</div>
          <div className={styles.swap5}>Swap</div>
          <div className={styles.faq}>FAQ</div>
          <div className={styles.blogNews}>{`Blog & News`}</div>
          <div className={styles.buy}>Buy</div>
          <div className={styles.termsOfUse}>Terms of use</div>
          <div className={styles.sell}>Sell</div>
          <div className={styles.contactUs}>Contact us</div>
          <div className={styles.privacyPolicy}>Privacy policy</div>
          <div className={styles.exchange}>Exchange</div>
          <div className={styles.helpCenter}>Help center</div>
          <div className={styles.riskDisclosureStatement}>
            Risk disclosure statement
          </div>
          <div className={styles.telegramBot}>Telegram Bot</div>
          <div className={styles.aboutUs1}>About us</div>
          <div className={styles.company}>Company</div>
          <div className={styles.govercitycom}>Govercity.com</div>
          <div className={styles.services3}>Services</div>
          <div className={styles.support}>Support</div>
          <div className={styles.legal}>Legal</div>
          <div className={styles.followUs}>Follow us</div>
          <img className={styles.youtube2Icon} alt="" src="/youtube-2.svg" />
          <img className={styles.twitter2Icon} alt="" src="/twitter-2.svg" />
          <img className={styles.telegram2Icon} alt="" src="/telegram-2.svg" />
          <img
            className={styles.instagram2Icon}
            alt=""
            src="/instagram-2.svg"
          />
          <img className={styles.discord2Icon} alt="" src="/discord-2.svg" />
          <img
            className={styles.defaultASilhouetteDesignOfIcon1}
            alt=""
            src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-1@2x.png"
          />
          <div className={styles.inchAllRights}>
            © 2023 Govercity, All Rights Reserved.
          </div>
          <div className={styles.logoCard}>
            <img
              className={styles.defaultASilhouetteDesignOfIcon2}
              alt=""
              src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-4@2x.png"
            />
          </div>
        </div>
      </div>
      {/* Footerends */}
    </div>
  );
};

export default GovercityDesktop;
