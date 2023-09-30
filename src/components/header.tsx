import React, { FC, Fragment } from "react";
import Logo from "./logo";
import Link from "next/link";
import {
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";

type HeaderProps = {};

const Header: FC<HeaderProps> = (props) => {
  return (
    <header className="p-4 flex xl:py-6 xl:w-64 bg-white max-xl:border-b xl:border-r border-gray-200">
      <div className="container flex max-xl:justify-between max-xl:m-auto xl:gap-4 xl:flex-col">
        <Logo />
        <div className="flex xl:justify-center">
          <Link
            href="/"
            className="relative flex w-12 h-12 items-center justify-center hover:text-red-500 focus:text-red-500"
          >
            <AiOutlineBell className="w-6 h-6 text-current" />
            <div className="absolute left-6 top-2 flex w-4 h-4 items-center justify-center bg-red-600 rounded-full text-xs text-white">
              8
            </div>
          </Link>
          <Link
            href="/"
            className="w-12 h-12 flex items-center justify-center hover:text-red-500 focus:text-red-500"
          >
            <AiOutlineSetting className="w-6 h-6 text-current" />
          </Link>
          <Link
            href="/"
            className="w-12 h-12 flex items-center justify-center hover:text-red-500 focus:text-red-500  rounded-full bg-gray-100 text-gray-300"
          >
            <AiOutlineUser className="w-6 h-6 text-current" />
          </Link>
        </div>
        <ul className="max-xl:hidden">
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 py-3 px-2 hover:bg-gray-100 focus:bg-gray-100 text-gray-900 text-lg	"
            >
              <AiOutlineHome className="w-6 h-6 text-current" />{" "}
              <span>Головна</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 py-3 px-2 hover:bg-gray-100 focus:bg-gray-100 text-gray-900 text-lg	"
            >
              <AiOutlineHome className="w-6 h-6 text-current" />{" "}
              <span>Головна</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 py-3 px-2 hover:bg-gray-100 focus:bg-gray-100 text-gray-900 text-lg	"
            >
              <AiOutlineHome className="w-6 h-6 text-current" />{" "}
              <span>Головна</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 py-3 px-2 hover:bg-gray-100 focus:bg-gray-100 text-gray-900 text-lg	"
            >
              <AiOutlineHome className="w-6 h-6 text-current" />{" "}
              <span>Головна</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
