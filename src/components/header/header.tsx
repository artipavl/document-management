"use client";
import React, { FC, useState } from "react";
import Cookies from "js-cookie";

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
  AiOutlineContainer,
} from "react-icons/ai";

import style from "./header.module.scss";

import { useRouter, usePathname } from "next/navigation";
import MobileHeader from "../mobileHeader/mobileHeader";

type HeaderProps = {};

const Header: FC<HeaderProps> = (props) => {
  const router = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function openMenu() {
    "use client";
    setIsOpen((isOpen) => !isOpen);
  }

  function closeMenu() {
    "use client";
    if (isOpen) {
      setIsOpen(false);
    }
  }

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
        <div>{Cookies.get('email')}</div>
        <nav className={isOpen ? style.headerNavOpen : style.headerNav}>
          <ul
            onClick={(e) => {
              if (e.target as HTMLLinkElement) {
                closeMenu();
              }
            }}
          >
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
                <span>Відділи</span>
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
            <li>
              <Link
                href="/addressee"
                className={
                  router.includes("/addressee")
                    ? style.headerNavLink + " " + style.active
                    : style.headerNavLink
                }
              >
                <AiOutlineContainer className={style.headerNavIcon} />
                <span>Адресати</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <MobileHeader openFunction={openMenu} />
    </header>
  );
};

export default Header;
