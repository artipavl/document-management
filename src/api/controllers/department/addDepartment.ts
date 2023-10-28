import connectDB from "../../connect-db";
import DepartmentModel from "@/api/models/department";

export const addDepartment = async ({
  name,
  email,
  phone,
  description,
  dependent,
}: IAddDepartment) => {
  const data: IAddDepartment = {
    name,
    email,
    ...(phone ? { phone } : {}),
    ...(description ? { description } : {}),
    ...(dependent ? { dependent } : {}),
  };
  try {
    await connectDB();
    await DepartmentModel.create(data);
  } catch (error) {
    console.log(error);
  }
};
