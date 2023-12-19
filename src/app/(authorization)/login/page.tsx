import LoginUserForm from "@/components/loginUserForm/loginUserForm";
import React, { FC } from "react";

type PageProps = {};

const Page: FC<PageProps> = (props) => {
  return (
    <div className="min-w-[400px]">
      <LoginUserForm />
    </div>
  );
};

export default Page;
