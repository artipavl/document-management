import connectDB from "../../connect-db";
import DepartmentModel from "@/api/models/department";

export const getDepartment = async (): Promise<IDepartment[]> => {
  try {
    await connectDB();
    const Department = await DepartmentModel.find({});
    return Department as IDepartment[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
