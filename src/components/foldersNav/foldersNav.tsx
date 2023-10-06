import Link from "next/link";
import React, { FC } from "react";

import styles from "./foldersNav.module.scss";
import { AddForm } from "../addFolderForm/addFolderForm";

type FoldersNavProps = {
  folders: IFolder[];
};

const FoldersNav: FC<FoldersNavProps> = ({ folders }) => {
  return (
    <ul className={styles.list}>
      {folders.map((folder) => (
        <li key={folder._id}>
          <Link href={"/folders/" + folder.href} className={styles.item}>
            {folder.name.toUpperCase()}
          </Link>
        </li>
      ))}
      <li>
        <AddForm />
      </li>
    </ul>
  );
};

export default FoldersNav;
