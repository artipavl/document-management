"use server";

import { addDocument } from "@/api/controllers/document/addDocument";
import { updateDocumentById } from "@/api/controllers/document/updateDocumentById";
import { revalidatePath } from "next/cache";

export async function createDepartment(values: IAddDocument, id?: string) {
  try {
    if (id) {
      await updateDocumentById(values, id);
    } else {
      await addDocument(values);
    }
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
