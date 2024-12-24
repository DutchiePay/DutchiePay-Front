export default function getBase64File(base64String) {
  return new Promise((resolve, reject) => {
    try {
      const arr = base64String.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const data = atob(arr[1]);
      let uInt8Array = new Uint8Array(data.length);

      for (let i = 0; i < data.length; i++) {
        uInt8Array[i] = data.charCodeAt(i);
      }

      const file = new File([uInt8Array], `image_${new Date().getTime()}`, {
        type: mime,
      });
      resolve(file);
    } catch (error) {
      alert('Base64 문자열 변환에 실패했습니다. 다시 시도해주세요.');
      reject(error);
    }
  });
}
