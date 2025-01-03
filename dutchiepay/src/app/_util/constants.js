import delivery from '/public/image/delivery.svg';
import heart from '/public/image/heart.svg';
import post from '/public/image/post.svg';
import question from '/public/image/question.svg';
import review from '/public/image/review.svg';
import user from '/public/image/user.svg';

export const MENUS = {
  상품검색: 'search',
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
  전체: '',
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

export const COMMERCE_FILTER = {
  최신순: 'newest',
  마감임박순: 'endDate',
  좋아요순: 'like',
  할인율순: 'discount',
};

export const COMMUNITY_FILTER = {
  최신순: 'new',
  댓글많은순: 'comment',
  조회수순: 'view',
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

export const ORDER_STATUS = {
  공구진행중: '배송전',
  배송준비중: '배송전',
  배송중: '배송중',
  배송완료: '배송완료',
  구매확정: '배송완료',
  공구실패: '배송전',
  환불처리: '배송완료',
  주문취소: '배송전',
  교환처리: '배송완료',
};

export const MART_CATEGORIES = {
  전체: '',
  마트구매: 'mart',
  같이배달: 'delivery',
};

export const USED_CATEGORIES = {
  전체: '',
  중고판매: 'trade',
  중고나눔: 'share',
};

export const COMMUNITY_CATEGORIES = {
  전체: '',
  정보공유: 'info',
  질문: 'qna',
  취미생활: 'hobby',
  자유게시판: 'free',
};

export const ORDER_FILTER = {
  배송전: 'pending',
  배송중: 'shipped',
  배송완료: 'delivered',
  전체: null,
};

export const ALL_COMMUNITY_CATEGORIES = {
  마트: 'mart',
  배달: 'delivery',
  자유: 'free',
  질문: 'qna',
  취미: 'hobby',
  정보: 'info',
  거래: 'trade',
  나눔: 'share',
};

export const NOTICE_CATEGORY = {
  댓글: 'comment',
  답글: 'reply',
  채팅: 'chat',
  '공동구매가 성공했습니다.': 'success',
  '공동구매가 실패했습니다.': 'fail',
};
