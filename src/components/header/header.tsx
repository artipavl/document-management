import React, { FC, Fragment } from "react";
import Logo from "../logo/logo";
import Link from "next/link";
import {
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";

import style from "./header.module.scss";

type HeaderProps = {};

const Header: FC<HeaderProps> = (props) => {
  return (
    <header className={style.header}>
      <div className={style.headerContainer}>
        <Logo />
        <div className={style.headerInform}>
          <Link href="/" className={style.headerNotification}>
            <AiOutlineBell className={style.headerIcon} />
            <div className={style.headerNotificationCount}>8</div>
          </Link>
          <Link href="/" className={style.headerUserSettings}>
            <AiOutlineSetting className={style.headerIcon} />
          </Link>
          <Link href="/" className={style.headerUser}>
            <AiOutlineUser className={style.headerIcon} />
          </Link>
        </div>
        <nav className={style.headerNav}>
          <ul>
            <li>
              <Link href="/" className={style.headerNavLink}>
                <AiOutlineHome className={style.headerNavIcon} />
                <span>Головна</span>
              </Link>
            </li>
            <li>
              <Link href="/" className={style.headerNavLink}>
                <AiOutlineHome className={style.headerNavIcon} />
                <span>Головна</span>
              </Link>
            </li>
            <li>
              <Link href="/" className={style.headerNavLink}>
                <AiOutlineHome className={style.headerNavIcon} />
                <span>Головна</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
