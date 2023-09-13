import React, { useState, useEffect } from 'react';
import TokenComponent from './TokenComponent';
import axios from 'axios';
import FavoriteTokenComponent from './FavoriteTokenComponent';

const slippages = [0.1, 0.5, 1, 1.5, 2, '12'];

const FrameSelectToken = () => {
  const [slippage, setSlippage] = useState(slippages[5]);
  const [favoriteTokens, setFavoriteTokens] = useState([]);
  console.log({ selectedTokens: favoriteTokens });

  const [favoriteToken1, setFavoriteToken1] = useState({});
  console.log('favoriteToken1:', favoriteToken1);
  const [favoriteToken2, setFavoriteToken2] = useState({});
  const [favoriteToken4, setFavoriteToken4] = useState({});
  const [favoriteToken5, setFavoriteToken5] = useState({});

  // const favoriteTokenList = {
  //   favoriteToken1,
  //   favoriteToken2,
  //   favoriteToken3,
  //   favoriteToken4,
  //   favoriteToken5,
  // };

  //==========={Favorite List}=============

  const chainId = '1';

  const [token, setToken] = useState();
  const [allTokens, setAllTokens] = useState();
  console.log({ allTokens: allTokens });
  const [fee, setFee] = useState('');
  const [filteredfTokens, setFilteredfTokens] = useState();
  console.log({ filteredfTokens: filteredfTokens });
  const [liquidityProviders, setLiquidityProviders] = useState([]);

  const [isToCurrencyModalVisible, setIsToCurrencyModalVisible] =
    useState(false);
  //================={Get Liquidity providers}===============

  useEffect(() => {
    // console.info('chainId from swap', chainId)
    axios
      .get(`https://api.1inch.io/v5.0/${chainId}/tokens`)
      .then((response) => {
        // let allTokens = response.data.tokens;
        let allTokenKeys = Object.keys(response.data.tokens);
        let allTs = allTokenKeys.map((key) => response.data.tokens[key]);

        setAllTokens(allTs);
        console.log('allTs', allTs);
        // setAllTokens(tokens);
      });

    axios
      .get(`https://api.1inch.io/v5.0/${chainId}/liquidity-sources`)
      .then((response) => {
        //setSwapOrders(response.data);
        //let orders = response.data.title;
        let orders = response.data.protocols.title;
        //setSwapOrders(response.data.title);
        setLiquidityProviders(orders);
        // console.log("lp", orders);
      });

    setFee(1.5);
  }, [chainId]);

  //=====================================================================================

  // update to chainBalance
  useEffect(() => {
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTokens]);

  async function getBalance() {
    await Promise.allSettled(
      allTokens?.map(async (b) => {
        let favoriteList = [];
        // if (b.address === fromToken.address) {
        if (b.symbol === 'ETH' && b.name == 'Ethereum') {
          setFavoriteToken1(b);
        }
        if (b.symbol === 'WBTC') {
          setFavoriteToken2(b);
        }
        if (b.symbol === 'USDC') {
          setFavoriteToken4(b);
        }

        if (b.symbol === 'BUSD') {
          setFavoriteToken5(b);
        }
      })
    );

    // if(favoriteList !== null || undefined){
    //   setFavoriteTokens(favoriteList)

    // }
  }

  useEffect(() => {
    if (allTokens !== null || undefined) {
      let newTokens = [];

      newTokens.push(
        favoriteToken1,
        favoriteToken2,
        favoriteToken4,
        favoriteToken5
      );

      // console.log({ newTokensList: favouriteUserTokens });
      console.log({ newTokensOnly: newTokens });
      setFavoriteTokens(newTokens);
    }
  }, [
    allTokens,
    favoriteToken1,
    favoriteToken2,
    favoriteToken4,
    favoriteToken5,
  ]);

  return (
    <section className="flex flex-col justify-center items-center gap-2 mb-8">
      <div className="w-[480px] px-2 py-2 border border-secondaryFillLight rounded-xl bg-primaryFill shadow-lg mb-8">
        {/* Title:Select a Token */}
        <section className="mb-8 mt-4 ml-4 mr-4">
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm text-primaryText">Select a token</span>
            <div>
              <div className=" justify-start items-start px-1 py-1 rounded-lg bg-secondaryFill mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
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
        {/* Search bar */}
        <section className="flex flex-row gap-2 justify-center items-center bg-secondaryFill rounded-lg w-[432px] py-4 mb-8 mt-4 ml-4 mr-4">
          <span className="justify-start items-start ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-5 h-5 stroke-secondaryText hover:stroke-infoText active:fill-infoText"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>

          <input
            type="text"
            className="py-1 px-4 h-full w-full outline-none text-gray-700 placeholder:text-secondaryText bg-transparent"
            placeholder="Search by name or past address"
            onChange={(e) => {
              // if (e.target.value === '') {
              //   setFilteredfTokens(allTokens);
              //   return;
              // }

              let ffToken = allTokens.filter(({ symbol }) => {
                // filter.symbol.toLowerCase() === e.target.value.toLowerCase()
                return symbol
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase());
              });
              if (ffToken !== null) {
                setFilteredfTokens(ffToken);
              }
              // console.info(ffToken);
            }}
          />
        </section>
        <section
          className="w-fit h-fit flex flex-col gap-2 text-primaryText/50 mb-8 mt-4 ml-4 mr-4"
          onChange={(e) => {
            setSlippage(e.target.value);
          }}
        >
          <div className="flex flex-row gap-2 justify-center items-center bg-secondaryFill rounded-lg w-[432px] py-4">
            {slippages.map((slp) => (
              <label key={slp}>
                <input
                  type="radio"
                  id="slippage"
                  name="slippage"
                  value={slp}
                  className="peer sr-only"
                />
                <span
                  className={`px-2.5 py-1.5 rounded-lg cursor-pointer ${
                    slp === slippage
                      ? 'bg-black text-primaryText'
                      : 'bg-black/50 text-secondaryText'
                  } border border-transparent peer-hover:border-secondaryText peer-checked:bg-black peer-checked:hover:border-transparent peer-checked:text-primaryText`}
                >
                  {slp} %
                </span>
              </label>
            ))}
          </div>
        </section>
        {/* Favorite section */}

        <section class="overflow-y-auto max-h-[320px] mb-8 mt-4 ml-4 mr-4">
          <div className="flex flex-row w-[312px] gap-2">
            {favoriteTokens?.map((token, idx) => (
              <FavoriteTokenComponent
                key={idx}
                currentItem={token}
                setSelectedToken={setToken}
              />
            ))}
          </div>
        </section>
        <div className="border-b border-secondaryFill m-1"></div>

        <section class="overflow-y-auto max-h-[320px]">
          <div className="flex flex-col w-[312px]">
            {allTokens?.map((token, idx) => (
              // <div
              // 	key={idx}
              // 	className={`px-3 py-2 bg-black/30 rounded-lg border ${
              // 		token.symbol === fToken.symbol
              // 			? "border-gray-100 text-gray-100"
              // 			: "border-white/10 text-gray-300"
              // 	} cursor-pointer hover:text-gray-100 hover:border-gray-100`}
              // 	onClick={() => {
              // 		setFromToken(token);
              // 		setIsFromCurrencyModalVisible(false);
              // 	}}
              // >
              // 	<img src={token.logoURI} alt="" className="w-6 h-6" />
              // 	<span>{token.symbol}</span>
              // </div>

              <TokenComponent
                key={idx}
                currentItem={token}
                selectedToken={token}
                setSelectedToken={setToken}
              />
            ))}
          </div>
        </section>
        {/* Search bar */}
        {/* <div className="border-b border-secondaryFill m-1"></div>
        <section className="flex flex-row gap-2 justify-center items-center bg-secondaryFill hover:bg-hoverLight rounded-lg w-[432px] py-4 mb-8 mt-4 ml-4 mr-4">
          <button
            className="py-1 px-4 h-full w-full outline-none text-primaryText "
            onClick=""
          >
            Manage Token List
          </button>
        </section>
      </div> */}
        <div className="border-b border-secondaryFill m-1"></div>
        <section
          className="flex flex-row gap-2 justify-center items-center rounded-lg cursor-pointer 
                     active:bg-black text-primaryText bg-secondaryFill/5 hover:bg-secondaryFill
                  outline outline-secondaryFillLight hover:outline-secondaryText shadow-lg w-[432px] py-4 mb-8 mt-4 ml-4 mr-4"
        >
          <button
            className="py-1 px-4 h-full w-full outline-none text-primaryText "
            onClick=""
          >
            Manage Token List
          </button>
        </section>
      </div>
    </section>
  );
};

export default FrameSelectToken;
// px-2.5 py-1.5 rounded-lg cursor-pointer
//                      active:bg-black text-primaryText bg-primaryFill
//                   outline outline-secondaryFillLight hover:outline-secondaryText shadow-lg
