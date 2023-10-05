"use client";
import React, { FC } from "react";

import Logo from "../logo/logo";
import Link from "next/link";
import {
  AiOutlineBell,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineFolderOpen,
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineTeam,
  AiOutlineBook,
} from "react-icons/ai";

import style from "./header.module.scss";

import { useRouter, usePathname } from "next/navigation";

type HeaderProps = {};

const Header: FC<HeaderProps> = (props) => {
  const router = usePathname();
  console.log(router);
  return (
    <header className={style.header}>
      <div className={style.headerContainer}>
        <Logo />
        <div className={style.headerInform}>
          <Link href="/todo" className={style.headerNotification}>
            <AiOutlineBell className={style.headerIcon} />
            <div className={style.headerNotificationCount}>8</div>
          </Link>
          <Link href="/settings" className={style.headerUserSettings}>
            <AiOutlineSetting className={style.headerIcon} />
          </Link>
          <Link href="/home" className={style.headerUser}>
            <AiOutlineUser className={style.headerIcon} />
          </Link>
        </div>
        <nav className={style.headerNav}>
          <ul>
            <li>
              <Link
                href="/home"
                className={
                  router.includes("/home")
                    ? style.headerNavLink + " " + style.active
                    : style.headerNavLink
                }
              >
                <AiOutlineHome className={style.headerNavIcon} />
                <span>Головна</span>
              </Link>
            </li>
            <li>
              <Link
                href="/folders"
                className={
                  router.includes("/folders")
                    ? style.headerNavLink + " " + style.active
                    : style.headerNavLink
                }
              >
                <AiOutlineFolderOpen className={style.headerNavIcon} />
                <span>Папки</span>
              </Link>
            </li>
            <li>
              <Link
                href="/departments"
                className={
                  router.includes("/departments")
                    ? style.headerNavLink + " " + style.active
                    : style.headerNavLink
                }
              >
                <AiOutlineBook className={style.headerNavIcon} />
                <span>Вділи</span>
              </Link>
            </li>
            <li>
              <Link
                href="/users"
                className={
                  router.includes("/users")
                    ? style.headerNavLink + " " + style.active
                    : style.headerNavLink
                }
              >
                <AiOutlineTeam className={style.headerNavIcon} />
                <span>Користувачі</span>
              </Link>
            </li>
            <li>
              <Link
                href="/structure"
                className={
                  router.includes("/structure")
                    ? style.headerNavLink + " " + style.active
                    : style.headerNavLink
                }
              >
                <AiOutlineApartment className={style.headerNavIcon} />
                <span>Структура</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
