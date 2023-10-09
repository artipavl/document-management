import Link from "next/link";
import React, { FC } from "react";

import style from "./mobileHeader.module.scss";

import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";

type MobileHeaderProps = {
  openFunction: () => void;
};

const MobileHeader: FC<MobileHeaderProps> = ({ openFunction }) => {
  return (
    <ul className={style.navList}>
      <li>
        <Link href="/home" className={style.navLink}>
          <AiOutlineHome className={style.navIcon} />
          <span>Головна</span>
        </Link>
      </li>

      <li>
        <button
          type="button"
          className={style.navLink}
          onClick={() => openFunction()}
        >
          <AiOutlineMenu className={style.navIcon} />
          <span>Меню</span>
        </button>
      </li>
    </ul>
  );
};

export default MobileHeader;
