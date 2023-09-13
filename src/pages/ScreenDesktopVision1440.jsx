import VisionContainer from "../components/VisionContainer";
import ContainerHeaderDesktop from "../components/ContainerHeaderDesktop";
import SliderImageIcon from "../components/SliderImageIcon";
import FooterEco from "../components/FooterEco";
import styles from "./ScreenDesktopVision1440.module.css";
const ScreenDesktopVision1440 = () => {
  return (
    <div className={styles.screenDesktopVision1440}>
      <VisionContainer
        visionText="**Our Vision**"
        visionStatement="Our vision is to create an inclusive and seamless blockchain ecosystem that bridges the gap between traditional finance and the decentralized world. We believe in a future where everyone has the freedom to participate in the digital economy, regardless of geographical or financial barriers. Through our user-friendly and efficient platform, we aim to redefine the way people interact with blockchain technology and unlock its true potential."
      />
      <ContainerHeaderDesktop
        containerHeaderDesktopPosition="absolute"
        containerHeaderDesktopTop="0px"
        containerHeaderDesktopLeft="0px"
      />
      <div className={styles.sliderContainer}>
        <SliderImageIcon imageFileName="/sliderimage@2x.png" />
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

export default ScreenDesktopVision1440;
