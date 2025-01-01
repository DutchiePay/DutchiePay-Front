'use client';
import '@/styles/commerce.css';
import '@/styles/globals.css';
import Image from 'next/image';

export default function Chat() {
  return (
    <div className="flex flex-col h-screen w-[480px] bg-gray-100 overflow-hidden">
      <div className="flex items-center justify-between bg-white p-4 shadow">
        <h1 className="text-xl font-bold">채팅 목록</h1>
      </div>

      <div className="flex-1 overflow-y-auto"></div>
    </div>
  );
}
