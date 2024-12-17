'use client';

export default function SearchEmpty({ keyword }) {
  return (
    <article className="h-[300px] mt-[40px] border rounded-lg px-[60px] flex flex-col justify-center">
      <p className="text-xl font-bold">
        <strong className="text-red--500">
          &apos;{keyword ? keyword : '검색어 없음'}&apos;
        </strong>
        {'  '}에 대한 검색 결과가 없습니다.
      </p>
      <ul className="mt-[24px] text-gray--500">
        <li>단어의 철자가 정확한지 확인해 보세요.</li>
        <li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>
        <li>
          검색의 단어 수를 줄이거나, 보다 일반적인 검색으로 다시 검색해 보세요.
        </li>
        <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
      </ul>
    </article>
  );
}
