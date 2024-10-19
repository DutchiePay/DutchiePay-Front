import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';
import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
export default function TopFive_Content({
  sliderBottomFive,
  activeSlideBottom,
  settingsBottomFive,
}) {
  return (
    <>
      <div>
        <div className="w-[1000px] h-[300px] px-[20px] flex flex-row justify-between items-center">
          <div className="w-[470px] ">
            <Slider
              ref={sliderBottomFive}
              {...settingsBottomFive}
              className="text-center"
            >
              <div className="flex justify-center items-center">
                <Link
                  href="/commerce/detail?productId=123"
                  title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
                  className="w-[480px] flex items-center"
                >
                  <div className="w-[200px] h-[200px] relative">
                    <Image
                      src={product}
                      alt="애슐리 볶음밥"
                      fill
                      style={{ objectFit: 'cover' }}
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
                      6 홈플래닛 반반 멀티 전기그릴 (개별 온도 조절)
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

              <div className="flex justify-center items-center">
                <Link
                  href="/commerce/detail?productId=123"
                  title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
                  className="w-[480px] flex items-center"
                >
                  <div className="w-[200px] h-[200px] relative">
                    <Image
                      src={product}
                      alt="애슐리 볶음밥"
                      fill
                      style={{ objectFit: 'cover' }}
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
                      7 홈플래닛 반반 멀티 전기그릴 (개별 온도 조절)
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
              <div className="flex justify-center items-center">
                <Link
                  href="/commerce/detail?productId=123"
                  title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
                  className="w-[480px] flex items-center"
                >
                  <div className="w-[200px] h-[200px] relative">
                    <Image
                      src={product}
                      alt="애슐리 볶음밥"
                      fill
                      style={{ objectFit: 'cover' }}
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
                      8 홈플래닛 반반 멀티 전기그릴 (개별 온도 조절)
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
              <div className="flex justify-center items-center">
                <Link
                  href="/commerce/detail?productId=123"
                  title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
                  className="w-[480px] flex items-center"
                >
                  <div className="w-[200px] h-[200px] relative">
                    <Image
                      src={product}
                      alt="애슐리 볶음밥"
                      fill
                      style={{ objectFit: 'cover' }}
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
                      9 홈플래닛 반반 멀티 전기그릴 (개별 온도 조절)
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
              <div className="flex justify-center items-center">
                <Link
                  href="/commerce/detail?productId=123"
                  title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
                  className="w-[480px] flex items-center"
                >
                  <div className="w-[200px] h-[200px] relative">
                    <Image
                      src={product}
                      alt="애슐리 볶음밥"
                      fill
                      style={{ objectFit: 'cover' }}
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
                      10 홈플래닛 반반 멀티 전기그릴 (개별 온도 조절)
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
            </Slider>
          </div>
          <div className="w-[488px]">
            <ul className="w-[488px] h-[200px] flex flex-col items-center">
              <li
                className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                  activeSlideBottom === 0
                    ? 'border border-[#000] rounded-md'
                    : ''
                }`}
              >
                <p
                  className={`text-lg ${activeSlideBottom === 0 ? 'text-[#333]' : 'text-[#999]'}`}
                >
                  6
                </p>
                <p
                  className={`text-sm w-[90%] break-keep custom-ellipsis cursor-pointer text-nowrap ${
                    activeSlideBottom === 0 ? 'text-[#333]' : 'text-[#999]'
                  }`}
                >
                  [6] [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
                </p>
              </li>
              <li
                className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                  activeSlideBottom === 1
                    ? 'border border-[#000] rounded-md'
                    : ''
                }`}
              >
                <p
                  className={`text-lg ${activeSlideBottom === 1 ? 'text-[#333]' : 'text-[#999]'}`}
                >
                  7
                </p>
                <p
                  className={`text-sm w-[90%] break-keep custom-ellipsis cursor-pointer text-nowrap ${
                    activeSlideBottom === 1 ? 'text-[#333]' : 'text-[#999]'
                  }`}
                >
                  [7] [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
                </p>
              </li>
              <li
                className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                  activeSlideBottom === 2
                    ? 'border border-[#000] rounded-md'
                    : ''
                }`}
              >
                <p
                  className={`text-lg ${activeSlideBottom === 2 ? 'text-[#333]' : 'text-[#999]'}`}
                >
                  8
                </p>
                <p
                  className={`text-sm w-[90%] break-keep custom-ellipsis cursor-pointer text-nowrap ${
                    activeSlideBottom === 2 ? 'text-[#333]' : 'text-[#999]'
                  }`}
                >
                  [8] [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
                </p>
              </li>
              <li
                className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                  activeSlideBottom === 3
                    ? 'border border-[#333] rounded-md'
                    : ''
                }`}
              >
                <p
                  className={`text-lg ${activeSlideBottom === 3 ? 'text-[#000]' : 'text-[#999]'}`}
                >
                  9
                </p>
                <p
                  className={`text-sm w-[90%] break-keep custom-ellipsis cursor-pointer text-nowrap ${
                    activeSlideBottom === 3 ? 'text-[#333]' : 'text-[#999]'
                  }`}
                >
                  [9] [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
                </p>
              </li>
              <li
                className={`w-[488px] h-[40px] flex flex-row items-center gap-2 px-[20px] ${
                  activeSlideBottom === 4
                    ? 'border border-[#000] rounded-md'
                    : ''
                }`}
              >
                <p
                  className={`text-lg ${activeSlideBottom === 4 ? 'text-[#333]' : 'text-[#999]'}`}
                >
                  10
                </p>
                <p
                  className={`text-sm w-[90%] break-keep custom-ellipsis cursor-pointer text-nowrap ${
                    activeSlideBottom === 4 ? 'text-[#333]' : 'text-[#999]'
                  }`}
                >
                  [10] [한정기획] 에센허브 티트리 100 오일 10ml 1+1 한정기획
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
