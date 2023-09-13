import VisionContainer from '../components/VisionContainer';
import ContainerHeaderDesktop from '../components/ContainerHeaderDesktop';
import SliderImageIcon from '../components/SliderImageIcon';
import FooterEco from '../components/FooterEco';
import styles from './ScreenDesktopJoin1440.module.css';
const ScreenDesktopJoin1440 = () => {
  return (
    <div className={styles.screenDesktopJoin1440}>
      <VisionContainer
        visionText="**Join Us in Building the Future**"
        visionStatement="We invite you to join us on this exciting journey as we shape the future of Web 3.0 and unlock the immense potential of blockchain technology. Whether you're a blockchain enthusiast, a trader, or a newcomer seeking financial inclusion, Govercity is here to support your aspirations in the decentralized world."
        contentTop="calc(50% - 164px)"
        contentLeft="15px"
      />
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

export default ScreenDesktopJoin1440;
