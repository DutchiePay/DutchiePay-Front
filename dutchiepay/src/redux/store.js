import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slice/loginSlice";

// Redux 스토어 생성
const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
