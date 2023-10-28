import { object } from "yup";
import connectDB from "../../connect-db";
import DepartmentModel from "@/api/models/department";

export const getDepartmentInPage = async ({
  query,
  page = 1,
  limit = 10,
  sort,
  issort,
}: {
  query?: string;
  page: number;
  limit: number;
  sort: string;
  issort: 1 | -1;
}): Promise<{ departments: IDepartment[]; total: number }> => {
  try {
    let total = 0;
    const skip = (page - 1) * limit;
    await connectDB();

    const pipeline: PipelineStage[] = [{ $skip: skip }, { $limit: limit }];

    if (query) {
      const unshift = {
        $search: {
          index: "search",
          text: {
            query,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 3,
              maxExpansions: 50,
            },
            path: {
              wildcard: "*",
            },
          },
        },
      };
      pipeline.unshift(unshift);
      const [result] = await DepartmentModel.aggregate([
        unshift,
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }

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
            age: 1,
            email: 1,
            phone: 1,
            jobPosition: 1,
            department: 1,
          },
        },
      },
    ];

    const departments: IDepartment[] = await DepartmentModel.aggregate([
      ...pipeline,
      ...pipelineLookup,
    ]).sort({
      [sort]: issort,
    });

    if (departments.length > 0) {
      const [result] = await DepartmentModel.aggregate([
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
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
    return { departments: departmentsAsString, total };
  } catch (error) {
    console.log(error);
    return { departments: [], total: 0 };
  }
};
