import { getAddressees } from "@/api/controllers/addressee/getAddressees";
import { getDocomentsInPage } from "@/api/controllers/document/getDocomentsInPage";
import { getFolders } from "@/api/controllers/folder/getFolders";
import { getUsers } from "@/api/controllers/user/getUsers";
import AddDocumentForm from "@/components/addDocumentForm/addDocumentForm";
import DataTable from "@/components/dataTable/dataTable";
import FoldersNav from "@/components/foldersNav/foldersNav";
import Title from "@/components/title/title";
import Overlay from "@/reusableComponents/overlay/overlay";
import Link from "next/link";
import React, { FC } from "react";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Folders: FC<PageProps> = async ({ params, searchParams }) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const id = typeof searchParams.id === "string" ? searchParams.id : undefined;
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "name";
  const issort =
    typeof searchParams.issort === "string" ? Number(searchParams.issort) : 1;

  const { documents, total } = await getDocomentsInPage({
    page,
    limit,
    query: search,
    sort,
    issort: (issort === 1 && issort) || (issort === -1 && issort) || 1,
  });

  const folders = await getFolders();
  const users = await getUsers();
  const addressees = await getAddressees();
  return (
    <div>
      <FoldersNav folders={folders} current={params.slug} />
      <Title title={"Усі"} />
      <AddDocumentForm
        folders={folders}
        users={users}
        addressees={addressees}
      />
      <DataTable
        data={documents}
        keys={["number", "title", "date"]}
        thName={["Номер", "Заголовок", "Дата"]}
        page={page}
        limit={limit}
        total={total}
        search={search}
        id={id}
        sort={sort}
        issort={(issort === 1 && issort) || (issort === -1 && issort) || 1}
        pathname="/folders"
      >
        {id && (
          <Overlay>
            <div className="relative min-w-[50%] max-h-[70%] max-w-[70%] overflow-auto">
              <Link
                className="absolute right-2 top-2 px-3 py-2 mt-auto text-white text-button-M bg-primary60 border-2 border-solid border-primary60 hover:text-primary60 hover:bg-white focus:text-primary60 focus:bg-white"
                href={{
                  pathname: "/folders",
                  query: {
                    ...(search ? { search } : {}),
                    ...(limit ? { limit } : {}),
                    ...(page ? { page } : {}),
                    ...(sort ? { sort } : {}),
                    ...(issort ? { issort } : {}),
                  },
                }}
              >
                X
              </Link>
              <AddDocumentForm
                folders={folders}
                users={users}
                data={documents.find((item) => item._id.toString() === id)}
                addressees={addressees}
              />
            </div>
          </Overlay>
        )}
      </DataTable>
    </div>
  );
};

export default Folders;
