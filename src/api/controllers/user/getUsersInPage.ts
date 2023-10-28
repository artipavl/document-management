import connectDB from "../../connect-db";
import UserModel from "@/api/models/user";

export const getUsersInPage = async ({
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
}): Promise<{ users: IUser[]; total: number }> => {
  try {
    let total = 0;
    const skip = (page - 1) * limit;
    await connectDB();

    const pipeline: PipelineStage[] = [
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          name: 1,
          surname: 1,
          age: 1,
          email: 1,
          phone: 1,
          department: 1,
          jobPosition: 1
        },
      },
    ];

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
      const [result] = await UserModel.aggregate([
        unshift,
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }

    const users = await UserModel.aggregate(pipeline).sort({
      [sort]: issort,
    });

    if (users.length > 0) {
      const [result] = await UserModel.aggregate([
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }

    const usersAsString: IUser[] = users.map((user) => {
      return {
        ...user,
        _id: user._id.toString(),
        ...(user.department ? { department: user.department.toString() } : {}),
      };
    });
    
    return { users: usersAsString, total };
  } catch (error) {
    console.log(error);
    return { users: [], total: 0 };
  }
};
