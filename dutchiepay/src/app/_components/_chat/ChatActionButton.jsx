import Image from 'next/image';
import imageIcon from '/public/image/chat/image.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getformatCahtDate,
  getformatCahtTime,
} from '@/app/_util/getFormatDate';
import getImage from '@/app/_util/getImage';

export default function ChatActionButton({
  handleSend,
  setNewMessage,
  newMessage,
  setNewMessageType,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const senderId = useSelector((state) => state.login.user.userId);

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadedImageUrl = await getImage(file);
      if (uploadedImageUrl) {
        const messageData = {
          type: 'img',
          senderId: senderId,
          content: uploadedImageUrl,
          date: getformatCahtDate(new Date()),
          time: getformatCahtTime(new Date()),
        };

        handleSend(messageData);
        setSelectedImage(null);
        setNewMessageType('text');
      }
    }
  };

  return (
    <form
      className="flex flex-col border-t border-t-gray--300 mt-[10px]"
      onSubmit={(e) => {
        e.preventDefault();
        if (newMessage) {
          const messageData = {
            type: 'text',
            senderId: senderId,
            content: newMessage,
            date: getformatCahtDate(new Date()),
            time: getformatCahtTime(new Date()),
          };

          handleSend(messageData);
          setNewMessage('');
        }
      }}
    >
      <textarea
        id="comment"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-[480px] resize-none outline-none text-sm p-2 min-h-[100px]"
        placeholder="채팅을 입력해주세요."
        spellCheck="false"
        maxLength={300}
      />

      <div className="flex justify-between items-center mt-2 px-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleSendImage}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload">
            <Image
              src={imageIcon}
              width={20}
              height={20}
              alt="이미지"
              className="cursor-pointer"
            />
          </label>
        </div>
        <div>
          <span className="text-xs text-gray--500">{`${newMessage.length}/300`}</span>
          <button
            type="submit"
            disabled={newMessage.length === 0 && !selectedImage}
            className={`px-3 py-1 text-sm font-sm text-white rounded-lg ml-2 ${newMessage.length > 0 || selectedImage ? 'bg-blue--500 hover:bg-blue--600' : 'bg-gray--300 cursor-not-allowed'}`}
          >
            전송
          </button>
        </div>
      </div>
    </form>
  );
}
