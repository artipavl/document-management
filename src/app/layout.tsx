"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
// import Header from "@/components/header/header";
import "../../tailwind.config";

// import MobileHeader from "@/components/mobileHeader/mobileHeader";
// import { Metadata } from "next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
//
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
      <body
        className={
          roboto.className +
          " " +
          "xl:flex bg-gray-100 xl:items-stretch min-h-screen"
        }
      >
        <div id="portal" />
        {children}
      </body>
    </html>
  );
}
