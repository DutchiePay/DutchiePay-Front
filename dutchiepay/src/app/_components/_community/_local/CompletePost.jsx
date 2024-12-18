import Link from 'next/link';
import { getPostDate } from '@/app/_util/getFormatDate';

export default function CompletePost({ post }) {
  return (
    <Link
      href={`/${post.category}/${post.postId}`}
      className="flex justify-between items-center cursor-pointer"
    >
      <p className="text-sm text-gray--500">{post.title}</p>
      <p className="text-xs text-gray--500">
        {getPostDate(post.createdAt, 'date')}
      </p>
    </Link>
  );
}
