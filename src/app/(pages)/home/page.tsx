import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {};

const Folders: FC<PageProps> = (props) => {
  return (
    <div className="container">
      <Title title="Домашня" />
    </div>
  );
};

export default Folders;
