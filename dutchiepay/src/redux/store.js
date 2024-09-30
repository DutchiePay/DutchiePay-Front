import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../redux/slice/loginSlice';
import userReducer from '../redux/slice/userSlice';
import sessionStorage from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';

// 여러 리듀서를 결합
const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  timeout: 1000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux 스토어 생성
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // serializableCheck를 사용하지 않도록 함
    }),
});

const persistor = persistStore(store);

export { store, persistor };
