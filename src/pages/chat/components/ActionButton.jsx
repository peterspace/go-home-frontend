import { useMemo } from "react";
import styles from "./ActionButton.module.css";
const ActionButton = ({
  dimensionLabel,
  actionLabel,
  actionButtonBorder,
  actionButtonBackgroundColor,
  actionButtonFlexShrink,
  exploreColor,
}) => {
  const actionButtonStyle = useMemo(() => {
    return {
      border: actionButtonBorder,
      backgroundColor: actionButtonBackgroundColor,
      flexShrink: actionButtonFlexShrink,
    };
  }, [actionButtonBorder, actionButtonBackgroundColor, actionButtonFlexShrink]);

  const exploreStyle = useMemo(() => {
    return {
      color: exploreColor,
    };
  }, [exploreColor]);

  return (
    <div className={styles.actionButton} style={actionButtonStyle}>
      <div className={styles.actionText}>
        <img className={styles.chevronRightIcon} alt="" src={dimensionLabel} />
        <div className={styles.explore} style={exploreStyle}>
          {actionLabel}
        </div>
      </div>
    </div>
  );
};

export default ActionButton;
