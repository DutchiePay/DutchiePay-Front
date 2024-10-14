import { Provider } from 'react-redux';
import Sidebar from '@/app/_components/_layout/Sidebar';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/redux/slice/loginSlice';
import profile from '../../public/image/profile.jpg';

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
};

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      login: loginReducer,
    },
    preloadedState: { login: initialState },
  });
};

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <Provider store={createTestStore(mockLoggedInState)}>
        <Story />
      </Provider>
    ),
  ],
};

const Template = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {};
