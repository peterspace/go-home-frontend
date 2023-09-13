import { useMemo } from 'react';
import styles from './ContainerHeaderDesktop.module.css';
const ContainerHeaderDesktop = (props) => {
  const {
    containerHeaderDesktopPosition,
    containerHeaderDesktopTop,
    containerHeaderDesktopLeft,
    setIsAbout,
    setIsLaunch,
    setIsContact,
    setIsHome,
  } = props;
  const containerHeaderDesktopStyle = useMemo(() => {
    return {
      position: containerHeaderDesktopPosition,
      top: containerHeaderDesktopTop,
      left: containerHeaderDesktopLeft,
    };
  }, [
    containerHeaderDesktopPosition,
    containerHeaderDesktopTop,
    containerHeaderDesktopLeft,
  ]);

  return (
    <div
      // className={`outline outline-[#231932] ${styles.containerHeaderDesktop}`}
      className={`outline outline-[#392a4e] ${styles.containerHeaderDesktop}`}
      style={containerHeaderDesktopStyle}
    >
      {/* <div className={`relative flex flex-col overflow-hidden w-full h-[98px] text-white`}> */}
      <div className={`flex flex-row justify-between ml-8 mr-8`}>
        <div
          className="flex flex-row gap-2"
          onClick={() => {
            setIsHome(true);
            setIsAbout(false);
            setIsLaunch(false);
            setIsContact(false);
          }}
        >
          <img
            className="mt-[10px] w-[36px] h-[46px] overflow-hidden"
            alt=""
            src="/logoframe.svg"
          />
          <div className="mt-[19px]">Govercity</div>
        </div>
        <div className="flex flex-row gap-4 mt-[19px]">
          <div
            className={`transition-transform duration-300 hover:scale-110 cursor-pointer hover:text-color-slateblue`}
            onClick={() => {
              setIsHome(true);
              setIsAbout(false);
              setIsLaunch(false);
              setIsContact(false);
            }}
          >
            Services
          </div>
          <div
            className={`transition-transform duration-300 hover:scale-110 cursor-pointer hover:text-color-slateblue`}
            onClick={() => {
              setIsHome(false);
              setIsAbout(false);
              setIsLaunch(false);
              setIsContact(true);
            }}
          >
            Contact
          </div>
          <div
            className={`transition-transform duration-300 hover:scale-110 cursor-pointer hover:text-color-slateblue`}
            onClick={() => {
              setIsHome(false);
              setIsAbout(true);
              setIsLaunch(false);
              setIsContact(false);
            }}
          >
            About
          </div>
        </div>
      </div>
      {/* <div className={`${styles.boderSection}`}></div> */}
    </div>
  );
};

export default ContainerHeaderDesktop;
