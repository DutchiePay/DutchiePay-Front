import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';

export default function Product_Main() {
  //추후 데이터 들어오면 Link title 글자수 제한 코드 추가 필요
  return (
    <Link
      href="/commerce/123"
      title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
      className="w-[240px] px-[12px] py-[8px] flex flex-col justify-center gap-[4px]"
    >
      <div className="w-full h-[210px] relative overflow-hidden rounded-xl">
        <Image
          className="w-full h-[210px] rounded-xl transform transition-transform duration-300 hover:scale-110"
          src={product}
          alt="애슐리 볶음밥"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <p className="title--single-line font-medium mt-[4px]">
        애슐리 볶음밥 10인분 혼합 구성
        10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
        대용 직장인 도시락
      </p>
      <div className="flex gap-[8px] items-center">
        <p className="text-[12px] text-gray--500 line-through">32,500원</p>
        <strong className="text-lg text-blue--500">27,500원</strong>
        <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
          30%
        </p>
      </div>
      <div className="flex items-center gap-[4px]">
        <Image
          className="w-[18px] h-[18px]"
          src={clock}
          alt="남은 시간"
          width={18}
          height={18}
        />
        <p className="text-blue--700 text-[12px] font-semibold">
          12일 08시간 36분 남음
        </p>
      </div>
    </Link>
  );
}
