"use server";

import { addExecution } from "@/api/controllers/execution/addExecution";
import { addFolders } from "@/api/controllers/folder/addFolder";
import { addImportance } from "@/api/controllers/importance/addImportance";
import { addPeriodicity } from "@/api/controllers/periodicity/addPeriodicity";
import { revalidatePath } from "next/cache";

interface AddSelectProps {
  selectName: "folder" | "periodicity" | "execution" | "importance";
  name: string;
}

export async function addSelect({ selectName, name }: AddSelectProps) {
  try {
    switch (selectName) {
      case "folder":
        await addFolders({ name });
        break;
      case "periodicity":
        await addPeriodicity({ name });
        break;
      case "execution":
        await addExecution({ name });
        break;
      case "importance":
        await addImportance({ name });
        break;
      default:
        return { message: "Does not exist" };
        break;
    }

    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
