import { useMemo } from "react";
import styles from "./CryptoSelectionContainer.module.css";
const CryptoSelectionContainer = ({
  prop,
  chooseCrypto,
  selectYourDesiredCryptoPa,
  propWidth,
}) => {
  const chooseCryptoStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className={styles.frameParent}>
      <div className={styles.wrapper}>
        <div className={styles.div}>{prop}</div>
      </div>
      <div className={styles.chooseCryptoParent}>
        <div className={styles.chooseCrypto} style={chooseCryptoStyle}>
          {chooseCrypto}
        </div>
        <div className={styles.selectYourDesired}>
          {selectYourDesiredCryptoPa}
        </div>
      </div>
    </div>
  );
};

export default CryptoSelectionContainer;
