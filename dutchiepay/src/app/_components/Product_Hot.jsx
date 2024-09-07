import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import clock from '../../../public/image/clock.svg';
import product from '../../../public/image/product1.jpg';

export default function Product_Hot() {
  //추후 데이터 들어오면 Link title 글자수 제한 코드 추가 필요
  return (
    <>
      <Link
        href="/commerce/123"
        title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
        className="w-[480px] flex items-center"
      >
        <Image src={product} alt="애슐리 볶음밥" width={200} height={200} />
        <div className="w-[240px] pl-[16px]">
          <div className="flex items-center gap-[4px]">
            <Image
              className="w-[18px] h-[18px]"
              src={clock}
              alt="남은 시간"
              width={18}
              height={18}
            />
            <p className="text-blue--700 text-sm font-semibold">
              12일 08시간 36분 남음
            </p>
          </div>
          <p className="title--multi-line text-lg font-semibold mt-[4px]">
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
          <span className="flex justify-end items-baseline text-xs text-gray--500">
            공구 성공까지{' '}
            <strong className="text-3xl text-blue--500">&nbsp;15%</strong>
          </span>
        </div>
      </Link>
      <div className="flex justify-center items-center h-[400px] ml-[24px]">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="mt-[10px]">
            <span className="text-[20px] font-semibold text-gray--600 ">1</span>
            <span className="ml-[16px]">
              [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
            </span>
          </div>
          <div className="mt-[10px]">
            <span className="text-[20px] font-semibold text-gray--600 ">2</span>
            <span className="ml-[16px]">
              [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
            </span>
          </div>
          <div className="mt-[10px]">
            <span className="text-[20px] font-semibold text-gray--600 ">3</span>
            <span className="ml-[16px]">
              [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
            </span>
          </div>
          <div className="mt-[10px]">
            <span className="text-[20px] font-semibold text-gray--600 ">4</span>
            <span className="ml-[16px]">
              [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
            </span>
          </div>
          <div className="mt-[10px]">
            <span className="text-[20px] font-semibold text-gray--600 ">5</span>
            <span className="ml-[16px]">
              [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
