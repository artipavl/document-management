import Link from "next/link";
import React, { FC } from "react";

import style from "./mobileHeader.module.scss";

import { AiOutlineHome } from "react-icons/ai";

type MobileHeaderProps = {};

const MobileHeader: FC<MobileHeaderProps> = (props) => {
  return (
    <ul className={style.navList}>
      <li>
        <Link href="/" className={style.navLink}>
          <AiOutlineHome className={style.navIcon} />
          <span>Головна</span>
        </Link>
      </li>
      <li>
        <Link href="/" className={style.navLink}>
          <AiOutlineHome className={style.navIcon} />
          <span>Головна</span>
        </Link>
      </li>
      <li>
        <Link href="/" className={style.navLink}>
          <AiOutlineHome className={style.navIcon} />
          <span>Головна</span>
        </Link>
      </li>
      <li>
        <Link href="/" className={style.navLink}>
          <AiOutlineHome className={style.navIcon} />
          <span>Головна</span>
        </Link>
      </li>
      <li>
        <Link href="/" className={style.navLink}>
          <AiOutlineHome className={style.navIcon} />
          <span>Головна</span>
        </Link>
      </li>
    </ul>
  );
};

export default MobileHeader;
