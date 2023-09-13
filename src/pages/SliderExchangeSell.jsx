import SliderImageIcon from "../components/SliderImageIcon";
import styles from "./SliderExchangeSell.module.css";
const SliderExchangeSell = () => {
  return (
    <div className={styles.sliderExchangeSell}>
      <SliderImageIcon
        imageFileName="/sliderimage4@2x.png"
        propTop="0%"
        propLeft="0%"
        propWidth="100%"
        propHeight="100%"
        propRight="0%"
        propBottom="0%"
        propMaxWidth="100%"
        propMaxHeight="100%"
      />
      <div className={styles.frameInfo}>
        <div className={styles.div}>10+</div>
        <div className={styles.majorBlockchainNetworks}>
          Major blockchain networks
        </div>
      </div>
    </div>
  );
};

export default SliderExchangeSell;
