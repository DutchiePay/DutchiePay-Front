'use client';

export default function WordStore({
  isSearchStoreEnabled,
  setIsSearchStoreEnabled,
}) {
  const toggleSearchStore = () => {
    localStorage.setItem('isSearchStoreEnabled', !isSearchStoreEnabled);
    setIsSearchStoreEnabled(!isSearchStoreEnabled);
  };

  return (
    <button className="text-xs text-gray--500" onClick={toggleSearchStore}>
      검색어 저장 {isSearchStoreEnabled ? '끄기' : '켜기'}
    </button>
  );
}
