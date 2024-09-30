import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  user: {
    address: null,
    coupon: 0,
    detail: null,
    email: null,
    order: 0,
    phone: null,
    zipcode: null,
  },
};

// 유저 슬라이스 생성
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    setPhone(state, action) {
      state.user.phone = action.payload.phone;
    },
  },
});

// 액션 및 리듀서 내보내기
export const { setUser, setPhone } = userSlice.actions;
export default userSlice.reducer;
