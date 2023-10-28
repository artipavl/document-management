"use server";

import { addUser } from "@/api/controllers/user/addUser";
import { updateUserById } from "@/api/controllers/user/updateUserById";
import { revalidatePath } from "next/cache";

export async function createUser(values: IAddUser, id?: string) {
  try {
    if (id) {
      await updateUserById(values, id);
    } else {
      await addUser(values);
    }
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
