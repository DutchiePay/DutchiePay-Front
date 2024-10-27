const Product_Ranking = ({ activeSlide, isTopFive }) => {
  return (
    <>
      <div className="w-[488px]">
        <ul className="w-[488px] h-[200px] flex flex-col items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <li
              className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                activeSlide === index ? 'border border-[#000] rounded-md' : ''
              }`}
              key={index}
            >
              <p
                className={`text-lg ${activeSlide === index ? 'text-[#333]' : 'text-[#999]'}`}
              >
                {isTopFive ? index + 1 : index + 6}
              </p>
              <p
                className={`text-sm w-[100%] overflow-hidden text-ellipsis text-nowrap ${
                  activeSlide === index ? 'text-[#333]' : 'text-[#999]'
                }`}
              >
                [한정기획] 에센허브 티트리 100 오일
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Product_Ranking;
