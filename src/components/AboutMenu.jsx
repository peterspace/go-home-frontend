import { useMemo } from 'react';
import styles from './AboutMenu.module.css';
const AboutMenu = (props) => {
  const {
    aboutMenuPosition,
    aboutMenuTop,
    aboutMenuLeft,
    setIsAbout,
    setIsVision,
    setIsOffer,
    setIsChooseUs,
    setIsWorks,
    setIsContact,
    setIsJoin,
  } = props;
  const aboutMenuStyle = useMemo(() => {
    return {
      position: aboutMenuPosition,
      top: aboutMenuTop,
      left: aboutMenuLeft,
    };
  }, [aboutMenuPosition, aboutMenuTop, aboutMenuLeft]);

  return (
    <div className={styles.aboutMenu} style={aboutMenuStyle}>
      <div
        className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.content}`}
        onClick={() => {
          setIsAbout(true);
          setIsVision(false);
          setIsOffer(false);
          setIsChooseUs(false);
          setIsWorks(false);
          setIsContact(false);
          setIsJoin(false);
        }}
      >
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>About us</div>
      </div>
      <div
        className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.content1}`}
        onClick={() => {
          setIsAbout(false);
          setIsVision(true);
          setIsOffer(false);
          setIsChooseUs(false);
          setIsWorks(false);
          setIsContact(false);
          setIsJoin(false);
        }}
      >
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>Our Vision</div>
      </div>
      <div
        className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.content2}`}
        onClick={() => {
          setIsAbout(false);
          setIsVision(false);
          setIsOffer(true);
          setIsChooseUs(false);
          setIsWorks(false);
          setIsContact(false);
          setIsJoin(false);
        }}
      >
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>What we offer</div>
      </div>
      <div
        className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.content3}`}
        onClick={() => {
          setIsAbout(false);
          setIsVision(false);
          setIsOffer(false);
          setIsChooseUs(true);
          setIsWorks(false);
          setIsContact(false);
          setIsJoin(false);
        }}
      >
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.whyChooseUs}>Why choose us</div>
      </div>
      <div
        className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.content4}`}
        onClick={() => {
          setIsAbout(false);
          setIsVision(false);
          setIsOffer(false);
          setIsChooseUs(false);
          setIsWorks(true);
          setIsContact(false);
          setIsJoin(false);
        }}
      >
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>How it works</div>
      </div>
      <div
        className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.content5}`}
        onClick={() => {
          setIsAbout(false);
          setIsVision(false);
          setIsOffer(false);
          setIsChooseUs(false);
          setIsWorks(false);
          setIsContact(true);
          setIsJoin(false);
        }}
      >
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>Contact us</div>
      </div>
      <div
        className={`transition-transform duration-300 hover:scale-110 cursor-pointer ${styles.content6}`}
        onClick={() => {
          setIsAbout(false);
          setIsVision(false);
          setIsOffer(false);
          setIsChooseUs(false);
          setIsWorks(false);
          setIsContact(false);
          setIsJoin(true);
        }}
      >
        <div className={styles.iconButton}>
          <img className={styles.file2Icon} alt="" src="/file-2@2x.png" />
        </div>
        <div className={styles.aboutUs}>Join us</div>
      </div>
    </div>
  );
};

export default AboutMenu;
