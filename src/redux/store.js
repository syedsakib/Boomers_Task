import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";

//persist data
import { persistStore } from "redux-persist";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//persist data
export const persistor = persistStore(store);

export default { store, persistor };
