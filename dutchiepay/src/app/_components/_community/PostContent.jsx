'use client';

import '@/styles/community.css';
import '@/styles/globals.css';

import Comment from '@/app/_components/_community/Comment';
import Image from 'next/image';
import Post_Complete from '@/app/_components/_community/Post_Complete';
import prev from '../../../../public/image/prev.svg';
import profile from '../../../../public/image/profile.jpg';
import { useRouter } from 'next/navigation';

export default function PostContent({ category, menu, isMyPostWritten }) {
  const router = useRouter();

  const reportPopup = () => {
    window.open(
      '/report?postId=123',
      '신고하기',
      'width=620, height=670, location=1'
    );
  };

  return (
    <section
      className="min-h-[750px] w-[730px] px-[24px] py-[40px] border-r"
      aria-labelledby="trade-post"
    >
      <div className="flex items-center justify-between">
        <Image
          src={prev}
          alt="뒤로가기"
          width={30}
          height={30}
          onClick={() => router.back()}
          role="button"
          tabIndex="0"
        />
        <div className="w-[54px] py-[4px] bg-blue--500 text-white rounded-3xl flex justify-center">
          {category}
        </div>
      </div>
      <article className="pl-[30px] pt-[24px]">
        <div className="flex justify-between items-center mb-[4px]">
          <div className="flex gap-[8px] items-center">
            <Image
              className="w-[40px] h-[40px] rounded-full border"
              src={profile}
              alt="프로필"
              width={40}
              height={40}
            />
            <strong>한유진님의 게시글</strong>
          </div>
          <p className="text-xs text-gray--500">조회수 100</p>
        </div>
        <h1 className="text-2xl text-blue--500 font-bold">
          [사용감 적음!] 스탠드 선풍기🍃 팔아요
        </h1>
        <p className="inline-block min-h-[320px] mt-[24px]">
          본가로 돌아가게 돼서 사용하던 선풍기 팔아요 작년 여름에 구매했고, 세척
          한 번 한 상태입니다 원가 3만원인데 1만 5천원에 판매합니다 채팅으로
          연락주세요 네고는 안 받습니다
        </p>
        <div className="flex justify-between">
          <p className="text-xs text-gray--500">2024년 08월 07일 오후 09:07</p>
          <div className="flex gap-[16px]">
            {isMyPostWritten ? (
              <>
                <button className="text-sm text-gray--500 hover:underline">
                  수정하기
                </button>
                <button className="text-sm text-gray--500 hover:underline">
                  삭제하기
                </button>
              </>
            ) : (
              <button
                className="text-sm text-gray--500 hover:underline"
                onClick={reportPopup}
              >
                신고하기
              </button>
            )}
          </div>
        </div>
        {menu !== '커뮤니티' ? (
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
        ) : (
          <div className="mt-[40px]">
            <div className="flex items-center gap-[12px]">
              <h2 className="text-xl font-bold">댓글</h2>
              <p>2개</p>
            </div>
            <div className="flex gap-[12px] my-[12px]">
              <Image
                className="w-[50px] h-[50px] rounded-full border"
                src={profile}
                alt="프로필"
                width={50}
                height={50}
              />
              <textarea
                className="w-[600px] community__comment__textarea"
                cols="50"
                rows="3"
                placeholder="댓글을 입력해주세요."
                spellCheck="false"
              />
            </div>
            <Comment />
          </div>
        )}
      </article>
    </section>
  );
}
