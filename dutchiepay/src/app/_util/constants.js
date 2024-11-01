import beauty from '/public/image/category/beauty.png';
import daily from '/public/image/category/daily.jpg';
import delivery from '/public/image/delivery.svg';
import desk from '/public/image/category/desk.jpg';
import digital from '/public/image/category/digital.jpg';
import fabric from '/public/image/category/fabric.png';
import fresh from '/public/image/category/fresh.jpg';
import frozen from '/public/image/category/frozen.jpg';
import heart from '/public/image/heart.svg';
import interior from '/public/image/category/interior.jpg';
import kitchen from '/public/image/category/kitchen.jpg';
import post from '/public/image/post.svg';
import question from '/public/image/question.svg';
import review from '/public/image/review.svg';
import security from '/public/image/category/security.jpg';
import user from '/public/image/user.svg';

export const MENUS = {
  공동구매: 'commerce',
  '마트/배달': 'mart',
  '거래/나눔': 'used',
  커뮤니티: 'community',
};

export const FILTERS = {
  최신순: 'newest',
  좋아요순: 'like',
  마감임박순: 'endDate',
  할인율순: 'discount',
};

export const CATEGORIES = {
  전체: '전체',
  '신선/가공식품': '신선',
  냉동식품: '냉동',
  '인테리어/가구': '가구',
  '디지털/가전': '가전',
  '화장품/미용': '미용',
  패브릭: '패브릭',
  생활: '생활',
  '주방/청소': '주방청소',
  '잡화/데스크': '잡화',
  보안: '보안',
};

export const CATEGORY_IMAGES = {
  '신선/가공식품': fresh,
  냉동식품: frozen,
  '인테리어/가구': interior,
  '디지털/가전': digital,
  '화장품/미용': beauty,
  패브릭: fabric,
  생활: daily,
  '주방/청소': kitchen,
  '잡화/데스크': desk,
  보안: security,
};

export const COMMERCE_FILTER = {
  최신순: 'newest',
  마감임박순: 'endDate',
  좋아요순: 'like',
  할인율순: 'discount',
};

export const MYPAGE_MENU = {
  회원정보: 'info',
  활동내역: 'mypost',
  구매내역: 'myorder',
  '좋아요한 상품': 'like',
  문의내역: 'myask',
  후기내역: 'myreview',
};

export const MYPAGE_ICON = {
  회원정보: user,
  활동내역: post,
  구매내역: delivery,
  '좋아요한 상품': heart,
  문의내역: question,
  후기내역: review,
};
