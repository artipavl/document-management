import { getAddressees } from "@/api/controllers/addressee/getAddressees";
import { AddAddresseeForm } from "@/components/addAddresseeForm/addAddresseeForm";
import Title from "@/components/title/title";
import React, { FC } from "react";

type PageProps = {};

const Todo: FC<PageProps> = async (props) => {
  const addressees = await getAddressees();
  return (
    <div>
      <Title title="Адресати" />
      <AddAddresseeForm />
      <ul>
        {addressees.map((addressee) => (
          <li key={addressee._id}>
            {addressee.name} {addressee.email} {addressee.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
