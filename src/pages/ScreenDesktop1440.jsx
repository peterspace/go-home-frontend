import HeroFrame from '../components/HeroFrame';
import ActionButton from '../components/ActionButton';
import ContainerHeaderDesktop from '../components/ContainerHeaderDesktop';
import SliderImageIcon from '../components/SliderImageIcon';
import FooterEco from '../components/FooterEco';
import styles from './ScreenDesktop1440.module.css';
const ScreenDesktop1440 = () => {
  return (
    <div className={styles.screenDesktop1440}>
      <HeroFrame
        showLaunch2={false}
        showLaunch3={false}
        heroFramePosition="absolute"
        heroFrameBackgroundImage={`url("/heroframe1@3x.png")`}
        heroFrameTop="82px"
        heroFrameLeft="calc(50% - 676px)"
      />
      <div className={styles.heroButtons}>
        <ActionButton
          dimensionLabel="/chevronright.svg"
          actionLabel="Explore"
          actionButtonBorder="1px solid var(--text-3-d-p)"
          actionButtonBackgroundColor="unset"
          actionButtonFlexShrink="0"
          exploreColor="#fff"
        />
        <ActionButton
          dimensionLabel="/chevronright1.svg"
          actionLabel="Launch"
          actionButtonBorder="1px solid var(--color-thistle)"
          actionButtonBackgroundColor="#fff"
          actionButtonFlexShrink="0"
          exploreColor="#130d1a"
        />
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

export default ScreenDesktop1440;
