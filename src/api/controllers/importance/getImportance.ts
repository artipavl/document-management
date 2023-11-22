import connectDB from "../../connect-db";
import ImportanceModel from "@/api/models/importance";

export const getImportance = async (): Promise<IImportance[]> => {
  try {
    await connectDB();
    const items = await ImportanceModel.find({});
    const Importance: IImportance[] = items.map((item) => {
      return {
        ...item.toJSON(),
        _id: item._id.toString(),
      };
    });

    return Importance;
  } catch (error) {
    console.log(error);
    return [];
  }
};
