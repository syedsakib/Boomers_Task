import actionTypes from "./productTypes";

export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchProductsSuccess = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    //  payload: products,
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};
