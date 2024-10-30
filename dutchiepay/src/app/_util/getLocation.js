import axios from 'axios';

export default async function getLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `/api/map-reversegeocode/gc?coords=${longitude},${latitude}&output=json`,
              {
                headers: {
                  'X-NCP-APIGW-API-KEY-ID':
                    process.env.NEXT_PUBLIC_MAP_CLIENT_ID,
                  'X-NCP-APIGW-API-KEY':
                    process.env.NEXT_PUBLIC_MAP_CLIENT_SECRET,
                },
              }
            );

            const area1 = response.data.results[0].region.area1.name;
            const area2 = response.data.results[0].region.area2.name;

            const districts = ['중구', '동구', '서구', '남구', '북구'];

            let location;
            if (districts.includes(area2)) {
              location = `${area1} ${area2}`;
            } else {
              const area2Parts = area2.split(' ');
              location = `${area2Parts[0]}`; // 첫 번째 부분만 사용
            }

            resolve(location);
          } catch (error) {
            resolve('위치 정보를 불러오는 도중 오류가 발생했습니다.');
          }
        },
        () => {
          alert(
            '위치정보를 불러올 수 없어 기본 설정 지역으로 가입이 진행됩니다.'
          );
          resolve('서울특별시 중구');
        }
      );
    } else {
      resolve('브라우저가 위치 정보를 지원하지 않습니다.');
    }
  });
}
