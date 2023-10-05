import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {};

const Page: FC<PageProps> = (props) => {
  return (
    <div>
      <Title title="login" />
    </div>
  );
};

export default Page;
