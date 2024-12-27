'use client';

import Image from 'next/image';
import floating from '/public/image/floating.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import AlarmHeader from '../_alarm/AlarmHeader';
import AlarmActiveAction from '../_alarm/AlarmActiveAction';
import axios from 'axios';
import AlarmInfo from '../_alarm/AlarmInfo';
import alarmIcon from '/public/image/alarm/alarm.svg';
import { EventSourcePolyfill } from 'event-source-polyfill';

export default function Floating() {
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);

  const [hasNotification, setHasNotification] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');
  const [alarms, setAlarms] = useState([]);
  const [isNotificationRead, setIsNotificationRead] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const hasFetched = useRef(false);
  const eventSourceRef = useRef(null);

  const createEventSource = useCallback(() => {
    if (eventSourceRef.current) return;

    const source = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BASE_URL}/notice/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    source.onopen = () => {
      console.log('SSE 연결 성공');
    };

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('SSE 메시지 수신:', data);
      if (data.message === 'NEW_NOTICE') {
        setHasNotification(true);
        source.close();
        eventSourceRef.current = null;
      }
      if (data.isUnread) {
        setHasNotification(true);
        source.close();
        eventSourceRef.current = null;
      }
    };

    source.onerror = (error) => {
      console.error('SSE 오류 발생:', error);
      source.close();
      eventSourceRef.current = null;
    };

    eventSourceRef.current = source;
  }, [access]);

  // 알림 데이터 가져오기
  const fetchAlarms = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notice`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(response.data);

      setAlarms(response.data);
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  }, [access]);

  // SSE 연결 관리
  useEffect(() => {
    if (isLoggedIn && !isNotificationRead && !eventSourceRef.current) {
      createEventSource();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [isLoggedIn, isNotificationRead, createEventSource]);

  const handlePopup = () => {
    if (isPopupVisible) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsPopupVisible(false);
        setIsAnimating(false);
        setIsNotificationRead(true);
        createEventSource();
      }, 500);
    } else {
      setIsPopupVisible(true);
      setIsNotificationRead(false);
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
      (alarm.type === 'success' || alarm.type === 'fail')
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
