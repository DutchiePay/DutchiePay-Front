import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginSubmit from '@/app/_components/_user/_login/LoginSubmit';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useRouter } from 'next/navigation';
import axios from 'axios';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('axios');

const mockPush = jest.fn();
useRouter.mockImplementation(() => ({
  push: mockPush,
}));

const renderLoginSubmit = () => {
  render(
    <Provider store={store}>
      <LoginSubmit />
    </Provider>
  );
};

describe('LoginSubmit 컴포넌트', () => {
  // beforeEach는 각 테스트 케이스가 실행되기 전에 실행되는 코드를 정의
  // API 호출 성공 실패 비교를 위해 테스트 실행 전 성공 데이터로 설정
  beforeEach(() => {
    axios.post.mockResolvedValue({
      data: {
        userId: '123',
        nickname: '용호',
        profileImg: 'profile.png',
        location: '부천시',
        isCertified: true,
        access: 'mockAccessToken',
        refresh: 'mockRefreshToken',
        loginType: 'email',
      },
    });
  });
  //it 함수를 사용하여 특정 기능이나 동작에 대한 테스트를 정의
  it('렌더링: 로그인 폼 요소 확인', async () => {
    renderLoginSubmit();

    // 현재 DOM 구조 확인
    screen.debug(); // 요소를 확인하기 위해 사용

    // 비동기적으로 요소가 렌더링되기를 기다립니다.
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByText('로그인')).toBeInTheDocument();
    expect(screen.getByLabelText('자동 로그인')).toBeInTheDocument();
  });

  it('올바른 정보 입력 후 로그인 버튼 클릭 시 API 호출 테스트', async () => {
    renderLoginSubmit();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test8823@naver.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'test123!' },
    });
    fireEvent.click(screen.getByText('로그인'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://api.dutchie-pay.site/users/login',
        { email: 'test8823@naver.com', password: 'test123!' }
      );
    });

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('로그인 실패 시 메시지 출력', async () => {
    // Axios에서 로그인 실패를 mockRejectedValue로 설정
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: '일치하는 회원정보가 없습니다.',
        },
      },
    });

    renderLoginSubmit(); // LoginSubmit 컴포넌트를 렌더링

    // 잘못된 이메일과 비밀번호 입력
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'wrongemail@naver.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'wrongpassword!' },
    });

    // 로그인 버튼 클릭
    fireEvent.click(screen.getByText('로그인'));

    // 로그인 실패 메시지가 나타날 때까지 기다림
    await waitFor(() => {
      expect(screen.findByText('일치하는 회원정보가 없습니다.'));
    });
  });
});
