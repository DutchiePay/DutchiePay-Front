import Header from '@/app/_components/_layout/Header';
import { Provider } from 'react-redux';
import addressReducer from '@/redux/slice/addressSlice';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/redux/slice/loginSlice';
import profile from '../../public/image/profile.jpg';

// Mock 데이터
const mockLoggedInState = {
  isLoggedIn: true,
  user: {
    userId: '123',
    nickname: 'testuser',
    profileImage: profile,
    location: null,
    isCertified: null,
  },
  access: 'mock-access-token',
  addresses: [
    {
      addressId: 1,
      addressName: 'Home',
    },
  ],
};

const mockLoggedOutState = {
  isLoggedIn: false,
  user: {
    userId: null,
    nickname: null,
    profileImage: null,
    location: null,
    isCertified: null,
  },
  access: '',
  addresses: [],
};

// 스토어 생성 함수
const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      login: loginReducer,
      address: addressReducer,
    },
    preloadedState: { login: initialState }, // 초기 상태 설정
  });
};

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <Provider store={createTestStore(mockLoggedOutState)}>{Story()}</Provider>
    ),
  ],
};

// LoggedIn 스토리
export const LoggedIn = () => {
  const store = createTestStore(mockLoggedInState);
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
};

// LoggedOut 스토리
export const LoggedOut = () => {
  const store = createTestStore(mockLoggedOutState);
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
};
