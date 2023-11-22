import ExecutionModel from "@/api/models/execution";
import connectDB from "../../connect-db";

export const getExecution = async (): Promise<IExecution[]> => {
  try {
    await connectDB();
    const items = await ExecutionModel.find({});
    const Execution: IExecution[] = items.map((item) => {
      return {
        ...item.toJSON(),
        _id: item._id.toString(),
      };
    });

    return Execution;
  } catch (error) {
    console.log(error);
    return [];
  }
};
