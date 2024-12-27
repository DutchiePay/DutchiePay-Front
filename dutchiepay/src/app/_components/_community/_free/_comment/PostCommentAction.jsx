export default function PostCommentAction({ comment, edit = null, setIsEdit }) {
  return (
    <div className="flex justify-end items-center mt-2">
      <span className="text-xs text-gray--500">{`${comment.length}/800`}</span>
      <button
        type="submit"
        disabled={comment.length === 0}
        className={`px-3 py-1 text-sm font-sm text-white rounded-lg ml-2 ${
          comment.length > 0
            ? 'bg-blue--500 hover:bg-blue--600'
            : 'bg-gray--300 cursor-not-allowed'
        }`}
      >
        {edit ? '수정' : '등록'}
      </button>
      {edit && (
        <button
          onClick={() => setIsEdit(false)}
          className={`px-3 py-1 text-sm font-sm border border-blue--500 text-blue--500 rounded-lg ml-2 bg-white hover:bg-blue--500 hover:text-white`}
        >
          취소
        </button>
      )}
    </div>
  );
}
