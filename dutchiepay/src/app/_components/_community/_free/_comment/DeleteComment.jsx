import Image from 'next/image';
import trash from '/public/image/trash.svg';

export default function DeleteComment() {
  return (
    <div className="flex items-center gap-[4px]">
      <div className="w-[50px] h-[50px] flex items-center justify-center">
        <Image src={trash} alt="delete" width={28} height={28} />
      </div>

      <div className="h-[45px] ml-[12px] flex items-center">
        삭제된 댓글입니다.
      </div>
    </div>
  );
}
