import axios from 'axios';
import { parseUnits, parseEther, formatUnits } from '@ethersproject/units';
// export const BACKEND_URL = 'http://127.0.0.1:4000';

const fee = import.meta.env.VITE_SWAP_FEE;
// const dexAddress = import.meta.env.VITE_DEX_ADDRESS;
// const cryptoPriceApiKey = import.meta.env.VITE_CRYPTOCOMPARE_KEY;

//==========================={          }===============================================
//==========================={  IN USE  }===============================================
//==========================={          }===============================================



async function updateFromPrice(userData) {
  // const chainId = req.body.chainId || 1;
  try {
    const chainId = userData?.chainId;

    const fToken = userData?.fToken;
    const usdtToken = userData?.usdtToken;
    const fValue = userData?.fValue || '1';

    //==============={Primary Data}=========================

    const { fromPrice, totalFromPrice } = await getFromUSDPrice({
      chainId,
      fToken,
      fValue,
      usdtToken,
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
    const { fromPrice, totalFromPrice } = await getFromUSDPrice({
      chainId,
      fToken,
      fValue,
      usdtToken,
    });

    console.log({ fromPrice: fromPrice });
    console.log({ totalFromPrice: totalFromPrice });
    const { toPrice, totalToPrice } = await getToUSDPrice({
      chainId,
      tToken,
      tValue,
      usdtToken,
    });

    console.log({ toPrice: toPrice });
    console.log({ totalToPrice: totalToPrice });

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
      fromPrice,
      totalFromPrice,
      toPrice,
      totalToPrice,
      // chainPrice,
      // totalChainPrice,
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
  const { chainId, chainBalance, usdtToken } = userData;
  if (chainId === null || chainId === undefined) {
    return;
  } else {
    try {
      const { chainPrice, totalChainPrice } = await getChainUSDPrice({
        chainId,
        chainBalance,
        usdtToken,
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
  }
};

const getFromUSDPrice = async ({ chainId, fToken, fValue, usdtToken }) => {
  if (fToken?.address === usdtToken.address) {
    let value = '1';
    let fromPrice = '1';
    let totalFromRaw = Number(fValue) * Number(value);
    let totalFromPrice = totalFromRaw.toFixed(4);
    let newData = { fromPrice, totalFromPrice };
    return newData;
  } else {
    if (chainId === null || chainId === undefined) {
      return;
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

// using usdt for price conversion
const getToUSDPrice = async ({ chainId, tToken, tValue, usdtToken }) => {
  if (tToken?.address === usdtToken?.address) {
    let value = '1';
    let toPrice = '1';
    let totalToPriceRaw = Number(tValue) * Number(value);
    let totalToPrice = totalToPriceRaw.toFixed(2);
    let newData = { toPrice, totalToPrice };
    return newData;
  } else {
    if (chainId === null || chainId === undefined) {
      return;
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

const getChainUSDPrice = async ({ chainId, chainBalance, usdtToken }) => {
  if (chainId === null || chainId === undefined) {
    return;
  } else {
    const addressNative = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
    const decimalsNative = '18';
    // const { chainId, chainBalance, usdtToken } = userData;
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

      let newData = {
        chainPrice,
        totalChainPrice,
      };
      return newData;
    }
  }
};

// const getPriceInternal = async ({
//   chainId,
//   fAddress,
//   fDecimals,
//   tAddress,
//   tDecimals,
//   fValue,
// }) => {
//   let validatedValue = '';

//   if(!chainId){
//     return
//   }

//   if (fAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//     validatedValue = parseUnits(
//       fValue.toString(),
//       fDecimals.toString()
//     ).toString();
//   } else {
//     validatedValue = parseEther(fValue.toString()).toString();
//   }

//   const response = await axios.get(
//     `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${fAddress}&toTokenAddress=${tAddress}&amount=${validatedValue}&fee=${fee}&gasLimit=3000000`
//   );
//   if (response.data) {
//     const data = response.data;
//     console.log('data:', data);

//     const { toTokenAmount, estimatedGas, protocols } = data;

//     let toTokenAmountFormatted = '';

//     if (tAddress != '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
//       toTokenAmountFormatted = formatUnits(
//         toTokenAmount.toString(),
//         tDecimals.toString()
//       ).toString();
//     } else {
//       toTokenAmountFormatted = parseEther(toTokenAmount.toString()).toString();
//     }

//     let toTokenAmountFixed = Number(toTokenAmountFormatted).toFixed(3);

//     const result = {
//       validatedValue,
//       tValue: toTokenAmount,
//       tValueFormatted: toTokenAmountFixed,
//       estimatedGas: estimatedGas,
//       allProtocols: protocols,
//     };

//     console.log({ priceDataRaw: result });
//     return result;
//   }
// };

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

    const response = await axios.get(
      `https://api.1inch.exchange/v5.0/${chainId}/quote?fromTokenAddress=${fAddress}&toTokenAddress=${tAddress}&amount=${validatedValue}&fee=${fee}&gasLimit=3000000`
    );
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
      const response = await axios.get(
        `https://api.1inch.io/v5.0/${chainId}/approve/spender`
      );

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

export {
  //========================{In use}==============================
  updatePrice,
  updateFromPrice,
  fetchChainPrice,
  fetchSpender,
};
