import {
  CART_ADD_ITEM,
  CART_CREATE_FAIL,
  CART_CREATE_REQUEST,
  CART_CREATE_SUCCESS,
  CART_REMOVE_ITEM,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SELECT_VARIANT,
  GET_CART_ITEM_FAIL,
  GET_CART_ITEM_REQUEST,
  GET_CART_ITEM_SUCCESS,
} from "../Constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    // case CART_SAVE_SHIPPING_ADDRESS:
    //   return {
    //     ...state,
    //     shippingAddress: action.payload,
    //   };
    // case CART_SAVE_PAYMENT_METHOD:
    //   return {
    //     ...state,
    //     paymentMethod: action.payload,
    //   };
    case CART_SELECT_VARIANT:
      return {
        ...state,
        productVariant: action.payload,
      };
    default:
      return state;
  }
};

export const cartCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_CREATE_REQUEST:
      return { loading: true };
    case CART_CREATE_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case CART_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cartItemsReducer = (state = { products: [], shippingAddress: {}, paymentMethod: "" }, action) => {
  switch (action.type) {
    case GET_CART_ITEM_REQUEST:
      return { loading: true };
    case GET_CART_ITEM_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case GET_CART_ITEM_FAIL:
      return { loading: false, error: action.payload };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export const deleteFromCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_REMOVE_ITEM_REQUEST:
      return { loading: true };
    case CART_REMOVE_ITEM_SUCCESS:
      return { loading: false, success: true };
    case CART_REMOVE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};