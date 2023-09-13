import AboutFormContainer2 from "../components/AboutFormContainer2";
import ContainerHeaderDesktop from "../components/ContainerHeaderDesktop";
import SliderImageIcon from "../components/SliderImageIcon";
import FooterEco from "../components/FooterEco";
import styles from "./ScreenDesktopAbout1440.module.css";
const ScreenDesktopAbout1440 = () => {
  return (
    <div className={styles.screenDesktopAbout1440}>
      <AboutFormContainer2 />
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

export default ScreenDesktopAbout1440;
