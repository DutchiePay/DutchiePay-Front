// Product_Hot.jsx
import '@/styles/commerce.css';
import '@/styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';
import Slider from 'react-slick';

export default function Product_Hot({
  sliderTopFive,
  settingsTopFive,
  activeSlideTop,
  sliderBottomFive,
  activeSlideBottom,
  settingsBottomFive,
  sliderWrapper,
  settingsWrapper,
}) {
  return (
    <>
      <Slider ref={sliderWrapper} {...settingsWrapper}>
        <div>
          <div className="w-[1000px] h-[300px] px-[20px] flex flex-row justify-between items-center">
            <div className="w-[470px]">
              <Slider
                ref={sliderTopFive}
                {...settingsTopFive}
                className="text-center"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <div className="flex justify-center items-center" key={index}>
                    <Link
                      href="/commerce/detail?productId=123"
                      title="애슐리 볶음밥 10인분 혼합 구성 10종"
                      className="w-[480px] flex items-center"
                    >
                      <div className="w-[200px] h-[200px] relative">
                        <Image
                          className="object-cover"
                          src={product}
                          alt="애슐리 볶음밥"
                          fill
                        />
                      </div>
                      <div className="w-[240px] pl-[16px]">
                        <div className="flex items-center gap-[4px]">
                          <Image
                            className="w-[18px] h-[18px]"
                            src={clock}
                            alt="남은 시간"
                            width={18}
                            height={18}
                          />
                          <p className="text-blue--700 text-sm font-semibold">
                            12일 08시간 36분 남음
                          </p>
                        </div>
                        <p className="title--multi-line text-lg font-semibold mt-[4px] text-left">
                          {index + 1} 홈플래닛 반반 멀티 전기그릴 (개별 온도
                          조절)
                        </p>
                        <div className="flex gap-[8px] items-center">
                          <p className="text-[12px] text-gray--500 line-through">
                            32,500원
                          </p>
                          <strong className="text-lg text-blue--500">
                            27,500원
                          </strong>
                          <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
                            30%
                          </p>
                        </div>
                        <span className="flex justify-end items-baseline text-xs text-gray--500">
                          공구 성공까지{' '}
                          <strong className="text-3xl text-blue--500">
                            &nbsp;15%
                          </strong>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
            <div>
              <div className="w-[488px]">
                <ul className="w-[488px] h-[200px] flex flex-col items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li
                      className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                        activeSlideTop === index
                          ? 'border border-[#000] rounded-md'
                          : ''
                      }`}
                      key={index}
                    >
                      <p
                        className={`text-lg ${activeSlideTop === index ? 'text-[#333]' : 'text-[#999]'}`}
                      >
                        {index + 1}
                      </p>
                      <p
                        className={`text-sm w-[100%] overflow-hidden text-ellipsis text-nowrap ${
                          activeSlideTop === index
                            ? 'text-[#333]'
                            : 'text-[#999]'
                        }`}
                      >
                        [{index + 1}] [한정기획] 에센허브 티트리 100 오일
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-[1000px] h-[300px] px-[20px] flex flex-row justify-between items-center">
            <div className="w-[470px]">
              <Slider
                ref={sliderBottomFive}
                {...settingsBottomFive}
                className="text-center"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <div className="flex justify-center items-center" key={index}>
                    <Link
                      href="/commerce/detail?productId=123"
                      title="애슐리 볶음밥 10인분 혼합 구성 10종"
                      className="w-[480px] flex items-center"
                    >
                      <div className="w-[200px] h-[200px] relative">
                        <Image
                          className="object-cover"
                          src={product}
                          alt="애슐리 볶음밥"
                          fill
                        />
                      </div>
                      <div className="w-[240px] pl-[16px]">
                        <div className="flex items-center gap-[4px]">
                          <Image
                            className="w-[18px] h-[18px]"
                            src={clock}
                            alt="남은 시간"
                            width={18}
                            height={18}
                          />
                          <p className="text-blue--700 text-sm font-semibold">
                            12일 08시간 36분 남음
                          </p>
                        </div>
                        <p className="title--multi-line text-lg font-semibold mt-[4px] text-left">
                          {index + 6} 홈플래닛 반반 멀티 전기그릴 (개별 온도
                          조절)
                        </p>
                        <div className="flex gap-[8px] items-center">
                          <p className="text-[12px] text-gray--500 line-through">
                            32,500원
                          </p>
                          <strong className="text-lg text-blue--500">
                            27,500원
                          </strong>
                          <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
                            30%
                          </p>
                        </div>
                        <span className="flex justify-end items-baseline text-xs text-gray--500">
                          공구 성공까지{' '}
                          <strong className="text-3xl text-blue--500">
                            &nbsp;15%
                          </strong>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
            <div>
              <div className="w-[488px]">
                <ul className="w-[488px] h-[200px] flex flex-col items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li
                      className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                        activeSlideBottom === index
                          ? 'border border-[#000] rounded-md'
                          : ''
                      }`}
                      key={index}
                    >
                      <p
                        className={`text-lg ${activeSlideBottom === index ? 'text-[#333]' : 'text-[#999]'}`}
                      >
                        {index + 6}
                      </p>
                      <p
                        className={`text-sm w-[100%] overflow-hidden text-ellipsis text-nowrap ${
                          activeSlideBottom === index
                            ? 'text-[#333]'
                            : 'text-[#999]'
                        }`}
                      >
                        [{index + 6}] [한정기획] 에센허브 티트리 100 오일
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
}
