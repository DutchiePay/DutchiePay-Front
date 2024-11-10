import useReissueToken from './useReissueToken';
export default function useRetryFunction({ onError }) {
  const { refreshAccessToken } = useReissueToken();
  const reissueTokenAndRetry = async (retryFunction) => {
    try {
      const reissueResponse = await refreshAccessToken();
      if (reissueResponse.success) {
        await retryFunction();
      } else {
        onError(
          reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    } catch (error) {
      onError('요청 중 오류가 발생했습니다.');
    }
  };

  return { reissueTokenAndRetry };
}
