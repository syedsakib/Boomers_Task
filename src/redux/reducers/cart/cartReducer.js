import {
  ADD_TO_CART,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
  CLEAR_CART,
  ADD_SINGLE_ITEM_TO_CART,
} from "./cartTypes";

export const addItemToCart = (cartItems, cartItemToAdded) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdded.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdded.id
        ? {
            id: cartItemToAdded.id,
            title: cartItemToAdded.title,
            price: cartItemToAdded.price,
            image: cartItemToAdded.image,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  } else {
    return [
      ...cartItems,
      {
        ...cartItemToAdded,
        quantity: 1,
      },
    ];
  }
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  } else {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? {
            id: cartItemToRemove.id,
            title: cartItemToRemove.title,
            price: cartItemToRemove.price,
            image: cartItemToRemove.image,
            quantity: cartItemToRemove.quantity - 1,
          }
        : cartItem
    );
  }
};

export const addSingleItemToCart = (cartItems, cartItemToAdded) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.shopProductSku === cartItemToAdded.shopProductSku
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdded.id
        ? {
            id: cartItemToAdded.id,
            title: cartItemToAdded.title,
            price: cartItemToAdded.price,
            image: cartItemToAdded.image,
          }
        : cartItem
    );
  } else {
    return [
      ...cartItems,
      {
        ...cartItemToAdded,
      },
    ];
  }
};

const INITIAL_STATE = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case ADD_SINGLE_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addSingleItemToCart(state.cartItems, action.payload),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
