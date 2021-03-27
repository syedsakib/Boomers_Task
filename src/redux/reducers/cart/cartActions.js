import {
  ADD_TO_CART,
  ADD_SINGLE_ITEM_TO_CART,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
  CLEAR_CART,
} from "./cartTypes";

export const addItem = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const addSingleItemToCart = (item) => ({
  type: ADD_SINGLE_ITEM_TO_CART,
  payload: item,
});

export const removeSingleItemFromCart = (item) => ({
  type: REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
