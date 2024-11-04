import Cookies from 'universal-cookie';
import axios from 'axios';
import { login } from '@/redux/slice/loginSlice';
import { useDispatch } from 'react-redux';

export default function useRelogin() {
  const dispatch = useDispatch();

  const handleRelogin = async () => {
    const cookies = new Cookies();
    const refresh = cookies.get('refresh');

    if (!refresh) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/relogin`,
        { refresh: refresh }
      );

      const userInfo = {
        isLoggedIn: true,
        loginType: response.data.type || 'email',
        user: {
          userId: response.data.userId,
          nickname: response.data.nickname,
          profileImage: response.data.profileImg,
          location: response.data.location,
          isCertified: response.data.isCertified,
        },
        access: response.data.access,
      };
      localStorage.setItem('loginType', userInfo.loginType);
      dispatch(
        login({
          user: userInfo.user,
          access: userInfo.access,
        })
      );
    } catch (error) {
      if (
        error.response.data.message === '리프레시 토큰이 유효하지 않습니다.'
      ) {
        alert('자동로그인이 만료되었습니다. 다시 로그인해 주세요.');
        cookies.remove('refresh', { path: '/' });
      }
    }
  };

  return handleRelogin;
}
