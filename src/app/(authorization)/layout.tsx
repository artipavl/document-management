export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-[100vh] p-6 flex justify-center items-center">
      {children}
    </main>
  );
}
