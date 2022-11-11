import {
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
  } from "../Constants/wishlistConstants";
  
  export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
    switch (action.type) {
      case WISHLIST_ADD_ITEM:
        const items = action.payload;

        const existItem = state.wishlistItems && state.wishlistItems.find((x) => x.product === items.product);

        if (existItem) {
          return {
            ...state,
            wishlistItems: state.wishlistItems.map((x) =>
              x.product === existItem.product ? items : x
            ),
          };
        } else {
          return {
            ...state,
            wishlistItems: [...state.wishlistItems, items],
          };
        }
      case WISHLIST_REMOVE_ITEM:
        return {
          ...state.wishlistItems,
          wishlistItems: state.wishlistItems.filter(
            (x) => x.product !== action.payload
          ),
        };
      default:
        return state;
    }
  };