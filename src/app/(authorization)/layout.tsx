import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("token");
  if (token) {
    return redirect("/home");
  }
  return (
    <main className="w-full h-[100vh] p-6 flex justify-center items-center">
      {children}
    </main>
  );
}
