import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productsByCategoryReducer,
  productTopRatedReducer,
  productUpdateReducer,
  listCategory2Reducer,
  listProductsByCategoryReducer
} from "./Reducers/productReducers";

import { cartCreateReducer, cartItemsReducer, cartReducer, deleteFromCartReducer } from "./Reducers/cartReducers";
import { wishlistReducer } from "./Reducers/wishlistReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./Reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
  orderDeliverReducer,
  orderShipReducer,
  orderListMyReducer
} from "./Reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderShip: orderShipReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderListMy: orderListMyReducer,
  productsByCategory: productsByCategoryReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  listCategory2: listCategory2Reducer,
  listProductsByCategory: listProductsByCategoryReducer,
  cartCreate: cartCreateReducer,
  cartItems2: cartItemsReducer,
  deleteFromCart:deleteFromCartReducer
});

//Get the cart items from the local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

//Get user info from the storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//Get shipping address from the storage
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

//Get the variant from the storage
const productVariantFromStorage = localStorage.getItem("productVariant")
  ? JSON.parse(localStorage.getItem("productVariant"))
  : null;

//Get the wishlist items from the storage
const wishlistFromStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    // productVariant: productVariantFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
  wishlist: { wishlistItems: wishlistFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
