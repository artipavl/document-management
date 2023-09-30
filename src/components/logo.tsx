import React, { FC } from "react";
import Link from "next/link";

import { FaDatabase } from "react-icons/fa";

type LogoProps = {};

const Logo: FC<LogoProps> = (props) => {
  return (
    <Link href="/" className="flex justify-center items-center">
      <FaDatabase fill="red" className="w-6 h-6" />
    </Link>
  );
};

export default Logo;
