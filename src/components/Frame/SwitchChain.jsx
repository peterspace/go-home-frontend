import { useState, useEffect } from 'react';

import { networksOptions } from '../../constants';
import { useSelector } from 'react-redux';

//=============={Using wallet Connect}======================
import { useSwitchNetwork, useAccount } from 'wagmi';

import { useDispatch } from 'react-redux';

const SwitchChain = ({ setIsVisible }) => {
  const dispatch = useDispatch();

  const { isConnected } = useAccount();

  const { switchNetwork } = useSwitchNetwork();

  const isChainChange = localStorage.getItem('chainSwitch')
    ? JSON.parse(localStorage.getItem('chainSwitch'))
    : false;

  // console.log({ isChainChangeL: isChainChange });

  // const chainL =
  //   JSON.parse(localStorage.getItem('chain')) || networksOptions[0] || '{}';

  const chainL = useSelector((state) => state?.swap?.chain);

  const [chain, setChain] = useState(chainL);
  const chainId = chain ? chain.id : 1;

  useEffect(() => {
    localStorage.setItem('chainId', JSON.stringify(chainId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  useEffect(() => {
    localStorage.setItem('chain', JSON.stringify(chain));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  // useEffect(() => {
  //   if (isConnected === true && isChainChange === true) {
  //     switchNetwork(chain.id);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isConnected, isChainChange]);

  return (
    <>
      {/*
            ====================================================================
                Switch Network Modals
            ====================================================================
            */}
      <section className="flex flex-col justify-center items-center gap-2 mb-8">
        <div className="px-2 py-2 border border-secondaryFillLight rounded-xl bg-primaryFill shadow-lg mb-8 w-[200px]">
          {/* Title:Select a Token */}
          <section className="mb-8 mt-4 ml-4 mr-4">
            <div className="flex flex-row justify-between items-center">
              <span className="text-base text-primaryText">
                Select a Network
              </span>
              <div>
                <div
                  className=" justify-start items-start px-1 py-1 rounded-lg bg-secondaryFill mr-4 hover:scale-110 ease-in duration-200 shadow-gray-400 cursor-pointer"
                  onClick={() => setIsVisible(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
          <div className="border-b border-secondaryFill m-1"></div>

          {/* //==================={Chains}========================== */}
          <section className="max-h-[440px]">
            <div className="flex flex-col">
              <section className="w-fit h-fit flex flex-col text-primaryText/50 mb-8 mt-4 ml-4 mr-4">
                <div className="mt-2 justify-start items-start w-[432px] py-1 rounded-lg border border-secondaryFill hover:border-secondary">
                  {networksOptions?.map((c, idx) => (
                    <div className="flex flex-row justify-between items-center cursor-pointer hover:shadow-md hover:bg-secondaryFill">
                      <div
                        className="px-3 py-2 w-full flex flex-row gap-4"
                        key={idx}
                        onClick={() => {
                          switchNetwork(c.id);

                          setChain(c);
                          // setIsNetworkBalance(true);
                          setIsChainModalVisible(false);
                          // setIsChainChange(true);
                          localStorage.setItem(
                            'chainSwitch',
                            JSON.stringify(true)
                          );
                          dispatch(updateIsChangeChainId(true));
                          // setIsVisible(false)
                        }}
                      >
                        <img src={c.logoURI} alt="logo" className="w-8 h-8" />

                        <div className="flex flex-col">
                          <span className="text-xs text-primaryText">
                            {c?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default SwitchChain;
