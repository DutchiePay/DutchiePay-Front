'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

export default function FindFilter({ tab, setTab, setIsFindEmail }) {
  const handleTab = (e) => {
    setTab(e.target.innerText);
    setIsFindEmail('');
  };

  return (
    <div className="flex justify-center">
      <div
        className={`user-find__header ${tab === '아이디(이메일) 찾기' ? 'user-find__header__active' : ''}`}
        onClick={handleTab}
      >
        아이디(이메일) 찾기
      </div>
      <div
        className={`user-find__header ${tab === '비밀번호 재설정' ? 'user-find__header__active' : ''}`}
        onClick={handleTab}
      >
        비밀번호 재설정
      </div>
    </div>
  );
}
