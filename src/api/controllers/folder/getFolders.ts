import connectDB from "../../connect-db";
import FolderModel from "@/api/models/folder";

export const getFolders = async ()=> {
  try {
    await connectDB();
    const Folders = await FolderModel.find({});
    console.log(Folders);
    return Folders;
  } catch (error) {
    console.log(error);
    return [];
  }
};
