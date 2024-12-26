import React, { useState } from 'react';
import HasMoreAlarm from './HasMoreAlarm';
import { NOTICE_CATEGORY } from '@/app/_util/constants';

export default function AlarmInfo({ alarm }) {
  const [isExpanded, setIsExpanded] = useState(false); // 전체보기 상태

  return (
    <>
      {alarm.hasMore ? (
        <div className="relative w-full min-h-[120px] mb-5 ">
          <HasMoreAlarm alarms={alarm} />
        </div>
      ) : (
        <div className={`w-[380px] min-h-[120px] m-auto mb-3`}>
          <div
            key={alarm.id}
            className={`bg-white p-4 rounded-lg shadow-md w-full`}
          >
            <div className="flex items-center h-[30px] text-xs justify-between mb-2">
              <div>{alarm.relativeTime}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <strong className="text-lg">{alarm.origin}</strong>
                {alarm.type === 'success' || alarm.type === 'fail' ? (
                  <>
                    의 <span className="text-blue--500"> 공동구매</span>가{' '}
                    {alarm.type === 'success' ? (
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
                    님이{' '}
                    <span className="text-blue--500 font-bold">
                      {Object.keys(NOTICE_CATEGORY).find(
                        (key) => NOTICE_CATEGORY[key] === alarm.type
                      )}
                    </span>
                    을 {alarm.type === 'chat' ? '보냈습니다.' : '다셨습니다.'}
                  </>
                )}
              </div>
            </div>
            <div className="title--single-line text-sm">{alarm.content}</div>
          </div>
        </div>
      )}
    </>
  );
}
