"use server";

import { addDepartment } from "@/api/controllers/department/addDepartment";
import { updateDepartmentById } from "@/api/controllers/department/updateDepartmentById";
import { revalidatePath } from "next/cache";

export async function createDepartment(values: IAddDepartment, id?: string) {
  try {
    if (id) {
      await updateDepartmentById(values, id);
    } else {
      await addDepartment(values);
    }
    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
