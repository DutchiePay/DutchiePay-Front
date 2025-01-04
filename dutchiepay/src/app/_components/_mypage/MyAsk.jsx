'use client';

import { useEffect, useState } from 'react';

import AskHeader from '@/app/_components/_commerce/_ask/AskHeader';
import AskResponse from '@/app/_components/_commerce/_ask/AskResponse';
import useDeleteAsk from '@/app/hooks/useDeleteAsk';

export default function MyAsks({ item, onDelete }) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const { deleteAsk } = useDeleteAsk();
  useEffect(() => {
    setIsAnswered(!!item.answer);
  }, [item.answer]);

  const handleDelete = async () => {
    const isDeleted = await deleteAsk(item.askId);
    if (isDeleted) {
      onDelete(item.askId);
    }
  };
  return (
    <div className="w-[730px]">
      <div className="px-[30px] py-[20px] border rounded-t-lg">
        <AskHeader
          item={item}
          isAnswered={isAnswered}
          onDelete={handleDelete}
        />
        <p
          className={`mt-[8px] text-sm   ${isMore ? 'line-clamp-none' : 'line-clamp-1'}`}
        >
          {item.content}
        </p>
      </div>
      <AskResponse item={item} isAnswered={isAnswered} />
    </div>
  );
}
