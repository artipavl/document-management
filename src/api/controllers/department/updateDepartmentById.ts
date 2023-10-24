import connectDB from "../../connect-db";
import DepartmentModel from "@/api/models/department";

export const updateDepartmentById = async (
  data: IAddDepartment,
  id: string
) => {
  try {
    await connectDB();
    const Department = await DepartmentModel.findByIdAndUpdate(id, data);
    return Department as IDepartment;
  } catch (error) {
    console.log(error);
  }
};
