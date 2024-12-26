import Image from 'next/image';
import floating from '/public/image/floating.svg';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AlarmHeader from '../_alarm/AlarmHeader';
import AlarmActiveAction from '../_alarm/AlarmActiveAction';
import axios from 'axios';
import AlarmInfo from '../_alarm/AlarmInfo';
import alarmIcon from '/public/image/alarm/alarm.svg';
import { EventSourcePolyfill } from 'event-source-polyfill';

export default function Floating() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);
  const [hasNotification, setHasNotification] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');
  const [eventSource, setEventSource] = useState(null);
  const [alarms, setAlarms] = useState([]);
  const handlePopup = () => {
    if (isPopupVisible) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsPopupVisible(false);
        setIsAnimating(false);
      }, 500);
    } else {
      setHasNotification(false);
      setIsPopupVisible(true);
    }
  };

  const createEventSource = useCallback(() => {
    const source = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BASE_URL}/notice/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    source.onopen = () => {
      console.log('SSE 연결이 성공적으로 이루어졌습니다.');
    };

    source.onmessage = (event) => {
      console.log(event);

      const data = JSON.parse(event.data);
      console.log(data);

      if (data.isUnread && !isPopupVisible) {
        setHasNotification(true);
      }
    };

    return source;
  }, [access, isPopupVisible]);
  useEffect(() => {
    if (isLoggedIn && access) {
      if (!hasNotification) {
        const source = createEventSource();
        setEventSource(source);

        return () => {
          source.close();
        };
      }
    }
  }, [isLoggedIn, access, hasNotification, createEventSource]);

  useEffect(() => {
    const fetchAlarms = async () => {
      if (isPopupVisible) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/notice`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
          setAlarms(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('API 호출 오류:', error);
        }
      }
    };

    fetchAlarms();
  }, [isPopupVisible, access]);
  console.log(alarms);

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
              className={`fixed right-2 bottom-16 bg-gray-100 z-20 border rounded-lg w-[420px] overflow-y-auto transition-transform transform ${isAnimating ? 'animate-slide-down' : 'animate-slide-up'}`}
            >
              <AlarmHeader handlePopup={handlePopup} />
              <AlarmActiveAction
                setActiveTab={setActiveTab}
                activeTab={activeTab}
              />

              <div className="scrollable max-h-[600px] min-h-[600px] overflow-y-auto">
                {alarms.length === 0 ? (
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
                  alarms.map((alarm) => (
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
