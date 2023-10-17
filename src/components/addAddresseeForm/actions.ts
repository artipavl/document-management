"use server";

import { addAddressee } from "@/api/controllers/addressee/addAddressee";
import { revalidatePath } from "next/cache";

export async function createAddressee(values: IAddAddressee) {
  try {
    await addAddressee(values);
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
