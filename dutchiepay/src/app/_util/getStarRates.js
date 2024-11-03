export default function getStarRates({ rating }) {
  console.log(rating);

  let starRatesArr = [0, 0, 0, 0, 0];
  let starVerScore = rating;

  for (let i = 0; i < 5; i++) {
    if (starVerScore >= 1) {
      starRatesArr[i] = 14; // 별 하나당 14
      starVerScore -= 1;
    } else {
      starRatesArr[i] = starVerScore * 14; // 부분 채우기
      break;
    }
  }

  return starRatesArr;
}
