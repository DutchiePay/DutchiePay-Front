import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/image/logo.jpg';

export default function Logo() {
  return (
    <h1>
      <Link href="/">
        <Image
          className="w-[200px] h-[120px] mb-[16px]"
          src={logo}
          alt="logo"
          width={200}
          height={120}
          priority
        />
      </Link>
    </h1>
  );
}
