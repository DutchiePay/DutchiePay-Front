import '../../styles/mypage.css';
import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import comment from '../../../public/image/comment.svg';
import mart from '../../../public/image/mart.jpg';
import profile from '../../../public/image/profile.jpg';

export default function Post() {
  return (
    <Link
      href="/mart/123"
      className="w-[220px] flex flex-col gap-[4px] cursor-pointer"
    >
      <div className="w-full h-[148px] relative overflow-hidden">
        <Image
          className="w-full h-[148px] transform transition-transform duration-300 hover:scale-110"
          src={mart}
          alt="마트/배달"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex justify-between items-center py-[6px] border-b">
        <p className="text-blue--500 text-sm font-semibold">마트/배달</p>
        <div className="flex items-center gap-[8px]">
          <Image src={comment} width={20} height={20} alt="댓글" />
          <p className="text-sm text-gray--500">99+</p>
        </div>
      </div>
      <strong className="mt-[4px] title--multi-line">
        효과적인 의사소통을 위한 비언어적 신호
      </strong>
      <p className="text-xs text-gray--500 title--multi-line title--multi-line-3 mt-[4px] mb-[8px]">
        건강과 지속 가능성을 추구하는 이들을 위해, 맛과 영양이 가득한 채식 요리
        레시피를 소개합니다. 이 글에서는 간단하지만 맛있는 채식 요리 10가지를
        선보입니다. 첫 번째 레시피는 아보카도 토스트, 아침 식사로 완벽하며
        영양소가 풍부합니다. 두 번째는 콩과 야채를 사용한 푸짐한 채식 칠리,
        포만감을 주는 동시에 영양소를 공급합니다. 세 번째는 색다른 맛의 채식
        패드타이, 고소한 땅콩 소스로 풍미를 더합니다. 네 번째는 간단하고 건강한
        콥 샐러드, 신선한 야채와 단백질이 가득합니다. 다섯 번째로는 향긋한
        허브와 함께하는 채식 리조또, 크리미한 맛이 일품입니다. 여섯 번째는
        에너지를 주는 채식 스무디 볼, 과일과 견과류의 완벽한 조합입니다. 일곱
        번째는 건강한 채식 버거, 만족감 있는 식사를 제공합니다. 여덟 번째는 채식
        파스타 프리마베라, 신선한 야채와 토마토 소스의 조화가 뛰어납니다. 아홉
        번째는 채식 볶음밥, 풍부한 맛과 영양으로 가득 차 있습니다. 마지막으로,
        식사 후 달콤한 마무리를 위한 채식 초콜릿 케이크, 건강한 재료로 만들어
        죄책감 없는 달콤함을 선사합니다. 이 레시피들은 채식을 선호하는 이들에게
        새로운 요리 아이디어를 제공하며, 채식이 얼마나 다채롭고 맛있을 수 있는지
        보여줍니다. 건강한 라이프스타일을 추구하는 모든 이들에게 이 레시피들이
        영감을 줄 것입니다.
      </p>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-[4px] items-center">
          <Image
            className="w-[16px] h-[16px] border rounded-full"
            src={profile}
            alt="profile"
            width={16}
            height={16}
          />
          <p className="font-semibold text-xs">한유진</p>
        </div>
        <p className="text-[12px] text-gray--500">3시간 전</p>
      </div>
    </Link>
  );
}
