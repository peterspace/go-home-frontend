import axios from 'axios';
import { parseUnits } from '@ethersproject/units';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const fee = import.meta.env.VITE_SWAP_FEE;
const dexAddress = import.meta.env.VITE_DEX_ADDRESS;
// const cryptoPriceApiKey = import.meta.env.VITE_CRYPTOCOMPARE_KEY;

async function swapToOwnAddress(userData) {
  const response = await axios.post(
    `${BACKEND_URL}/swap/active-address`,
    userData
  );
  if (response.data) {
    return response.data;
  }
}

async function swapToDestination(userData) {
  const response = await axios.post(
    `${BACKEND_URL}/swap/new-address`,
    userData
  );
  if (response.data) {
    return response.data;
  }
}

async function fetchSpender(chainId) {
  try {
    const response = await axios.get(
      `https://api.1inch.io/v5.0/${chainId}/approve/spender`
    );

    if (response.data) {
      return response.data.address;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

// const fetchChainData = async (chainId) => {
//   let usdtToken;
//   const response = await axios.get(
//     `https://api.1inch.io/v5.0/${chainId}/tokens`
//   );

//   if (response.data) {
//     let allTokenKeys = Object.keys(response.data.tokens);
//     let allTokens = allTokenKeys.map((key) => response.data.tokens[key]);
//     allTokens?.map(async (b) => {
//       if (b.symbol === 'USDT') {
//         usdtToken = b;
//         localStorage.setItem('usdtToken', JSON.stringify(b));
//         // console.log({ usdtToken2: b });
//       }
//     });

//     let newResponse = {
//       usdtToken,
//       allTokens,
//     };
//     localStorage.setItem('allTokens', JSON.stringify(allTokens));
//     localStorage.setItem('fToken', JSON.stringify(allTokens[0]));
//     localStorage.setItem('tToken', JSON.stringify(allTokens[1]));
//     // localStorage.setItem('chainId', JSON.stringify(chainId));

//     return newResponse;
//   }
// };

// const fetchChainData = async (chainId) => {
//   let usdtToken;
//   const response = await axios.get(
//     `https://api.1inch.io/v5.0/${chainId}/tokens`
//   );

//   if (response.data) {
//     let allTokenKeys = Object.keys(response.data.tokens);
//     let allTokens = allTokenKeys.map((key) => response.data.tokens[key]);
//     allTokens?.map(async (b) => {
//       if (b.symbol === 'USDT') {
//         usdtToken = b;
//         localStorage.setItem('usdtToken', JSON.stringify(b));
//         // console.log({ usdtToken2: b });
//       }
//     });

//     let newResponse = {
//       usdtToken,
//       allTokens,
//     };
//     localStorage.setItem('allTokens', JSON.stringify(allTokens));
//     localStorage.setItem('fToken', JSON.stringify(allTokens[0]));
//     localStorage.setItem('tToken', JSON.stringify(allTokens[1]));
//     // localStorage.setItem('chainId', JSON.stringify(chainId));

//     return newResponse;
//   }
// };

// not in use at the front end currently :price estimates
async function getPrice(userData) {
  try {
    const response = await axios.get(
      `https://api.1inch.exchange/v5.0/${userData?.chainId}/quote?fromTokenAddress=${userData?.fTokenAddress}&toTokenAddress=${userData?.tTokenAddress}&amount=${userData?.validatedValue}&fee=${fee}&gasLimit=3000000`
    );
    if (response.data) {
      return response;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

// using usdt for price conversion
async function getPriceCompare(userData) {
  const { chainId, fToken, tToken } = userData;
  try {
    let amount = parseUnits('1', fToken?.decimals.toString());
    const response = await axios.get(
      `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`
    );
    if (response.data) {
      let rawValue = response.data.toTokenAmount;
      let value = rawValue / 10 ** tToken.decimals;
      let valueFormmated = value.toFixed(4);
      let exchangeRate = valueFormmated;
      let newData = { exchangeRate };

      return newData;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function getFromUSDPrice(userData) {
  const { chainId, fToken, fValue, usdtToken } = userData;
  try {
    if (fToken?.address === usdtToken.address) {
      let value = '1';
      let fromPrice = '1';
      let totalFromRaw = Number(fValue) * Number(value);
      let totalFromPrice = totalFromRaw.toFixed(4);
      let newData = { fromPrice, totalFromPrice };
      return newData;
    } else {
      let amount = parseUnits('1', fToken?.decimals.toString());
      const response = await axios.get(
        `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`
      );
      if (response.data) {
        let rawValue = response.data.toTokenAmount;
        let value = rawValue / 10 ** usdtToken?.decimals;
        let valueFormmated = value.toFixed(4);
        let fromPrice = valueFormmated;
        let totalFromRaw = Number(fValue) * Number(value);
        let totalFromPrice = totalFromRaw.toFixed(2);
        let newData = { fromPrice, totalFromPrice };
        console.info('FromUSDRate', newData);
        return newData;
      }
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

// using usdt for price conversion
async function getToUSDPrice(userData) {
  const { chainId, tToken, tValue, usdtToken } = userData;
  try {
    if (tToken?.address === usdtToken?.address) {
      let value = '1';
      let toPrice = '1';
      let totalToPriceRaw = Number(tValue) * Number(value);
      let totalToPrice = totalToPriceRaw.toFixed(2);
      let newData = { toPrice, totalToPrice };
      return newData;
    } else {
      let amount = parseUnits('1', tToken?.decimals.toString());
      const response = await axios.get(
        `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${tToken?.address}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`
      );
      if (response.data) {
        let rawValue = response.data.toTokenAmount;
        let value = rawValue / 10 ** usdtToken?.decimals;
        let valueFormmated = value.toFixed(4);
        let toPrice = valueFormmated;
        let totalToPriceRaw = Number(tValue) * Number(value);
        let totalToPrice = totalToPriceRaw.toFixed(4);
        let newData = { toPrice, totalToPrice };
        return newData;
      }
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}
// connected Chain USD Value

async function getChainUSDPrice(userData) {
  const addressNative = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
  const decimalsNative = '18';
  const { chainId, chainBalance, usdtToken } = userData;
  try {
    let amount = parseUnits('1', decimalsNative);
    const response = await axios.get(
      `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${addressNative}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`
    );
    if (response.data) {
      let rawValue = response.data.toTokenAmount;
      let value = rawValue / 10 ** usdtToken?.decimals;
      let valueFormmated = value.toFixed(4);
      let chainPrice = valueFormmated;
      let totalChainRaw = Number(chainBalance) * Number(value);
      let totalChainPrice = totalChainRaw.toFixed(2);
      let newData = { chainPrice, totalChainPrice };
      return newData;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

// check values
async function approve(userData) {
  try {
    const response = await axios.get(
      `https://api.1inch.exchange/v5.0/${userData?.chainId}/approve/transaction?tokenAddress=${userData?.fTokenAddress}&amount=${userData?.validatedValue}`
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function swapOwner(userData) {
  try {
    const response = await axios.get(
      `https://api.1inch.io/v5.0/${userData?.chainId}/swap?fromTokenAddress=${userData?.fTokenAddress}&toTokenAddress=${userData?.tTokenAddress}&amount=${userData?.validatedValue}&fromAddress=${userData?.walletAddress}&slippage=${userData?.slippage}&protocols=${userData?.protocols}&referrerAddress=${dexAddress}&fee=${fee}&disableEstimate=true&allowPartialFill=false&gasLimit=3000000`
    );

    if (response?.data) {
      return response?.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function swapReceiver(userData) {
  try {
    const response = await axios.get(
      `https://api.1inch.io/v5.0/${userData?.chainId}/swap?fromTokenAddress=${userData?.fTokenAddress}&toTokenAddress=${userData?.tTokenAddress}&amount=${userData?.validatedValue}&fromTokenAddress=${userData?.walletAddress}&slippage=${userData?.slippage}&protocols=${userData?.protocols}&destReceiver=${userData?.receiver}&referrerAddress=${dexAddress}&fee=${fee}&disableEstimate=true&allowPartialFill=false&gasLimit=3000000`
    );

    if (response?.data) {
      return response?.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function fetchNetworkData(chainId) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/swap/fetchChainData/${chainId}`
    );

    if (response.data) {
      // console.info('NetworkData', response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function fetchPriceData(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/swap/fetchPriceData`,
      userData
    );

    if (response.data) {
      console.info('fetchPriceData', response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function updateTokens(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/swap/updateTokens`,
      userData
    );

    if (response.data) {
      console.info('updateTokens', response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}
//==========================={          }===============================================
//==========================={  IN USE  }===============================================
//==========================={          }===============================================

async function updateUserOrder(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/swap/updateUserOrder`,
      userData
    );

    if (response.data) {
      console.info('updateUserOrder', response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function updateNewUserData(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/swap/updateNewUserData`,
      userData
    );

    if (response.data) {
      console.info('updateNewUserData', response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function updateNewChainData(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/swap/updateNewChainData`,
      userData
    );

    if (response.data) {
      console.info('updateNewChainData', response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//=========={Active Backend}========================
async function updatePrice(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/swap/updatePrice`,
      userData
    );

    if (response.data) {
      console.info('updatePrice', response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function fetchChainPriceData(userData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/swap/fetchChainPriceData`,
      userData
    );

    if (response.data) {
      console.info('fetchChainPriceData', response.data);
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

//==========={With redux thunk}===================
const fetchFromPrice = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/swap/updateFromPrice`,
    userData
  );

  if (response.data) {
    console.info('updateFromPrice', response.data);
    return response.data;
  }
};

//==========={With redux thunk}===================
const fetchToPrice = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/swap/updatePrice`,
    userData
  );

  if (response.data) {
    console.info('updateToPrice', response.data);
    return response.data;
  }
};

const fetchChainData = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/swap/updateTokens`,
    userData
  );

  if (response.data) {
    console.info('updateTokens', response.data);

    let newResponse = {
      usdtToken: response.data?.usdtToken,
      allTokens: response.data?.allTokens,
    };
    localStorage.setItem('allTokens', JSON.stringify(response.data?.allTokens));
    localStorage.setItem('fToken', JSON.stringify(response.data?.fToken));
    localStorage.setItem('tToken', JSON.stringify(response.data?.tToken));
    // localStorage.setItem('chainId', JSON.stringify(chainId));

    return newResponse;
  }
};

export {
  swapToOwnAddress,
  swapToDestination,
  fetchSpender,
  // fetchChainData,
  getPrice,
  getPriceCompare,
  getFromUSDPrice,
  getToUSDPrice,
  getChainUSDPrice,
  approve,
  swapOwner,
  swapReceiver,
  fetchNetworkData,
  fetchPriceData,
  fetchChainPriceData,
  updateTokens,
  //========================{In use}==============================
  updateUserOrder,
  updateNewUserData,
  updateNewChainData,
  updatePrice,
};

const swapService = {
  fetchChainData,
  fetchFromPrice,
  fetchToPrice,
};

export default swapService;
