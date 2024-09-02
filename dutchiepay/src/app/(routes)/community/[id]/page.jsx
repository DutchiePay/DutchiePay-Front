'use client';

import Comment from '@/app/_components/Comment';
import Image from 'next/image';
import Post_Hot from '@/app/_components/Post_Hot';
import Post_Similar from '@/app/_components/Post_Similar';
import prev from '../../../../../public/image/prev.svg';
import profile from '../../../../../public/image/profile.jpg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CommunityDetail() {
  const router = useRouter();
  const [isMyPostWritten, setIsMyPostWritten] = useState(false);

  const handlePrevButtonClick = () => {
    router.back();
  };

  const reportPopup = () => {
    window.open(
      '/report?postId=123',
      '신고하기',
      'width=620, height=670, location=1'
    );
  };

  return (
    <main className="min-h-[750px] w-[1020px]">
      <div className="w-full flex">
        <section className="min-h-[750px] w-[730px] px-[24px] py-[40px] border-r">
          <div className="flex items-center justify-between">
            <Image
              className="w-[30px] h-[30px]"
              src={prev}
              alt="뒤로가기"
              width={30}
              height={30}
              onClick={handlePrevButtonClick}
            />
            <div className="w-[54px] py-[4px] bg-blue--500 text-white rounded-3xl flex justify-center">
              정보
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
              자취 3년차 깔꼼쟁이가 알려주는 자취 팁 - 주방편 (+ 초파리 꿀팁)
            </h1>
            <p className="inline-block min-h-[360px] my-[24px]">
              오늘 대청소 하고 나서 심심해서 정리해봤어 나도 자취 초기에 애 많이
              먹었거든 일단 가장 기본이 되는건 부지런해야 돼 ㅋㅋ큐ㅠㅠㅠ 우리
              부모님이 엄청 깔끔한 성격이셔서 몰랐는데 집이 깨끗하게 유지되기
              위해서는 많은 노력이 필요하더라구 그래서 나 같이 집안일 힘들어 할
              자취 어린이들을 위해… 자취할 때 주방을 깔끔하게 유지하는 팁을
              알려줄게
              <br /> - 기본 베이스 1) 식초, 베이킹소다, 치약은 신이다 <br />
              식초는 냄새 지우는 데 탁월하고 베이킹소다는 기름때 지우는 데 좋아
              치약은 ㄹㅇ 만능…. 식초는 전자레인지 청소, 빨래 냄새 지우기 등등
              좀 꿉꿉한 냄새 난다 싶으면 사용하면 돼 전자레인지는 식초 + 물을
              그릇에 넣고 전자레인지 3분 정도 돌려주면 돼 (전자레인지 사용 가능
              그릇으로!!) 그럼 전자레인지에 물이 송골송골 맺히는데 행주나
              스펀지로 한번 쓱 닦아주면 끝! 베이킹소다는 엽떡, 마라탕, 냉면 등등
              빨간 양념이 배달용기에서 안지워질 때 그대로 분리수거하면 재활용이
              안되거든 그럴 때 베이킹소다 + 퐁퐁 + 뜨거운 물 넣은 다음 뚜껑
              닫아서 흔들어주고 (잘 닫아야 돼 터지면 물난리나) 좀 기다려주면
              빨간 자국이 거의 다 지워져 이제 물로 한번 헹구고 다 안지워졌다
              싶으면 수세미로 한 번 쓱 닦아줘 그럼 끝! 그리고 베이킹소다로
              가스렌지도 청소할 수 있는데 이것 보다 좋은 방법이 있으니 밑에
              적을게 치약은 화장실 청소할 때 좋아 세면대에 물때가 자주 끼잖아
              그거에 치약 발라주고 1시간 방치 그리고 물로 행궈주면 반짝반짝해져
              그리고 그냥 만능이야… 화장실 청소, 운동화 빨래 등등 귀찮으면 그냥
              치약써서 청소하면 됨 물론 락스가 더 편하고 좋긴 합니다 ^^..
            </p>
            <div className="flex justify-between">
              <p className="text-xs text-gray--500">
                2024년 08월 07일 오후 09:07
              </p>
              <div className="flex gap-[16px]">
                {isMyPostWritten ? (
                  <>
                    <button className="text-sm text-gray--500">수정하기</button>
                    <button className="text-sm text-gray--500">삭제하기</button>
                  </>
                ) : (
                  <button
                    className="text-sm text-gray--500"
                    onClick={reportPopup}
                  >
                    신고하기
                  </button>
                )}
              </div>
            </div>
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
          </article>
        </section>
        <section className="w-[290px] h-[750px] fixed top-[158px] right-[440px] pl-[24px] py-[40px] flex flex-col gap-[40px]">
          <div>
            <h2 className="text-2xl font-bold">유사한 게시글</h2>
            <div className="flex flex-col gap-[12px] mt-[8px]">
              <Post_Similar />
              <Post_Similar />
              <Post_Similar />
              <Post_Similar />
              <Post_Similar />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">주간 HOT🔥 게시글</h2>
            <div className="flex flex-col gap-[12px] mt-[8px]">
              <Post_Hot index={1} />
              <Post_Hot index={2} />
              <Post_Hot index={3} />
              <Post_Hot index={4} />
              <Post_Hot index={5} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
