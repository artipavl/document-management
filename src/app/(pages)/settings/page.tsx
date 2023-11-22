import AddSelectForm from "@/components/addSelectForm/addSelectForm";
import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {};

const Settings: FC<PageProps> = (props) => {
  return (
    <div>
      <Title title="Налаштування" />
      <AddSelectForm title="Папки" selectName="folder" />
      <AddSelectForm title="Періодичність" selectName="periodicity" />
      <AddSelectForm title="Стан виконання" selectName="execution" />
      <AddSelectForm title="Важливість" selectName="importance" />
    </div>
  );
};

export default Settings;
