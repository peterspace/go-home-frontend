import { useMemo } from "react";
import styles from "./SliderImageIcon.module.css";
const SliderImageIcon = ({
  imageFileName,
  propTop,
  propLeft,
  propWidth,
  propHeight,
  propRight,
  propBottom,
  propMaxWidth,
  propMaxHeight,
}) => {
  const sliderImageIconStyle = useMemo(() => {
    return {
      top: propTop,
      left: propLeft,
      width: propWidth,
      height: propHeight,
      right: propRight,
      bottom: propBottom,
      maxWidth: propMaxWidth,
      maxHeight: propMaxHeight,
    };
  }, [
    propTop,
    propLeft,
    propWidth,
    propHeight,
    propRight,
    propBottom,
    propMaxWidth,
    propMaxHeight,
  ]);

  return (
    <img
      className={styles.sliderImageIcon}
      alt=""
      src={imageFileName}
      style={sliderImageIconStyle}
    />
  );
};

export default SliderImageIcon;
