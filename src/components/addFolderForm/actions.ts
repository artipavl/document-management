"use server";

import { addFolders } from "@/api/controllers/folder/addFolder";
import { revalidatePath } from "next/cache";

export async function createFolder(prevState: any, formData: FormData) {
  try {
    await addFolders({ name: String(formData.get("name")) });
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
