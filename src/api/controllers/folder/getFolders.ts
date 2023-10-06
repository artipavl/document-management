import connectDB from "../../connect-db";
import FolderModel from "@/api/models/folder";

export const getFolders = async (): Promise<IFolder[]> => {
  try {
    await connectDB();
    const Folders = await FolderModel.find({});
    return Folders;
  } catch (error) {
    console.log(error);
    return [];
  }
};
