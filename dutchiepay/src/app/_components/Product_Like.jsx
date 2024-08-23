import '../../styles/mypage.css';

import Image from 'next/image';
import heart from '../../../public/image/heart.svg';
import product from '../../../public/image/product1.jpg';

export default function Product_Like() {
  return (
    <div className="w-[172px] border px-[12px] py-[8px] flex flex-col gap-[4px]">
      <div className="w-[148px] h-[148px] rounded-xl relative">
        <Image className="w-[148px] h-[148px] rounded-xl" src={product} alt="애슐리 볶음밥" width={148} height={148} />
        <div className="w-[30px] h-[30px] border bg-white absolute bottom-[4px] right-[4px] rounded-md flex justify-center items-center">
          <Image className="w-[20px] h-[20px] rounded-xl" src={heart} alt="like" width={20} height={200} />
        </div>
      </div>
      <p className="mypage-likes__product-name">
        애슐리 볶음밥 10인분 혼합 구성
        10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인
        도시락
      </p>
      <div className="flex gap-[8px] items-center">
        <p className="text-[12px] text-gray--500 line-through">32,500원</p>
        <strong className="text-[16px]">27,500원</strong>
      </div>
      <div className="flex gap-[8px] items-center">
        <div>별점영역</div>
        <p className="text-[12px] text-gray--500">(999+)</p>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="text-blue--500 text-[18px] font-semibold">43%</p>
        <p className="text-gray--500 text-[12px]">20일 남음</p>
      </div>
      <hr></hr>
    </div>
  );
}
