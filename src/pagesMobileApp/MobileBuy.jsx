import styles from "./MobileBuy.module.css";
import Header from "./Header";
import FrameBuyConnect from "../components/Buy/FrameBuyConnect";
//============={Not in use}============================
const MobileBuy = () => {
  return (
    <div className={styles.div}>
      <div className={styles.child} />
      <div className={styles.item} />
      <div className={styles.inner} />
      <div className={styles.ellipseDiv} />
       <Header />
       {/* <div className="mt-12"> */}
       <div className={`mt-1 ${styles.frameGroup}`}>
       <FrameBuyConnect />  
       </div>

       {/* </div> */}
       
    </div>
  );
};

export default MobileBuy;
