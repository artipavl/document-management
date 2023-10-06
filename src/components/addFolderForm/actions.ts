"use server";

import { addFolders } from "@/api/controllers/folder/addFolder";

export async function createFolder(prevState: any, formData: FormData) {
  try {
    console.log(formData.get("name"));
    await addFolders({ name: String(formData.get("name")) });
    // return revalidatePath('/')
  } catch (e) {
    return { message: "Failed to create" };
  }
}
