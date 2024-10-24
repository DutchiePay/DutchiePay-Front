import '@/styles/globals.css';
import '@/styles/commerce.css';

import { CATEGORIES, CATEGORY_IMAGES } from '@/app/_util/constants';

import Image from 'next/image';

export default function ProductCategory({ category, setCategory }) {
  const handleCategory = (e) => {
    const target = e.target.closest('li'); // Image 컴포넌트 클릭될 때 대비
    if (target) {
      setCategory(target.innerText);
    }
  };

  return (
    <ul className="mt-[60px] flex justify-center gap-[32px] mx-auto my-0">
      {Object.entries(CATEGORIES).map(([key, value]) => (
        <li
          key={key}
          className={`commerce-categories__item hover:text-blue--500 ${category === key ? 'text-blue--500' : ''}`}
          onClick={(e) => handleCategory(e, key)}
        >
          <Image
            className="w-[50px] h-[50px]"
            src={CATEGORY_IMAGES[key]}
            alt={value}
            width={70}
            height={70}
          />
          {key}
        </li>
      ))}
    </ul>
  );
}
