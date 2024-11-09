import { persistReducer, persistStore } from 'redux-persist';

import addressReducer from './slice/addressSlice';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import loginReducer from '../redux/slice/loginSlice';

// 서버 사이드에서 오류가 발생하지 않도록 하는 더미 스토리지 생성
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// 클라이언트와 서버를 구분하여 스토리지 설정
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('session')
    : createNoopStorage();

const rootReducer = combineReducers({
  address: addressReducer,
  login: loginReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  timeout: 1000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // serializableCheck를 사용하지 않도록 설정
    }),
});

const persistor = persistStore(store);

export { store, persistor };
