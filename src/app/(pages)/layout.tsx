import Header from "@/components/header/header";
import MobileHeader from "@/components/mobileHeader/mobileHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="bg-gray-100 w-full p-6">{children}</main>
    </>
  );
}
