'use client';
import { NOTICE_CATEGORY } from '@/app/_util/constants';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useHandleLinkClick from '@/app/hooks/useHandleLinkClick';
import useFetchMoreAlarms from '@/app/hooks/useFetchMoreAlarms';

export default function HasMoreAlarm({ alarms }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const id = alarms.noticeId || '';
  const moreAlarms = useFetchMoreAlarms(id);
  const handleLinkClick = useHandleLinkClick();

  const displayedAlarms = isExpanded ? moreAlarms : moreAlarms.slice(0, 2);

  return (
    <div className="block">
      <div
        className={`relative m-auto h-auto ${
          isExpanded ? 'w-full top-0 z-30 bg-gray-100 ' : 'w-[380px]'
        }`}
      >
        {displayedAlarms.map((alarm, index) => {
          const width = `${100 - index * 5}%`;
          const top = `${index * 5}px`;
          const zIndex = `${10 - index}`;
          const alarmLink =
            alarm.type === 'comment' || alarm.type === 'reply'
              ? `/community/${alarm.pageId}`
              : alarm.type === 'commerce'
                ? '/mypage/myorder'
                : alarm.type === 'chat'
                  ? `/chat/${alarm.pageId}`
                  : '';

          return (
            <div
              key={alarm.commentId}
              className={`bg-white p-4 rounded-lg ${
                isExpanded
                  ? 'w-[380px] m-auto top-0 left-0 mb-3 cursor-pointer'
                  : 'absolute'
              }`}
              style={
                isExpanded
                  ? {}
                  : {
                      width,
                      top,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex,
                    }
              }
            >
              <div className="flex items-center h-[30px] text-xs justify-between mb-2">
                <div>{alarm.relativeTime}</div>
                <button
                  className={`cursor-pointer text-gray-500`}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {index === 0 ? (isExpanded ? '간략히 보기' : '전체보기') : ''}
                </button>
              </div>
              <Link
                href={alarmLink}
                onClick={() => handleLinkClick(alarm.noticeId)}
              >
                <div className="flex justify-between">
                  <div>
                    <strong className="text-lg">
                      {alarm.type === 'commerce_success' ||
                      alarm.type === 'commerce_fail'
                        ? alarm.origin
                        : alarm.writer}
                    </strong>
                    {alarm.type === 'commerce_success' ||
                    alarm.type === 'commerce_fail' ? (
                      <>
                        의 <span className="text-blue--500">공동구매</span>가{' '}
                        {alarm.type === 'commerce_success' ? (
                          <>
                            <span className="text-blue--500 font-bold">
                              성공
                            </span>
                            했습니다.
                          </>
                        ) : (
                          <>
                            <span className="text-red--500 font-bold">
                              실패
                            </span>
                            했습니다.
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        님이{' '}
                        <span className="text-blue--500 font-bold">
                          {Object.keys(NOTICE_CATEGORY).find(
                            (key) => NOTICE_CATEGORY[key] === alarm.type
                          )}
                        </span>
                        을{' '}
                        {alarm.type === 'chat' ? '보냈습니다.' : '다셨습니다.'}
                      </>
                    )}
                  </div>
                  <div>
                    {index === 0 && !isExpanded && (
                      <div className="w-5 h-5 bg-red-500 rounded-full border border-white flex items-center justify-center text-white text-xs">
                        {alarms.count}
                      </div>
                    )}
                  </div>
                </div>
                <div className="title--single-line text-sm">
                  {alarm.content}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
