import connectDB from "../../connect-db";
import DepartmentModel from "@/api/models/department";

export const getDepartments = async (): Promise<IDepartment[]> => {
  try {
    await connectDB();
    const departments = await DepartmentModel.find({});

    const departmentsAsString: IDepartment[] = departments.map((department) => {
      return {
        ...department.toJSON(),
        _id: department._id.toString(),
        dependent: department.dependent?.toString(),
      };
    });
    return departmentsAsString as IDepartment[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
