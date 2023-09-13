import axios from 'axios';
import { parseUnits, parseEther, formatUnits } from '@ethersproject/units';
import { toast } from 'react-toastify';
// export const BACKEND_URL = 'http://127.0.0.1:4000';

const fee = import.meta.env.VITE_SWAP_FEE;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

// const dexAddress = import.meta.env.VITE_DEX_ADDRESS;
// const cryptoPriceApiKey = import.meta.env.VITE_CRYPTOCOMPARE_KEY;

// https://api.1inch.io

//==========================={          }===============================================
//==========================={  IN USE  }===============================================
//==========================={          }===============================================

// const uSDTToUsdRate = localStorage.getItem('rateUSDTUSD')
// ? JSON.parse(localStorage.getItem('rateUSDTUSD'))
// : null;

async function updateFromPrice(userData) {
  // const chainId = req.body.chainId || 1;
  try {
    const chainId = userData?.chainId;

    const fToken = userData?.fToken;
    const usdtToken = userData?.usdtToken;
    const fValue = userData?.fValue || '1';
    const uSDTToUsdRate = userData?.uSDTToUsdRate;

    //==============={Primary Data}=========================

    const { fromPrice, totalFromPrice } = await getFromUSDPrice({
      chainId,
      fToken,
      fValue,
      usdtToken,
      uSDTToUsdRate,
    });

    console.log({ fromPrice: fromPrice });
    console.log({ totalFromPrice: totalFromPrice });

    let newResponse = {
      fValue,
      fromPrice,
      totalFromPrice,
    };
    return newResponse;
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
    const chainId = userData?.chainId;

    const fToken = userData?.fToken;
    const tToken = userData?.tToken;
    const usdtToken = userData?.usdtToken;

    const fValue = userData?.fValue || '1';

    const slippage = userData?.slippage || '1';

    const fAddress = fToken?.address;
    const tAddress = tToken?.address;

    //==============={Primary Data}=========================

    const fDecimals = fToken?.decimals;
    const tDecimals = tToken?.decimals;

    const {
      validatedValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      allProtocols,
    } = await getPriceInternal({
      chainId,
      fAddress,
      fDecimals,
      tAddress,
      tDecimals,
      fValue,
    });

    const { exchangeRate } = await getPriceCompare({ chainId, fToken, tToken });
    console.log({ exchangeRate: exchangeRate });

    let newResponse = {
      chainId,
      slippage,
      fToken,
      tToken,
      usdtToken,
      fAddress,
      tAddress,
      fValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      validatedValue,
      allProtocols,
      exchangeRate,
      isChainChange: false,
    };
    return newResponse;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

async function fetchChainPrice(userData) {
  const { chainId, chainBalance, usdtToken, uSDTToUsdRate } = userData;
  if (chainId === null || chainId === undefined) {
    return;
  } else {
    try {
      const { chainPrice, totalChainPrice } = await getChainUSDPrice({
        chainId,
        chainBalance,
        usdtToken,
        uSDTToUsdRate,
      });

      let newResponse = {
        chainPrice,
        totalChainPrice,
      };
      return newResponse;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  }
}
//==========={Dependences}=============================
//================={New API's}================================

// using usdt for price conversion
const getPriceCompare = async ({ chainId, fToken, tToken }) => {
  if (chainId === null || chainId === undefined) {
    return;
  } else {
    let amount = parseUnits('1', fToken?.decimals.toString());

    let URL = `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${tToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`;
    const response = await axios.get(URL);
    // const response = await axios.get(URL, {
    //   headers: { accept: 'application/json' },
    // });
    if (response.data) {
      let rawValue = response.data.toTokenAmount;
      let value = rawValue / 10 ** tToken.decimals;
      let valueFormmated = value.toFixed(4);
      let exchangeRate = valueFormmated;

      let newData = { exchangeRate };
      return newData;
    }
  }
};

const getFromUSDPrice = async ({
  chainId,
  fToken,
  fValue,
  usdtToken,
  uSDTToUsdRate,
}) => {
  // const { uSDTToUsdRate } = await usdPrice();

  if (fToken?.address === usdtToken.address) {
    let value = '1';
    // let fromPrice = '1';

    let fromPrice = uSDTToUsdRate.toString();
    let totalFromRaw = Number(fValue) * Number(value);
    let totalFromPrice = totalFromRaw.toFixed(4);
    let newData = { fromPrice, totalFromPrice };
    return newData;
  } else {
    if (chainId === null || chainId === undefined) {
      return;
    } else {
      let amount = parseUnits('1', fToken?.decimals.toString());

      let URL = `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${fToken?.address}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`;
      const response = await axios.get(URL);
      // const response = await axios.get(URL, {
      //   headers: { accept: 'application/json' },
      // });
      if (response.data) {
        let rawValue = response.data.toTokenAmount;
        // let value = rawValue / 10 ** usdtToken?.decimals;
        //======{New update}===============================
        let valueConverted = rawValue / 10 ** usdtToken?.decimals;
        let value = uSDTToUsdRate * Number(valueConverted); // check
        let valueFormmated = value.toFixed(4);
        let fromPrice = valueFormmated;
        let totalFromRaw = Number(fValue) * Number(value);
        let totalFromPrice = totalFromRaw.toFixed(2);

        let newData = {
          fromPrice,
          totalFromPrice,
        };
        console.info('FromUSDRate', newData);
        return newData;
      }
    }
  }
};

const getToUSDPrice = async ({
  chainId,
  tToken,
  tValue,
  usdtToken,
  uSDTToUsdRate,
}) => {
  // const { uSDTToUsdRate } = await usdPrice();

  if (tToken?.address === usdtToken?.address) {
    let value = '1';
    // let toPrice = '1';
    let toPrice = uSDTToUsdRate.toString();
    let totalToPriceRaw = Number(tValue) * Number(value);
    let totalToPrice = totalToPriceRaw.toFixed(2);
    let newData = { toPrice, totalToPrice };
    return newData;
  } else {
    if (chainId === null || chainId === undefined) {
      return;
    } else {
      let amount = parseUnits('1', tToken?.decimals.toString());
      // let ratio = uSDRatio.toString();
      // let amount = parseUnits(ratio, tToken?.decimals.toString());
      let URL = `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${tToken?.address}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`;
      const response = await axios.get(URL);
      // const response = await axios.get(URL, {
      //   headers: { accept: 'application/json' },
      // });
      if (response.data) {
        let rawValue = response.data.toTokenAmount;
        // let value = rawValue / 10 ** usdtToken?.decimals;
        //======{New update}===============================
        let valueConverted = rawValue / 10 ** usdtToken?.decimals;
        let value = uSDTToUsdRate * Number(valueConverted); // check
        let valueFormmated = value.toFixed(4);
        let toPrice = valueFormmated;
        let totalToPriceRaw = Number(tValue) * Number(value);
        let totalToPrice = totalToPriceRaw.toFixed(4);

        let newData = {
          toPrice,
          totalToPrice,
        };

        return newData;
      }
    }
  }
};

// connected Chain USD Value

// This has to be a seperate call, as it depends on when a user is connected and on the users balance
// So all "Balances" calls will not fall under this category

const getChainUSDPrice = async ({
  chainId,
  chainBalance,
  usdtToken,
  uSDTToUsdRate,
}) => {
  // const { uSDTToUsdRate } = await usdPrice();

  if (chainId === null || chainId === undefined) {
    return;
  } else {
    const addressNative = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    const decimalsNative = '18';
    // const { chainId, chainBalance, usdtToken } = userData;
    let amount = parseUnits('1', decimalsNative);
    let URL = `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${addressNative}&toTokenAddress=${usdtToken?.address}&amount=${amount}&fee=${fee}&gasLimit=3000000`;
    const response = await axios.get(URL);
    // const response = await axios.get(URL, {
    //   headers: { accept: 'application/json' },
    // });
    if (response.data) {
      let rawValue = response.data.toTokenAmount;
      // let value = rawValue / 10 ** usdtToken?.decimals;
      let valueConverted = rawValue / 10 ** usdtToken?.decimals;
      let value = uSDTToUsdRate * Number(valueConverted); // check
      let valueFormmated = value.toFixed(4);
      let chainPrice = valueFormmated;
      let totalChainRaw = Number(chainBalance) * Number(value);
      let totalChainPrice = totalChainRaw.toFixed(2);

      let newData = {
        chainPrice,
        totalChainPrice,
      };
      return newData;
    }
  }
};

const getPriceInternal = async ({
  chainId,
  fAddress,
  fDecimals,
  tAddress,
  tDecimals,
  fValue,
}) => {
  let validatedValue = '';

  if (chainId === null || chainId === undefined) {
    return;
  } else {
    if (fAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      validatedValue = parseUnits(
        fValue.toString(),
        fDecimals.toString()
      ).toString();
    } else {
      validatedValue = parseEther(fValue.toString()).toString();
    }
    let URL = `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${fAddress}&toTokenAddress=${tAddress}&amount=${validatedValue}&fee=${fee}&gasLimit=3000000`;

    const response = await axios.get(URL);
    // const response = await axios.get(URL, {
    //   headers: { accept: 'application/json' },
    // });
    if (response.data) {
      const data = response.data;
      console.log('data:', data);

      const { toTokenAmount, estimatedGas, protocols } = data;

      let toTokenAmountFormatted = '';

      if (tAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        toTokenAmountFormatted = formatUnits(
          toTokenAmount.toString(),
          tDecimals.toString()
        ).toString();
      } else {
        toTokenAmountFormatted = parseEther(
          toTokenAmount.toString()
        ).toString();
      }

      let toTokenAmountFixed = Number(toTokenAmountFormatted).toFixed(3);

      const result = {
        validatedValue,
        tValue: toTokenAmount,
        tValueFormatted: toTokenAmountFixed,
        estimatedGas: estimatedGas,
        allProtocols: protocols,
      };

      console.log({ priceDataRaw: result });
      return result;
    }
  }
};

async function fetchSpender(chainId) {
  if (chainId === null || chainId === undefined) {
    return;
  } else {
    try {
      let URL = `https://api.1inch.io/v5.0/${chainId}/approve/spender`;
      const response = await axios.get(URL);
      // const response = await axios.get(URL, {
      //   headers: { accept: 'application/json' },
      // });

      if (response.data) {
        return response.data.address;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  }
}

async function updateSwapEstimates(userData) {
  try {
    //==============={Primary Data}=========================
    const chainId = userData?.chainId;
    const fToken = userData?.fToken;
    const slippage = userData?.slippage;
    const tToken = userData?.tToken;
    const fValue = userData?.fValue || '1';
    //==============={Primary Data}=========================
    const fAddress = fToken?.address;
    const tAddress = tToken?.address;
    const fDecimals = fToken?.decimals;
    const tDecimals = tToken?.decimals;

    const {
      validatedValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      allProtocols,
    } = await getPriceInternal({
      chainId,
      fAddress,
      fDecimals,
      tAddress,
      tDecimals,
      fValue,
    });

    const { exchangeRate } = await getPriceCompare({ chainId, fToken, tToken });
    console.log({ exchangeRate: exchangeRate });

    let newResponse = {
      chainId,
      slippage,
      fToken,
      tToken,
      fAddress,
      tAddress,
      fValue,
      tValue,
      tValueFormatted,
      estimatedGas,
      validatedValue,
      allProtocols,
      exchangeRate,
      isChainChange: false,
    };
    return newResponse;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
}

const orderConfirmation = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/contact/orderConfirmation`,
      userData
    );
    if (response.statusText === 'OK') {
      toast.success('payment successful');
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

const orderCompleted = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/contact/orderCompleted`,
      userData
    );
    if (response.statusText === 'OK') {
      toast.success('registration confirmation');
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

const contactAutoReply = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/contact/contactAutoReply`,
      userData
    );
    if (response.statusText === 'OK') {
      toast.success('registration confirmation');
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
export const registerUser = async (userData) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const response = await axios.post(
      `${BACKEND_URL}/api/user/register`,
      userData,
      config
      // { withCredentials: true }
    );
    if (response.data) {
      toast.success('User Registered successfully');
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// '/api/user/login'
// Login User
export const loginUser = async (userData) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/user/login`,
      userData,
      config
    );
    if (response.data?._id) {
      toast.success('Login Successful...');
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/user/logout`);
    localStorage.removeItem('user');
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Forgot Password
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/user/forgotpassword`,
      userData
    );
    toast.success(response.data.message);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Reset Password
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/user/resetpassword/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get User Profile
export const getUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/user/getuser`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//updateUser User Profile
export const updateUser = async (userData) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  };
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/user/updateUser`,
      userData,
      config
    );
    if (response.data?._id) {
      toast.success('update Successful...');
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export {
  //========================{In use}==============================
  updatePrice,
  updateFromPrice,
  fetchChainPrice,
  fetchSpender,
  updateSwapEstimates,
  orderConfirmation,
  orderCompleted,
  contactAutoReply,
};
