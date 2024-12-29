'use client';

import Image from 'next/image';
import floating from '/public/image/floating.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import AlarmHeader from '../_alarm/AlarmHeader';
import AlarmActiveAction from '../_alarm/AlarmActiveAction';
import AlarmInfo from '../_alarm/AlarmInfo';
import alarmIcon from '/public/image/alarm/alarm.svg';
import useSse from '@/app/hooks/useSse';
import useFetchAlarms from '@/app/hooks/useFetchAlarms';

export default function Floating() {
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);

  const [hasNotification, setHasNotification] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');
  const [isDelete, setIsDelete] = useState(false);

  const { alarms, fetchAlarms } = useFetchAlarms(access);

  const createEventSource = useCallback((data) => {
    if (data.message === 'NEW_NOTICE' || data.isUnread) {
      setHasNotification(true);
    }
  }, []);

  useSse(
    `${process.env.NEXT_PUBLIC_BASE_URL}/notice/subscribe`,
    access,
    createEventSource
  );

  const handlePopup = () => {
    if (isPopupVisible) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsPopupVisible(false);
        setIsAnimating(false);
      }, 500);
    } else {
      setIsPopupVisible(true);
    }
  };

  useEffect(() => {
    if (isPopupVisible || isDelete) {
      fetchAlarms();
    }
  }, [isPopupVisible, fetchAlarms, isDelete]);

  useEffect(() => {
    setIsPopupVisible(false);
  }, [pathname]);

  const filteredAlarms = alarms.filter((alarm) => {
    if (activeTab === '전체') return true;
    if (
      activeTab === 'commerce' &&
      (alarm.type === 'commerce_success' || alarm.type === 'commerce_fail')
    ) {
      return true;
    }
    return alarm.type === activeTab;
  });

  return (
    <>
      {isLoggedIn && (
        <>
          <div
            className="fixed w-12 h-12 right-12 bottom-24 drop-shadow-md z-10 cursor-pointer"
            onClick={handlePopup}
          >
            <div className="relative rounded-full w-16 h-16 bg-blue-500 flex items-center justify-center">
              <Image
                className="w-10 h-10"
                src={floating}
                width={40}
                height={40}
                alt="Floating Button"
              />
              {hasNotification && (
                <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full border border-white"></div>
              )}
            </div>
          </div>

          {isPopupVisible && (
            <div
              className={`fixed right-2 bottom-16 bg-gray-100 z-20 border rounded-lg w-[420px] overflow-y-auto transition-transform transform ${
                isAnimating ? 'animate-slide-down' : 'animate-slide-up'
              }`}
            >
              <AlarmHeader handlePopup={handlePopup} />
              <AlarmActiveAction
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                setHasNotification={setHasNotification}
                setIsDelete={setIsDelete}
              />
              <div className="scrollable max-h-[600px] min-h-[600px] overflow-y-auto">
                {filteredAlarms.length === 0 ? (
                  <div className="mx-auto my-auto flex flex-col justify-center items-center">
                    <Image
                      src={alarmIcon}
                      alt="알림 아이콘"
                      width={40}
                      height={40}
                      className="mt-[40%] pb-[30px] mx-auto"
                    />
                    <strong className="text-2xl text-center mb-[20px]">
                      새로운 알림이 없습니다.
                      <br />
                    </strong>
                    더취페이의 다양한 알림을 이곳에서 모아볼 수 있어요.
                  </div>
                ) : (
                  filteredAlarms.map((alarm) => (
                    <AlarmInfo key={alarm.noticeId} alarm={alarm} />
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
