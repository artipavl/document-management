"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import "../../tailwind.config";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Document Management",
//   description: "Document management next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header /> */}
        <div className="min-h-full">
          <Header />

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
