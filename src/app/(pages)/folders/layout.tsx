import { addFolders } from "@/api/controllers/folder/addFolder";
import { getFolders } from "@/api/controllers/folder/getFolders";
import { getUsers } from "@/api/controllers/user/getUsers";
import FoldersNav from "@/components/foldersNav/foldersNav";
import Title from "@/components/title/title";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const folders = await getFolders();
  return (
    <>
      <Title title="Папки" />
      <FoldersNav folders={folders} />
      {children}
    </>
  );
}
