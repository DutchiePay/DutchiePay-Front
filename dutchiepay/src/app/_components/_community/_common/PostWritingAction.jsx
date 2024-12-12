import Link from 'next/link';

export default function PostWritingAction({ menu }) {
  return (
    <div className="flex justify-center gap-[16px] mt-[48px]">
      <button
        className="bg-blue--500 text-white text-lg font-semibold rounded-lg px-[60px] py-[8px]"
        type="submit"
      >
        등록
      </button>
      <Link
        href={`/${menu}`}
        className="border border-blue--500 text-blue--500 text-lg font-semibold rounded-lg px-[60px] py-[6px]"
        role="button"
      >
        취소
      </Link>
    </div>
  );
}
