import { getFolders } from "@/api/controllers/folder/getFolders";
import FoldersNav from "@/components/foldersNav/foldersNav";
import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {
  params: { slug: string };
};

const Users: FC<PageProps> = async ({ params }) => {
  const folders = await getFolders();
  return (
    <div>
      <FoldersNav folders={folders} current={params.slug}/>
      <Title title={"Папка #" + params.slug} />
    </div>
  );
};

export default Users;
