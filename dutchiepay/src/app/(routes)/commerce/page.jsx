'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Product_List from '@/app/_components/_commerce/Product_List';
import beauty from '../../../../public/image/category/beauty.png';
import daily from '../../../../public/image/category/daily.jpg';
import desk from '../../../../public/image/category/desk.jpg';
import digital from '../../../../public/image/category/digital.jpg';
import fabric from '../../../../public/image/category/fabric.png';
import fresh from '../../../../public/image/category/fresh.jpg';
import frozen from '../../../../public/image/category/frozen.jpg';
import interior from '../../../../public/image/category/interior.jpg';
import kitchen from '../../../../public/image/category/kitchen.jpg';
import security from '../../../../public/image/category/security.jpg';
import { useState } from 'react';

export default function Commerce() {
  const [category, setCategory] = useState(null);
  const [filter, setFilter] = useState('최신순');

  const handleCategory = (e) => {
    const target = e.target.closest('li'); // Image 컴포넌트 클릭될 때 대비
    if (target) {
      setCategory(target.innerText);
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.innerText);
  };

  // 체크박스 bg 안 바뀜
  return (
    <main className="min-h-[750px] w-[1020px]">
      <ul className="mt-[60px] flex justify-center gap-[24px] mx-auto my-0">
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={fresh}
            alt="신선/가공"
            width={70}
            height={70}
          />
          신선/가공식품
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={frozen}
            alt="냉동"
            width={70}
            height={70}
          />
          냉동식품
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={interior}
            alt="가구"
            width={70}
            height={70}
          />
          인테리어/가구
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={digital}
            alt="가전"
            width={70}
            height={70}
          />
          디지털/가전
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={beauty}
            alt="미용"
            width={70}
            height={70}
          />
          화장품/미용
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={fabric}
            alt="패브릭"
            width={70}
            height={70}
          />
          패브릭
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={daily}
            alt="생활"
            width={70}
            height={70}
          />
          생활
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={kitchen}
            alt="주방/청소"
            width={70}
            height={70}
          />
          주방/청소
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={desk}
            alt="잡화"
            width={70}
            height={70}
          />
          잡화/데스크
        </li>
        <li
          className="commerce-categories__item"
          onClick={(e) => handleCategory(e)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={security}
            alt="보안"
            width={70}
            height={70}
          />
          보안
        </li>
      </ul>
      <div className="mt-[60px] flex justify-between">
        <div className="flex items-center">
          <input type="checkbox" className="input__checkbox" />
          <label className="ml-[8px] text-sm">마감포함</label>
        </div>
        <ul className="flex">
          <li
            className={`fillter__item ${filter === '최신순' ? 'fillter__item--selected' : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            최신순
          </li>
          <li
            className={`fillter__item ${filter === '마감임박순' ? 'fillter__item--selected' : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            마감임박순
          </li>
          <li
            className={`fillter__item ${filter === '좋아요순' ? 'fillter__item--selected' : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            좋아요순
          </li>
          <li
            className={`fillter__item ${filter === '할인율순' ? 'fillter__item--selected' : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            할인율순
          </li>
        </ul>
      </div>
      <section className="flex flex-wrap gap-[30px] mt-[12px] mb-[60px]">
        <Product_List />
        <Product_List />
        <Product_List />
        <Product_List />
        <Product_List />
        <Product_List />
        <Product_List />
        <Product_List />
        <Product_List />
      </section>
    </main>
  );
}
