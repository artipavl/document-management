import { object } from "yup";
import connectDB from "../../connect-db";
import DepartmentModel from "@/api/models/department";

export const getDepartmentAll = async (): Promise<{ departments: IDepartment[]; total: number }> => {
  try {
    
    await connectDB();

    const pipeline: PipelineStage[] = [];

    const pipelineLookup = [
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "department",
          as: "employees",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          description: 1,
          dependent: 1,
          employees: {
            // Додаємо поля з колекції 'users'
            _id: 1,
            name: 1,
            surname: 1,
            email: 1,
            phone: 1,
            jobPosition: 1,
            department: 1,
            birthday: 1,
            startWork: 1,
            finishWork: 1,
          },
        },
      },
    ];

    const departments: IDepartment[] = await DepartmentModel.aggregate([
      ...pipeline,
      ...pipelineLookup,
    ])
    if (departments.length > 0) {
      const [result] = await DepartmentModel.aggregate([
        {
          $count: "total",
        },
      ]);
    }

    const departmentsAsString: IDepartment[] = departments.map((department) => {
      return {
        ...department,
        _id: department._id.toString(),
        dependent: department.dependent?.toString(),
        employees: department.employees.map((employee) => {
          return {
            ...employee,
            _id: employee._id.toString(),
            ...(employee.department
              ? { department: employee.department.toString() }
              : {}),
          };
        }),
      };
    });
    return { departments: departmentsAsString, total: departmentsAsString.length};
  } catch (error) {
    console.log(error);
    return { departments: [], total: 0 };
  }
};
