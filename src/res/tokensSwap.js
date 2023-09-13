// import ETH from '../components/contractAbis/abi/ETH.json';
// import MATIC from '../components/contractAbis/abi/MATIC.json';
// import BNB from '../components/contractAbis/abi/BNB.json';
// import FTM from '../components/contractAbis/abi/FTM.json';
// import ADA from '../components/contractAbis/abi/ADA.json';
// import TRX from '../components/contractAbis/abi/TRX.json';
// import FLOW from '../components/contractAbis/abi/FLOW.json';
// import AXS from '../components/contractAbis/abi/AXS.json';

const tokens = [
  {
    chainId: 5,
    address: '0x825716a04759a7D60CF26C77B72f5d3c9f560836',
    // abi: ETH.abi,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    },
  // USDC from elsewhere
  {
    chainId: 5,
    address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    // abi: ETH.abi,
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
  },
  {
    chainId: 1,
    // address: '0x111111111117dc0aa78b770fa6a738034120c302',
    address: '0xDdDFe93ac836c2032a10E745CeAb4B624764F0F8',
    // abi: MATIC.abi,
    name: '1inch',
    symbol: 'MATIC',
    decimals: 18,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI:
      'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
  },
  {
    chainId: 1,
    address: '0x77Df03046bFeBd9764eFaC6B2ea6cab4B9E2E7fa',
    // abi: BNB.abi,
    name: 'Binance Coin  Wormhole ',
    symbol: 'BNB',
    decimals: 18,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI:
      'https://assets.coingecko.com/coins/images/22884/thumb/BNB_wh_small.png?1644224553',
  },
  {
    chainId: 1,
    address: '0x9F6ca6117e35d5bd12dC0c97BD7247c8A1033FAb',
    // abi: FTM.abi,
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI:
      'https://assets.coingecko.com/coins/images/4001/thumb/Fantom.png?1558015016',
  },
  {
    chainId: 1,
    address: '0x6261424f5E91357d01A2CcC1DdC1400E438A7a07',
    // abi: ADA.abi,
    name: 'Cardano',
    symbol: 'ADA',
    decimals: 18,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
  },
  {
    chainId: 1,
    address: '0x94efc4A691903b7CB14D9A16Cce49d5B2b62E983',
    // abi: TRX.abi,
    name: 'TRON',
    symbol: 'TRX',
    decimals: 18,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png',
  },
  {
    chainId: 1,
    address: '0x4a9D2cA0a2DA0181b89D29676959FFe5Fd26abd5',
    // abi: FLOW.abi,
    name: 'FLOW',
    symbol: 'FLOW',
    decimals: 18,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4558.png',
  },
  {
    chainId: 1,
    address: '0xFE1CeE975a52142bc1001ddCaEcE18c2ADff566A',
    // abi: AXS.abi,
    name: 'Axie Infinity',
    symbol: 'AXS',
    decimals: 18,
    serviceFee: 0.25,
    marketPlaceRoyaltyValue: 200,
    marketPlaceAddress: '0x00d2AaD407DbAdFCABE91fb1f77919ABf05Cb4Bd',
    logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6783.pn',
  },
];
export default tokens;
