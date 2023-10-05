import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {};

const Users: FC<PageProps> = (props) => {
  return (
    <div>
      <Title title="Користувачі" />
    </div>
  );
};

export default Users;
