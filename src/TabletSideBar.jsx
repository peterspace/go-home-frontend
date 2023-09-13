import React, { useState, useEffect } from 'react';

import stylesTabletSidebar from './TabletFullSidebar.module.css';
import { useNavigate } from 'react-router-dom';

const TabletSideBar = (props) => {
  const navigate = useNavigate();

  const { setIsSideBarVisible } = props;

  const [isSwapping, setIsSwapping] = useState(false);
  const [isExchange, setIsExchange] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const [isDocumentation, setIsDocumentation] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (isSwapping) {
      setTimeout(() => {
        window.location.href = 'http://swap.govercity.com/';
        setIsSwapping(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwapping]);

  useEffect(() => {
    if (isBuy) {
      setTimeout(() => {
        window.location.href = 'http://buy.govercity.com/';
        setIsBuy(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuy]);

  useEffect(() => {
    if (isExchange) {
      setTimeout(() => {
        window.location.href = 'http://exchange.govercity.com/';
        setIsExchange(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExchange]);

  useEffect(() => {
    if (isDocumentation) {
      setTimeout(() => {
        window.location.href = 'https://govercity.com';
        setIsDocumentation(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);
  useEffect(() => {
    if (isHome) {
      setTimeout(() => {
        window.location.href = 'https://govercity.com';
        setIsHome(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  return (
    <div
      className={`font-satoshi flex flex-col h-screen justify-start gap-20 overflow-auto ${stylesTabletSidebar.tabletSidebar}`}
    >
      <div
        className={`cursor-pointer mt-10 ${stylesTabletSidebar.defaultASilhouetteDesignOfGroup}`}
        onClick={() => {
          setIsSideBarVisible(false);
        }}
      >
        <img
          className={stylesTabletSidebar.defaultASilhouetteDesignOfIcon3}
          alt=""
          src="/default-a-silhouette-design-of-a-eagle-sunset-design-t-shirt-3-1698a835a2d5488e8794031be1fa6098-0-41@2x.png"
        />
        <div className={stylesTabletSidebar.govercity2}>Govercity</div>
        <img
          className={stylesTabletSidebar.menu01Icon1}
          alt=""
          src="/menu011.svg"
        />
      </div>
      <div className={stylesTabletSidebar.menuSidebar}>
        <div className={stylesTabletSidebar.iconButton}>
          <img
            className={stylesTabletSidebar.swapwhite2Icon}
            alt=""
            src="/swapwhite-2@2x.png"
          />
        </div>
        <div className={stylesTabletSidebar.iconButton1}>
          <img
            className={stylesTabletSidebar.swapwhite2Icon}
            alt=""
            src="/paywhite-3@2x.png"
          />
        </div>
        <div className={stylesTabletSidebar.iconButton2}>
          <img
            className={stylesTabletSidebar.swapwhite2Icon}
            alt=""
            src="/exchangewhite1-2@2x.png"
          />
        </div>
        <div className={stylesTabletSidebar.iconButton3}>
          <img
            className={stylesTabletSidebar.swapwhite2Icon}
            alt=""
            src="/file-2@2x.png"
          />
        </div>
        <div
          className={`cursor-pointer ${stylesTabletSidebar.swap1}`}
          onClick={() => setIsSwapping(true)}
        >
          Swap
        </div>
        <div
          className={`cursor-pointer ${stylesTabletSidebar.buy}`}
          onClick={() => setIsBuy(true)}
        >
          Buy
        </div>
        <div
          className={`cursor-pointer ${stylesTabletSidebar.exchange}`}
          onClick={() => setIsExchange(true)}
        >
          Exchange
        </div>
        <div
          className={`cursor-pointer ${stylesTabletSidebar.documentation}`}
          onClick={() => setIsDocumentation(true)}
        >
          Documentation
        </div>
      </div>
    </div>
  );
};

export default TabletSideBar;
// const [isSideBarVisible, setIsSideBarVisible]
