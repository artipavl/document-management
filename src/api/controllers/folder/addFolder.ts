import translit from "@/helpers/translit";
import connectDB from "../../connect-db";
import FolderModel from "@/api/models/folder";

export const addFolders = async ({ name }: IAddFolder) => {
  try {
    await connectDB();
    const Folders = await FolderModel.create({
      name: name.toLowerCase(),
      href: translit(name),
    });
    return Folders;
  } catch (error) {
    console.log(error);
  }
};


