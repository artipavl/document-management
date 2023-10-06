import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {
  params: { slug: string };
};

const Users: FC<PageProps> = ({ params }) => {
  return (
    <div>
      <Title title={"Папка #" + params.slug} />
    </div>
  );
};

export default Users;
