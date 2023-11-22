import translit from "@/helpers/translit";
import connectDB from "../../connect-db";
import ExecutionModel from "@/api/models/execution";

interface AddExecutionProps {
  name: string;
}

export const addExecution = async ({ name }: AddExecutionProps) => {
  try {
    await connectDB();
    const Execution = await ExecutionModel.create({
      name: name.toLowerCase(),
      href: translit(name),
    });
    return Execution;
  } catch (error) {
    console.log(error);
  }
};


