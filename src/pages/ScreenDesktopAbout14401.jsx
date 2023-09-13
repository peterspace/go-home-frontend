import AboutMenu from "../components/AboutMenu";
import ContainerHeaderDesktop from "../components/ContainerHeaderDesktop";
import SliderImageIcon from "../components/SliderImageIcon";
import FooterEco from "../components/FooterEco";
import styles from "./ScreenDesktopAbout14401.module.css";
const ScreenDesktopAbout14401 = () => {
  return (
    <div className={styles.screenDesktopAbout1440}>
      <div className={styles.aboutformContainer}>
        <div className={styles.aboutForm}>
          <div className={styles.aboutFormChild} />
          <div className={styles.aboutBody}>
            <div className={styles.aboutUsAtContainer}>
              <p className={styles.aboutUs}>**About us**</p>
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
            aboutMenuTop="calc(50% - 187px)"
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
        imageDimensions="/instagram-21.svg"
        imageDimensionsText="/group-1042.svg"
        productDimensionsText="/group-1043.svg"
        footerEcoPosition="absolute"
        footerEcoBottom="0px"
        footerEcoLeft="calc(50% - 720px)"
      />
    </div>
  );
};

export default ScreenDesktopAbout14401;
