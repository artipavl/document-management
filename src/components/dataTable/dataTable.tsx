import React, { FC, ReactComponentElement } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineEllipsis,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

import styles from "./dataTable.module.scss";
import Link from "next/link";
import Overlay from "@/reusableComponents/overlay/overlay";
import AddAddresseeForm from "../addAddresseeForm/addAddresseeForm";

type DataTableProps<T> = {
  data: T[];
  keys: (keyof T)[];
  thName: string[];
  page: number;
  limit: number;
  total: number;
  search?: string;
  pathname: string;
  id?: string;
  sort: string;
  issort: 1|-1;
  children?: React.ReactNode;
};

const DataTable: FC<DataTableProps<T>> = ({
  data,
  keys,
  thName,
  page,
  limit,
  total,
  pathname,
  search = "",
  id,
  sort,
  issort,
  children,
}) => {
  const [closestSmaller, closestLarger] = findClosestMultiples(page, 6);
  const query = {
    ...(search ? { search } : {}),
    ...(limit ? { limit } : {}),
    ...(page ? { page } : {}),
    ...(sort ? { sort } : {}),
    ...(issort ? { issort } : {}),
  };
  return (
    <>
      {children}
      <table cellSpacing={0} className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {keys.map((row, index) => (
              <th className={styles.th} key={index}>
                <Link
                className={styles.thLink}
                  href={{
                    pathname,
                    query: {
                      ...query,
                      sort: keys[index].toString(),
                      issort:
                        sort === keys[index] ? (issort === 1 ? -1 : 1) : 1,
                    },
                  }}
                >
                  {thName[index]}
                  {sort === keys[index] &&
                    (issort === 1 ? (
                      <AiOutlineArrowDown />
                    ) : (
                      <AiOutlineArrowUp />
                    ))}
                </Link>
              </th>
            ))}
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={styles.tr}>
              {keys.map((key) => (
                <td key={String(key)} className={styles.td}>
                  <p className={styles.tdText}> {item[key]}</p>
                </td>
              ))}
              <td className={styles.td}>
                <Link
                  className={styles.button}
                  href={{
                    pathname,
                    query: {
                      ...query,
                      id: item._id.toString() ? item._id.toString() : "",
                    },
                  }}
                >
                  <AiOutlineEllipsis />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className={styles.pagination}>
        <li>
          <Link
            className={
              page === 1
                ? styles.paginationBtnDisabled + " " + styles.paginationBtn
                : styles.paginationBtn
            }
            href={{
              pathname,
              query: {
                ...query,
                page: page > 1 ? page - 1 : 1,
              },
            }}
          >
            <AiOutlineLeft className={styles.paginationBtnIcon} />
            <span
              className={
                styles.paginationBtnText + " " + styles.paginationBtnHidden
              }
            >
              Попередня
            </span>
          </Link>
        </li>

        <li className={styles.paginationInformation}>
          <span className={styles.paginationBtnText}>
            {page} / {Math.ceil(total / limit)}
          </span>
        </li>
        {Array.from({ length: Math.ceil(total / limit) }, (v, k) => {
          const p = k + 1;

          if (p === 1) {
            return (
              <li key={k}>
                <Link
                  className={
                    page === p
                      ? styles.paginationBtnActive +
                        " " +
                        styles.paginationBtn +
                        " " +
                        styles.paginationBtnHidden
                      : styles.paginationBtn + " " + styles.paginationBtnHidden
                  }
                  href={{
                    pathname,
                    query: {
                      ...query,
                      page: p,
                    },
                  }}
                >
                  <span className={styles.paginationBtnText}>{p}</span>
                </Link>
              </li>
            );
          }
          if (p == Math.ceil(total / limit)) {
            return (
              <li key={k}>
                <Link
                  className={
                    page === p
                      ? styles.paginationBtnActive +
                        " " +
                        styles.paginationBtn +
                        " " +
                        styles.paginationBtnHidden
                      : styles.paginationBtn + " " + styles.paginationBtnHidden
                  }
                  href={{
                    pathname,
                    query: {
                      ...query,
                      page: Math.ceil(total / limit),
                    },
                  }}
                >
                  <span className={styles.paginationBtnText}>
                    {Math.ceil(total / limit)}
                  </span>
                </Link>
              </li>
            );
          }
          if (p === closestSmaller - 1) {
            return (
              <li key={k}>
                <Link
                  className={
                    page === p
                      ? styles.paginationBtnActive +
                        " " +
                        styles.paginationBtn +
                        " " +
                        styles.paginationBtnHidden
                      : styles.paginationBtn + " " + styles.paginationBtnHidden
                  }
                  href={{
                    pathname,
                    query: {
                      ...query,
                      page: p,
                    },
                  }}
                >
                  <AiOutlineEllipsis className={styles.paginationBtnIcon} />
                </Link>
              </li>
            );
          }

          if (p === closestLarger) {
            return (
              <li key={k}>
                <Link
                  className={
                    page === p
                      ? styles.paginationBtnActive +
                        " " +
                        styles.paginationBtn +
                        " " +
                        styles.paginationBtnHidden
                      : styles.paginationBtn + " " + styles.paginationBtnHidden
                  }
                  href={{
                    pathname,
                    query: {
                      ...query,
                      page: p,
                    },
                  }}
                >
                  <AiOutlineEllipsis className={styles.paginationBtnIcon} />
                </Link>
              </li>
            );
          }

          if (p >= closestSmaller && p < closestLarger) {
            return (
              <li key={k}>
                <Link
                  className={
                    page === p
                      ? styles.paginationBtnActive +
                        " " +
                        styles.paginationBtn +
                        " " +
                        styles.paginationBtnHidden
                      : styles.paginationBtn + " " + styles.paginationBtnHidden
                  }
                  href={{
                    pathname,
                    query: {
                      ...query,
                      page: p,
                    },
                  }}
                >
                  <span className={styles.paginationBtnText}> {p}</span>
                </Link>
              </li>
            );
          }
        })}

        <li>
          <Link
            className={
              page === Math.ceil(total / limit)
                ? styles.paginationBtnDisabled + " " + styles.paginationBtn
                : styles.paginationBtn
            }
            href={{
              pathname,
              query: {
                ...query,
                page: page === Math.ceil(total / limit) ? page : page + 1,
              },
            }}
          >
            <span
              className={
                styles.paginationBtnText + " " + styles.paginationBtnHidden
              }
            >
              Наступна{" "}
            </span>
            <AiOutlineRight className={styles.paginationBtnIcon} />
          </Link>
        </li>
      </ul>
    </>
  );
};

export default DataTable;

function findClosestMultiples(x: number, y: number) {
  // Початкові значення для найближчих чисел, ініціалізовані як Infinity та -Infinity.
  let closestSmaller = -Infinity;
  let closestLarger = Infinity;

  // Знаходимо найближче число, менше `x`, що ділиться на 6.
  closestSmaller = x - (x % y);

  // Знаходимо найближче число, більше `x`, що ділиться на 6.
  closestLarger = closestSmaller + y;

  return [closestSmaller, closestLarger];
}
