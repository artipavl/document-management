import connectDB from "../../connect-db";
import FolderModel from "@/api/models/folder";

export const getFolders = async (): Promise<IFolder[]> => {
  try {
    await connectDB();
    const folders = await FolderModel.find({});
    const folderAsString: IFolder[] = folders.map((folder) => {
      return {
        ...folder.toJSON(),
        _id: folder._id.toString(),
      };
    });

    return folderAsString;
  } catch (error) {
    console.log(error);
    return [];
  }
};
