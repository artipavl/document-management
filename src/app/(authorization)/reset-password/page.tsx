import LoginUserForm from "@/components/loginUserForm/loginUserForm";
import RecoverUserForm from "@/components/recoverUserForm/recoverUserForm";
import React, { FC } from "react";

type PageProps = {};

const Page: FC<PageProps> = (props) => {
  return (
    <div className="min-w-[400px]">
      <RecoverUserForm />
    </div>
  );
};

export default Page;
