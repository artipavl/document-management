import PeriodicityModel from "@/api/models/periodicity";
import connectDB from "../../connect-db";

export const getPeriodicity = async (): Promise<IPeriodicity[]> => {
  try {
    await connectDB();
    const items = await PeriodicityModel.find({});
    const periodicity: IPeriodicity[] = items.map((item) => {
      return {
        ...item.toJSON(),
        _id: item._id.toString(),
      };
    });

    return periodicity;
  } catch (error) {
    console.log(error);
    return [];
  }
};
