import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default async function getImage(image) {
  const validMimeTypes = ['image/png', 'image/jpeg']; // PNG, JPG, JPEG MIME 타입
  const maxSizeMB = 10; // 10MB

  if (!validMimeTypes.includes(image.type)) {
    alert('프로필 이미지는 png, jpg/jpeg 파일만 가능합니다.');
    return;
  }
  if (image.size > maxSizeMB * 1024 * 1024) {
    alert('프로필 이미지는 10MB 이하의 파일만 가능합니다.');
    return;
  }

  const imageName = uuidv4() + image.name; // 파일 이름 중복되지 않기 위함

  try {
    let response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/image`,
      { fileName: imageName }
    );
    const uploadUrl = response.data.uploadUrl;

    try {
      response = await axios.put(uploadUrl, image, {
        headers: {
          'Content-Type': image.type,
        },
      });

      return `https://${process.env.NEXT_PUBLIC_IMAGE_BUCKET}.s3.amazonaws.com/${imageName}`;
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  } catch (error) {
    alert('오류가 발생했습니다. 다시 시도해주세요.');
  }
}
