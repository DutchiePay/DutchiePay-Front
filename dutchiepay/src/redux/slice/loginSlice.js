import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  isLoggedIn: false,
  user: {
    userId: null,
    nickname: null,
    profileImage: null,
    location: null,
    isCertified: null,
  },
  access: '',
};

// 로그인 슬라이스 생성
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.access = action.payload.access;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.user = {
        userId: null,
        nickname: null,
        profileImage: null,
        location: null,
        isCertified: null,
      };
      state.access = '';
    },
    setUserInfoChange(state, action) {
      if (action.payload.profileImage) {
        state.user.profileImage = action.payload.profileImage;
      }
      if (action.payload.nickname) {
        state.user.nickname = action.payload.nickname;
      }
      if (action.payload.location) {
        state.user.location = action.payload.location;
      }
    },
    // setProfileImage(state, action) {
    //   state.user.profileImage = action.payload.profileImage;
    // },
    // setNickname(state, action) {
    //   state.user.nickname = action.payload.nickname;
    // },
    // setLocation(state, action) {
    //   state.user.location = action.payload.location;
    // },
    setAccessToken(state, action) {
      state.access = action.payload.access;
    },
  },
});

// 액션 및 리듀서 내보내기
export const { login, logout, setUserInfoChange, setAccessToken } =
  loginSlice.actions;
export default loginSlice.reducer;
