import '@/styles/globals.css';
import React from 'react';

import { NOTICE_CATEGORY } from '@/app/_util/constants';
import Link from 'next/link';

export default function DefaultAlarm({ alarm, handleLinkClick, alarmLink }) {
  return (
    <div className={`w-[380px] min-h-[120px] m-auto mb-3`}>
      <div
        key={alarm.id}
        className={`bg-white p-4 rounded-lg shadow-md w-full`}
      >
        <div className="flex items-center h-[30px] text-xs justify-between mb-2">
          <div>{alarm.relativeTime}</div>
        </div>
        <Link href={alarmLink} onClick={() => handleLinkClick(alarm.noticeId)}>
          <div className="flex justify-between">
            <div className="flex">
              <strong
                className={`${alarm.type === 'commerce_success' || alarm.type === 'commerce_fail' ? 'w-[150px] overflow-hidden whitespace-nowrap text-ellipsis' : ''}`}
              >
                {alarm.type === 'commerce_success' ||
                alarm.type === 'commerce_fail'
                  ? alarm.origin
                  : alarm.writer}
              </strong>

              {alarm.type === 'commerce_success' ||
              alarm.type === 'commerce_fail' ? (
                <>
                  의&nbsp;<span className="text-blue--500"> 공동구매</span>
                  가&nbsp;
                  {alarm.type === 'commerce_success' ? (
                    <>
                      <span className="text-blue--500 font-bold">성공</span>
                      했습니다.
                    </>
                  ) : (
                    <>
                      <span className="text-red--500 font-bold">실패</span>
                      했습니다.
                    </>
                  )}
                </>
              ) : (
                <>
                  님이&nbsp;
                  <span className="text-blue--500 font-bold">
                    {Object.keys(NOTICE_CATEGORY).find(
                      (key) => NOTICE_CATEGORY[key] === alarm.type
                    )}
                  </span>
                  을&nbsp;
                  {alarm.type === 'chat' ? '보냈습니다.' : '다셨습니다.'}
                </>
              )}
            </div>
          </div>

          <div className="title--single-line text-sm">{alarm.content}</div>
        </Link>
      </div>
    </div>
  );
}
