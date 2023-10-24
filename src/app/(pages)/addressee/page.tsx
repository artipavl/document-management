import { getAddresseesInPage } from "@/api/controllers/addressee/getAddresseesInPage";
import AddAddresseeForm from "@/components/addAddresseeForm/addAddresseeForm";
import DataTable from "@/components/dataTable/dataTable";
import Title from "@/components/title/title";
import Overlay from "@/reusableComponents/overlay/overlay";
import Link from "next/link";
import React, { FC } from "react";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Todo: FC<PageProps> = async ({ searchParams }) => {
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

  const { addressees, total } = await getAddresseesInPage({
    page,
    limit,
    query: search,
    sort,
    issort:issort===1&& issort || issort===-1 && issort || 1,
  });
  return (
    <div>
      <Title title="Адресати" />
      <AddAddresseeForm />
      <DataTable
        data={addressees}
        keys={["name", "email", "phone"]}
        thName={["Назва", "Пошта", "Телефон"]}
        page={page}
        limit={limit}
        total={total}
        search={search}
        id={id}
        sort={sort}
        issort={issort===1&& issort || issort===-1 && issort || 1}
        pathname="/addressee"
      >
        {id && (
          <Overlay>
            <div className="max-h-[70%] max-w-[50%] translate-x-1/2 translate-y-1/2 overflow-hidden">
              <Link
                className="absolute right-2 top-2 px-3 py-2 mt-auto text-white text-button-M bg-primary60 border-2 border-solid border-primary60 hover:text-primary60 hover:bg-white focus:text-primary60 focus:bg-white"
                href={{
                  pathname: "/addressee",
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
              <AddAddresseeForm
                data={addressees.find((item) => item._id.toString() === id)}
              />
            </div>
          </Overlay>
        )}
      </DataTable>
    </div>
  );
};

export default Todo;
