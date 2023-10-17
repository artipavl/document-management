import { getAddressees } from "@/api/controllers/addressee/getAddressees";
import { getAddresseesInPage } from "@/api/controllers/addressee/getAddresseesInPage";
import AddAddresseeForm from "@/components/addAddresseeForm/addAddresseeForm";
import DataTable from "@/components/dataTable/dataTable";
import Title from "@/components/title/title";
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

  const { addressees, total } = await getAddresseesInPage({
    page,
    limit,
    query: search,
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
        pathname="/addressee"
      />
    </div>
  );
};

export default Todo;
