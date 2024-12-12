'use client';

import '@/styles/globals.css';
import '@/styles/community.css';

import Image from 'next/image';
import Link from 'next/link';
import date from '/public/image/date.svg';
import location from '/public/image/location.svg';
import mart from '/public/image/mart.jpg';
import people from '/public/image/people.svg';
import profile from '/public/image/profile.jpg';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function MartPostItem({ item }) {
  const access = useSelector((state) => state.login.access);

  return (
    <Link
      href={`${access ? `/mart/${item.shareId}` : '/login'}`}
      className="w-[240px] border rounded-xl flex flex-col gap-[4px] cursor-pointer"
    >
      <div className="rounded-t-xl h-[160px] relative overflow-hidden ">
        <Image
          className={`rounded-t-xl w-[240px] h-[160px] transform transition-transform duration-300 hover:scale-110 ${item.state === '모집완료' ? 'grayscale-[50%]' : ''} object-cover`}
          src={item.thumbnail || mart}
          alt="썸네일"
          fill
        />
        <div className="absolute top-[8px] left-[8px] text-xs text-blue--500 font-bold bg-white rounded-lg w-[54px] py-[2px] flex justify-center">
          {item.state}
        </div>
      </div>
      <div className="w-[240px] px-[12px] pt-[4px] pb-[8px]">
        <strong className="inline-block w-[224px] title--single-line font-extrabold">
          {item.title}
        </strong>
        <div className="flex flex-col gap-[8px] my-[4px]">
          <div className="flex gap-[8px] items-center">
            <Image
              className="w-[18px] h-[18px]"
              src={date}
              alt="일정"
              width={18}
              height={18}
            />
            <p className="text-xs font-medium">{item.date}</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <Image
              className="w-[18px] h-[18px]"
              src={location}
              alt="위치"
              width={18}
              height={18}
            />
            <p className="text-xs font-medium">{item.meetingPlace}</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <Image
              className="w-[18px] h-[18px]"
              src={people}
              alt="인원수"
              width={18}
              height={18}
            />
            <p className="text-xs font-medium">
              {item.now}/{item.maximum}명
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-[12px]">
          <div className="flex gap-[4px] items-center">
            <Image
              className="w-[16px] h-[16px] border rounded-full"
              src={profile}
              alt="profile"
              width={16}
              height={16}
            />
            <p className="font-semibold text-xs">{item.writer}</p>
          </div>
          <p className="text-[12px] text-gray--500">{item.relativeTime}</p>
        </div>
      </div>
    </Link>
  );
}
