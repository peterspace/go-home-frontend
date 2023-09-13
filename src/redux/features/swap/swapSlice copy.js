// import { createSlice } from '@reduxjs/toolkit';
// import { createAction, createAsyncThunk} from '@reduxjs/toolkit';
import swapService from './swapService';

import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { networksOptions } from '../../../constants';

export const resetState = createAction('Reset_all');
// const userSessionL = JSON.parse(localStorage.getItem('userSession')) || {};
// const userSessionL = localStorage.getItem('userSession')
//   ? JSON.parse(localStorage.getItem('userSession'))
//   : null;

const userPriceL = localStorage.getItem('userPrices')
  ? JSON.parse(localStorage.getItem('userPrices'))
  : null;

const allTokensLocal = localStorage.getItem('allTokens')
  ? JSON.parse(localStorage.getItem('allTokens'))
  : null;
const fTokenLocal = localStorage.getItem('fToken')
  ? JSON.parse(localStorage.getItem('fToken'))
  : null;
const tTokenLocal = localStorage.getItem('tToken')
  ? JSON.parse(localStorage.getItem('tToken'))
  : null;
const usdtTokenLocal = localStorage.getItem('usdtToken')
  ? JSON.parse(localStorage.getItem('usdtToken'))
  : null;
const chainIdLocal = localStorage.getItem('chainId')
  ? JSON.parse(localStorage.getItem('chainId'))
  : 1;
const chainLocal = localStorage.getItem('chain')
  ? JSON.parse(localStorage.getItem('chain'))
  : networksOptions[0];
const fValueLocal = localStorage.getItem('fValue')
  ? JSON.parse(localStorage.getItem('fValue'))
  : 1;

const slippageLocal = localStorage.getItem('slippage')
  ? JSON.parse(localStorage.getItem('slippage'))
  : '1';

// ntaxError: "undefined" is not valid JSON
//     at JSON.parse (<
const initialState = {
  // userSession: userSessionL ? userSessionL : null,
  userSession: null,
  // userPrices: userPriceL,
  userPrices: userPriceL,

  //==============={Primary Data}=========================

  // chainId: null, // default 1
  chainId: chainIdLocal, // default 1
  // chainBalance: chainBalanceL ? chainBalanceL : 0,
  chainBalance: null,
  fTokenAddress: null,
  tTokenAddress: null,
  fValue: fValueLocal,
  slippage: slippageLocal,
  //==============={Secondary Data}=========================

  userInfo: null,
  chain: chainLocal,
  chainSymbol: null, // default ETH
  chainUSDData: null,
  fToken: fTokenLocal,
  // fToken: null,
  tToken: tTokenLocal,
  usdtToken: usdtTokenLocal,
  allTokens: allTokensLocal,
  // fValue: fValueLocal ? fValueLocal : null,
  //fValue: fValueLocal? fValueLocal : 1, // reconsider, to always have non zero value
  tValue: null,
  tValueFormatted: null,
  estimatedGas: null,
  validatedValue: null,

  allProtocols: null,
  switchNetwork: null,
  connectedNetwork: false,
  //============{New Changes}===================
  isChangeChainId: null,
  isChangeFAddress: null,
  isChangeTAddress: null,
  isChangeSlippage: null,
  isChangeFValue: null,
  isConnected: null,
  isConnecting: false,

  //isNewChange:false,
};
// updateIsNewChange

