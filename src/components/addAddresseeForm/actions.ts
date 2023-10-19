"use server";

import { addAddressee } from "@/api/controllers/addressee/addAddressee";
import { updateAddresseeById } from "@/api/controllers/addressee/updateAddresseeById";
import { revalidatePath } from "next/cache";

export async function createAddressee(values: IAddAddressee, id?: string) {
  try {
    console.log(id);
    if (id) {
      await updateAddresseeById(values, id);
    } else {
      await addAddressee(values);
    }
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
