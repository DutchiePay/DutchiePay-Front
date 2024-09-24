import { persistReducer, persistStore } from 'redux-persist';

import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../redux/slice/loginSlice';
import sessionStorage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, loginReducer);

// Redux 스토어 생성
const store = configureStore({
  reducer: {
    login: persistedReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }), // serializableCheck를 사용하지 않도록 함
});

const persistor = persistStore(store);

export { store, persistor };
