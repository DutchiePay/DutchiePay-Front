import '@/styles/mypage.css';

import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'universal-cookie';
import axios from 'axios';
import { logout } from '@/redux/slice/loginSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Withdraw({ loginType }) {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const access = useSelector((state) => state.login.access);
  const router = useRouter();

  const handleWithdraw = async () => {
    if (confirm('정말 탈퇴하실겁니까?')) {
      try {
        if (loginType === 'email') {
          await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
        } else {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/oauth?type=${loginType}`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
        }

        dispatch(logout());
        cookies.remove('refresh', { path: '/' });
        alert('정상적으로 탈퇴처리 되었습니다.');
        router.push('/');
      } catch (error) {
        // 에러 처리
        console.log(error);
      }
    }
  };

  return (
    <button
      className="flex justify-end text-[14px] text-gray--500 hover:underline"
      onClick={handleWithdraw}
    >
      회원탈퇴
    </button>
  );
}
