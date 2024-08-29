"use clicent";
import Image from "next/image";
import github from "../../../../public/image/github.svg";
import logo from "../../../../public/image/logo.jpg";
import notion from "../../../../public/image/notion.svg";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="w-[1020px] m-0 m-auto ">
        <div className="flex items-center w-full ">
          <Image
            className="w-[90px] h-[54px] mr-[65px] "
            src={logo}
            alt="logo"
            width={90}
            height={54}
          ></Image>
          <p className="text-[14px]">copyrightⓒ</p>
          <div className="flex justify-end w-full">
            <Image
              className="mr-[24px]"
              src={github}
              alt="backend git"
              width={24}
              height={24}
            ></Image>
            <Image
              className="mr-[24px]"
              src={github}
              alt="frontend git"
              width={24}
              height={24}
            ></Image>
            <Image src={notion} alt="notion" width={24} height={24}></Image>
          </div>
        </div>
      </div>
    </footer>
  );
}
