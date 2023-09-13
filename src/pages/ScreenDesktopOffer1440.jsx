import AboutFormContainer from "../components/AboutFormContainer";
import SliderImageIcon from "../components/SliderImageIcon";
import FooterEco from "../components/FooterEco";
import styles from "./ScreenDesktopOffer1440.module.css";
const ScreenDesktopOffer1440 = () => {
  return (
    <div className={styles.screenDesktopOffer1440}>
      <AboutFormContainer />
      <div className={styles.containerHeaderDesktop}>
        <div className={styles.headerDesktop}>
          <div className={styles.govercityLogo}>
            <img className={styles.logoFrameIcon} alt="" src="/logoframe.svg" />
            <div className={styles.govercity}>Govercity</div>
          </div>
          <div className={styles.headerDesktopInner}>
            <div className={styles.servicesParent}>
              <div className={styles.services}>Services</div>
              <div className={styles.contact}>Contact</div>
              <div className={styles.contact}>About</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <SliderImageIcon
          imageFileName="/sliderimage@2x.png"
          propTop="0px"
          propLeft="calc(50% - 512px)"
          propWidth="1024px"
          propHeight="685px"
          propRight="unset"
          propBottom="unset"
          propMaxWidth="unset"
          propMaxHeight="unset"
        />
        <div className={styles.web30EcoContainer}>
          <p className={styles.web30Eco}>Web 3.0 eco</p>
          <p className={styles.yourGatewayTo}>Your gateway to web 3.0</p>
        </div>
      </div>
      <FooterEco
        imageDimensions="/instagram-2.svg"
        imageDimensionsText="/group-104.svg"
        productDimensionsText="/group-1041.svg"
        footerEcoPosition="absolute"
        footerEcoBottom="0px"
        footerEcoLeft="calc(50% - 720px)"
      />
    </div>
  );
};

export default ScreenDesktopOffer1440;
