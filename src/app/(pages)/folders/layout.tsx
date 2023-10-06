
import FoldersNav from "@/components/foldersNav/foldersNav";
import Title from "@/components/title/title";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Title title="Папки" />
      <FoldersNav />
      {children}
    </>
  );
}
