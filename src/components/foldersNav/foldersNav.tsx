import Link from "next/link";
import React, { FC } from "react";

import styles from "./foldersNav.module.scss";
import { AddForm } from "../addFolderForm/addFolderForm";

type FoldersNavProps = {
  folders: IFolder[];
  current?: string;
};

const FoldersNav: FC<FoldersNavProps> = ({ folders, current = "" }) => {
  console.log(current);
  return (
    <ul className={styles.list}>
      <li>
        <Link
          href={"/folders"}
          className={
            current === "" ? styles.item + " " + styles.itemActive : styles.item
          }
        >
          УСІ
        </Link>
      </li>

      {folders.map((folder) => (
        <li key={folder._id}>
          <Link
            href={"/folders/" + folder.href}
            className={
              current === folder.href
                ? styles.item + " " + styles.itemActive
                : styles.item
            }
          >
            {folder.name.toUpperCase()}
          </Link>
        </li>
      ))}

      <li className={styles.item}>
        <AddForm />
      </li>
    </ul>
  );
};

export default FoldersNav;
