import axios from 'axios';
import { base_url } from '../../utils/baseUrl';
import { toast } from 'react-toastify';

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData, {
    withCredentials: true,
  });
  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data));
  }
  return response.data;
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (userData) => {
  const response = await axios.post(`${base_url}user/cart`, userData);
  if (response.data) {
    return response.data;
  }
};

// Get  WishList

// Get getUser's Cart Items
const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`);
  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}delete-product-cart/${cartItemId}`
  );
  if (response.data) {
    return response.data;
  }
};

const updateProductFromCart = async (cartDetail) => {
  const response = await axios.put(
    `${base_url}update-product-cart/${cartDetail.cartItemId}/${cartDetail.newQuantity}`
  );
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async (userData) => {
  const response = await axios.delete(`${base_url}user/empty-cart`, userData);
  if (response.data) {
    return response.data;
  }
};

//============{new}===============================

// Forgot Password

const forgotPassword = async (userData) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

// Reset Password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${resetToken}`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

// Update password
const updatePassword = async (userData) => {
  const response = await axios.put(`${base_url}user/password`, userData);
  if (response.data) {
    return response.data;
  }
};

const applyCoupon = async (userData) => {
  const response = await axios.post(
    `${base_url}user/cart/applycoupon`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

// upload video
const createOrder = async (userData) => {
  const response = await axios.post(
    `${base_url}user/cart/cash-order`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

// get all orders by userId
const getUserOrders = async (id) => {
  const response = await axios.get(`${base_url}user/getorderbyuser/${id}`);
  if (response.data) {
    return response.data;
  }
};

const getUserOders = async () => {
  const response = await axios.get(`${base_url}user/cart`);
  if (response.data) {
    return response.data;
  }
};

// Get User Profile
const getUser = async () => {
  const response = await axios.get(`${base_url}user/getuser`);
  if (response.data) {
    return response.data;
  }
};
// Update Profile
const updateUser = async (userData) => {
  const response = await axios.put(`${base_url}user/edit-user`, userData);
  if (response.data) {
    return response.data;
  }
};

// Update Profile
const saveAddress = async (userData) => {
  const response = await axios.put(`${base_url}user/save-address`, userData);
  if (response.data) {
    return response.data;
  }
};

// Get Login Status
const getLoginStatus = async () => {
  const response = await axios.get(`${base_url}user/loggedin`);
  if (response.data) {
    return response.data;
  }
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(`${base_url}user/getorderbyuser/${id}`);

  return response.data;
};

export const authService = {
  login,
  register,
  getUserWishlist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  emptyCart,
  forgotPassword,
  resetPassword,
  updatePassword,
  applyCoupon,
  createOrder,
  getUserOrders,
  getUserOders,
  getUser,
  updateUser,
  saveAddress,
  getLoginStatus,
  getOrders,
  getOrder,
};
