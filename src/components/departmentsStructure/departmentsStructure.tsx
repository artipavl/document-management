import React, { FC } from "react";
import style from "./departmentsStructure.module.scss";

type DepartmentsStructureProps = {
  departments: IDepartment[];
};

type Sort = IDepartment & { index?: number };

const DepartmentsStructure: FC<DepartmentsStructureProps> = ({
  departments,
}) => {
  const sort: Sort[] = departments as Sort[];
  let Maxindex = 0;

  const test = (index: number, s: Sort) => {
    s.index = index;
    if (Maxindex < index) {
      Maxindex = index;
    }
    const filter = sort.filter((item) => item.dependent === s._id);

    if (filter.length === 0) {
      return;
    }
    filter.forEach((item) => {
      test(index + 1, item);
    });
  };

  sort.forEach((item) => {
    if (!item.dependent) {
      item.index = 0;
      test(0, item);
    }
  });

  return (
    <div>
      <ul className={style.list}>
        {Array.from({ length: Maxindex + 1 }).map((_, i) => (
          <li key={i} className={style.itemRow}>
            {sort
              .filter(({ index }) => index === i)
              .map((item) => (
                <div key={item._id} className={style.item}>
                  <h3>{item.index}</h3>
                  <div>{item.name}</div>{" "}
                  <ul>
                    {item.employees?.map((user) => (
                      <li key={user._id}>{user.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentsStructure;
