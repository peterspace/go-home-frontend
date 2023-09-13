import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// import { wagmiClient} from './components/config/wagmiClient';
import { wagmiClient } from './components/config/config';
import { WagmiConfig } from 'wagmi';

// import stylesLaptop from './Layout.module.css';
import { useAccount } from 'wagmi';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import ModalLaoding from './ModalLaoding';

import useWindowResize from './hooks/useWindowResize';
export default function Layout() {
  const { width, height } = useWindowResize();
  console.log(width, height);

  const navigate = useNavigate();

  //==============={Secondary Data}=========================

  // const [isChainModalVisible, setIsChainModalVisible] = useState(false)

  //======={Chain}=============================================
  const chain = useSelector((state) => state?.swap?.chain);
  const chainId = chain ? chain.id : 1;
  console.log({ chainId: chainId });

  const [isRedirect, setIsRedirect] = useState(false);

  const [isDocumentation, setIsDocumentation] = useState(false);
  const [isHome, setIsHome] = useState(false);

  const [isLaunching, setIsLaunching] = useState(false);
  useEffect(() => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
    }, 3000);
  }, []);

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

  useEffect(() => {
    if (isRedirect) {
      setTimeout(() => {
        navigate('/dbalancenetwork');
        setIsRedirect(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirect]);

  return (
    <>
      {/* <WagmiConfig client={wagmiClient}> */}
        <Outlet />
        <ModalLaoding visible={isLaunching}>
          <div className="flex flex-col justify-center items-center gap-10">
            {/* <div className="mr-10 mt-12 text-[56px] font-bold text-white">Loading ...</div> */}
          </div>
        </ModalLaoding>
      {/* </WagmiConfig> */}
    </>
  );
}
