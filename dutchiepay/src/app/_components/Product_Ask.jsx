import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import trash from '../../../public/image/trash.svg';
import secret from '../../../public/image/secret.svg';
import { useState } from 'react';

export default function Post_Ask() {
  return (
    <>
      <tr className="border-b-2  border-gray-300 text-center ">
        <td className="w-[100px] px-2 py-[20px]  border-gray-300">미답변</td>
        <td className="w-[500px] px-2 py-[20px] text-start flex items-center">
          <Image
            className="mr-[4px] flex-shrink-0"
            src={secret}
            width={16}
            height={16}
            alt="비밀글 아이콘"
          />
          <p className="product-ask__text flex-1">
            배송이 빠르고 제품 포장도 꼼꼼했습니다. 제품 자체도 튼튼하고 오래
            쓸것 같아요.
          </p>
        </td>
        <td className=" w-[150px] px-2 py-[20px]  border-gray-300">
          최대8글자닉네임
        </td>
        <td className="w-[150px] px-2 py-[20px]">2024.05.31</td>
        <td className=" w-[100px] px-2 py-[20px]  border-gray-300 ">
          <Image
            className="m-0 m-auto"
            src={trash}
            alt="삭제 아이콘"
            width={15}
            height={16}
          />
        </td>
      </tr>
    </>
  );
}
