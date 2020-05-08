import createSecureStore from "redux-persist-expo-securestore";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import { stopsReducer } from "./stops/reducers";
import { StopsState } from "./stops/types";

export type RootState = { stops: StopsState };

const storage = createSecureStore();

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers<RootState>({
  stops: stopsReducer,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};
