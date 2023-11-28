import { getDepartmentAll } from "@/api/controllers/department/getDepartmentAll";
import { getDepartments } from "@/api/controllers/department/getDepartments";
import DepartmentsStructure from "@/components/departmentsStructure/departmentsStructure";
import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {};

const Structure: FC<PageProps> = async (props) => {
  const { departments } = await getDepartmentAll();
  return (
    <div>
      <Title title="Структура" />
      <DepartmentsStructure departments={departments} />
    </div>
  );
};

export default Structure;
