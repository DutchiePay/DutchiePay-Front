import Link from 'next/link';

export default function ProductRank({ products, isFirst, activeSlide }) {
  return (
    <div className="w-[488px]">
      <ul className="w-[488px] h-[200px] flex flex-col items-center">
        {products.map((item, index) => {
          return (
            <li
              className={`w-[488px] h-[40px] flex items-center ${
                activeSlide === index
                  ? 'border border-dashed border-blue--400 rounded-md'
                  : ''
              }`}
              key={item.buyId}
            >
              <Link
                className="flex flex-row items-center gap-2 px-[20px]"
                href={`/commerce/${item.buyId}`}
              >
                <p
                  className={`text-lg ${activeSlide === index ? 'text-blue--500 font-bold' : 'text-[#999]'}`}
                >
                  {isFirst ? index + 1 : index + 6}
                </p>
                <p
                  className={`text-sm w-[420px] overflow-hidden text-ellipsis text-nowrap ${
                    activeSlide === index
                      ? 'text-blue--500 font-semibold'
                      : 'text-[#999]'
                  }`}
                >
                  {item.productName}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
