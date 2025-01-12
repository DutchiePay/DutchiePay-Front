'use client';

export default function FindFilter({ tab, setTab, setIsFindEmail }) {
  const handleTab = (item) => {
    setTab(item);
    setIsFindEmail('');
  };

  return (
    <ul className="flex justify-center">
      {['아이디(이메일) 찾기', '비밀번호 재설정'].map((item, key) => {
        return (
          <li
            className={`w-[250px] h-[40px] text-lg text-center cursor-pointer transition-all duration-200 ease-in-out ${tab === item ? 'border-b border-blue--500 border-b-2 font-bold' : ''}`}
            onClick={() => handleTab(item)}
            key={key}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
