'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';
import { useState, useEffect } from 'react';

import useDeleteAsk from '@/app/hooks/useDeleteAsk';
import AskHeader from '@/app/_components/_commerce/_ask/AskHeader';
import AskResponse from '@/app/_components/_commerce/_ask/AskHeader';
export default function MyAsks({ item, onDelete }) {
  const [isAnswered, setIsAnswered] = useState(false);
  const { deleteAsk } = useDeleteAsk();
  useEffect(() => {
    setIsAnswered(!!item.answer);
  }, [item.answer]);

  const handleDelete = async () => {
    await deleteAsk(item.askId);
    onDelete(item.askId);
  };
  return (
    <div className="w-[730px]">
      <div className="px-[30px] py-[20px] border rounded-t-lg">
        <AskHeader
          item={item}
          isAnswered={isAnswered}
          onDelete={handleDelete}
        />
        <p className="mt-[8px] text-sm">{item.content}</p>
      </div>
      <AskResponse item={item} isAnswered={isAnswered} />
    </div>
  );
}
