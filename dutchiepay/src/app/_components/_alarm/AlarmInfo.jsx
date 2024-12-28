'use client';
import '@/styles/globals.css';
import React from 'react';
import HasMoreAlarm from './HasMoreAlarm';
import DefaultAlarm from './DefaultAlarm';
import useHandleLinkClick from '@/app/hooks/useHandleLinkClick';

export default function AlarmInfo({ alarm }) {
  const handleLinkClick = useHandleLinkClick();

  const alarmLink =
    alarm.type === 'comment' || alarm.type === 'reply'
      ? `/community/${alarm.pageId}`
      : alarm.type === 'commerce'
        ? '/mypage/myorder'
        : alarm.type === 'chat'
          ? `/chat/${alarm.pageId}`
          : '';

  return (
    <>
      {alarm.hasMore === true ? (
        <div className="relative w-full min-h-[120px] mb-5 ">
          <HasMoreAlarm alarms={alarm} />
        </div>
      ) : (
        <DefaultAlarm
          alarm={alarm}
          handleLinkClick={() => handleLinkClick(alarm.noticeId)}
          alarmLink={alarmLink}
        />
      )}
    </>
  );
}
