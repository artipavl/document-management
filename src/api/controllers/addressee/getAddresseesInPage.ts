import AddresseeModel from "@/api/models/addressee";
import connectDB from "../../connect-db";

export const getAddresseesInPage = async ({
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
}): Promise<{ addressees: IAddressee[]; total: number }> => {
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
      const [result] = await AddresseeModel.aggregate([
        unshift,
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }

    const addressees = await AddresseeModel.aggregate(pipeline).sort({
      [sort]: issort,
    });

    if (addressees.length > 0) {
      const [result] = await AddresseeModel.aggregate([
        {
          $count: "total",
        },
      ]);
      total = result ? result.total : 0;
    }

    const addresseesAsString: IAddressee[] = addressees.map((addresse) => {
      return {
        ...addresse,
        _id: addresse._id.toString(),
      };
    });

    return { addressees: addresseesAsString, total };
  } catch (error) {
    console.log(error);
    return { addressees: [], total: 0 };
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
