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

export const DELIVERY_MESSAGE = {
  option1: '문 앞에 놓아 주시면 돼요.',
  option2: '직접 받을게요. (부재시 문 앞)',
  option3: '벨 누르지 말아주세요.',
  option4: '배송 전에 미리 연락주세요.',
};

export const ORDER_FILTER = {
  공구진행: '공구진행중',
  배송준비: '배송준비중',
  배송중: '배송중',
  배송완료: '배송완료',
  구매확정: '구매확정',
  '실패/취소': '실패/취소',
  '환불/교환': '환불/교환',
};

export const ORDER_STATUS = {
  공구진행중: '공구진행중',
  배송준비중: '배송준비중',
  배송중: '배송중',
  배송완료: '배송완료',
  구매확정: '구매확정',
  공구실패: '실패/취소',
  환불처리: '환불/교환',
  주문취소: '실패/취소',
  교환처리: '환불/교환',
};
export const ERROR_MESSAGES = {
  '액세스 토큰이 만료되었습니다.':
    '토큰이 만료되었습니다. 다시 로그인해주세요.',
  '리뷰 수정은 2회까지만 가능합니다.': '리뷰 수정은 2회까지만 가능합니다.',
  '리뷰 내용을 입력해주세요.': '리뷰 내용을 입력해주세요.',
  '평점을 입력해주세요.': '평점을 입력해주세요.',
  '작성한 상품 리뷰가 이미 존재합니다.': '작성한 상품 리뷰가 이미 존재합니다.',
  '주문 정보가 없습니다.': '주문 정보가 없습니다.',
  '자신이 구매한 상품에만 후기를 달 수 있습니다.':
    '자신이 구매한 상품에만 후기를 달 수 있습니다.',
};
