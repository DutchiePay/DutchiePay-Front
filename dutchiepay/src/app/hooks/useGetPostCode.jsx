import { useDaumPostcodePopup } from 'react-daum-postcode';

export default function useGetPostCode(setValue) {
  const open = useDaumPostcodePopup();

  const getPostCode = () => {
    return new Promise((resolve) => {
      open({
        onComplete: (data) => {
          setValue('zipCode', data.zonecode);
          setValue('address', data.roadAddress);
          resolve();
        },
        width: 500,
        height: 600,
        left: window.innerWidth / 2 - 500 / 2,
        top: window.innerHeight / 2 - 600 / 2,
      });
    });
  };

  return getPostCode;
}
