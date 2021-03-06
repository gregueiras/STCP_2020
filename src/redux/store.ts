import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSecureStore from 'redux-persist-expo-securestore';
import thunk from 'redux-thunk';

import { stopsReducer } from './stops/reducers';
import { StopsState } from './stops/types';
import { providersReducer, ProvidersState } from './providers';

export type RootState = { stops: StopsState, providers: ProvidersState };

const storage = createSecureStore();

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers<RootState>({
  stops: stopsReducer,
  providers: providersReducer
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};
