export default function ContextMenu({ contextMenu, onClose, onLeaveChat }) {
  if (!contextMenu.visible) return null;

  return (
    <div
      className="absolute bg-white border rounded shadow-lg"
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <div
        className="p-2 cursor-pointer text-sm hover:bg-gray--100"
        onClick={onClose}
      >
        읽음 처리
      </div>
      <div
        className="p-2 cursor-pointer text-sm hover:bg-gray--100"
        onClick={onLeaveChat}
      >
        채팅방 나가기
      </div>
    </div>
  );
}
