import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import axios from 'axios';
import kakao from '../../../../public/image/kakao.png';
import naver from '../../../../public/image/naver.png';
import { useRouter } from 'next/navigation';

export default function SocialSignup() {
  const router = useRouter();

  const handleSocial = async (type) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/signup?type=${type}`
      );
      console.log(`${type} 회원가입 성공 : ${response.data}`);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-[20px] h-[70px]">
      <button
        className="user-signup__button bg-[#00c73c] text-white"
        type="button"
        onClick={() => handleSocial('naver')}
      >
        <Image src={naver} width={40} height={40} alt="naver" />
        <p>네이버로 시작하기</p>
      </button>
      <button
        className="user-signup__button bg-[#FBDB44]"
        type="button"
        onClick={() => handleSocial('kakao')}
      >
        <Image src={kakao} width={40} height={40} alt="kakao" />
        <span>카카오로 시작하기</span>
      </button>
    </div>
  );
}
