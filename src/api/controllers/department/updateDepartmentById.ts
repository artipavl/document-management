import connectDB from "../../connect-db";
import DepartmentModel from "@/api/models/department";

export const updateDepartmentById = async (
  data: IAddDepartment,
  id: string
) => {
  try {
    await connectDB();
    await DepartmentModel.findByIdAndUpdate(id, data);
  } catch (error) {
    console.log(error);
  }
};
