"use server";

import { addExecution } from "@/api/controllers/execution/addExecution";
import { updateExecutionById } from "@/api/controllers/execution/updateExecutionById";
import { addFolders } from "@/api/controllers/folder/addFolder";
import { updateFoldersById } from "@/api/controllers/folder/updateExecutionById";
import { addImportance } from "@/api/controllers/importance/addImportance";
import { updateImportanceById } from "@/api/controllers/importance/updateExecutionById";
import { addPeriodicity } from "@/api/controllers/periodicity/addPeriodicity";
import { updatePeriodicityById } from "@/api/controllers/periodicity/updateExecutionById";
import { revalidatePath } from "next/cache";

interface AddSelectProps {
  selectName: "folder" | "periodicity" | "execution" | "importance";
  name: string;
  data?: ISelect;
}

export async function addSelect({ selectName, name, data }: AddSelectProps) {
  try {
    switch (selectName) {
      case "folder":
        data
          ? await updateFoldersById({ name: name }, data._id)
          : await addFolders({ name });
        break;
      case "periodicity":
        data
          ? await updatePeriodicityById({ name: name }, data._id)
          : await addPeriodicity({ name });
        break;
      case "execution":
        data
          ? await updateExecutionById({ name: name }, data._id)
          : await addExecution({ name });
        break;
      case "importance":
        data
          ? await updateImportanceById({ name: name }, data._id)
          : await addImportance({ name });
        break;
      default:
        // return { message: "Does not exist" };
        break;
    }

    return revalidatePath("/");
  } catch (e) {
    return { message: "Failed to create" };
  }
}
