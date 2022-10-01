import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_CREATE_REQUEST,
  CART_CREATE_SUCCESS,
  CART_CREATE_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SELECT_VARIANT,
  GET_CART_ITEM_REQUEST,
  GET_CART_ITEM_SUCCESS,
  GET_CART_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
} from "../Constants/cartConstants";

export const addToCart =
  (id, qty, variant, price) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        variantFromDB: data.variant,
        countInStock: data.countInStock,
        variantSelected: data.variant[variant],
        qty,
        price,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// Attach cart items to user (Create cart to the user)
export const createCart = (product) => async (dispatch, getState) => {
  console.log(product);

  try {
    dispatch({ type: CART_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/cart`, product, config);

    dispatch({
      type: CART_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Get cart items of user
export const getItemsFromCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CART_ITEM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/cart`, config);

    dispatch({
      type: GET_CART_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const removeFromCart = (id) => (dispatch, getState) => {
//   dispatch({
//     type: CART_REMOVE_ITEM,
//     payload: id,
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

// Remove product from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM_REQUEST,
      payload: id,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/cart/${id}`, config);
    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const selectProductVariant = (data) => (dispatch) => {
  dispatch({
    type: CART_SELECT_VARIANT,
    payload: data,
  });

  localStorage.setItem("productVariant", JSON.stringify(data));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
