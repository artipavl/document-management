import React, { FC } from "react";
import Link from "next/link";

import { FaDatabase } from "react-icons/fa";
import style from "./logo.module.scss";

type LogoProps = {};

const Logo: FC<LogoProps> = (props) => {
  return (
    <Link href="/" className={style.logoLink}>
      <FaDatabase fill="red" className={style.logoIcon} />
    </Link>
  );
};

export default Logo;
