import { useMemo } from "react";
import styles from "./FooterEco.module.css";
const FooterEco = ({
  imageDimensions,
  imageDimensionsText,
  productDimensionsText,
  footerEcoPosition,
  footerEcoBottom,
  footerEcoLeft,
}) => {
  const footerEcoStyle = useMemo(() => {
    return {
      position: footerEcoPosition,
      bottom: footerEcoBottom,
      left: footerEcoLeft,
    };
  }, [footerEcoPosition, footerEcoBottom, footerEcoLeft]);

  return (
    <div className={styles.footerEco} style={footerEcoStyle}>
      <div className={styles.footer}>
        <div className={styles.aboutUs}>About us</div>
        <div className={styles.swap}>Swap</div>
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
        <div className={styles.services}>Services</div>
        <div className={styles.support}>Support</div>
        <div className={styles.legal}>Legal</div>
        <div className={styles.followUs}>Follow us</div>
        <img className={styles.youtube2Icon} alt="" src="/youtube-2.svg" />
        <img className={styles.twitter2Icon} alt="" src="/twitter-2.svg" />
        <img className={styles.telegram2Icon} alt="" src="/telegram-2.svg" />
        <img className={styles.instagram2Icon} alt="" src={imageDimensions} />
        <img className={styles.discord2Icon} alt="" src="/discord-2.svg" />
        <div className={styles.inchAllRights}>
          © 2023 1inch, All Rights Reserved.
        </div>
        <img className={styles.footerChild} alt="" src={imageDimensionsText} />
        <div className={styles.logoFrame} />
        <img className={styles.footerItem} alt="" src={productDimensionsText} />
      </div>
    </div>
  );
};

export default FooterEco;
