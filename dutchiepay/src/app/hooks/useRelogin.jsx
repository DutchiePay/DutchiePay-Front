import Cookies from 'universal-cookie';
import axios from 'axios';
import useLogin from './useLogin';

export default function useRelogin() {
  const handleLogin = useLogin();

  const handleRelogin = async () => {
    const cookies = new Cookies();
    const refresh = cookies.get('refresh');

    if (!refresh) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/relogin`
      );

      const userInfo = {
        userId: response.data.userId,
        nickname: response.data.nickname,
        profileImage: response.data.profileImg,
        location: response.data.location,
        isCertified: response.data.isCertified,
      };

      handleLogin({
        userInfo,
        access: response.data.access,
        loginType: response.data.type,
        isRelogin: true,
        isRemeberMe: true,
      });
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
