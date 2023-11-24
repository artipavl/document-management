import connectDB from "../../connect-db";
import translit from "@/helpers/translit";
import ExecutionModel from "@/api/models/execution";

interface updateExecutionProps {
  name: string;
}

export const updateExecutionById = async (
  data: updateExecutionProps,
  id: string
) => {
  try {
    await connectDB();
    await ExecutionModel.findByIdAndUpdate(id, {
      name: data.name.toLowerCase(),
      href: translit(data.name),
    });
  } catch (error) {
    console.log(error);
  }
};
