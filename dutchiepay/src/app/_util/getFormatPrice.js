export function formatPrice(price) {
  // price가 undefined일 경우 0으로 처리
  if (price === undefined || price === null) {
    return '0';
  }

  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
