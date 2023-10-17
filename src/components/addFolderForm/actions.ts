"use server";

import { addFolders } from "@/api/controllers/folder/addFolder";
import { revalidatePath } from "next/cache";

export async function createFolder(value: IAddFolder) {
  try {
    await addFolders(value);
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
