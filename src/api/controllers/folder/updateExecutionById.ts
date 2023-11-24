import FolderModel from "@/api/models/folder";
import connectDB from "../../connect-db";
import translit from "@/helpers/translit";

interface updateFoldersProps {
  name: string;
}

export const updateFoldersById = async (
  data: updateFoldersProps,
  id: string
) => {
  try {
    await connectDB();
    await FolderModel.findByIdAndUpdate(id, {
      name: data.name.toLowerCase(),
      href: translit(data.name),
    });
  } catch (error) {
    console.log(error);
  }
};
