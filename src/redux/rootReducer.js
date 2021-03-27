import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./reducers/cart/cartReducer";

import productsReducer from "./reducers/products/productReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
