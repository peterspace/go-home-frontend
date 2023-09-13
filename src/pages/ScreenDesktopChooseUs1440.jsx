import AboutMenu from "../components/AboutMenu";
import ContainerHeaderDesktop from "../components/ContainerHeaderDesktop";
import SliderImageIcon from "../components/SliderImageIcon";
import FooterEco from "../components/FooterEco";
import styles from "./ScreenDesktopChooseUs1440.module.css";
const ScreenDesktopChooseUs1440 = () => {
  return (
    <div className={styles.screenDesktopChooseUs1440}>
      <div className={styles.aboutformContainer}>
        <div className={styles.aboutForm}>
          <div className={styles.aboutFormChild} />
          <div className={styles.chooseUsBody}>
            <div className={styles.whyChooseUsContainer}>
              <p className={styles.whyChooseUs}>**Why choose us**</p>
              <p className={styles.blankLine}>&nbsp;</p>
              <p className={styles.blankLine}>
                At Govercity, we are committed to revolutionizing the blockchain
                ecosystem and ushering in a new era of Web 3.0 services. Our
                platform is built on the principles of decentralization,
                security, and innovation, providing a wide range of services
                that empower users to explore the limitless potential of
                blockchain technology.
              </p>
            </div>
          </div>
          <AboutMenu
            aboutMenuPosition="absolute"
            aboutMenuTop="calc(50% - 200px)"
            aboutMenuLeft="58px"
          />
        </div>
      </div>
      <ContainerHeaderDesktop
        containerHeaderDesktopPosition="absolute"
        containerHeaderDesktopTop="0px"
        containerHeaderDesktopLeft="0px"
      />
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

export default ScreenDesktopChooseUs1440;
