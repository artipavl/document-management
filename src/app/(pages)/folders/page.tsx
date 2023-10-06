import { getFolders } from "@/api/controllers/folder/getFolders";
import { getUsers } from "@/api/controllers/user/getUsers";
import FoldersNav from "@/components/foldersNav/foldersNav";
import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {};

const Folders: FC<PageProps> = async (props) => {
  const folders = await getFolders();
  return (
    <div>
      <FoldersNav folders={folders} />
      <Title title={"УСІ"} />
    </div>
  );
};

export default Folders;
