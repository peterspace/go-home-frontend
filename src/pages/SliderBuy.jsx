import SliderImageIcon from "../components/SliderImageIcon";
import styles from "./SliderBuy.module.css";
const SliderBuy = () => {
  return (
    <div className={styles.sliderBuy}>
      <SliderImageIcon
        imageFileName="/sliderimage5@2x.png"
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
        <div className={styles.div}>40+</div>
        <div className={styles.supportedFiatCurrencies}>
          Supported fiat currencies
        </div>
      </div>
    </div>
  );
};

export default SliderBuy;
