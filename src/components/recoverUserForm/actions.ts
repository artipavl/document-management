"use server";

import { addUser } from "@/api/controllers/user/addUser";
import { updateUserById } from "@/api/controllers/user/updateUserById";
import { revalidatePath } from "next/cache";

export async function createUser(values: IRecoverUser) {
  try {
   
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
