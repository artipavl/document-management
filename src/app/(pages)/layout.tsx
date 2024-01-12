"use client";
import { authenticate } from "@/api/controllers/user/authenticate";
import Header from "@/components/header/header";
import MobileHeader from "@/components/mobileHeader/mobileHeader";

import privatRouter from "@/helpers/privatRouter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    authenticate()
      .then((r) => {
        r ? setLoader(true) : router.push("/login");
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  return (
    <>
      {loader ? (
        <>
          <Header />
          <main className="bg-gray-100 w-full p-6">{children}</main>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Layout;
