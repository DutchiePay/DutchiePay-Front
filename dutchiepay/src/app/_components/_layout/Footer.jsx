'use clicent';

import Image from 'next/image';
import Link from 'next/link';
import github from '../../../../public/image/github.svg';
import logo from '../../../../public/image/logo.jpg';
import notion from '../../../../public/image/notion.svg';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="w-[1020px] m-0 m-auto ">
        <div className="flex items-center w-full justify-between">
          <div className="flex gap-[30px] items-center">
            <Image className="w-[90px] h-[54px] mr-[65px] " src={logo} alt="logo" width={90} height={54}></Image>
            <p className="text-sm">copyright 2024. 더취페이. All rights reserved.</p>
          </div>

          <div className="flex justify-end">
            <Link
              href="https://github.com/DutchiePay/DutchiePay-Front"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              <Image className="mr-[24px]" src={github} alt="frontend git" width={24} height={24}></Image>
            </Link>

            <Link
              href="https://github.com/DutchiePay/DutchiePay-Back"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              <Image className="mr-[24px]" src={github} alt="backend git" width={24} height={24}></Image>
            </Link>
            <Image src={notion} alt="notion" width={24} height={24}></Image>
          </div>
        </div>
      </div>
    </footer>
  );
}
