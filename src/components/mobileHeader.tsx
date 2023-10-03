import Link from "next/link";
import React, { FC } from "react";

import { AiOutlineHome } from "react-icons/ai";

type MobileHeaderProps = {};

const MobileHeader: FC<MobileHeaderProps> = (props) => {
  return (
    <ul className="px-4 py-2 bg-white flex flex-wrap justify-between fixed bottom-0 left-0 w-full xl:hidden">
      <li>
        <Link
          href="/"
          className="flex items-center flex-col gap-2 py-2 px-1 hover:text-red-500 focus:text-red-500 text-gray-900 text-lg	"
        >
          <AiOutlineHome className="w-6 h-6 text-current" />
          <span>Головна</span>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className="flex items-center flex-col gap-2 py-2 px-1 hover:text-red-500 focus:text-red-500 text-gray-900 text-lg	"
        >
          <AiOutlineHome className="w-6 h-6 text-current" />
          <span>Головна</span>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className="flex items-center flex-col gap-2 py-2 px-1 hover:text-red-500 focus:text-red-500 text-gray-900 text-lg	"
        >
          <AiOutlineHome className="w-6 h-6 text-current" />
          <span>Головна</span>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className="flex items-center flex-col gap-2 py-2 px-1 hover:text-red-500 focus:text-red-500 text-gray-900 text-lg	"
        >
          <AiOutlineHome className="w-6 h-6 text-current" />
          <span>Головна</span>
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className="flex items-center flex-col gap-2 py-2 px-1 hover:text-red-500 focus:text-red-500 text-gray-900 text-lg	"
        >
          <AiOutlineHome className="w-6 h-6 text-current" />
          <span>Головна</span>
        </Link>
      </li>
    </ul>
  );
};

export default MobileHeader;