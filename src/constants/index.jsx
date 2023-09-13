import {
  brave,
  coinbaseWallet,
  ledger,
  metamask,
  phantom,
  walletconnect,
} from '../assets/WalletOptions';

import {
  ethereum,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  fantom,
  aurora,
  // polygonMumbai,
  // goerli,
} from '../assets/networkOptions';

export const navLinks = [
  {
    id: 'home',
    title: 'Home',
    link: '/',
  },
  {
    id: 'swap',
    title: 'Swap',
    link: '/swap',
  },
  {
    id: 'frame',
    title: 'Frame',
    link: '/frame',
  },
  {
    id: 'about',
    title: 'About Us',
    link: '/about',
  },
  {
    id: 'contact',
    title: 'ConatctUs',
    link: '/contact',
  },
];

export const products = [
  {
    id: 'product-1',
    link: '/Slider-1.png',
  },
  {
    id: 'product-2',
    link: '/Slider-2.png',
  },
  {
    id: 'product-3',
    link: '/Slider-3.png',
  },
  {
    id: 'product-4',
    link: '/Slider-4.png',
  },
  {
    id: 'product-5',
    link: '/Slider-5.png',
  },
  {
    id: 'product-6',
    link: '/Slider-6.png',
  },
];

export const footerLinks = [
  {
    title: 'Useful Links',
    links: [
      {
        name: 'Content',
        link: 'https://www.govercity.com/content/',
      },
      {
        name: 'How it Works',
        link: 'https://www.govercity.com/how-it-works/',
      },
      {
        name: 'Create',
        link: 'https://www.govercity.com/create/',
      },
      {
        name: 'Explore',
        link: 'https://www.govercity.com/explore/',
      },
      {
        name: 'Terms & Services',
        link: 'https://www.govercity.com/terms-and-services/',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        name: 'Help Center',
        link: 'https://www.govercity.com/help-center/',
      },
      {
        name: 'Partners',
        link: 'https://www.govercity.com/partners/',
      },
      {
        name: 'Suggestions',
        link: 'https://www.govercity.com/suggestions/',
      },
      {
        name: 'Blog',
        link: 'https://www.govercity.com/blog/',
      },
      {
        name: 'Newsletters',
        link: 'https://www.govercity.com/newsletters/',
      },
    ],
  },
  {
    title: 'Partner',
    links: [
      {
        name: 'Our Partner',
        link: 'https://www.govercity.com/our-partner/',
      },
      {
        name: 'Become a Partner',
        link: 'https://www.govercity.com/become-a-partner/',
      },
    ],
  },
];



export const networksOptions = [
  {
    id: 1,
    name: 'Ethereum',
    chainSymbol: 'ETH',
    balanceSymbol: 'ETH',
    logoURI: ethereum,
  },
  {
    id: 56,
    name: 'BNB Chain',
    chainSymbol: 'BNB',
    balanceSymbol: 'BNB',
    logoURI: bsc,
  },
  {
    id: 137,
    name: 'Polygon',
    chainSymbol: 'MATIC',
    balanceSymbol: 'MATIC',
    logoURI: polygon,
  },
  {
    id: 10,
    name: 'Optimism',
    chainSymbol: 'OP',
    balanceSymbol: 'ETH',
    logoURI: optimism,
  },
  {
    id: 42161,
    name: 'Arbitrum',
    chainSymbol: 'ARBITRUM',
    balanceSymbol: 'ETH',
    logoURI: arbitrum,
  },
  {
    id: 43114,
    name: 'Avalanche',
    chainSymbol: 'AVAX',
    balanceSymbol: 'AVAX',
    logoURI: avalanche,
  },
  {
    id: 1313161554,
    name: 'Aurora',
    chainSymbol: 'AURORA',
    balanceSymbol: 'ETH',
    logoURI: aurora,
  },
  // {
  //   id: 250,
  //   name: 'Fantom',
  //   chainSymbol: 'FTM',
  //   balanceSymbol: 'FTM',
  //   logoURI: fantom,
  // },
  // {
  //   id: 324,
  //   name: 'zKSync Era',
  //   chainSymbol: 'ETH',
  //   balanceSymbol: 'ETH',
  //   logoURI: fantom,
  // },
];

export const networksOptionsExchange = [
  {
    id: 1,
    name: 'Ethereum',
    chainSymbol: 'ETH',
    balanceSymbol: 'ETH',
    logoURI: ethereum,
  },
  {
    id: 5,
    name: 'GoerliEth',
    chainSymbol: 'ETH',
    balanceSymbol: 'ETH',
    logoURI: ethereum,
  },
  {
    id: 56,
    name: 'BNB Chain',
    chainSymbol: 'BNB',
    balanceSymbol: 'BNB',
    logoURI: bsc,
  },
  {
    id: 137,
    name: 'Polygon',
    chainSymbol: 'MATIC',
    balanceSymbol: 'MATIC',
    logoURI: polygon,
  },
  {
    id: 10,
    name: 'Optimism',
    chainSymbol: 'OP',
    balanceSymbol: 'ETH',
    logoURI: optimism,
  },
];

export const walletOptions = [
  {
    name: 'MetaMask',
    logoURI: metamask,
  },
  {
    name: 'Coinbase Wallet',
    logoURI: coinbaseWallet,
  },
  {
    name: 'Wallet Connect',
    logoURI: walletconnect,
  },
  {
    name: 'Phantom',
    logoURI: phantom,
  },
  {
    name: 'Ledger',
    logoURI: ledger,
  },
  {
    name: 'Brave',
    logoURI: brave,
  },
];
