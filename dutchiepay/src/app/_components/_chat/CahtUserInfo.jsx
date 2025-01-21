import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import profile from '/public/image/profile.jpg';
import { useSelector } from 'react-redux';

const ChatUserInfo = ({
  nickname,
  chatUsers,
  selectedUserIds,
  handleCheckboxChange,
  handleKickMembersClick,
  isFiltersVisible,
  chatUserCount,
}) => {
  const [managerId, setManagerId] = useState(null);
  const userId = useSelector((state) => state.login.user.userId);

  useEffect(() => {
    const manager = chatUsers.find((user) => user.isManager);
    if (manager) {
      setManagerId(manager.userId);
    }
  }, [chatUsers]);
  return (
    <div
      className={`absolute left-6 w-[230px] overflow-hidden ${isFiltersVisible ? 'border border-gray-300 z-[10]' : 'h-0'}`}
    >
      <div className="text-center bg-white shadow-md p-2">
        <div className="flex w-full justify-between items-center p-3">
          <div className="flex gap-[16px] items-center">
            <Image
              src={profile}
              width={35}
              height={35}
              alt="참여자"
              className="rounded-full border"
            />
            {nickname}
          </div>
          <div className="text-white bg-black w-6 h-6 rounded-sm">나</div>
        </div>
        {chatUsers.map((user) => {
          if (nickname !== user.nickname) {
            return (
              <div
                key={user.userId}
                className="flex w-full justify-between items-center p-3"
              >
                <label
                  htmlFor={`kickMember-${user.userId}`}
                  className={`${user.isManager ? 'cursor-pointer' : ''}`}
                >
                  <div className="flex gap-[16px] items-center">
                    <Image
                      src={user.profileImg || profile}
                      width={35}
                      height={35}
                      alt="참여자"
                      className="rounded-full border"
                    />
                    {user.nickname}
                  </div>
                </label>
                {managerId == userId ? (
                  <input
                    id={`kickMember-${user.userId}`}
                    type="checkbox"
                    className={`login__checkbox w-6 h-6 border border-gray-300 checked:bg-blue--500`}
                    onChange={() => handleCheckboxChange(user.userId)}
                  />
                ) : (
                  ''
                )}
              </div>
            );
          }
          return null;
        })}
        <div
          className={`pt-3 pb-2 border-t ${selectedUserIds.length > 0 ? 'cursor-pointer bg-blue--500 text-white' : 'text-gray--500'}`}
          onClick={
            selectedUserIds.length > 0 ? handleKickMembersClick : undefined
          }
        >
          {selectedUserIds.length > 0
            ? `${selectedUserIds.length}명 내보내기`
            : `현재 채팅방 인원 : ${chatUserCount}명`}
        </div>
      </div>
    </div>
  );
};

export default ChatUserInfo;
