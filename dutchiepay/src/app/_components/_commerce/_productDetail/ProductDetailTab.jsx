'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

export default function ProductDetailTab({
  tab,
  setTab,
  infoRef,
  reviewRef,
  askRef,
}) {
  const handleTab = (e) => {
    const selectedTab = e.target.innerText;
    setTab(selectedTab);

    if (selectedTab === '상품정보') {
      infoRef.current.scrollIntoView({ behavior: 'auto' });
    } else if (selectedTab === '후기') {
      reviewRef.current.scrollIntoView({ behavior: 'auto' });
    } else if (selectedTab === '업체정보/문의') {
      askRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <ul className="mt-[40px] flex gap-[52px] border border-2 border-t-black py-[12px] px-[40px] sticky top-[154px] bg-white z-10">
      <li
        className={`cursor-pointer hover:font-bold ${tab === '상품정보' ? 'product-tab__item--selected' : ''}`}
        onClick={(e) => handleTab(e)}
      >
        상품정보
      </li>
      <li
        className={`cursor-pointer hover:font-bold ${tab === '후기' ? 'product-tab__item--selected' : ''}`}
        onClick={(e) => handleTab(e)}
      >
        후기
      </li>
      <li
        className={`cursor-pointer hover:font-bold ${tab === '업체정보/문의' ? 'product-tab__item--selected' : ''}`}
        onClick={(e) => handleTab(e)}
      >
        업체정보/문의
      </li>
    </ul>
  );
}