export const fetchFromPrice = createAsyncThunk(
  'swap/updateFromPrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.fetchFromPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchToPrice = createAsyncThunk(
  'swap/updatePrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.fetchToPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// fetchToPrice

export const swapSlice = createSlice({
  name: 'swap',

  initialState,
  reducers: {
    updateUserSession(state, action) {
      state.userSession = action.payload;
      // setLocalStorage('userSession', action.payload);
    },
    updateUserPrices(state, action) {
      state.userPrices = action.payload;
    },
    //==============={Primary Data}=========================
    updateChainId(state, action) {
      state.chainId = action.payload;
    },
    updateChainBalance(state, action) {
      state.chainBalance = action.payload;
    },
    updateFromValue(state, action) {
      state.fValue = action.payload;
      // setLocalStorage('fValue', action.payload);
    },
    updateSlippage(state, action) {
      state.slippage = action.payload;
    },
    //==============={Secondary Data}=========================

    updateChain(state, action) {
      state.chain = action.payload;
    },
    updateChainSymbol(state, action) {
      state.chainSymbol = action.payload;
    },
    updateChainUSDData(state, action) {
      state.chainUSDData = action.payload;
    },
    updateFromToken(state, action) {
      state.fToken = action.payload;
    },
    updateToToken(state, action) {
      state.tToken = action.payload;
    },

    updateUsdtToken(state, action) {
      state.usdtToken = action.payload;
    },

    updateAllTokens(state, action) {
      state.allTokens = action.payload;
      //==============={New}================================
      // setLocalStorage('fTokenAddress', action.payload[0]?.address);
      // setLocalStorage('tTokenAddress', action.payload[1]?.address);
      // state.fToken = action.payload[0];
      // state.tToken = action.payload[1];
    },
    updateAllProtocols(state, action) {
      state.allProtocols = action.payload;
    },
    updateToValue(state, action) {
      state.tValue = action.payload;
    },
    updateSwitchNetwork(state, action) {
      state.switchNetwork = action.payload;
    },
    updateConnectedNetwork(state, action) {
      state.connectedNetwork = action.payload;
    },
    UpdateUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    updateTValueFormatted(state, action) {
      state.tValueFormatted = action.payload;
    },
    updateEstimatedGas(state, action) {
      state.estimatedGas = action.payload;
    },
    updateValidatedValue(state, action) {
      state.validatedValue = action.payload;
    },
    updateIsNewChange(state, action) {
      state.isNewChange = action.payload;
    },
    updateIsChangeChainId(state, action) {
      state.isChangeChainId = action.payload;
    },
    updateIsChangeFAddress(state, action) {
      state.isChangeFAddress = action.payload;
    },
    updateIsChangeTAddress(state, action) {
      state.isChangeTAddress = action.payload;
    },
    updateIsChangeSlippage(state, action) {
      state.isChangeSlippage = action.payload;
    },
    updateIsChangeFValue(state, action) {
      state.isChangeFValue = action.payload;
    },
    updateConnection(state, action) {
      state.isConnected = action.payload;
    },
    updateConnecting(state, action) {
      state.isConnecting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFromPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFromPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fromPriceData = action.payload;
        localStorage.setItem('fromPriceData', JSON.stringify(action.payload));
      })
      .addCase(fetchFromPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(fetchToPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchToPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.toPriceData = action.payload;
        localStorage.setItem('userPrices', JSON.stringify(action.payload));
      })
      .addCase(fetchToPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export const {
  updateUserSession,
  updateUserPrices,
  //==============={Primary Data}=========================
  updateChainId,
  updateChainBalance,
  updateFromValue,
  updateSlippage,
  //==============={Secondary Data}=========================
  updateChain,
  updateChainUSDData,
  updatetChainId,
  updateChainSymbol,
  updateFromToken,
  updateToToken,
  updateUsdtToken,
  updateToValue,
  updateSwitchNetwork,
  updateConnectedNetwork,
  updateAllTokens,
  updateAllProtocols,
  UpdateUserInfo,
  updateTValueFormatted,
  updateEstimatedGas,
  updateValidatedValue,
  updateIsNewChange,
  updateIsChangeChainId,
  updateIsChangeFAddress,
  updateIsChangeTAddress,
  updateIsChangeSlippage,
  updateIsChangeFValue,
  updateConnection,
  updateConnecting,
} = swapSlice.actions;
export default swapSlice.reducer;
