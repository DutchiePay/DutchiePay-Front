'use client';

import Image from 'next/image';
import Link from 'next/link';
import comment from '/public/image/comment.svg';
import community from '/public/image/community.jpg';
import profile from '/public/image/profile.jpg';
import { useSelector } from 'react-redux';
import { ALL_COMMUNITY_CATEGORIES } from '@/app/_util/constants';
export default function FreePostItem({ item }) {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <Link
      href={`${isLoggedIn ? `/community/${item.freeId}` : '/login'}`}
      className="w-[240px] border rounded-xl flex flex-col gap-[4px] cursor-pointer"
    >
      <div className="rounded-t-xl h-[160px] overflow-hidden relative ">
        <Image
          className="rounded-t-xl w-[240px] h-[160px] transform transition-transform duration-300 hover:scale-110 object-cover"
          src={item.thumbnail || community}
          alt="썸네일"
          fill
        />
        <div className="absolute top-[8px] left-[8px] text-xs text-blue--500 font-bold bg-white rounded-lg w-[54px] py-[2px] flex justify-center">
          {Object.keys(ALL_COMMUNITY_CATEGORIES).find(
            (key) => ALL_COMMUNITY_CATEGORIES[key] === item.category
          )}
        </div>
      </div>
      <div className="w-[240px] px-[12px] pt-[4px] pb-[8px]">
        <strong className="inline-block w-[224px] title--single-line font-extrabold">
          {item.title}
        </strong>
        <p className="min-h-[45px] text-xs text-gray--500 title--multi-line title--multi-line-3">
          {item.description}
        </p>
        <div className="w-full flex justify-end items-center gap-[4px] mt-[10px]">
          <Image
            className="w-[22px] h-[22px]"
            src={comment}
            alt="댓글"
            width={22}
            height={22}
          />
          <p className="text-xs text-medium text-gray--500">
            {item.commentsCount}
          </p>
        </div>
        <div className="w-full flex justify-between items-center mt-[6px]">
          <div className="flex gap-[4px] items-center">
            <Image
              className="w-[16px] h-[16px] border rounded-full"
              src={item.writerProfileImg || profile}
              alt="profile"
              width={16}
              height={16}
            />
            <p className="font-semibold text-xs">{item.writer}</p>
          </div>
          <p className="text-[12px] text-gray--500">{item.createdAt}</p>
        </div>
      </div>
    </Link>
  );
}
