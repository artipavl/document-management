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

    const departments: IDepartment[] = await DepartmentModel.aggregate(
      pipeline
    ).sort({ [sort]: issort });

    if (departments.length > 0) {
      const [result] = await DepartmentModel.aggregate([
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }

    return { departments, total };
  } catch (error) {
    console.log(error);
    return { departments: [], total: 0 };
  }
};

type PipelineStage =
  | {
      $search: {
        index: string;
        text: {
          query: string;
          fuzzy: {};
          path: {
            wildcard: string;
          };
        };
      };
    }
  | {
      $skip: number;
    }
  | {
      $limit: number;
    };
