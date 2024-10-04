import { persistReducer, persistStore } from 'redux-persist';

import addressReducer from './slice/addressSlice';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../redux/slice/loginSlice';
import sessionStorage from 'redux-persist/lib/storage/session';

const rootReducer = combineReducers({
  address: addressReducer,
  login: loginReducer,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  timeout: 1000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // serializableCheck를 사용하지 않도록 함
    }),
});

const persistor = persistStore(store);

export { store, persistor };
