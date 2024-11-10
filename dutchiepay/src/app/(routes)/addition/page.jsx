'use client';

import axios from 'axios';
import getImage from '@/app/_util/getImage';
import { useState } from 'react';

export default function Addition() {
  const [formData, setFormData] = useState({
    productImg: null,
    detailImg: null,
    productName: '',
    originalPrice: '',
    salePrice: '',
    category: [],
    skeleton: '',
    deadline: '',
    storeName: '',
    representative: '',
    storeAddress: '',
    contactNumber: '',
    discountPercent: 0,
  });

  const categories = [
    '신선',
    '냉동',
    '가구',
    '가전',
    '미용',
    '패브릭',
    '생활',
    '주방청소',
    '잡화',
    '보안',
  ];

  const handleImage = async (e) => {
    if (!e.target.files[0]) return;
    const image = e.target.files[0];
    const uploaded = await getImage(image);
    if (uploaded) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: uploaded,
      }));
      e.target.value = '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      const updatedCategories = e.target.checked
        ? [...formData.category, value]
        : formData.category.filter((category) => category !== value);

      setFormData((prev) => ({
        ...prev,
        category: updatedCategories.slice(0, 2), // 최대 2개로 제한
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const originalPrice = parseFloat(formData.originalPrice) || 0;
    const salePrice = parseFloat(formData.salePrice) || 0;

    const discountPercent =
      originalPrice > 0
        ? Math.floor(((originalPrice - salePrice) / originalPrice) * 100)
        : 0;

    const updatedFormData = {
      ...formData,
      discountPercent,
    };

    const confirmationMessage = `
    상품이미지: ${updatedFormData.productImg}
    상품상세이미지: ${updatedFormData.detailImg}
    상품명: ${updatedFormData.productName}
    원가: ${updatedFormData.originalPrice}
    할인가: ${updatedFormData.salePrice}
    할인율: ${updatedFormData.discountPercent}%
    카테고리: ${updatedFormData.category.join(', ')}
    최소 인원: ${updatedFormData.skeleton}
    마감 날짜: ${updatedFormData.deadline}
    업체명: ${updatedFormData.storeName}
    업체대표: ${updatedFormData.representative}
    업체주소: ${updatedFormData.storeAddress}
    업체번호: ${updatedFormData.contactNumber}
  `;

    if (confirm(`다음 정보를 확인해 주세요:\n${confirmationMessage}`)) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/addition`,
          { ...updatedFormData }
        );

        alert('정상적으로 추가됨');

        setFormData({
          productImg: null,
          detailImg: null,
          productName: '',
          originalPrice: '',
          salePrice: '',
          category: [],
          skeleton: '',
          deadline: '',
          storeName: '',
          representative: '',
          storeAddress: '',
          contactNumber: '',
          discountPercent: 0, // 기본값 설정
        });
      } catch (error) {
        alert('오류 발생 콘솔 확인');
        console.log(error);
      }
    }
  };

  return (
    <section className="p-[40px]">
      <h1 className="text-3xl font-bold">데이터 추가</h1>
      <form
        className="py-[40px] flex flex-col gap-[30px]"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          상품썸네일(1장)
        </label>
        <input type="file" name="productImg" onChange={handleImage} />
        <img
          className="w-[100px] h-[100px]"
          src={formData.productImg}
          alt="상품이미지"
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          상품 상세이미지(1장)
        </label>
        <input type="file" name="detailImg" onChange={handleImage} />
        <img
          className="w-[100px] h-[100px]"
          src={formData.detailImg}
          alt="상품상세이미지"
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          상품명
        </label>
        <input
          className="border"
          name="productName"
          placeholder="상품 이름"
          onChange={handleChange}
          value={formData.productName || ''}
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          상품 원가 (숫자만 입력 : 5000원 = 5000)
        </label>
        <input
          className="border"
          type="number"
          name="originalPrice"
          placeholder="상품 원가"
          onChange={handleChange}
          value={formData.originalPrice}
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          상품 할인가(판매가) (숫자만 입력 : 5000원 = 5000)
        </label>
        <input
          className="border"
          type="number"
          name="salePrice"
          placeholder="상품 할인가"
          onChange={handleChange}
          value={formData.salePrice}
        />
        <p>※ 할인가는 데이터 추가 시 자동으로 계산되어 전달됩니다!</p>
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          카테고리 (최대 2개)
        </label>
        <div className="flex gap-[12px]">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-[8px]">
              <input
                type="checkbox"
                name="category"
                value={category}
                onChange={handleChange}
              />
              {category}
            </label>
          ))}
        </div>
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          최소 인원 (목표인원), 적당히 값 넣어주세요!
        </label>
        <input
          className="border"
          type="number"
          name="skeleton"
          placeholder="최소 인원"
          onChange={handleChange}
          value={formData.skeleton}
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          마감 날짜
        </label>
        <input
          className="border"
          type="date"
          name="deadline"
          onChange={handleChange}
          value={formData.deadline}
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          업체명
        </label>
        <input
          className="border"
          name="storeName"
          placeholder="업체명"
          onChange={handleChange}
          value={formData.storeName || ''}
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          업체대표
        </label>
        <input
          className="border"
          name="representative"
          placeholder="업체대표"
          onChange={handleChange}
          value={formData.representative || ''}
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          업체주소
        </label>
        <input
          className="border"
          name="storeAddress"
          placeholder="업체주소"
          onChange={handleChange}
          value={formData.storeAddress || ''}
        />
        <label className="flex flex-col gap-[12px] text-lg font-bold">
          업체번호 (-(하이픈) 넣어서 보내주세요!)
        </label>
        <input
          className="border"
          name="contactNumber"
          placeholder="업체번호"
          onChange={handleChange}
          value={formData.contactNumber || ''}
        />

        <button type="submit" className="bg-blue--500 text-white p-[12px]">
          데이터 추가
        </button>
      </form>
      <p>
        ※ API에 별도 예외처리가 없으므로 데이터 값이 잘못 전달되거나 빈 값이
        전달될 경우, 문제가 발생할 수 있으니 데이터 추가 시 각별히 주의해주세요!
      </p>
    </section>
  );
}
