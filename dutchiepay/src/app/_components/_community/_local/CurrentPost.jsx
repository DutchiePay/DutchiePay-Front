import Image from 'next/image';
import Post_Complete from '../Post_Complete';
import profile from '/public/image/profile.jpg';

export default function CurrentPost({ register, setValue }) {
  return (
    <div className="border rounded-lg px-[32px] py-[16px] mt-[24px]">
      <div className="flex items-center gap-[4px] mb-[4px] pb-[4px] border-b-2 border-blue--500">
        <Image
          className="w-[20px] h-[20px] rounded-full border"
          src={profile}
          alt="프로필"
          width={20}
          height={20}
        />
        <h2 className="font-bold">한유진님의 최근 거래 완료글 (48개)</h2>
      </div>
      <div className="flex flex-col gap-[8px] mt-[12px]">
        <Post_Complete />
        <Post_Complete />
        <Post_Complete />
        <Post_Complete />
        <Post_Complete />
      </div>
    </div>
  );
}
