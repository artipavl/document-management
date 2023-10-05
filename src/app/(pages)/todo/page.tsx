import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {};

const Todo: FC<PageProps> = (props) => {
  return (
    <div>
      <Title title="Завдання" />
    </div>
  );
};

export default Todo;
