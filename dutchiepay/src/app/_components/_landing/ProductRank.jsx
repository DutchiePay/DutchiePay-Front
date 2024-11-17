export default function ProductRank({ products, isFirst, activeSlide }) {
  return (
    <div className="w-[488px]">
      <ul className="w-[488px] h-[200px] flex flex-col items-center">
        {products.map((item, index) => {
          return (
            <li
              className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                activeSlide === index
                  ? 'border border-dashed border-blue--400 rounded-md'
                  : ''
              }`}
              key={item.buyId}
            >
              <p
                className={`text-lg ${activeSlide === index ? 'text-blue--500 font-bold' : 'text-[#999]'}`}
              >
                {isFirst ? index + 1 : index + 6}
              </p>
              <p
                className={`text-sm w-[100%] overflow-hidden text-ellipsis text-nowrap ${
                  activeSlide === index
                    ? 'text-blue--500 font-semibold'
                    : 'text-[#999]'
                }`}
              >
                {item.productName}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
