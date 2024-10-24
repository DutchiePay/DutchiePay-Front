import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import beauty from '/public/image/category/beauty.png';
import daily from '/public/image/category/daily.jpg';
import desk from '/public/image/category/desk.jpg';
import digital from '/public/image/category/digital.jpg';
import fabric from '/public/image/category/fabric.png';
import fresh from '/public/image/category/fresh.jpg';
import frozen from '/public/image/category/frozen.jpg';
import interior from '/public/image/category/interior.jpg';
import kitchen from '/public/image/category/kitchen.jpg';
import security from '/public/image/category/security.jpg';

export default function ProductCategory({ category, setCategory }) {
  const handleCategory = (e) => {
    const target = e.target.closest('li'); // Image 컴포넌트 클릭될 때 대비
    if (target) {
      setCategory(target.innerText);
    }
  };

  return (
    <ul className="mt-[60px] flex justify-center gap-[32px] mx-auto my-0">
      <li
        className={`commerce-categories__item ${category === '신선/가공식품' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '냉동식품' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '인테리어/가구' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '디지털/가전' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '화장품/미용' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '패브릭' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '생활' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '주방/청소' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '잡화/데스크' ? 'text-blue--500' : ''}`}
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
        className={`commerce-categories__item ${category === '보안' ? 'text-blue--500' : ''}`}
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
  );
}
