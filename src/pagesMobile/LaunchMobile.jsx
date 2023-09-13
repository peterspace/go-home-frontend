import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import stylesLaunchMobile from "./FrameComponent.module.css";
const LaunchMobile = () => {

  const [isRedirect, setIsRedirect] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (isRedirect) {
      setTimeout(() => {
        navigate('/mswap');
        setIsRedirect(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirect]);

  return (
    <div className={stylesLaunchMobile.frameParent}>
      <div className={`cursor-pointer ${stylesLaunchMobile.xCloseWrapper}`}
      onClick={() => {
        setIsRedirect(true);
      }}
      >
        <img className={stylesLaunchMobile.xCloseIcon} alt="" src="/xclose.svg" />
      </div>
      <div className={stylesLaunchMobile.docsParent}>
        <div className={stylesLaunchMobile.docs}>Docs</div>
        <div className={stylesLaunchMobile.governanceParent}>
          <div className={stylesLaunchMobile.governance}>Governance</div>
          <div className={stylesLaunchMobile.comingSoonWrapper}>
            <div className={stylesLaunchMobile.comingSoon}>Coming Soon</div>
          </div>
        </div>
        <div className={stylesLaunchMobile.governanceParent}>
          <div className={stylesLaunchMobile.governance}>Voting</div>
          <div className={stylesLaunchMobile.comingSoonWrapper}>
            <div className={stylesLaunchMobile.comingSoon}>Coming Soon</div>
          </div>
        </div>
      </div>
      <div className={`cursor-pointer ${stylesLaunchMobile.launchAppWrapper}`} 
      onClick={() => {
        setIsRedirect(true);
      }}
      >
        <div className={stylesLaunchMobile.launchApp}>Launch App</div>
      </div>
    </div>
  );
};

export default LaunchMobile;
