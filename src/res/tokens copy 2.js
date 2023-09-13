//Goerli Network

const tokens = [
	{
		Network: "Goerli",
		chainId: 1,
		address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
		testAddress:"0x3dCd73E2a38ADd627D1DF1b2c6Ca29939A7Cf6c5", // on Gorelinetwork
		name: "USD Coin",
		symbol: "USDC",
		decimals: 18,
		// decimals: 6,
		scanner: "etherscan",
		logoURI:
			"https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
	},
	{
		Network: "Goerli",
		address: "0x0000000000085d4780b73119b644ae5ecd22b376",
		testAddress:"0x57fDce9e3E942c39518a7171945001325C3768f8",
		name: "TrueUSD",
		symbol: "TUSD",
		decimals: 18,
		scanner: "etherscan",
		logoURI:
			"https://assets.coingecko.com/coins/images/3449/thumb/tusd.png?1618395665",
	},
	{
		Network: "Goerli",
		address: "0x6b175474e89094c44da98b954eedeac495271d0f",
		testAddress:"0xc450B209f2f239CBec97953Ed500b132374b4b50",
		symbol: "DAI",
		decimals: 18,
		scanner: "etherscan",
		logoURI:
			"https://assets.coingecko.com/coins/images/10843/thumb/aDAI.png?1584698791",
	},
	{
		Network: "Goerli",
		address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		testAddress:"0x6106D1964a473d7700277CA30B766294Ce547bc9",
		name: "Tether",
		symbol: "USDT",
		decimals: 18,
		scanner: "bscscan",
		logoURI:
			"https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
	},
	{ 
		Network: "Goerli",
		address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
		testAddress:"0x8086c47331Be8e7b62a40749f7521296cE2D8704", 
		name: "Binance USD",
		symbol: "BUSD", // on Mumbai Matic network polygon
		decimals: 18,
		scanner: "bscscan",
		logoURI:
			"https://assets.coingecko.com/coins/images/9576/thumb/BUSD.png?1568947766",
    },
];
export default tokens;
