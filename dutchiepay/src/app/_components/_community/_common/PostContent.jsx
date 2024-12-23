'use client';

import { ALL_COMMUNITY_CATEGORIES } from '@/app/_util/constants';
import CommentForm from '@/app/_components/_community/_free/CommentForm';
import CurrentPost from '@/app/_components/_community/_local/CurrentPost';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import PostDetailAction from '@/app/_components/_community/_common/PostDetailAction';
import { getPostDate } from '@/app/_util/getFormatDate';
import prev from '/public/image/prev.svg';
import profile from '/public/image/profile.jpg';
import { useRouter } from 'next/navigation';

export default function PostContent({ menu, post, postId }) {
  const router = useRouter();
  const cleanHtml = DOMPurify.sanitize(JSON.parse(post.content));

  return (
    <section className="min-h-[750px] w-[730px] px-[24px] py-[40px] border-r">
      <div className="flex items-center justify-between">
        <Image
          src={prev}
          alt="뒤로가기"
          width={30}
          height={30}
          onClick={() => router.back()}
          role="button"
          tabIndex="0"
        />
        <div className="w-[54px] py-[4px] bg-blue--500 text-white rounded-3xl flex justify-center">
          {Object.keys(ALL_COMMUNITY_CATEGORIES).find(
            (key) => ALL_COMMUNITY_CATEGORIES[key] === post.category
          )}
        </div>
      </div>
      <article className="pl-[30px] pt-[24px]">
        <div className="flex justify-between items-center mb-[4px]">
          <div className="flex gap-[8px] items-center">
            <div className="relative w-[40px] h-[40px] rounded-full border">
              <Image
                className="w-[40px] h-[40px] rounded-full object-cover"
                src={post.writerProfileImage || profile}
                alt={post.writer}
                fill
              />
            </div>
            <strong>{post.writer}님의 게시글</strong>
          </div>
          <p className="text-xs text-gray--500">조회수 {post.hits}</p>
        </div>
        <h1 className="text-2xl text-blue--500 font-bold">{post.title}</h1>
        <p
          className="inline-block min-h-[320px] mt-[24px] mb-[60px]"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
        <div className="flex justify-between">
          <p className="text-xs text-gray--500">
            {getPostDate(post.createdAt)}
          </p>
          <PostDetailAction
            postId={postId}
            writerId={post.writerId}
            menu={menu}
          />
        </div>
        {menu !== 'community' ? (
          <CurrentPost
            writerId={post.writerId}
            writer={post.writer}
            writerProfileImage={post.writerProfileImage}
          />
        ) : (
          <CommentForm postId={postId} post={post} />
        )}
      </article>
    </section>
  );
}
