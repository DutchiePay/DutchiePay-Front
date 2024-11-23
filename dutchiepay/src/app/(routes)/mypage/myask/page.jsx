'use client';

import '@/styles/mypage.css';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import MyAsks from '@/app/_components/_mypage/MyAsk';
import ask from '/public/image/nonItem/ask.svg';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function MyAsk() {
  const [asks, setAsks] = useState([]);
  const nickname = useSelector((state) => state.login.user.nickname);
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  useEffect(() => {
    const fetchAsks = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/asks`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setAsks(response.data);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          /*const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await fetchAsks();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }*/
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };
    fetchAsks();
  }, [access]);
  const handleDeleteAsk = (askId) => {
    setAsks((prevAsks) => prevAsks.filter((ask) => ask.askId !== askId));
  };
  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">문의내역</h1>
      <small>{nickname}님께서 문의하신 내역들을 확인할 수 있습니다.</small>
      <section className="flex flex-col gap-[16px] mt-[16px]">
        {asks.length === 0 ? (
          <div className="mt-[20%] w-[730px] items-center text-center">
            <Image
              src={ask}
              alt="문의 내용 없음"
              width={40}
              height={40}
              className="pt-[32px] mx-auto"
            />
            <p className="my-[40px]">등록된 문의가 없습니다.</p>
          </div>
        ) : (
          asks.map((item) => {
            return (
              <MyAsks key={item.askId} item={item} onDelete={handleDeleteAsk} />
            );
          })
        )}
      </section>
    </section>
  );
}
