'use client';

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
import { useDispatch, useSelector } from 'react-redux';
import userIcon from '../../../../public/image/user.svg';
import { useEffect } from 'react';
import axios from 'axios';
import { setUser } from '@/redux/slice/userSlice';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const userInfo = useSelector((state) => state.login.user);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const accessToken = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  useEffect(() => {
    const initMypage = async () => {
      // 로그인이 안되어 있으면 메인 페이지로 리다이렉트
      if (!isLoggedIn) {
        router.push('/');
        return;
      }

      if (accessToken) {
        try {
          // accessToken을 Authorization 헤더에 추가하여 프로필 요청
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log('test');

          const userinfo = {
            address: response.data.address,
            coupon: response.data.coupon,
            detail: response.data.detail,
            email: response.data.email,
            order: response.data.order,
            phone: response.data.phone,
            zipcode: response.data.zipcode,
          };
          dispatch(setUser({ user: userinfo }));
        } catch (error) {
          console.log(error);
        }
      }
    };

    initMypage();
  }, []);
  return (
    <aside className="w-[250px] h-[730px] bg-white border-r p-[16px] mb-[70px] flex flex-col items-center gap-[32px] fixed">
      <div className="flex flex-col items-center">
        <Image
          className="w-[120px] h-[120px] rounded-full border mb-[12px]"
          src={userInfo?.profileImage || profile}
          alt="profile"
          width={120}
          height={120}
        />
        <strong>{userInfo?.nickname}</strong>
      </div>
      <ul>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/info" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={userIcon} alt="user" width={20} height={20} />
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
