export default function AuthTime({ remainingTime }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(seconds % 60).padStart(2, '0'); // 초 부분만 2자리로 맞춤
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <p className="absolute top-[18px] right-[110px] font-medium text-red-500 text-sm">
      {formatTime(remainingTime)}
    </p>
  );
}
