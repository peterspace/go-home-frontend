import React from 'react';
import { Outlet } from 'react-router-dom';
// import { wagmiClient} from './components/config/wagmiClient';
import { wagmiClient } from './components/config/config';
import { WagmiConfig } from 'wagmi';
// import ExchangeHeader from './screens/ExchangeHeader';
import ExchangeHeaderMobile from './screensMobile/ExchangeHeaderMobile';

import { dSwap } from './assets';

import stylesHeaderMobile from './Component.module.css';

export default function LayoutMobile() {
  // console.info('web3 id', import.meta.env.VITE_WEB3_PROJECT_ID);
  console.log("Layout Mobile")
  return (
    <>
      <WagmiConfig client={wagmiClient}>

      <div className={stylesHeaderMobile.div}>
          <div className={stylesHeaderMobile.child} />
          <div className={stylesHeaderMobile.item} />
          <div className={stylesHeaderMobile.inner} />
          <div className={stylesHeaderMobile.ellipseDiv} />
          <ExchangeHeaderMobile />
          <Outlet />
        </div>
         {/* <Outlet /> */}
         {/* <div className={stylesHeaderMobile.div}>
          <div className={stylesHeaderMobile.child} />
          <div className={stylesHeaderMobile.item} />
          <div className={stylesHeaderMobile.inner} />
          <div className={stylesHeaderMobile.ellipseDiv} />
          <Outlet />
        </div> */}
      </WagmiConfig>
    </>
  );
}
