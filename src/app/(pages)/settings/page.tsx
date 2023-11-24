import { getExecution } from "@/api/controllers/execution/getExecution";
import { getFolders } from "@/api/controllers/folder/getFolders";
import { getImportance } from "@/api/controllers/importance/getImportance";
import { getPeriodicity } from "@/api/controllers/periodicity/getPeriodicity";
import AddSelectForm from "@/components/addSelectForm/addSelectForm";
import DataTable from "@/components/dataTable/dataTable";
import Title from "@/components/title/title";
import sortArrByKey from "@/helpers/sortArrByKey";
import Overlay from "@/reusableComponents/overlay/overlay";
import Link from "next/link";
import React, { FC } from "react";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Settings: FC<PageProps> = async ({ searchParams }) => {
  const id = typeof searchParams.id === "string" ? searchParams.id : undefined;
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "name";
  const active =
    typeof searchParams.active === "string" ? searchParams.active : "active";
  const issort =
    typeof searchParams.issort === "string" ? Number(searchParams.issort) : 1;

  const folders = await getFolders();
  const execution = await getExecution();
  const importance = await getImportance();
  const periodicity = await getPeriodicity();

  return (
    <div>
      <Title title="Налаштування" />
      <div className="flex justify-around items-stretch gap-8 flex-wrap">
        <div className="w-2/5">
          <AddSelectForm title="Папки" selectName="folder" />
          <DataTable
            data={sortArrByKey(
              folders,
              sort === "name" ? "name" : "href",
              issort > 0
            )}
            keys={["name", "href"]}
            thName={["Назва", "Посилання"]}
            page={1}
            limit={folders.length}
            total={folders.length}
            id={id}
            sort={sort}
            issort={(issort === 1 && issort) || (issort === -1 && issort) || 1}
            pathname="/settings"
          >
            {folders.findIndex((item) => item._id === id) >= 0 && (
              <Overlay>
                <div className="relative min-w-[50%] max-h-[70%] max-w-[70%] overflow-auto">
                  <Link
                    className="absolute right-2 top-2 px-3 py-2 mt-auto text-white text-button-M bg-primary60 border-2 border-solid border-primary60 hover:text-primary60 hover:bg-white focus:text-primary60 focus:bg-white"
                    href={{
                      pathname: "/settings",
                      query: {
                        ...(sort ? { sort } : {}),
                        ...(issort ? { issort } : {}),
                      },
                    }}
                  >
                    X
                  </Link>
                  <AddSelectForm
                    title="Папки"
                    selectName="folder"
                    data={folders.find((item) => item._id.toString() === id)}
                  />
                </div>
              </Overlay>
            )}
          </DataTable>
        </div>
        <div className="w-2/5">
          <AddSelectForm title="Періодичність" selectName="periodicity" />
          <DataTable
            data={sortArrByKey(
              periodicity,
              sort === "name" ? "name" : "href",
              issort > 0
            )}
            keys={["name", "href"]}
            thName={["Назва", "Посилання"]}
            page={1}
            limit={periodicity.length}
            total={periodicity.length}
            id={id}
            sort={sort}
            issort={(issort === 1 && issort) || (issort === -1 && issort) || 1}
            pathname="/settings"
          >
            {periodicity.findIndex((item) => item._id === id) >= 0 && (
              <Overlay>
                <div className="relative min-w-[50%] max-h-[70%] max-w-[70%] overflow-auto">
                  <Link
                    className="absolute right-2 top-2 px-3 py-2 mt-auto text-white text-button-M bg-primary60 border-2 border-solid border-primary60 hover:text-primary60 hover:bg-white focus:text-primary60 focus:bg-white"
                    href={{
                      pathname: "/settings",
                      query: {
                        ...(sort ? { sort } : {}),
                        ...(issort ? { issort } : {}),
                      },
                    }}
                  >
                    X
                  </Link>
                  <AddSelectForm
                    title="Періодичність"
                    selectName="periodicity"
                    data={periodicity.find(
                      (item) => item._id.toString() === id
                    )}
                  />
                </div>
              </Overlay>
            )}
          </DataTable>
        </div>
        <div className="w-2/5">
          <AddSelectForm title="Стан виконання" selectName="execution" />
          <DataTable
            data={sortArrByKey(
              execution,
              sort === "name" ? "name" : "href",
              issort > 0
            )}
            keys={["name", "href"]}
            thName={["Назва", "Посилання"]}
            page={1}
            limit={execution.length}
            total={execution.length}
            id={id}
            sort={sort}
            issort={(issort === 1 && issort) || (issort === -1 && issort) || 1}
            pathname="/settings"
          >
            {execution.findIndex((item) => item._id === id) >= 0 && (
              <Overlay>
                <div className="relative min-w-[50%] max-h-[70%] max-w-[70%] overflow-auto">
                  <Link
                    className="absolute right-2 top-2 px-3 py-2 mt-auto text-white text-button-M bg-primary60 border-2 border-solid border-primary60 hover:text-primary60 hover:bg-white focus:text-primary60 focus:bg-white"
                    href={{
                      pathname: "/settings",
                      query: {
                        ...(sort ? { sort } : {}),
                        ...(issort ? { issort } : {}),
                      },
                    }}
                  >
                    X
                  </Link>
                  <AddSelectForm
                    title="Стан виконання"
                    selectName="execution"
                    data={execution.find((item) => item._id.toString() === id)}
                  />
                </div>
              </Overlay>
            )}
          </DataTable>
        </div>
        <div className="w-2/5">
          <AddSelectForm title="Важливість" selectName="importance" />
          <DataTable
            data={sortArrByKey(
              importance,
              sort === "name" ? "name" : "href",
              issort > 0
            )}
            keys={["name", "href"]}
            thName={["Назва", "Посилання"]}
            page={1}
            limit={importance.length}
            total={importance.length}
            id={id}
            sort={sort}
            issort={(issort === 1 && issort) || (issort === -1 && issort) || 1}
            pathname="/settings"
          >
            {importance.findIndex((item) => item._id === id) >= 0 && (
              <Overlay>
                <div className="relative min-w-[50%] max-h-[70%] max-w-[70%] overflow-auto">
                  <Link
                    className="absolute right-2 top-2 px-3 py-2 mt-auto text-white text-button-M bg-primary60 border-2 border-solid border-primary60 hover:text-primary60 hover:bg-white focus:text-primary60 focus:bg-white"
                    href={{
                      pathname: "/settings",
                      query: {
                        ...(sort ? { sort } : {}),
                        ...(issort ? { issort } : {}),
                      },
                    }}
                  >
                    X
                  </Link>
                  <AddSelectForm
                    title="Важливість"
                    selectName="importance"
                    data={importance.find((item) => item._id.toString() === id)}
                  />
                </div>
              </Overlay>
            )}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Settings;
