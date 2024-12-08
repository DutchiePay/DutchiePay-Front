export default function PostCommentAction({ comment }) {
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
        등록
      </button>
    </div>
  );
}
