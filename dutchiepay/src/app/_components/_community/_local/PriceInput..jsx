export default function PriceInput({ register, setValue, watch }) {
  const currentCategory = watch('category');
  const handlePrice = (e) => {
    let price = e.target.value;
    if (!/^[\d,]*$/.test(price)) {
      return;
    }

    price = price.replaceAll(',', '');
    if (price.length >= 10) {
      alert('가격 초과');
      return;
    }
    price = Number(price.replaceAll(',', ''));
    if (!isNaN(price)) {
      setValue('price', price.toLocaleString('ko-KR'));
    }
  };

  return (
    <>
      <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
        <label className="font-bold text-lg" htmlFor="price">
          판매 상품 및 가격
        </label>
        <small className="text-sm text-gray--500">
          판매를 희망하시는 상품과 가격을 작성해주세요. 1 이상의 숫자만 입력
          가능합니다.
        </small>
      </div>
      <div className="flex gap-[12px] items-end">
        <input
          id="price"
          className="w-[500px] border rounded-lg outline-none py-[8px] px-[12px]"
          type="text"
          {...register('goods')}
          placeholder="판매 상품 (ex) 선풍기, 가습기 등)"
        />
        {currentCategory === '거래' && (
          <input
            id="price"
            className="w-[210px] border rounded-lg outline-none py-[8px] px-[12px]"
            type="text"
            {...register('price', { onChange: handlePrice })}
            placeholder={'가격 (숫자만 입력)'}
          />
        )}
      </div>
    </>
  );
}
