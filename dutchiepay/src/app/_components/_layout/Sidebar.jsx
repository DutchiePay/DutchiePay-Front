import '../../../styles/mypage.css';

import Image from 'next/image';
import Link from 'next/link';
import arrow from '../../../../public/image/arrow.svg';
import coupon from '../../../../public/image/coupon.svg';
import delivery from '../../../../public/image/delivery.svg';
import heart from '../../../../public/image/heart.svg';
import post from '../../../../public/image/post.svg';
import profile from '../../../../public/image/profile.jpg';
import question from '../../../../public/image/question.svg';
import review from '../../../../public/image/review.svg';
import user from '../../../../public/image/user.svg';

export default function Sidebar() {
  return (
    <aside className="w-[250px] h-[750px] bg-white border-r p-[16px] mb-[70px] flex flex-col items-center gap-[56px] fixed">
      <div className="flex flex-col items-center">
        <Image
          className="w-[120px] h-[120px] rounded-full border mb-[12px]"
          src={profile}
          alt="profile"
          width={120}
          height={120}
        />
        <strong>한유진</strong>
      </div>
      <ul>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/info" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={user} alt="user" width={20} height={20} />
              회원정보
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/mypost" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={post} alt="post" width={20} height={20} />
              활동내역
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/myorder" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={delivery} alt="delivery" width={20} height={20} />
              구매내역
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/like" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={heart} alt="like" width={20} height={20} />
              좋아요한 상품
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/myask" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={question} alt="ask" width={20} height={20} />
              문의내역
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/myreview" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={review} alt="review" width={20} height={20} />
              후기내역
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/mycoupon" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={coupon} alt="coupon" width={20} height={20} />
              쿠폰함
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
      </ul>
      <div className="w-[220px] border rounded-lg flex flex-col justify-center">
        <div className="mypage-sidebar-info__item">
          <p>진행중인 공구</p>
          <strong>5 개</strong>
        </div>
        <div className="mypage-sidebar-info__item">
          <p>사용가능한 쿠폰</p>
          <strong>5 장</strong>
        </div>
      </div>
    </aside>
  );
}
