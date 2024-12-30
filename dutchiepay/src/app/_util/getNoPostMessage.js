export default function NoPostMessage({ keyword }) {
  return (
    <strong className="text-2xl text-center mb-[50px]">
      {keyword
        ? '검색과 일치하는 게시글이 없습니다.'
        : '현재 등록된 게시글이 없습니다.'}
      <br />
      새로운 게시글을 작성하여 다양한 의견과 정보를 공유해 주세요.
    </strong>
  );
}
