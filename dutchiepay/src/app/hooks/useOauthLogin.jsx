import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';
import { login } from '@/redux/slice/loginSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useOAuthLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = new Cookies();

  const handleMessage = (event) => {
    const allowedOrigins = [process.env.NEXT_PUBLIC_BASE_URL];

    if (
      allowedOrigins.includes(event.origin) &&
      event.data.type === 'OAUTH_LOGIN'
    ) {
      const encryptedData = CryptoJS.enc.Base64.parse(event.data.encrypted);
      const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_SECRET_KEY);
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedData },
        key,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      ).toString(CryptoJS.enc.Utf8);

      const extracted = decrypted
        .trim()
        .split(',')
        .map((item) => {
          const value = item.split(':')[1].trim();
          return value.replace(/(^"|"$)/g, '');
        });

      const userInfo = {
        userId: Number(extracted[0]),
        nickname: extracted[2],
        profileImage: extracted[3] === 'null' ? null : extracted[3],
        location: extracted[4],
        isCertified: extracted[7] === 'true',
      };

      localStorage.setItem('loginType', extracted[1] || 'email');
      dispatch(
        login({
          user: userInfo,
          access: extracted[5],
        })
      );

      cookies.set('refresh', extracted[6], { path: '/' });

      router.push('/');
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
}
