import React, { useState, useEffect } from 'react';
import useWindowResize from '../../hooks/useWindowResize';

// SquidRouter
const Exchange = () => {
  // const [isLaunching, setIsLaunching] = useState(false);
  const { width, height } = useWindowResize();
  console.log(width, height);

  // useEffect(() => {
  //   setIsLaunching(true);
  //   setTimeout(() => {
  //     setIsLaunching(false);
  //   }, 3000);
  // }, []);
  // mainLogoUrl:

  return (
    <>
      <div className="relative flex flex-col justify-center items-center">
        <iframe
          title="squid_widget"
          width="440"
          height="684"
          src="https://widget.squidrouter.com/iframe?config=%7B%22integratorId%22%3A%22govercity-swap-widget%22%2C%22companyName%22%3A%22Custom%22%2C%22style%22%3A%7B%22neutralContent%22%3A%22%23433352%22%2C%22baseContent%22%3A%22%23130D1A%22%2C%22base100%22%3A%22%23FFFFFF%22%2C%22base200%22%3A%22%23F6F7F9%22%2C%22base300%22%3A%22%23E8E8E8%22%2C%22error%22%3A%22%23ED6A5E%22%2C%22warning%22%3A%22%23FFB155%22%2C%22success%22%3A%22%232EAEB0%22%2C%22primary%22%3A%22%232F1F45%22%2C%22secondary%22%3A%22%238D3DFF%22%2C%22secondaryContent%22%3A%22%23F7F6FB%22%2C%22neutral%22%3A%22%23FFFFFF%22%2C%22roundedBtn%22%3A%225px%22%2C%22roundedCornerBtn%22%3A%22999px%22%2C%22roundedBox%22%3A%220px%22%2C%22roundedDropDown%22%3A%227px%22%7D%2C%22slippage%22%3A1.5%2C%22infiniteApproval%22%3Afalse%2C%22enableExpress%22%3Atrue%2C%22apiUrl%22%3A%22https%3A%2F%2Fapi.squidrouter.com%22%2C%22comingSoonChainIds%22%3A%5B%22cosmoshub-4%22%2C%22injective-1%22%2C%22kichain-2%22%5D%2C%22titles%22%3A%7B%22swap%22%3A%22Swap%22%2C%22settings%22%3A%22Settings%22%2C%22wallets%22%3A%22Wallets%22%2C%22tokens%22%3A%22Select%20Token%22%2C%22chains%22%3A%22Select%20Chain%22%2C%22history%22%3A%22History%22%2C%22transaction%22%3A%22Transaction%22%2C%22allTokens%22%3A%22Select%20Token%22%2C%22destination%22%3A%22Destination%20address%22%7D%2C%22priceImpactWarnings%22%3A%7B%22warning%22%3A3%2C%22critical%22%3A5%7D%7D"
        />
        <div className="h-[41.04px] w-[440px] top-[94%] bg-white text-black absolute z-10" />
      </div>

      {/* <ModalLaunch visible={isLaunching}>
        <div className="flex flex-col justify-center items-center gap-10">
          <img
            className="w-[300px] h-[300px] animate-ping"
            alt=""
            src="/govercityLogo.svg"
          />
          <div className="text-xl font-bold">Govercity</div>
        </div>
      </ModalLaunch> */}
    </>
  );
};

export default Exchange;
