import Image from "next/image";
import logo from "../../../public/image/logo.jpg";
import github from "../../../public/image/github.svg";
import notion from "../../../public/image/notion.svg";

export default function Header() {
  return (
    <div className="w-[1020px] h-[60px] pr-[40px] pl-[40px] m-0 m-auto">
      <div className="flex items-center relative w-full">
        <Image
          className="w-[90px] h-[54px] mr-[65px] "
          src={logo}
          alt="logo"
          width={90}
          height={54}
        ></Image>
        <p>copyrightⓒ</p>
        <div className="flex justify-end w-full">
          <Image
            className="mr-[24px]"
            src={github}
            width={24}
            height={24}
          ></Image>
          <Image src={notion} width={24} height={24}></Image>
        </div>
      </div>
    </div>
  );
}
