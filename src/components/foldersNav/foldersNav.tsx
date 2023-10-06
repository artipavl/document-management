import { getFolders } from "@/api/controllers/folder/getFolders";
import Link from "next/link";
import React, { FC } from "react";

import styles from "./foldersNav.module.scss";
import { addFolders } from "@/api/controllers/folder/addFolder";
import { getUsers } from "@/api/controllers/user/getUsers";

type FoldersNavProps = {};

const FoldersNav: FC<FoldersNavProps> = async (props) => {
  const folders = await getFolders();
  const user = await getUsers();
  return (
    <ul className={styles.list}>
      {folders.map((folder) => (
        <li key={folder.id}>
          <Link href={folder.href} className={styles.item}>
            {folder.name.toUpperCase()}
          </Link>
        </li>
      ))}
      <li>
        <form
        //   onSubmit={(e) => {
        //     e.preventDefault();
        //     const name = e.currentTarget.children[0] as HTMLInputElement;
        //     if (name.value) {
        //       addFolders({ name: name.value }).finally(() =>
        //         e.currentTarget.remove()
        //       );
        //     }
        //   }}
        >
          <input type="text" name="name" />
        </form>{" "}
        <button type="submit">+</button>
      </li>
    </ul>
  );
};

export default FoldersNav;
