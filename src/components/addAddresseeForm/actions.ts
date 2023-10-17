"use server";

import { addAddressee } from "@/api/controllers/addressee/addAddressee";
import { revalidatePath } from "next/cache";

export async function createFolder(values: IAddAddressee) {
  try {
    console.log(values);
    // const addressee: IAddAddressee = {
    //   name: formData.get("name") as string,
    //   email: formData.get("email") as string,
    //   phone: (formData.get("phone") as string) || undefined,
    //   underAddressee: [] || undefined,
    // };
    await addAddressee(values);
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
