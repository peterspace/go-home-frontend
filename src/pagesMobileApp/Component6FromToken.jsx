import stylesFromToken from './Component6.module.css';
//======{From TokenList}===================================

const Component6FromToken = (props) => {
  const {
    setFilteredfTokens,
    allTokens,
    favoriteTokens,
    fTokenL,
    setFromToken,
    setIsFromTokenChange,
    setIsFromTokenPage,
    filteredfTokens,
    setSelectedToken,
    setIsAddToFavorite,
    setIsRemoveFromFavorite,
  } = props;
  return (
    // <div className={stylesFromToken.div}>
    // <div className={stylesFromToken.divCustom}>
     
      // <div className={`w-[375px] ${stylesFromToken.inner1}`}>
      <>
      {/* <div className={stylesFromToken.frameParent7}> */}
      <div className={stylesFromToken.frameParent7Custom}>
          <div className={stylesFromToken.selectATokenParent}>
            <div className={stylesFromToken.selectAToken}>Select a token</div>
            <div
              className={`cursor-pointer hover:bg-secondaryFillLight ${stylesFromToken.iconButton} `}
              onClick={() => setIsFromTokenPage(false)}
            >
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/xclose1.svg"
              />
            </div>
          </div>
          <div className={stylesFromToken.frameChild} />
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img
                className={stylesFromToken.arrowDownIcon}
                alt=""
                src="/searchmd.svg"
              />
            </div>
            <input
              type="search"
              id="search"
              className="focus:outline-0 [border:none] block p-4 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-surface-tint-d-8 w-[343px] text-secondaryFillDim"
              placeholder="Search by name or paste address"
              onChange={(e) => {
                if (e.target.value === '') {
                  setFilteredfTokens(allTokens);
                  return;
                }
                let ffToken = allTokens.filter(({ symbol }) => {
                  return symbol
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
                });
                if (ffToken !== null) {
                  setFilteredfTokens(ffToken);
                }
              }}
            />
          </div>
          
          <div
            className={`grid grid-cols-3 ${stylesFromToken.customIconGroupDiv}`}
          >
            <>
              {favoriteTokens?.map((token, idx) => (
                <div
                  className={`cursor-pointer group/item hover:bg-secondaryFill flex flex-row justify-center items-center object-contain ${
                    stylesFromToken.customIconGroup
                  } ${token?.name === fTokenL?.name && 'bg-secondaryFill'}`}
                  key={idx}
                >
                  <div className="flex flex-row gap-1">
                    <div
                      className="flex flex-row justify-start gap-1"
                      onClick={() => {
                        setFromToken(token);
                        setIsFromTokenChange(true);
                        setIsFromTokenPage(false);
                      }}
                    >
                      <img
                        className={stylesFromToken.customIcon}
                        alt=""
                        src={token?.logoURI}
                      />
                      <div className={stylesFromToken.customSymbol}>
                        {token?.symbol}
                      </div>
                    </div>

                    <div className="group/edit invisible group-hover/item:visible ...">
                      <img
                        className={`group-hover/edit:text-gray-700 hover:rounded-full hover:bg-secondaryFillLight ${stylesFromToken.xCloseIconCustom}`}
                        onClick={() => {
                          setSelectedToken(token);
                          setIsRemoveFromFavorite(true);
                        }}
                        alt=""
                        src="/xclose.svg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
          <div className={stylesFromToken.frameChild} />
          <div
            className={`overflow-y-auto max-h-[320px] ${stylesFromToken.frameParent9}`}
          >
            <div className={stylesFromToken.frameParent10}>
              {filteredfTokens?.map((token, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer ${stylesFromToken.mdImageContainer} hover:bg-secondaryFill`}
                >
                  <img
                    className={stylesFromToken.protocolIcon3}
                    alt=""
                    src={token?.logoURI}
                    onClick={() => {
                      setFromToken(token);
                      setIsFromTokenChange(true);
                      setIsFromTokenPage(false);
                    }}
                  />
                  <div
                    className={stylesFromToken.ethereumParent}
                    onClick={() => {
                      setFromToken(token);
                      setIsFromTokenChange(true);
                      setIsFromTokenPage(false);
                    }}
                  >
                    <div className={stylesFromToken.ethereum}>
                      {token?.name}
                    </div>
                   
                    <div className={stylesFromToken.eth3}>{token?.symbol}</div>
                  </div>

                  <span className="justify-start items-start mr-4">
                    <>
                      {token?.favorite === true ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#9D9DA3"
                          className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-infoText
                            fill-infoText`}
                          onClick={() => {
                            setSelectedToken(token);
                            setIsAddToFavorite(true);
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#9D9DA3"
                          className={`w-5 h-5 hover:stroke-infoText active:fill-infoText stroke-secondaryText`}
                          onClick={() => {
                            setSelectedToken(token);
                            setIsAddToFavorite(true);
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      )}
                    </>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
        
      // </div>
    // </div>
  );
};

export default Component6FromToken;
