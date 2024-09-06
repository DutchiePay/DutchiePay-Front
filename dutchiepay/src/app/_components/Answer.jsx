import Image from 'next/image';
import reply from '../../../public/image/reply.svg';
import { useState } from 'react';
export default function Answer({ answer }) {
  const [isMore, setIsMore] = useState(false);
  const handleIsMore = () => {
    setIsMore(!isMore);
  };
  return (
    <tr className="border-b-2 border-gray-300 text-center">
      <td className="w-[100px] pl-[45px] py-[20px] border-gray-300">
        <Image className="" src={reply} alt="reply" width={10} height={10} />
      </td>
      <td className="w-[500px] px-2 py-[20px] text-start flex items-center gap-[4px]">
        <p
          className={`flex-1 cursor-pointer ${isMore ? 'line-clamp-none' : 'line-clamp-1'}`}
          onClick={handleIsMore}
        >
          {answer}
        </p>
      </td>
      <td className="w-[150px] px-2 py-[20px] border-gray-300">
        이랜드팜앤푸드
      </td>
      <td className="w-[150px] px-2 py-[20px]">2024.05.31</td>
      <td className="w-[100px] px-2 py-[20px] border-gray-300"></td>
    </tr>
  );
}
