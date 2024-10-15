'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import FindFilter from '@/app/_components/_user/_find/FindFilter';
import FindSubmit from '@/app/_components/_user/_find/FindSubmit';
import FindSuccess from '@/app/_components/_user/_find/FindSuccess';
import Logo from '@/app/_components/_user/Logo';
import { useState } from 'react';

export default function Find() {
  const [tab, setTab] = useState('아이디(이메일) 찾기');
  const [isFindEmail, setIsFindEmail] = useState('');

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[890px]">
      <Logo />
      <FindFilter tab={tab} setTab={setTab} setIsFindEmail={setIsFindEmail} />
      <section className="mb-[32px] w-[500px]">
        {isFindEmail ? (
          <FindSuccess isFindEmail={isFindEmail} />
        ) : (
          <FindSubmit tab={tab} setIsFindEmail={setIsFindEmail} />
        )}
      </section>
    </section>
  );
}
