import { useCallback, useEffect } from 'react';

import CryptoJS from 'crypto-js';
import useLogin from './useLogin';
import { useRouter } from 'next/navigation';

export default function useOAuthLogin() {
  const router = useRouter();
  const handleLogin = useLogin();

  const handleMessage = useCallback(
    (event) => {
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

        const extracted = JSON.parse(decrypted);
        const userInfo = {
          userId: extracted.userId,
          nickname: extracted.nickname,
          profileImage: extracted.profileImg,
          location: extracted.location,
          isCertified: extracted.isCertified,
        };

        handleLogin({
          userInfo,
          access: extracted.access,
          loginType: extracted.type,
          isRelogin: false,
          isRemeberMe: false,
          refresh: extracted.refresh,
        });
        router.push('/');
      }
    },
    [handleLogin, router]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);
}
