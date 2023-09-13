import { useMemo } from "react";
import styles from "./AboutMenu.module.css";
const AboutMenu = ({ aboutMenuPosition, aboutMenuTop, aboutMenuLeft }) => {
  const aboutMenuStyle = useMemo(() => {
    return {
      position: aboutMenuPosition,
      top: aboutMenuTop,
      left: aboutMenuLeft,
    };
  }, [aboutMenuPosition, aboutMenuTop, aboutMenuLeft]);

  return (
    <div className={styles.aboutMenu} style={aboutMenuStyle}>
      <div className={styles.content}>
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>About us</div>
      </div>
      <div className={styles.content1}>
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>Our Vision</div>
      </div>
      <div className={styles.content2}>
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>What we offer</div>
      </div>
      <div className={styles.content3}>
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.whyChooseUs}>Why choose us</div>
      </div>
      <div className={styles.content4}>
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>How it works</div>
      </div>
      <div className={styles.content5}>
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>Contact us</div>
      </div>
      <div className={styles.content6}>
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>Join us</div>
      </div>
    </div>
  );
};

export default AboutMenu;
