// __tests__/(routes)/login/page.test.jsx
import { render, screen } from '@testing-library/react';
import Login from '../../../src/app/(routes)/login/page'; // 경로를 맞춤

// 자식 컴포넌트를 Mock
jest.mock('../../../src/app/_components/_user/_login/LoginSubmit', () => () => (
  <div>LoginSubmit</div>
));

jest.mock('../../../src/app/_components/_user/Logo', () => () => (
  <div>Logo</div>
));

jest.mock('../../../src/app/_components/_user/_login/SocialLogin', () => () => (
  <div>SocialLogin</div>
));

describe('Login Page', () => {
  it('로그인 페이지 진입 시 Logo,LoginSubmit,SocialLogin 렌더링 되는지 테스트', () => {
    render(<Login />);

    // 각 컴포넌트가 렌더링되는지 확인
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('LoginSubmit')).toBeInTheDocument();
    expect(screen.getByText('SocialLogin')).toBeInTheDocument();
  });
});
