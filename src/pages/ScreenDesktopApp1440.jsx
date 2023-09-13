import ContainerHeaderDesktop from "../components/ContainerHeaderDesktop";
import SliderImageIcon from "../components/SliderImageIcon";
import FooterEco from "../components/FooterEco";
import styles from "./ScreenDesktopApp1440.module.css";
const ScreenDesktopApp1440 = () => {
  return (
    <div className={styles.screenDesktopApp1440}>
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
      <div className={styles.desktopAppContainer2}>
        <div className={styles.desktopApp}>
          <div className={styles.notification}>
            <div className={styles.conatctUsCard}>
              <input
                className={styles.conatctUsCardChild}
                type="text"
                placeholder="Name"
                required
              />
              <input
                className={styles.conatctUsCardItem}
                type="text"
                placeholder="Email"
                required
              />
              <input
                className={styles.conatctUsCardInner}
                type="text"
                placeholder="Subject"
                required
              />
              <button className={styles.sendWrapper}>
                <div className={styles.send}>Send</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenDesktopApp1440;
