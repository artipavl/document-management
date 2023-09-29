import React, { FC } from "react";
import Link from "next/link";

import { FaDatabase } from "react-icons/fa";

type LogoProps = {};

const Logo: FC<LogoProps> = (props) => {
  return (
    <Link href="/">
      <FaDatabase fill="red" />
    </Link>
  );
};

export default Logo;
