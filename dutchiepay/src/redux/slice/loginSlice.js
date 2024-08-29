import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  isLoggedIn: false,
  user: null, // 사용자 정보가 필요하다면 여기에 저장
  jwt: {
    access: '',
    expirationTime: '',
  },
};

// 로그인 슬라이스 생성
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload; // 로그인 시 사용자 정보를 payload로 받아서 저장
      state.jwt = action.payload.jwt;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null; // 로그아웃 시 사용자 정보 초기화
      state.jwt = { access: '', expirationTime: '' };
    },
  },
});

// 액션 및 리듀서 내보내기
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
