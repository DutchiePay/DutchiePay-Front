import Image from 'next/image';
import image from '/public/image/chat/image.svg';
export default function ChatActionButton({
  handleSend,
  setNewMessage,
  newMessage,
}) {
  return (
    <form
      className="flex flex-col border-t border-t-gray--300 mt-[10px]"
      onSubmit={handleSend}
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
          <Image src={image} width={20} height={20} alt="이미지" />
        </div>
        <div>
          <span className="text-xs text-gray--500">{`${newMessage.length}/300`}</span>
          <button
            type="submit"
            disabled={newMessage.length === 0}
            className={`px-3 py-1 text-sm font-sm text-white rounded-lg ml-2 ${newMessage.length > 0 ? 'bg-blue--500 hover:bg-blue--600' : 'bg-gray--300 cursor-not-allowed'}`}
          >
            전송
          </button>
        </div>
      </div>
    </form>
  );
}
